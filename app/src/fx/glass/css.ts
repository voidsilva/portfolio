/*
 * Vidro sem WebGL: o mesmo roteiro, desenhado com HTML, CSS e canvas 2D.
 * Entra quando o aparelho não tem aceleração de vídeo (sem WebGL2, ou WebGL só por software).
 * Tem a mesma interface do motor WebGL: o roteiro escreve o estado e aqui cada quadro vira só
 * transform, tamanho e opacidade (leve até sem placa de vídeo). As palavras de vidro são pintadas
 * uma vez num canvas, com borda, brilho, cáustica e sombra; a luz do cursor é um holofote na parede.
 */
import { WORDS, FONT, type Glass, type GlassLike } from './engine';

const DROP = 400;
const SPOT = 512;
const PLATES = 16;

type Word = {
  lines: string[];
  size: number;
  ys: number[];
  /** recorte do canvas, em px da caixa (a tela com zoom 1) */
  ox: number;
  oy: number;
  cw: number;
  ch: number;
  top: number;
  bottom: number;
  canvas: HTMLCanvasElement;
  box: HTMLElement;
};
type Prop = 'transform' | 'opacity' | 'visibility' | 'width' | 'height' | 'borderRadius' | 'zIndex' | 'clipPath' | 'backgroundImage';

