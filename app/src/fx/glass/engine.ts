/*
 * Motor do vidro (WebGL2). Por quadro: duas passadas de tela cheia, cada uma um único triângulo.
 *  1. cena → textura com mipmaps (o vidro fosco lê os níveis já borrados: desfoque de graça)
 *  2. interface → tela (folhas, topo, pílulas e prints como lâminas de vidro sobre a cena)
 * O campo de distância das palavras é calculado num Worker. A resolução se ajusta sozinha ao
 * desempenho do aparelho, e o site desenha menos quadros quando ninguém está mexendo.
 */
import { VERT, SCENE, UI } from './shaders';

export const WORDS = ['SilvaDev', 'Projetos', 'Serviços', 'Contato'];
const IMG_W = 1024;
const IMG_H = 640;
const FONT = '"Bricolage Grotesque", system-ui, sans-serif';

type U = Record<string, WebGLUniformLocation | null>;
const COMMON_U = ['uView', 'uRes', 'uTime', 'uDark', 'uLight', 'uLightOn', 'uVel', 'uRip'];
const SCENE_U = ['uSdf', 'uPoster', 'uSlots', 'uSlotA', 'uSlotB', 'uMorph', 'uBevel', 'uBox', 'uTexel', 'uWordOff', 'uWordOn', 'uDrops', 'uDropMix', 'uDropR', 'uScroll', 'uPosterLod'];
const UI_U = ['uScene', 'uImgs', 'uRect', 'uRectP', 'uRectN', 'uLens', 'uLensI', 'uFrost'];

const forced = () => {
  try {
    return localStorage.getItem('sd-gl') === 'force';
  } catch {
    return false;
  }
};

export class Glass {
  /** Sem GPU de verdade (renderização por software) o vidro travaria: aí fica a versão sem WebGL. */
  static supported() {
    try {
      const gl = document.createElement('canvas').getContext('webgl2', { failIfMajorPerformanceCaveat: !forced() });
      if (!gl) return false;
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return true;
    } catch {
      return false;
    }
  }

  readonly gl: WebGL2RenderingContext;
  private ps: WebGLProgram;
  private pu: WebGLProgram;
  private us: U = {};
  private uu: U = {};
  private vao: WebGLVertexArrayObject;
  private sdf: WebGLTexture;
  private poster: WebGLTexture;
  private imgs: WebGLTexture;
  private sceneTex: WebGLTexture | null = null;
  private fbo: WebGLFramebuffer;
  private worker: Worker | null = null;
  private t0 = performance.now();
  private rips = new Float32Array(32);
  private ripI = 0;
  private bw = 1;
  private bh = 1;
  private texel = 1;
  private dts: number[] = [];
  private good = 0;

  /** viewport em px CSS e tamanho real do desenho */
  w = 1;
  h = 1;
  rw = 1;
  rh = 1;
  /** qualidade adaptativa (1 = cheia) */
  qa = 1;
  bevel = [24, 24, 24, 24];
  wordsReady = false;
  imgsReady = false;
  lost = false;
  onLost: (() => void) | null = null;
  /** valores que o site anima */
  state = { a: 0, b: 0, morph: 0, wordOn: 0, offY: 0, dropMix: 1, dropR: 40, dark: 0, vel: 0, lightOn: 0, scroll: 0, posterLod: 1.2 };
  light = new Float32Array([0, 0, 700]);
  drops = new Float32Array(15);
  rects = new Float32Array(64);
  rectP = new Float32Array(64);
  rectN = 0;
  lens = new Float32Array(4);
  lensI = -1;

