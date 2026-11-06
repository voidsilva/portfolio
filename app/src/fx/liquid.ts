/*
 * Mundo de vidro líquido: um único quadro em WebGL (um triângulo, um shader).
 * - Os títulos (SilvaDev, Projetos, Serviços, Contato) são lâminas de vidro grosso:
 *   refratam o fundo com dispersão de cor, têm borda chanfrada, brilho e sombra.
 * - Ao rolar, um título derrete e escorre para o próximo (morph de campos de distância).
 * - O mouse deixa ondas na superfície; rolar rápido faz o vidro balançar.
 * Custo: 1 passada de tela cheia, 6 leituras de textura por pixel, resolução reduzida.
 */

const VERT = `attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D uAtlas;
uniform float uN, uA, uB, uMix, uTime, uDark, uVel, uIntro;
uniform vec2 uScale, uRes, uMouse, uOff;
uniform vec4 uRip[8];

float slot(vec2 s, float i, float sc){
  vec2 a = (s - .5) / sc + .5;
  if (a.x < 0. || a.x > 1. || a.y < 0. || a.y > 1.) return 0.;
  return texture2D(uAtlas, vec2(a.x, (a.y + i) / uN)).r;
}
float field(vec2 s){
  s.x += sin(s.y * 11. + uTime * 2.6) * uVel * .006;
  s.y += sin(s.x * 7. + uTime * 2.1) * uVel * .004;
  s -= uOff;
  return mix(slot(s, uA, uScale.x), slot(s, uB, uScale.y), uMix);
}
float ripple(vec2 px){
  float h = 0.;
  for (int i = 0; i < 8; i++) {
    vec4 r = uRip[i];
    float age = uTime - r.z;
    if (age < 0. || age > 2.6 || r.w == 0.) continue;
    float d = length(px - r.xy);
    float w = d - age * 360.;
    h += r.w * sin(w * .05) * exp(-w * w * .00009) * exp(-age * 1.5);
  }
  return h;
}
float height(vec2 s, vec2 px){
  float f = field(s);
  return smoothstep(.5, .96, f) + ripple(px) * (.25 + .75 * smoothstep(.4, .6, f));
}
float blob(vec2 p, vec2 c, float r){ vec2 d = p - c; return exp(-dot(d, d) / (r * r)); }
vec3 bg(vec2 s){
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(s.x * asp, s.y);
  float t = uTime * .07;
  vec3 base = mix(vec3(.955, .958, .978), vec3(.032, .036, .052), uDark);
  vec3 c1 = vec3(.545, .361, .965);
  vec3 c2 = vec3(.333, .839, 1.);
  vec3 c3 = mix(vec3(1., .74, .88), vec3(.27, .16, .62), uDark);
  vec3 col = base;
  col = mix(col, c1, blob(p, vec2(asp * (.22 + .1 * sin(t * 1.3)), .30 + .12 * cos(t)), .55) * mix(.62, .6, uDark));
  col = mix(col, c2, blob(p, vec2(asp * (.82 + .08 * cos(t * 1.1)), .70 + .1 * sin(t * .9)), .45) * mix(.55, .42, uDark));
  col = mix(col, c3, blob(p, vec2(asp * (.55 + .15 * sin(t * .7)), .95 + .05 * cos(t * 1.7)), .5) * .35);
  // grade de pontos: é ela que deixa a refração visível (as lentes ampliam e entortam os pontos)
  vec2 g = s * uRes / 26.;
  float dotm = smoothstep(.17, .1, length(fract(g) - .5));
  col = mix(col, mix(vec3(.62, .58, .78), vec3(.42, .38, .62), uDark), dotm * mix(.32, .28, uDark));
  return col;
}
void main(){
  vec2 s = vec2(vUv.x, 1. - vUv.y);
  vec2 px = s * uRes;
  vec2 e = vec2(1.6 / uRes.x, 1.6 / uRes.y);
  float f = field(s);
  float h = height(s, px);
  float hx = height(s + vec2(e.x, 0.), px + vec2(1.6, 0.));
  float hy = height(s + vec2(0., e.y), px + vec2(0., 1.6));
  vec3 n = normalize(vec3((h - hx) * 9., (h - hy) * 9., 1.));
  float m = smoothstep(.47, .53, f);

  // fundo (com as ondas do mouse entortando um pouco também)
  vec2 rb = n.xy * .012 * (1. - m);
  vec3 back = bg(s + rb);
  // sombra do vidro no fundo
  float sh = smoothstep(.35, .7, field(s - vec2(.006, .014)));
  back *= 1. - sh * (1. - m) * mix(.07, .35, uDark);

  // vidro: refração com dispersão (r, g, b desviam diferente)
  vec2 o = n.xy * (.11 + .04 * uDark);
  vec3 gl;
  gl.r = bg(s + o * .92).r;
  gl.g = bg(s + o * 1.05).g;
  gl.b = bg(s + o * 1.2).b;
  // lente: o miolo amplia um pouco o fundo
  gl = mix(gl, bg((s - .5) * .9 + .5 + o * .5), .25);
  gl = mix(gl, vec3(1.), mix(.04, .03, uDark));
  // interior levemente mais escuro e saturado: o vidro ganha corpo
  gl = mix(gl, gl * gl * 1.12, .35 * (1. - uDark));
  // brilhos: luz que segue o mouse + luz fixa do alto à esquerda + borda (fresnel)
  vec3 L = normalize(vec3((uMouse - s) * vec2(1., -1.) * 1.4, .9));
  float spec = pow(max(dot(n, L), 0.), 90.) * 1.6;
  float spec2 = pow(max(dot(n, normalize(vec3(-.45, .55, .7))), 0.), 40.) * .9;
  float rim = pow(1. - n.z, 3.) * 1.3;
  gl += (spec + spec2) * vec3(1.) + rim * mix(vec3(.95, .93, 1.), vec3(.75, .7, 1.), uDark);
  gl -= smoothstep(.5, .56, f) * (1. - smoothstep(.56, .7, f)) * .06 * (1. - uDark);

  vec3 col = mix(back, gl, m);
  col = mix(mix(vec3(.955, .958, .978), vec3(.032, .036, .052), uDark), col, uIntro);
  gl_FragColor = vec4(col, 1.);
}`;