const font = (s: number) => `800 ${s}px ${FONT}`;
const spacing = (c: CanvasRenderingContext2D, v: number) => ((c as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${v}px`);

export class CssGlass implements GlassLike {
  w = innerWidth;
  h = innerHeight;
  state: Glass['state'] = { a: 0, b: 0, morph: 0, wordOn: 0, offX: 0, offY: 0, zoom: 1, cen: 0, wall: 1, dropMix: 1, dropR: 40, dark: 0, vel: 0, lightOn: 0, scroll: 0, panX: 0, posterLod: 1.2 };
  light = new Float32Array([0, 0, 700]);
  drops = new Float32Array(15);
  rects = new Float32Array(64);
  rectP = new Float32Array(64);
  rectN = 0;
  lens = new Float32Array(4);
  lensI = -1;
  imgsReady = false;
  ink: [number, number][] = [];
  onLost: (() => void) | null = null;

  private wall: HTMLElement;
  private paintEl: HTMLCanvasElement;
  private dim: HTMLElement;
  private spot: HTMLElement;
  private wordsEl: HTMLElement;
  private rings: HTMLElement;
  private wave: HTMLElement;
  private dropEls: HTMLElement[] = [];
  private plates: HTMLElement[] = [];
  private kinds: string[] = [];
  private words: Word[] = [];
  private srcs: string[] = [];
  private rows: string[] = [];
  private wallKey = '';
  private focus: [number, number] = [0, 0];
  private memo = new Map<HTMLElement, Partial<Record<Prop, string>>>();
  private painted = -1;
  private ringAt = 0;

  constructor(after: Element) {
    const el = document.createElement('div');
    el.className = 'cg';
    el.setAttribute('aria-hidden', 'true');
    const crest = 'M0 40 Q100 12 200 40 T400 40 T600 40 T800 40 T1000 40 T1200 40 T1400 40 T1600 40';
    el.innerHTML =
      '<div class="cg__wall"><canvas class="cg__paint"></canvas></div>' +
      '<div class="cg__dim"></div><div class="cg__spot"></div><div class="cg__words"></div><div class="cg__drops"></div>' +
      `<div class="cg__plates"><div class="cg__wave"><svg class="cg__crest" viewBox="0 0 1600 80" preserveAspectRatio="none"><path class="cg__fill" d="${crest} V80 H0 Z"/><path class="cg__line" d="${crest}"/></svg><div class="cg__body"></div><svg class="cg__crest is-low" viewBox="0 0 1600 80" preserveAspectRatio="none"><path class="cg__fill" d="${crest} V0 H0 Z"/><path class="cg__line" d="${crest}"/></svg></div></div>` +
      '<div class="cg__rings"></div>';
    after.after(el);
    const q = (s: string) => el.querySelector<HTMLElement>(s)!;
    this.wall = q('.cg__wall');
    this.paintEl = el.querySelector('canvas')!;
    this.dim = q('.cg__dim');
    this.spot = q('.cg__spot');
    this.wordsEl = q('.cg__words');
    this.rings = q('.cg__rings');
    this.wave = q('.cg__wave');
    const drops = q('.cg__drops');
    for (let i = 0; i < 5; i++) {
      const d = document.createElement('div');
      d.className = 'cg__drop';
      drops.append(d);
      this.dropEls.push(d);
    }
    const plates = q('.cg__plates');
    for (let i = 0; i < PLATES; i++) {
      const p = document.createElement('div');
      p.className = 'cg__plate';
      plates.append(p);
      this.plates.push(p);
      this.kinds.push('');
    }
    this.resize();
  }

  /* ---------- escrita no DOM só quando o valor muda ---------- */
  private put(el: HTMLElement, prop: Prop, v: string) {
    let c = this.memo.get(el);
    if (!c) this.memo.set(el, (c = {}));
    if (c[prop] === v) return;
    c[prop] = v;
    el.style[prop] = v;
  }
  private op(el: HTMLElement, o: number) {
    this.put(el, 'opacity', o > 0.999 ? '' : o.toFixed(3));
    this.put(el, 'visibility', o < 0.004 ? 'hidden' : 'visible');
  }
  private tf(el: HTMLElement, x: number, y: number, s = 1) {
    this.put(el, 'transform', `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)${s === 1 ? '' : ` scale(${s.toFixed(4)})`}`);
  }

  resize() {
    this.w = innerWidth;
    this.h = innerHeight;
    this.put(this.wave, 'height', `${Math.ceil(this.h * 1.5 + 70)}px`);
    this.paintWall();
  }
  adapt() {
    /* sem resolução para ajustar: o navegador desenha */
  }
  focusPoint(): [number, number] {
    return this.focus;
  }

  /** Onda na superfície: aqui um anel de luz que se abre (só os toques fortes: clique e as trocas de cena). */
  ripple(x: number, y: number, amp = 0.5) {
    if (amp < 0.45) return;
    const now = performance.now();
    if (now - this.ringAt < 140 || this.rings.childElementCount > 4) return;
    this.ringAt = now;
    const r = 70 + amp * 230;
    const el = document.createElement('div');
    el.className = 'cg__ring';
    el.style.cssText = `left:${x - r}px;top:${y - r}px;width:${2 * r}px;height:${2 * r}px`;
    this.rings.append(el);
    const a = el.animate(
      [
        { transform: 'scale(0.12)', opacity: 0.7 },
        { transform: 'scale(1)', opacity: 0 },
      ],
      { duration: 900 + amp * 600, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' },
    );
    a.onfinish = () => el.remove();
  }

  /**
   * A parede: as manchas de cor e as linhas de tipografia gigante, pintadas uma vez num canvas
   * (parada: sem placa de vídeo, cada camada a mais pesa em todo quadro).
   */
  buildPoster(rows: string[]) {
    this.rows = rows;
    this.paintWall();
  }
  private paintWall() {
    const W = this.w;
    const H = this.h;
    const dark = this.state.dark > 0.5;
    const key = `${W}x${H}:${dark ? 1 : 0}:${this.rows.length}`;
    if (key === this.wallKey) return;
    this.wallKey = key;
    const c = this.paintEl;
    c.width = Math.ceil(W);
    c.height = Math.ceil(H);
    const x = c.getContext('2d')!;
    x.fillStyle = dark ? '#090a0e' : '#dcdaec';
    x.fillRect(0, 0, W, H);
    const blob = (cx: number, cy: number, r: number, col: string) => {
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, col);
      g.addColorStop(1, col.replace(/[\d.]+\)$/, '0)'));
      x.fillStyle = g;
      x.fillRect(0, 0, W, H);
    };
    blob(W * 0.2, H * 0.24, H * 0.62, dark ? 'rgba(139,92,246,0.62)' : 'rgba(139,92,246,0.5)');
    blob(W * 0.84, H * 0.74, H * 0.52, dark ? 'rgba(85,214,255,0.5)' : 'rgba(85,214,255,0.42)');
    blob(W * 0.55, H * 1.08, H * 0.58, dark ? 'rgba(102,38,191,0.45)' : 'rgba(245,168,245,0.34)');
    if (this.rows.length) {
      // mesma escala do WebGL: 4 linhas a cada 1,4 tela de altura, frases repetidas
      const rh = (H * 1.4) / this.rows.length;
      x.fillStyle = dark ? 'rgba(232,226,255,0.075)' : 'rgba(51,41,92,0.075)';
      x.textBaseline = 'middle';
      for (let k = 0; k * rh < H; k++) {
        const phrase = `${this.rows[k % this.rows.length]}  ·  `;
        x.font = font(rh * 0.78);
        const pw = x.measureText(phrase).width;
        for (let px = -((k * 0.37) % 1) * pw; px < W; px += pw) x.fillText(phrase, px, k * rh + rh / 2);
      }
    }
    // no escuro a parede fica na penumbra: a luz do cursor é que acende em volta
    if (dark) {
      x.fillStyle = 'rgba(9,10,14,0.5)';
      x.fillRect(0, 0, W, H);
    }
  }

  /** Prints dos projetos: decodificados antes, para a placa não piscar quando aparece. */
  loadImages(srcs: string[]) {
    this.srcs = srcs;
    return Promise.all(
      srcs.map((src) => {
        if (!src) return null;
        const im = new Image();
        im.decoding = 'async';
        im.src = src;
        return im.decode().catch(() => null);
      }),
    ).then(() => {
      this.imgsReady = true;
    });
  }

  /** Palavras: mesmo tamanho e posição do WebGL; o vidro é pintado num canvas recortado em volta delas. */
  async buildWords() {
    const W = this.w;
    const H = this.h;
    const mobile = W < 700;
    const dpr = Math.min(1.25, devicePixelRatio || 1);
    const m = document.createElement('canvas').getContext('2d')!;
    m.textAlign = 'center';
    m.textBaseline = 'middle';
    this.wordsEl.textContent = '';
    this.words = WORDS.map((word, i) => {
      const lines = mobile && word === 'SilvaDev' ? ['Silva', 'Dev'] : [word];
      let size = H * (mobile ? (lines.length > 1 ? 0.23 : 0.3) : 0.42);
      m.font = font(size);
      spacing(m, 0);
      const max = W * (mobile ? 0.9 : 0.86);
      const tw = Math.max(...lines.map((l) => m.measureText(l).width));
      if (tw > max) size *= max / tw;
      m.font = font(size);
      spacing(m, -size * 0.035);
      const ys = lines.map((_, j) => H / 2 + size * 0.04 + (j - (lines.length - 1) / 2) * size * 0.9);
      let x0 = Infinity;
      let x1 = -Infinity;
      let top = Infinity;
      let bottom = -Infinity;
      lines.forEach((l, j) => {
        const t = m.measureText(l);
        x0 = Math.min(x0, W / 2 - t.actualBoundingBoxLeft);
        x1 = Math.max(x1, W / 2 + t.actualBoundingBoxRight);
        top = Math.min(top, ys[j] - t.actualBoundingBoxAscent);
        bottom = Math.max(bottom, ys[j] + t.actualBoundingBoxDescent);
      });
      const px = size * 0.12;
      const ox = x0 - px;
      const oy = top - size * 0.14;
      const cw = x1 - x0 + px * 2;
      const ch = bottom - top + size * 0.42;
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(cw * dpr);
      canvas.height = Math.ceil(ch * dpr);
      canvas.style.cssText = `left:${ox.toFixed(1)}px;top:${oy.toFixed(1)}px;width:${cw.toFixed(1)}px;height:${ch.toFixed(1)}px`;
      const box = document.createElement('div');
      box.className = 'cg__word';
      box.style.cssText = `width:${W}px;height:${H}px`;
      box.append(canvas);
      this.wordsEl.append(box);
      const L: Word = { lines, size, ys, ox, oy, cw, ch, top, bottom, canvas, box };
      if (i === 0) this.focus = this.hole(L, m);
      return L;
    });
    this.ink = this.words.map((L) => [L.top, L.bottom]);
    this.memo.clear();
    this.paint();
  }

  /** O miolo do "D": pinta a letra sozinha, enche o lado de fora a partir da borda; o que sobra é o buraco. */
  private hole(L: Word, m: CanvasRenderingContext2D): [number, number] {
    const j = L.lines.length - 1;
    const l = L.lines[j];
    const left = this.w / 2 - m.measureText(l).width / 2 + m.measureText(l.slice(0, l.indexOf('D'))).width;
    const dw = m.measureText('D').width;
    const est: [number, number] = [left + dw * 0.5, L.ys[j]];
    try {
      const sc = Math.min(1, 160 / L.size);
      const pad = 4;
      const cw = Math.ceil(dw * sc + pad * 2);
      const ch = Math.ceil(L.size * sc * 1.3 + pad * 2);
      const c = document.createElement('canvas');
      c.width = cw;
      c.height = ch;
      const x = c.getContext('2d', { willReadFrequently: true })!;
      x.font = font(L.size * sc);
      x.textAlign = 'left';
      x.textBaseline = 'middle';
      x.fillText('D', pad, ch / 2);
      const a = x.getImageData(0, 0, cw, ch).data;
      const n = cw * ch;
      const out = new Uint8Array(n);
      const ink = (p: number) => a[p * 4 + 3] > 100;
      const st: number[] = [];
      for (let i = 0; i < cw; i++) st.push(i, (ch - 1) * cw + i);
      for (let i = 0; i < ch; i++) st.push(i * cw, i * cw + cw - 1);
      while (st.length) {
        const p = st.pop()!;
        if (out[p] || ink(p)) continue;
        out[p] = 1;
        const px = p % cw;
        if (px > 0) st.push(p - 1);
        if (px < cw - 1) st.push(p + 1);
        if (p >= cw) st.push(p - cw);
        if (p < n - cw) st.push(p + cw);
      }
      let sx = 0;
      let sy = 0;
      let k = 0;
      for (let p = 0; p < n; p++)
        if (!out[p] && !ink(p)) {
          sx += p % cw;
          sy += Math.floor(p / cw);
          k++;
        }
      if (k < 4) return est;
      return [left + (sx / k + 0.5 - pad) / sc, L.ys[j] + (sy / k + 0.5 - ch / 2) / sc];
    } catch {
      return est;
    }
  }

  /** Vidro em canvas 2D: sombra na parede, corpo tingido, borda de luz, brilho em cima e cáustica embaixo. */
  private paint() {
    const dark = this.state.dark > 0.5;
    this.painted = this.state.dark;
    const tmp = document.createElement('canvas');
    const tmp2 = document.createElement('canvas');
    // oito direções: deslocar a letra nelas e juntar (engrossa) ou cruzar (afina)
    const ring = (r: number) => [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [Math.cos((k * Math.PI) / 4) * r, Math.sin((k * Math.PI) / 4) * r]);
    for (const L of this.words) {
      const c = L.canvas;
      const dpr = c.width / L.cw;
      const s = L.size;
      tmp.width = tmp2.width = c.width;
      tmp.height = tmp2.height = c.height;
      const ctx = c.getContext('2d')!;
      const t = tmp.getContext('2d')!;
      const u = tmp2.getContext('2d')!;
      const setup = (x: CanvasRenderingContext2D) => {
        x.setTransform(dpr, 0, 0, dpr, -L.ox * dpr, -L.oy * dpr);
        x.globalCompositeOperation = 'source-over';
        x.globalAlpha = 1;
        x.font = font(s);
        spacing(x, -s * 0.035);
        x.textAlign = 'center';
        x.textBaseline = 'middle';
      };
      const text = (x: CanvasRenderingContext2D, dx = 0, dy = 0) => L.lines.forEach((l, j) => x.fillText(l, this.w / 2 + dx, L.ys[j] + dy));
      const fresh = () => {
        t.setTransform(1, 0, 0, 1, 0, 0);
        t.globalCompositeOperation = 'source-over';
        t.clearRect(0, 0, tmp.width, tmp.height);
        setup(t);
      };
      const stamp = (alpha: number) => {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = alpha;
        ctx.drawImage(tmp, 0, 0);
        ctx.restore();
      };
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      setup(ctx);

      // 1. sombra na parede, só do lado de fora da letra
      fresh();
      t.shadowColor = dark ? 'rgba(0,0,0,0.6)' : 'rgba(40,24,90,0.24)';
      t.shadowBlur = s * 0.08 * dpr;
      t.shadowOffsetY = s * 0.065 * dpr;
      t.fillStyle = '#000';
      text(t);
      t.shadowColor = 'transparent';
      t.globalCompositeOperation = 'destination-out';
      text(t);
      stamp(1);

      // 2. corpo: vidro tingido, mais claro em cima, violeta embaixo
      const g = ctx.createLinearGradient(0, L.top, 0, L.bottom);
      if (dark) {
        g.addColorStop(0, 'rgba(255,255,255,0.17)');
        g.addColorStop(0.5, 'rgba(176,156,255,0.07)');
        g.addColorStop(1, 'rgba(139,92,246,0.26)');
      } else {
        g.addColorStop(0, 'rgba(255,255,255,0.66)');
        g.addColorStop(0.55, 'rgba(238,233,255,0.42)');
        g.addColorStop(1, 'rgba(190,170,255,0.55)');
      }
      ctx.fillStyle = g;
      text(ctx);

      // 3. a espessura do vidro: uma borda de luz por dentro do contorno (a letra menos ela mesma afinada;
      //    sem strokeText, que desenharia os contornos sobrepostos de dentro da fonte)
      fresh();
      t.fillStyle = '#fff';
      text(t);
      u.setTransform(1, 0, 0, 1, 0, 0);
      u.globalCompositeOperation = 'source-over';
      u.clearRect(0, 0, tmp2.width, tmp2.height);
      setup(u);
      u.fillStyle = '#fff';
      text(u);
      u.globalCompositeOperation = 'destination-in';
      for (const [dx, dy] of ring(s * 0.032)) text(u, dx, dy);
      t.setTransform(1, 0, 0, 1, 0, 0);
      t.globalCompositeOperation = 'destination-out';
      t.drawImage(tmp2, 0, 0);
      t.globalCompositeOperation = 'source-in';
      t.fillStyle = dark ? 'rgba(220,210,255,0.3)' : 'rgba(255,255,255,0.9)';
      t.fillRect(0, 0, tmp.width, tmp.height);
      stamp(1);

      // 4. brilho de cima (a luz vem do alto): a letra menos ela mesma um pouco abaixo
      fresh();
      t.fillStyle = '#fff';
      text(t);
      t.globalCompositeOperation = 'destination-out';
      text(t, s * 0.012, s * 0.024);
      stamp(dark ? 0.8 : 0.95);

      // 5. cáustica embaixo: a luz que atravessa o vidro sai colorida na borda de baixo
      fresh();
      t.fillStyle = dark ? 'rgb(110,220,255)' : 'rgb(139,92,246)';
      text(t);
      t.globalCompositeOperation = 'destination-out';
      text(t, -s * 0.01, -s * 0.022);
      stamp(dark ? 0.55 : 0.4);

      // 6. reflexo: uma faixa clara atravessa as letras na diagonal
      fresh();
      t.fillStyle = '#fff';
      text(t);
      t.globalCompositeOperation = 'source-in';
      const hh = L.bottom - L.top;
      const x0 = L.ox + L.cw * 0.18;
      const gg = t.createLinearGradient(x0, L.top, x0 + hh * 0.9, L.bottom);
      gg.addColorStop(0, 'rgba(255,255,255,0)');
      gg.addColorStop(0.42, `rgba(255,255,255,${dark ? 0.2 : 0.5})`);
      gg.addColorStop(0.56, 'rgba(255,255,255,0)');
      t.fillStyle = gg;
      t.fillRect(L.ox, L.oy, L.cw, L.ch);
      stamp(1);

      // 7. contorno fino por fora: a letra não some quando a parede é da mesma cor
      fresh();
      t.fillStyle = '#fff';
      for (const [dx, dy] of ring(Math.max(1, s * 0.004))) text(t, dx, dy);
      t.globalCompositeOperation = 'destination-out';
      text(t);
      t.globalCompositeOperation = 'source-in';
      t.setTransform(1, 0, 0, 1, 0, 0);
      t.fillStyle = dark ? 'rgba(235,228,255,0.3)' : 'rgba(80,60,150,0.28)';
      t.fillRect(0, 0, tmp.width, tmp.height);
      stamp(1);
    }
  }

  render() {
    const s = this.state;
    const W = this.w;
    const H = this.h;
    if (this.words.length && this.painted !== s.dark) this.paint();
    this.paintWall();

    // a câmera: o mesmo centro de zoom do WebGL (foco no buraco do D, ou o centro da caixa)
    const zx = this.focus[0] + (W / 2 - this.focus[0]) * s.cen + s.offX;
    const zy = this.focus[1] + (H / 2 - this.focus[1]) * s.cen + s.offY;
    const wl = Math.max(0.05, s.wall);
    this.tf(this.wall, zx * (1 - wl), zy * (1 - wl), wl);

    // a luz: um brilho em volta do cursor (e, antes de acender, a parede fica apagada)
    const sc = (H * 1.05) / SPOT;
    this.tf(this.spot, this.light[0] - (SPOT * sc) / 2, this.light[1] - (SPOT * sc) / 2, sc);
    this.op(this.spot, s.lightOn);
    this.op(this.dim, 1 - s.lightOn);

    // a palavra de vidro: some no fim do mergulho e quando vira gota
    const dm = Math.min(1, Math.max(0, s.dropMix));
    const z = Math.max(0.05, s.zoom) * (1 - 0.07 * dm);
    const on = s.wordOn * (1 - dm) * (1 - Math.min(1, Math.max(0, (s.zoom - 9) / 18)));
    this.words.forEach((L, i) => {
      if (i !== Math.round(s.a) || on < 0.004) return this.op(L.box, 0);
      // a mesma conta do shader: ponto da caixa b vai para Z + (b + deslocamento − Z) × zoom
      this.tf(L.box, zx * (1 - z) + s.offX * z, zy * (1 - z) + s.offY * z, z);
      this.op(L.box, on);
    });

    // gotas
    for (let i = 0; i < 5; i++) {
      const el = this.dropEls[i];
      const r = this.drops[i * 3 + 2];
      if (r < 0.5 || dm < 0.004) {
        this.op(el, 0);
        continue;
      }
      this.tf(el, this.drops[i * 3] - r, this.drops[i * 3 + 1] - r, (r * 2) / DROP);
      this.op(el, dm);
    }

    // as lâminas (folhas, pílulas, cartões, prints e o topo), na ordem em que o roteiro as empilha
    let p = 0;
    let waveOn = false;
    for (let i = 0; i < this.rectN; i++) {
      const o = i * 4;
      const x = this.rects[o];
      const y = this.rects[o + 1];
      const w = this.rects[o + 2];
      const h = this.rects[o + 3];
      const rad = this.rectP[o];
      const ap = Math.min(1, this.rectP[o + 1]);
      const type = this.rectP[o + 3];
      if (w > W + 100) {
        // a onda que cobre a tela: a crista balança, o corpo sobe com a rolagem
        waveOn = true;
        this.tf(this.wave, 0, y - 35);
        this.put(this.wave, 'zIndex', String(i));
        this.op(this.wave, ap);
        continue;
      }
      const el = this.plates[p];
      const kind = type >= 2 ? 'is-img' : type === 1 ? 'is-pill' : 'is-sheet';
      if (this.kinds[p] !== kind) {
        this.kinds[p] = kind;
        el.className = `cg__plate ${kind}`;
      }
      this.put(el, 'backgroundImage', type >= 2 && this.srcs[type - 2] ? `url("${this.srcs[type - 2]}")` : '');
      this.tf(el, x, y);
      this.put(el, 'width', `${w.toFixed(1)}px`);
      this.put(el, 'height', `${h.toFixed(1)}px`);
      this.put(el, 'borderRadius', `${rad.toFixed(1)}px`);
      this.put(el, 'zIndex', String(i));
      if (type >= 2) {
        // o print escorre de cima para baixo
        this.put(el, 'clipPath', ap > 0.999 ? '' : `inset(0 0 ${((1 - ap) * 100).toFixed(2)}% 0 round ${rad.toFixed(1)}px)`);
        this.op(el, ap > 0.002 ? 1 : 0);
      } else {
        this.put(el, 'clipPath', '');
        this.op(el, ap);
      }
      if (++p >= PLATES) break;
    }
    for (; p < PLATES; p++) this.op(this.plates[p], 0);
    if (!waveOn) this.op(this.wave, 0);
  }
}