  constructor(
    private canvas: HTMLCanvasElement,
    spec = 6,
    layers = 3,
  ) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: !forced(),
    });
    if (!gl) throw new Error('sem WebGL2');
    this.gl = gl;
    const head = `#version 300 es\n#define SPEC ${spec}\n#define IMGW ${IMG_W}.\n`;
    this.ps = this.program(SCENE.replace('#version 300 es\n', head));
    this.pu = this.program(UI.replace('#version 300 es\n', head));
    for (const n of [...COMMON_U, ...SCENE_U]) this.us[n] = gl.getUniformLocation(this.ps, n);
    for (const n of [...COMMON_U, ...UI_U]) this.uu[n] = gl.getUniformLocation(this.pu, n);

    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.sdf = this.tex(gl.TEXTURE_2D, gl.LINEAR, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, 1, 1, 0, gl.RG, gl.FLOAT, new Float32Array([-320, -320]));
    this.poster = this.tex(gl.TEXTURE_2D, gl.LINEAR_MIPMAP_LINEAR, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 1, 1, 0, gl.RED, gl.UNSIGNED_BYTE, new Uint8Array([0]));
    gl.generateMipmap(gl.TEXTURE_2D);
    this.imgs = this.tex(gl.TEXTURE_2D_ARRAY, gl.LINEAR_MIPMAP_LINEAR, gl.CLAMP_TO_EDGE);
    gl.texStorage3D(gl.TEXTURE_2D_ARRAY, Math.floor(Math.log2(IMG_W)) + 1, gl.RGBA8, IMG_W, IMG_H, Math.max(1, layers));
    this.fbo = gl.createFramebuffer()!;

    gl.useProgram(this.ps);
    gl.uniform1i(this.us.uSdf, 0);
    gl.uniform1i(this.us.uPoster, 1);
    gl.uniform1f(this.us.uSlots, WORDS.length);
    gl.useProgram(this.pu);
    gl.uniform1i(this.uu.uScene, 0);
    gl.uniform1i(this.uu.uImgs, 1);

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.lost = true;
      this.onLost?.();
    });
    this.resize();
  }

  private program(fs: string) {
    const gl = this.gl;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const v = sh(gl.VERTEX_SHADER, VERT);
    const f = sh(gl.FRAGMENT_SHADER, fs);
    const p = gl.createProgram()!;
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.bindAttribLocation(p, 0, 'aPos');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(`${gl.getShaderInfoLog(v)}\n${gl.getShaderInfoLog(f)}\n${gl.getProgramInfoLog(p)}`);
    return p;
  }

  private tex(target: number, min: number, wrap: number) {
    const gl = this.gl;
    const t = gl.createTexture()!;
    gl.bindTexture(target, t);
    gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, min);
    gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrap);
    return t;
  }

  time() {
    return (performance.now() - this.t0) / 1000;
  }

  /** Recalcula o tamanho do desenho (viewport × densidade × qualidade adaptativa). */
  resize() {
    const gl = this.gl;
    const b = this.canvas.getBoundingClientRect();
    this.w = Math.max(1, b.width || innerWidth);
    this.h = Math.max(1, b.height || innerHeight);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const base = this.w > 1600 ? 0.75 : this.w > 900 ? 0.85 : 0.9;
    let q = base * this.qa;
    try {
      const f = Number(localStorage.getItem('sd-q'));
      if (f > 0) q = f;
    } catch {
      /* sem armazenamento */
    }
    const rw = Math.max(2, Math.round(this.w * dpr * q));
    const rh = Math.max(2, Math.round(this.h * dpr * q));
    if (rw === this.rw && rh === this.rh && this.sceneTex) return;
    this.rw = this.canvas.width = rw;
    this.rh = this.canvas.height = rh;
    if (this.sceneTex) gl.deleteTexture(this.sceneTex);
    const t = this.tex(gl.TEXTURE_2D, gl.LINEAR_MIPMAP_LINEAR, gl.CLAMP_TO_EDGE);
    gl.texStorage2D(gl.TEXTURE_2D, Math.floor(Math.log2(Math.max(rw, rh))) + 1, gl.RGBA8, rw, rh);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.sceneTex = t;
  }

  /** Mede o tempo entre quadros e baixa (ou devolve) a resolução para manter 60 fps. */
  adapt(dt: number) {
    if (dt > 120) return;
    this.dts.push(dt);
    if (this.dts.length < 45) return;
    const avg = this.dts.reduce((a, b) => a + b, 0) / this.dts.length;
    this.dts.length = 0;
    if (avg > 21.5 && this.qa > 0.56) {
      this.qa = Math.max(0.55, this.qa - 0.15);
      this.good = 0;
      this.resize();
    } else if (avg < 17.6 && this.qa < 1 && ++this.good > 5) {
      this.qa = Math.min(1, this.qa + 0.08);
      this.good = 0;
      this.resize();
    }
  }

  /** Palavras de vidro: texto no canvas → campo de distância exato (e uma versão suave) no Worker → textura RG16F. */
  async buildWords() {
    const bw = this.w;
    const bh = this.h;
    const k = Math.min(1, Math.max(0.35, 900 / Math.max(bw, bh)));
    const sw = Math.round(bw * k);
    const sh = Math.round(bh * k);
    const c = document.createElement('canvas');
    c.width = sw;
    c.height = sh * WORDS.length;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const mobile = bw < 700;
    WORDS.forEach((word, i) => {
      const cy = sh * i + sh / 2;
      // no celular, SilvaDev vira duas linhas para o vidro ficar grande
      const lines = mobile && word === 'SilvaDev' ? ['Silva', 'Dev'] : [word];
      let size = sh * (mobile ? (lines.length > 1 ? 0.23 : 0.3) : 0.42);
      const font = (s: number) => `800 ${s}px ${FONT}`;
      ctx.font = font(size);
      const max = sw * (mobile ? 0.9 : 0.86);
      const tw = Math.max(...lines.map((l) => ctx.measureText(l).width));
      if (tw > max) size *= max / tw;
      ctx.font = font(size);
      (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${-size * 0.035}px`;
      lines.forEach((l, j) => ctx.fillText(l, sw / 2, cy + size * 0.04 + (j - (lines.length - 1) / 2) * size * 0.9));
    });
    const px = ctx.getImageData(0, 0, c.width, c.height).data;
    const n = sw * sh;
    const alphas = WORDS.map((_, s) => {
      const a = new Uint8Array(n);
      for (let i = 0, o = s * n * 4; i < n; i++, o += 4) a[i] = px[o];
      return a;
    });
    const res = await this.sdfJob(sw, sh, k, alphas);
    if (this.lost) return;
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.sdf);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, sw, sh * WORDS.length, 0, gl.RG, gl.FLOAT, res.d);
    this.bevel = res.m.map((m) => Math.min(64, Math.max(8, m * 0.85)));
    this.bw = bw;
    this.bh = bh;
    this.texel = 1 / k;
    this.wordsReady = true;
  }

  private sdfJob(w: number, h: number, k: number, alphas: Uint8Array[]) {
    this.worker ??= new Worker(new URL('./sdf.worker.ts', import.meta.url), { type: 'module' });
    const wk = this.worker;
    return new Promise<{ d: Float32Array; m: number[] }>((res, rej) => {
      wk.onmessage = (e) => res(e.data);
      wk.onerror = (e) => rej(e);
      wk.postMessage({ w, h, k, alphas }, alphas.map((a) => a.buffer));
    });
  }

  /** A parede atrás do vidro: linhas de tipografia gigante que deslizam (a refração fica legível). */
  buildPoster(rows: string[]) {
    const W = 2048;
    const H = 1024;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    const rh = H / rows.length;
    rows.forEach((t, i) => {
      const phrase = `${t}  ·  `;
      let size = rh * 0.78;
      ctx.font = `800 ${size}px ${FONT}`;
      const pw = ctx.measureText(phrase).width;
      const n = Math.max(1, Math.round(W / pw));
      size *= W / (n * pw);
      ctx.font = `800 ${size}px ${FONT}`;
      for (let j = 0; j < n; j++) ctx.fillText(phrase, (j * W) / n, i * rh + rh / 2 + size * 0.04);
    });
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.poster);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, W, H, 0, gl.RED, gl.UNSIGNED_BYTE, c);
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  /** Prints dos projetos numa textura em camadas, recortados como no site (cobrindo, a partir do topo). */
  loadImages(srcs: string[]) {
    const gl = this.gl;
    const c = document.createElement('canvas');
    c.width = IMG_W;
    c.height = IMG_H;
    const ctx = c.getContext('2d')!;
    const one = (src: string, layer: number) =>
      new Promise<void>((done) => {
        const im = new Image();
        im.decoding = 'async';
        im.src = src;
        im.decode()
          .then(() => {
            const s = Math.max(IMG_W / im.naturalWidth, IMG_H / im.naturalHeight);
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, IMG_W, IMG_H);
            ctx.drawImage(im, 0, 0, im.naturalWidth * s, im.naturalHeight * s);
            gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.imgs);
            gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, layer, IMG_W, IMG_H, 1, gl.RGBA, gl.UNSIGNED_BYTE, c);
          })
          .catch(() => null)
          .finally(done);
      });
    return srcs
      .reduce((p, src, i) => p.then(() => one(src, i)), Promise.resolve())
      .then(() => {
        if (this.lost) return;
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.imgs);
        gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
        this.imgsReady = true;
      });
  }

  /** Onda na superfície do vidro (px CSS). */
  ripple(x: number, y: number, amp = 0.5) {
    this.rips.set([x, y, this.time(), amp], (this.ripI++ % 8) * 4);
  }

  private common(u: U, t: number) {
    const gl = this.gl;
    const s = this.state;
    gl.uniform2f(u.uView, this.w, this.h);
    gl.uniform2f(u.uRes, this.rw, this.rh);
    gl.uniform1f(u.uTime, t);
    gl.uniform1f(u.uDark, s.dark);
    gl.uniform3fv(u.uLight, this.light);
    gl.uniform1f(u.uLightOn, s.lightOn);
    gl.uniform1f(u.uVel, s.vel);
    gl.uniform4fv(u.uRip, this.rips);
  }

  render() {
    if (this.lost || !this.sceneTex) return;
    const gl = this.gl;
    const s = this.state;
    const t = this.time();
    gl.bindVertexArray(this.vao);

    // 1. cena (parede iluminada + palavras de vidro) na textura
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.viewport(0, 0, this.rw, this.rh);
    gl.useProgram(this.ps);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.sdf);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.poster);
    const u = this.us;
    this.common(u, t);
    gl.uniform1f(u.uSlotA, s.a);
    gl.uniform1f(u.uSlotB, s.b);
    gl.uniform1f(u.uMorph, s.morph);
    gl.uniform2f(u.uBevel, this.bevel[s.a] ?? 24, this.bevel[s.b] ?? 24);
    gl.uniform4f(u.uBox, (this.w - this.bw) / 2, (this.h - this.bh) / 2, this.bw, this.bh);
    gl.uniform1f(u.uTexel, this.texel);
    gl.uniform2f(u.uWordOff, 0, s.offY);
    gl.uniform1f(u.uWordOn, this.wordsReady ? s.wordOn : 0);
    gl.uniform3fv(u.uDrops, this.drops);
    gl.uniform1f(u.uDropMix, s.dropMix);
    gl.uniform1f(u.uDropR, s.dropR);
    gl.uniform1f(u.uScroll, s.scroll);
    gl.uniform1f(u.uPosterLod, s.posterLod);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // 2. mipmaps: o vidro fosco lê os níveis já borrados
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTex);
    gl.generateMipmap(gl.TEXTURE_2D);

    // 3. interface de vidro por cima, direto na tela
    gl.viewport(0, 0, this.rw, this.rh);
    gl.useProgram(this.pu);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.imgs);
    const v = this.uu;
    this.common(v, t);
    gl.uniform4fv(v.uRect, this.rects);
    gl.uniform4fv(v.uRectP, this.rectP);
    gl.uniform1i(v.uRectN, this.rectN);
    gl.uniform4fv(v.uLens, this.lens);
    gl.uniform1i(v.uLensI, this.lensI);
    gl.uniform1f(v.uFrost, Math.log2(Math.max(2, (22 * this.rw) / this.w)));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