export const WORDS = ['', 'SilvaDev', 'Projetos', 'Serviços', 'Contato'];

/** Desfoque de caixa separável (3 passadas ≈ gaussiano) num canal de 8 bits. */
function boxBlur(src: Uint8ClampedArray, w: number, h: number, r: number) {
  const a = new Float32Array(w * h);
  const b = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) a[i] = src[i * 4];
  const pass = (from: Float32Array, to: Float32Array, horiz: boolean) => {
    const len = horiz ? w : h;
    const lines = horiz ? h : w;
    const k = 1 / (2 * r + 1);
    for (let l = 0; l < lines; l++) {
      const idx = (i: number) => (horiz ? l * w + i : i * w + l);
      let acc = 0;
      for (let i = -r; i <= r; i++) acc += from[idx(Math.min(len - 1, Math.max(0, i)))];
      for (let i = 0; i < len; i++) {
        to[idx(i)] = acc * k;
        acc += from[idx(Math.min(len - 1, i + r + 1))] - from[idx(Math.max(0, i - r))];
      }
    }
  };
  for (let it = 0; it < 3; it++) {
    pass(a, b, true);
    pass(b, a, false);
  }
  for (let i = 0; i < w * h; i++) {
    const v = a[i];
    src[i * 4] = src[i * 4 + 1] = src[i * 4 + 2] = v;
    src[i * 4 + 3] = 255;
  }
}

export class Liquid {
  private gl: WebGLRenderingContext;

  private tex: WebGLTexture;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private rips = new Float32Array(32);
  private ripI = 0;
  private start = performance.now();
  private w = 0;
  private h = 0;
  /** valores que o site anima (GSAP) */
  state = { a: 0, b: 0, mix: 0, sa: 0.02, sb: 1, vel: 0, dark: 0, intro: 0, offY: 0 };
  mouse = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 };

  static supported() {
    try {
      const c = document.createElement('canvas');
      // sem GPU de verdade (renderização por software) o vidro travaria: nesse caso fica a versão sem WebGL
      let force = false;
      try {
        force = localStorage.getItem('sd-gl') === 'force';
      } catch {
        /* sem armazenamento */
      }
      return !!c.getContext('webgl', { failIfMajorPerformanceCaveat: !force });
    } catch {
      return false;
    }
  }

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: false })!;
    this.gl = gl;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(p);
    gl.useProgram(p);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(p, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    for (const n of ['uAtlas', 'uN', 'uA', 'uB', 'uMix', 'uTime', 'uDark', 'uVel', 'uIntro', 'uScale', 'uRes', 'uMouse', 'uOff', 'uRip'])
      this.u[n] = gl.getUniformLocation(p, n);
    this.tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(this.u.uAtlas, 0);
    gl.uniform1f(this.u.uN, WORDS.length);
    this.resize();
  }

  /** Desenha as palavras (e a gota do carregamento) num atlas e desfoca: vira o campo do vidro. */
  private buildAtlas() {
    const k = Math.max(0.5, 360 / Math.min(this.w, this.h));
    const sw = Math.round(this.w * k);
    const shh = Math.round(this.h * k);
    const c = document.createElement('canvas');
    c.width = sw;
    c.height = shh * WORDS.length;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#fff';
    const mobile = this.w < 700;
    WORDS.forEach((word, i) => {
      const cy = shh * i + shh / 2;
      if (!word) {
        ctx.beginPath();
        ctx.arc(sw / 2, cy, Math.min(sw, shh) * 0.2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      // no celular, SilvaDev vira duas linhas para o vidro ficar grande
      const lines = mobile && word === 'SilvaDev' ? ['Silva', 'Dev'] : [word];
      let size = shh * (mobile ? (lines.length > 1 ? 0.22 : 0.3) : 0.42);
      const font = (s: number) => `800 ${s}px "Bricolage Grotesque", system-ui, sans-serif`;
      ctx.font = font(size);
      const max = sw * (mobile ? 0.92 : 0.88);
      const tw = Math.max(...lines.map((l) => ctx.measureText(l).width));
      if (tw > max) size *= max / tw;
      ctx.font = font(size);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${-size * 0.04}px`;
      lines.forEach((l, j) => ctx.fillText(l, sw / 2, cy + size * 0.04 + (j - (lines.length - 1) / 2) * size * 0.92));
    });
    const img = ctx.getImageData(0, 0, c.width, c.height);
    boxBlur(img.data, c.width, c.height, Math.max(2, Math.round(Math.min(sw, shh) * 0.016)));
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, c.width, c.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, img.data);
  }

  resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const q = innerWidth > 1600 ? 0.7 : innerWidth > 900 ? 0.8 : 0.9;
    this.w = innerWidth;
    this.h = innerHeight;
    this.canvas.width = Math.round(this.w * dpr * q);
    this.canvas.height = Math.round(this.h * dpr * q);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.buildAtlas();
  }

  rebuild() {
    this.buildAtlas();
  }

  /** Onda na superfície (posição em px da tela). */
  drop(x: number, y: number, amp = 0.35) {
    const i = (this.ripI++ % 8) * 4;
    const k = this.canvas.width / this.w;
    this.rips[i] = x * k;
    this.rips[i + 1] = y * k;
    this.rips[i + 2] = (performance.now() - this.start) / 1000;
    this.rips[i + 3] = amp;
  }

  render() {
    const gl = this.gl;
    const s = this.state;
    const m = this.mouse;
    m.x += (m.tx - m.x) * 0.08;
    m.y += (m.ty - m.y) * 0.08;
    gl.uniform1f(this.u.uTime, (performance.now() - this.start) / 1000);
    gl.uniform1f(this.u.uA, s.a);
    gl.uniform1f(this.u.uB, s.b);
    gl.uniform1f(this.u.uMix, s.mix);
    gl.uniform2f(this.u.uScale, Math.max(0.001, s.sa), Math.max(0.001, s.sb));
    gl.uniform1f(this.u.uVel, s.vel);
    gl.uniform1f(this.u.uDark, s.dark);
    gl.uniform1f(this.u.uIntro, s.intro);
    gl.uniform2f(this.u.uOff, 0, s.offY);
    gl.uniform2f(this.u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.u.uMouse, m.x, m.y);
    gl.uniform4fv(this.u.uRip, this.rips);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
