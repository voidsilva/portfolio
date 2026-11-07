import './styles/site.css';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, root, isLite } from './lib/motion';
import { renderPanel } from './render';
import { curtain } from './fx/curtain';
import { Glass } from './fx/glass/engine';
import { projects } from './data/content';

root.classList.add('js');
const lite = isLite();
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
/** quanto do trecho [a, b] do roteiro já passou (0..1) */
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const wait = (s: number) => new Promise<void>((r) => gsap.delayedCall(s, () => r()));
const ease = (n: string) => gsap.parseEase(n) as (x: number) => number;
const IO2 = ease('power2.inOut');
const IO3 = ease('power3.inOut');
const I2 = ease('power2.in');
const I3 = ease('power3.in');
const O2 = ease('power2.out');
const O3 = ease('power3.out');
const BACK = ease('back.out(1.7)');
const SINE = ease('sine.inOut');

const POSTER = ['SISTEMAS SOB MEDIDA', 'ERP · PAINÉIS · INTEGRAÇÕES', 'DO BANCO DE DADOS À TELA', 'SILVADEV · PAULO SILVA'];

/* ---------- vidro: com WebGL a página vira um roteiro (cada rolagem move a cena de um jeito) ---------- */
let glass: Glass | null = null;
if (!lite && Glass.supported()) {
  try {
    glass = new Glass($<HTMLCanvasElement>('.liquid'), fine ? 6 : 4, projects.length);
    root.classList.add('gl', 'roteiro');
    glass.state.dark = root.dataset.theme === 'dark' ? 1 : 0;
  } catch (err) {
    console.warn('[vidro]', err);
    glass = null;
    root.classList.remove('gl', 'roteiro');
  }
}
if (!glass) root.classList.remove('is-loading');

/* ---------- rolagem suave (Lenis) ---------- */
// folhas com rolagem própria (perguntas abertas, cartões no celular) rolam primeiro; no fim delas, a página continua
const SCROLLERS = '.sheet--faq, .proj__card';
function innerScroll({ deltaY, event }: { deltaY: number; event: WheelEvent | TouchEvent }) {
  if (!event.type.includes('wheel')) return true;
  const el = (event.target as Element | null)?.closest?.<HTMLElement>(SCROLLERS);
  if (!el) return true;
  const max = el.scrollHeight - el.clientHeight;
  if (max < 2 || !/auto|scroll/.test(getComputedStyle(el).overflowY)) return true;
  // no roteiro a folha só rola por dentro depois de parar na tela, nunca no meio de uma transição
  if (glass && !settled(el)) return true;
  return !((deltaY > 0 && el.scrollTop < max - 1) || (deltaY < 0 && el.scrollTop > 1));
}
function settled(el: HTMLElement) {
  if (el.matches('.sheet--faq')) return tCur >= K.I0 + 1.05 && tCur <= K.F0;
  const r = el.getBoundingClientRect();
  return r.left > -2 && r.right < innerWidth + 2;
}
let lenis: Lenis | null = null;
if (!lite) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, virtualScroll: innerScroll });
  if (!glass) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
  } else lenis.stop();
  gsap.ticker.lagSmoothing(0);
}

/* ---------- peças de vidro (o WebGL desenha cada uma no lugar do elemento, medido a cada quadro) ---------- */
type Item = {
  el: HTMLElement | null;
  /** 0 folha, 1 pílula/cartão, 2+ print (camada da textura) */
  type: number;
  img: boolean;
  card: boolean;
  appear: number;
  hover: number;
  /** onda da borda (folhas): > 0 só as bordas, < 0 a folha inteira ondula como fita */
  amp: number;
  /** abrir de uma linha: largura × sx, altura de 26px até a cheia com sy */
  sx: number;
  sy: number;
  /** virar bolha: 0 = o retângulo do elemento, 1 = círculo de raio cr no centro da tela */
  morph: number;
  cr: number;
  r: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rad: number;
  on: boolean;
};
const mk = (el: HTMLElement | null, type: number): Item => ({
  el,
  type,
  img: type >= 2,
  card: false,
  appear: 0,
  hover: 0,
  amp: 0,
  sx: 1,
  sy: 1,
  morph: 0,
  cr: 0,
  r: 0,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  rad: 0,
  on: false,
});
const items: Item[] = [];
const byEl = new Map<Element, Item>();
let wipe = mk(null, 0);
let head = mk(null, 1);
if (glass) {
  // ordem de desenho: folhas, pílulas, cartões, prints, a onda que cobre tudo e, por cima, o topo
  for (const [kind, type] of [['sheet', 0], ['pill', 1], ['card', 1], ['img', 2]] as const)
    $$(`[data-glass="${kind}"]`).forEach((el) => {
      const it = mk(el, type === 2 ? 2 + Number(el.dataset.img) : type);
      it.card = kind === 'card';
      items.push(it);
      byEl.set(el, it);
    });
  wipe = mk(null, 0);
  items.push(wipe);
  head = mk($<HTMLElement>('[data-glass="head"]'), 1);
  items.push(head);
}
const item = (sel: string) => byEl.get($(sel))!;

function place(it: Item, W: number, H: number) {
  if (it.el) {
    const b = it.el.getBoundingClientRect();
    let x = b.left;
    let y = b.top;
    let w = b.width;
    let h = b.height;
    let rad = Math.min(it.r, w / 2, h / 2);
    if (it.sx !== 1 || it.sy !== 1) {
      const cx = x + w / 2;
      const cy = y + h / 2;
      w *= it.sx;
      h = mix(26, h, it.sy);
      x = cx - w / 2;
      y = cy - h / 2;
      rad = Math.min(it.r, w / 2, h / 2);
    }
    if (it.morph > 0) {
      const k = clamp(it.morph);
      x = mix(x, W / 2 - it.cr, k);
      y = mix(y, H / 2 - it.cr, k);
      w = mix(w, it.cr * 2, k);
      h = mix(h, it.cr * 2, k);
      rad = mix(rad, it.cr, k);
    }
    it.x = x;
    it.y = y;
    it.w = w;
    it.h = h;
    it.rad = rad;
  } else it.rad = 0;
  it.on = it.w >= 1 && it.h >= 1 && it.y < H + 60 && it.y + it.h > -60 && it.x < W + 60 && it.x + it.w > -60;
}

/* ---------- a luz é o cursor ---------- */
const light = { x: innerWidth * 0.5, y: innerHeight * 0.3, tx: innerWidth * 0.5, ty: innerHeight * 0.3, z: innerHeight * 1.4, last: -1e9, down: false };
const ptr = { x: -1, y: -1, on: false };
let lastInput = 0;
let busyUntil = 0;
const poke = () => (lastInput = performance.now());
const busy = (ms: number) => (busyUntil = Math.max(busyUntil, performance.now() + ms));

function moveLight(g: Glass, dt: number) {
  const W = innerWidth;
  const H = innerHeight;
  const now = performance.now();
  const idle = now - light.last > 4000;
  if (idle) {
    // ninguém mexendo: a luz passeia sozinha
    const t = now / 1000;
    light.tx = W * (0.5 + 0.3 * Math.sin(t * 0.27));
    light.ty = H * (0.34 + 0.16 * Math.sin(t * 0.41 + 1.3));
  }
  const k = 1 - Math.exp(-dt * (idle ? 1.4 : 9));
  light.x += (light.tx - light.x) * k;
  light.y += (light.ty - light.y) * k;
  // apertar o botão aproxima a lâmpada: sombras maiores e cáustica mais forte
  light.z += (H * (light.down ? 0.45 : 0.72) - light.z) * (1 - Math.exp(-dt * 4));
  g.light[0] = light.x;
  g.light[1] = light.y;
  g.light[2] = light.z;
}

/* ---------- lupa de vidro sobre os prints, brilho nos cartões ---------- */
const lens = { x: 0, y: 0, a: 0, it: null as Item | null };
const under = (it: Item) => it.on && ptr.x >= it.x && ptr.x <= it.x + it.w && ptr.y >= it.y && ptr.y <= it.y + it.h;
function lensUpdate(g: Glass, dt: number) {
  const live = fine && ptr.on;
  let hit: Item | null = null;
  if (live && g.imgsReady) for (const it of items) if (it.img && it.appear > 0.6 && under(it)) hit = it;
  const kh = 1 - Math.exp(-dt * 7);
  for (const it of items) {
    if (it.img) it.hover += ((it === hit ? 1 : 0) - it.hover) * kh;
    else if (it.card) it.hover += ((live && it.appear > 0.5 && under(it) ? 1 : 0) - it.hover) * kh;
  }
  if (hit && lens.it !== hit) {
    lens.it = hit;
    lens.x = ptr.x;
    lens.y = ptr.y;
  }
  const kp = 1 - Math.exp(-dt * 16);
  lens.x += (ptr.x - lens.x) * kp;
  lens.y += (ptr.y - lens.y) * kp;
  lens.a += ((hit ? 1 : 0) - lens.a) * (1 - Math.exp(-dt * 8));
  if (!hit && lens.a < 0.01) lens.it = null;
}

function pushRects(g: Glass) {
  let n = 0;
  g.lensI = -1;
  for (const it of items) {
    if (n >= 16 || !it.on || it.appear < 0.002 || (it.img && !g.imgsReady)) continue;
    const o = n * 4;
    g.rects[o] = it.x;
    g.rects[o + 1] = it.y;
    g.rects[o + 2] = it.w;
    g.rects[o + 3] = it.h;
    g.rectP[o] = it.rad;
    g.rectP[o + 1] = it.appear;
    g.rectP[o + 2] = it.type === 0 ? it.amp : it.hover;
    g.rectP[o + 3] = it.type;
    if (it === lens.it && lens.a > 0.01) {
      g.lensI = n;
      g.lens[0] = lens.x;
      g.lens[1] = lens.y;
      g.lens[2] = Math.min(140, it.w * 0.17);
      g.lens[3] = lens.a;
    }
    n++;
  }
  g.rectN = n;
}

/* ---------- escrita no DOM: só transform, opacidade, visibilidade e recorte, e só quando muda ---------- */
const memo = new Map<HTMLElement, Record<string, string>>();
function put(el: HTMLElement, prop: 'transform' | 'opacity' | 'visibility' | 'clipPath', v: string) {
  let c = memo.get(el);
  if (!c) memo.set(el, (c = {}));
  if (c[prop] === v) return;
  c[prop] = v;
  el.style[prop] = v;
}
const tr = (el: HTMLElement, x = 0, y = 0, s = 1) =>
  put(el, 'transform', Math.abs(x) < 0.05 && Math.abs(y) < 0.05 && Math.abs(s - 1) < 1e-4 ? '' : `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`);
const op = (el: HTMLElement, o: number) => {
  put(el, 'opacity', o > 0.999 ? '' : o.toFixed(3));
  put(el, 'visibility', o < 0.004 ? 'hidden' : '');
};
const show = (el: HTMLElement, on: boolean) => put(el, 'visibility', on ? 'visible' : 'hidden');

/*
 * ---------- o roteiro ----------
 * A página fica presa na tela; a rolagem só move o ponteiro t (1 unidade ≈ 0,72 tela de rolagem).
 * Cada cena é uma função pura de t: rolar para cima desfaz tudo, e pular pelo menu cai no quadro certo.
 *   início     a câmera mergulha no buraco do "D" de vidro
 *   sobre      uma fita de vidro líquido se abre na folha
 *   projetos   a câmera anda de lado: um projeto por vez, os prints escorrem para dentro
 *   serviços   uma onda de vidro sobe a tela inteira; os cartões são distribuídos como cartas
 *   perguntas  os cartões implodem no centro e uma bolha de vidro se estica na folha
 *   contato    a folha volta a ser bolha, vira gota e a gota derrete na palavra
 */
const keys = (over: number, more: number) => {
  // D mergulho · A folha se abre · S deslize · P trilho (passo, movimento) · L lista · W onda · C cartas · I implosão · F gota
  const k = { D0: 0.15, D1: 1.35, A0: 1.15, A1: 1.85, S0: 2.75, S1: 3.6, P0: 3.95, PS: 1.1, PM: 0.6, W0: 8.35, W1: 9.65, C0: 10.1, CS: 0.1, CD: 0.6 };
  // quando "outros trabalhos" não cabe na tela, a lista desce por dentro da folha antes da onda (1:1 com a rolagem)
  const L0 = k.P0 + 3 * k.PS + k.PM + 0.25;
  const sh = more > 0 ? more + 0.1 : 0;
  k.W0 += sh;
  k.W1 += sh;
  k.C0 += sh;
  const SW = (k.W0 + k.W1) / 2;
  const O0 = k.C0 + 7 * k.CS + k.CD;
  const I0 = O0 + 0.55 + over;
  const F0 = I0 + 2.3;
  return { ...k, L0, LM: more, SW, O0, I0, F0, END: F0 + 2.75 };
};
let K = keys(0, 0);
let U = 700;
let baseH = innerHeight;
let sceneOn = false;
let dirty = true;
let tCur = -1;
let tPrev = 0;
let run: HTMLElement | null = null;
let homes: DOMRect[] = [];
let svcOver = 0;
let moreOver = 0;
let ctaTop = 0;
let headB = 0;

const S = glass
  ? {
      hero: $('.sc--hero'),
      about: $('.sc--about'),
      work: $('.sc--work'),
      svc: $('.sc--svc'),
      faq: $('.sc--faq'),
      cta: $('.sc--cta'),
      who: $('.hero__who'),
      foot: $('.hero__foot'),
      hint: $('.hero__hint'),
      aboutSheet: $('.sheet--about'),
      aboutParts: $$('.sheet--about > .kicker, .sheet--about > .h2, .sheet--about .step'),
      track: $('.track'),
      metas: $$('.track .case__meta'),
      moreCard: $<HTMLElement>('.proj__card--more'),
      more: $$('.proj__card--more > *'),
      capWork: $('.sc--work .stage__sub'),
      capSvc: $('.sc--svc .stage__sub'),
      grid: $('.svc'),
      cards: $$('.svc__item'),
      faqParts: $$('.sheet--faq > .h3, .faq__item'),
      ctaParts: $$('.sheet--cta > *'),
    }
  : null;
const G = glass
  ? {
      about: item('.sheet--about'),
      faq: item('.sheet--faq'),
      cta: item('.sheet--cta'),
      capWork: item('.sc--work .stage__sub'),
      capSvc: item('.sc--svc .stage__sub'),
      projCards: $$('.track .proj__card').map((el) => byEl.get(el)!),
      projImgs: $$('.track [data-glass="img"]').map((el) => byEl.get(el)!),
      cards: $$('.svc__item').map((el) => byEl.get(el)!),
    }
  : null;

/** Mede o que não muda com a rolagem: raios das bordas e a posição de casa de cada cartão. */
function measure() {
  if (!S) return;
  for (const it of items) if (it.el) it.r = parseFloat(getComputedStyle(it.el).borderTopLeftRadius) || 0;
  const els = [S.grid, ...S.cards];
  const keep = els.map((el) => el.style.transform);
  els.forEach((el) => (el.style.transform = 'none'));
  homes = S.cards.map((el) => el.getBoundingClientRect());
  const bottom = Math.max(...homes.map((b) => b.bottom));
  svcOver = Math.max(0, bottom - (innerHeight - 14));
  els.forEach((el, i) => (el.style.transform = keep[i]));
  // quanto a lista de outros trabalhos passa da altura da folha
  const mc = S.moreCard;
  const keepM = S.more.map((el) => el.style.transform);
  S.more.forEach((el) => (el.style.transform = 'none'));
  const last = S.more[S.more.length - 1];
  moreOver = Math.max(0, Math.ceil(last.offsetTop + last.offsetHeight + parseFloat(getComputedStyle(mc).paddingBottom) - mc.clientHeight));
  S.more.forEach((el, i) => (el.style.transform = keepM[i]));
  mc.classList.toggle('is-over', moreOver > 2);
  // o vão entre o topo e a folha de contato, onde a palavra Contato pousa
  headB = head.el?.getBoundingClientRect().bottom ?? 70;
  ctaTop = G!.cta.el?.getBoundingClientRect().top ?? 0;
}

/** Onde a palavra Contato pousa: centrada no vão entre o topo e a folha, do tamanho que couber nele. */
function ctaFrame(g: Glass, H: number, mob: boolean): [number, number] {
  const base = mob ? 0.86 : 0.55;
  const ink = g.ink[3];
  const gap = ctaTop - headB;
  if (!ink || gap < 30) return [base, -H * (mob ? 0.29 : 0.27)];
  const z = clamp((gap * 0.78) / (ink[1] - ink[0]), 0.18, base);
  const yc = (ink[0] + ink[1]) / 2;
  return [z, (headB + ctaTop) / 2 - H / 2 - (yc - H / 2) * z];
}

/** Altura da pista de rolagem; mantém o ponto do roteiro quando a tela muda de tamanho. */
function layout() {
  if (!glass || !lenis) return;
  const t = tCur;
  U = Math.round(clamp(baseH, 520, 1300) * 0.72);
  K = keys(svcOver > 4 ? 0.5 : 0, moreOver > 2 ? moreOver / U : 0);
  if (!run) {
    run = document.createElement('div');
    run.className = 'sc-run';
    run.setAttribute('aria-hidden', 'true');
    $('main').after(run);
  }
  run.style.height = `${Math.ceil(K.END * U + innerHeight * 1.15)}px`;
  lenis.resize();
  if (t > 0) lenis.scrollTo(t * U, { immediate: true, force: true });
  dirty = true;
}

function scene(g: Glass, t: number) {
  const s = g.state;
  const W = g.w;
  const H = g.h;
  const k = K;
  const D = S!;
  const P = G!;
  const jump = Math.abs(t - tPrev) > 1.2;
  const crossed = (at: number) => !jump && tPrev < at && t >= at;
  const Dc = Math.min(W, H) * 0.34;

  /* 1. início: o texto sai e a câmera mergulha no buraco do D */
  const eh = IO2(seg(t, 0.04, 0.42));
  show(D.hero, t < 0.5);
  tr(D.who, 0, -70 * eh);
  op(D.who, 1 - eh);
  tr(D.foot, 0, 90 * eh);
  op(D.foot, 1 - eh);
  op(D.hint, 1 - seg(t, 0, 0.18));

  /* 2. como eu trabalho: uma fita de vidro aparece no centro e se abre na folha */
  const sl = IO3(seg(t, k.S0, k.S1));
  const aboutOn = t >= k.A0 && t < k.S1 + 0.02;
  show(D.about, aboutOn);
  const ab = P.about;
  ab.appear = aboutOn ? 1 : 0;
  ab.sx = O3(seg(t, k.A0, k.A0 + 0.34));
  ab.sy = IO3(seg(t, k.A0 + 0.24, k.A1));
  ab.amp = -0.85 * (1 - seg(t, k.A0 + 0.3, k.A1 - 0.05));
  if (crossed(k.A0 + 0.05)) g.ripple(W / 2, H / 2, 0.5);
  D.aboutParts.forEach((el, i) => {
    const e = O3(seg(t, k.A1 - 0.12 + i * 0.06, k.A1 + 0.3 + i * 0.06));
    tr(el, 0, 46 * (1 - e));
    op(el, e);
  });
  tr(D.aboutSheet, -W * 1.04 * sl);

  /* 3. projetos: a câmera anda de lado; cada projeto para no centro e o print escorre para dentro */
  let kt = 0;
  for (let i = 0; i < 4; i++) kt += IO3(seg(t, k.P0 + i * k.PS, k.P0 + i * k.PS + k.PM));
  const camX = W * (sl + kt);
  const trackX = W - camX;
  const workOn = t >= k.S0 && t < k.SW;
  show(D.work, workOn);
  tr(D.track, trackX);
  P.capWork.appear = workOn ? O2(seg(t, k.S1 - 0.42, k.S1 + 0.02)) : 0;
  op(D.capWork, seg(t, k.S1 - 0.25, k.S1 + 0.05));
  for (const it of P.projCards) it.appear = workOn ? 1 : 0;
  P.projImgs.forEach((it, i) => (it.appear = workOn ? IO2(seg(kt, i + 0.45, i + 0.95)) : 0));
  D.metas.forEach((el, i) => {
    const e = O3(seg(kt, i + 0.4, i + 0.95));
    tr(el, 110 * (1 - e));
    op(el, e);
  });
  const lo = k.LM > 0 ? moreOver * SINE(seg(t, k.L0, k.L0 + k.LM)) : 0;
  D.more.forEach((el, i) => {
    const e = O3(seg(kt, 3.4 + i * 0.05, 3.95 + i * 0.05));
    tr(el, 80 * (1 - e), -lo);
    op(el, e);
  });

  /* 4. a onda: uma lâmina de vidro sobe a tela inteira e, por baixo dela, a cena troca */
  const ew = SINE(seg(t, k.W0, k.W1));
  const wy = H + 120 - (2.5 * H + 240) * ew;
  wipe.appear = t > k.W0 && t < k.W1 ? 1 : 0;
  wipe.amp = 1;
  wipe.x = -80;
  wipe.w = W + 160;
  wipe.y = wy;
  wipe.h = 1.5 * H;
  put(D.work, 'clipPath', workOn && t > k.W0 ? `inset(0 0 ${Math.max(0, H - wy + 30).toFixed(1)}px 0)` : '');
  const svcOn = t >= k.SW && t < k.I0 + 0.65;
  show(D.svc, svcOn);
  put(D.svc, 'clipPath', svcOn && t < k.W1 ? `inset(${clamp(wy + 1.5 * H + 30, 0, H).toFixed(1)}px 0 0 0)` : '');

  /* 5. serviços: a palavra sobe com a onda, os cartões saem de um monte embaixo e voam para o lugar */
  // a pílula enche logo depois que a onda passa por ela e escorre quando os cartões chegam
  P.capSvc.appear = svcOn ? O2(seg(t, k.SW + 0.12, k.SW + 0.5)) * (1 - seg(t, k.C0, k.C0 + 0.3)) : 0;
  op(D.capSvc, seg(t, k.SW + 0.25, k.SW + 0.5) * (1 - seg(t, k.C0, k.C0 + 0.2)));
  const ov = IO2(seg(t, k.O0, k.O0 + 0.45)) * svcOver;
  tr(D.grid, 0, -ov);
  P.cards.forEach((it, j) => {
    const hm = homes[j];
    if (!hm) return;
    const t0 = k.C0 + j * k.CS;
    const ed = O3(seg(t, t0, t0 + k.CD));
    const ti = k.I0 + j * 0.025;
    const ei = I3(seg(t, ti, ti + 0.45));
    const hx = hm.left + hm.width / 2;
    const hy = hm.top + hm.height / 2 - ov;
    const x = (W / 2 - hx) * (1 - ed) + (W / 2 - hx) * ei;
    const y = (H + hm.height * 0.7 - hy) * (1 - ed) + (H / 2 - hy) * ei;
    tr(D.cards[j], x, y, mix(0.72, 1, ed) * (1 - 0.8 * ei));
    op(D.cards[j], 1 - seg(ei, 0.35, 0.85));
    it.appear = svcOn && t >= t0 ? 1 - seg(ei, 0.55, 1) : 0;
    if (crossed(t0 + k.CD * 0.45)) g.ripple(hx, hy, 0.14);
  });

  /* 6. perguntas: no centro nasce uma bolha de vidro que se estica até virar a folha */
  const fq = P.faq;
  const faqOn = t >= k.I0 + 0.3 && t < k.F0 + 0.85;
  show(D.faq, faqOn);
  const grow = BACK(seg(t, k.I0 + 0.35, k.I0 + 0.72));
  const open = IO3(seg(t, k.I0 + 0.72, k.I0 + 1.22));
  const close = IO3(seg(t, k.F0 + 0.15, k.F0 + 0.55));
  const shrink = I2(seg(t, k.F0 + 0.55, k.F0 + 0.8));
  fq.appear = faqOn && t >= k.I0 + 0.35 ? 1 : 0;
  fq.cr = (Dc / 2) * grow * (1 - shrink);
  fq.morph = clamp(1 - open + close);
  fq.amp = 0.8 * (Math.sin(Math.PI * open) + Math.sin(Math.PI * close));
  if (crossed(k.I0 + 0.4)) g.ripple(W / 2, H / 2, 0.6);
  D.faqParts.forEach((el, i) => {
    const e = O3(seg(t, k.I0 + 1.05 + i * 0.05, k.I0 + 1.42 + i * 0.05)) * (1 - seg(t, k.F0, k.F0 + 0.22));
    tr(el, 0, 30 * (1 - e));
    op(el, e);
  });

  /* 7. contato: a bolha encolhe, cai na parede como gota, a gota derrete na palavra e a folha enche */
  const dropIn = BACK(seg(t, k.F0 + 0.6, k.F0 + 0.95));
  const melt = IO3(seg(t, k.F0 + 1.0, k.F0 + 1.7));
  const lift = IO3(seg(t, k.F0 + 1.75, k.F0 + 2.4));
  if (crossed(k.F0 + 0.64)) g.ripple(W / 2, H / 2, 0.9);
  const ctaOn = t >= k.F0 + 1.8;
  show(D.cta, ctaOn);
  P.cta.appear = ctaOn ? IO2(seg(t, k.F0 + 1.85, k.F0 + 2.45)) : 0;
  D.ctaParts.forEach((el, i) => {
    const e = O3(seg(t, k.F0 + 2.15 + i * 0.07, k.F0 + 2.55 + i * 0.07));
    tr(el, 0, 40 * (1 - e));
    op(el, e);
  });

  /* a palavra de vidro, a câmera e a parede */
  const fp = g.focusPoint();
  const mob = W < 700;
  let a = 0;
  let on = 1;
  let ox = 0;
  let oy = 0;
  let zoom = 1;
  let cen = 0;
  let wall = 1;
  let drop = 0;
  if (t < k.D1) {
    // o zoom cresce em ritmo constante para o olho (exponencial) e acelera no fim: atravessa o buraco
    const e = seg(t, k.D0, k.D1);
    zoom = Math.pow(36, I2(e));
    const c = IO2(seg(t, k.D0, k.D0 + 0.8));
    ox = (W / 2 - fp[0]) * c;
    oy = (H / 2 - fp[1]) * c;
    wall = 1 + 0.3 * IO2(e);
  } else if (t < k.S0) {
    on = 0;
    ox = W / 2 - fp[0];
    oy = H / 2 - fp[1];
    wall = 1.3 - 0.3 * IO2(seg(t, k.A0, k.A1 + 0.3));
  } else if (t < k.SW) {
    a = 1;
    ox = trackX;
    on = trackX > -W * 1.02 ? 1 : 0;
  } else if (t < k.I0 + 0.55) {
    a = 2;
    oy = H * 0.6 * (1 - O3(seg(t, k.SW, k.W1 + 0.2)));
    on = 1 - IO2(seg(t, k.I0, k.I0 + 0.5));
  } else if (t < k.F0 + 0.55) {
    a = 2;
    on = 0;
  } else {
    a = 3;
    drop = 1 - melt;
    cen = 1;
    const [zT, yT] = ctaFrame(g, H, mob);
    zoom = mix(1, zT, lift);
    oy = yT * lift;
  }
  s.a = s.b = a;
  s.morph = 0;
  s.wordOn = on;
  s.offX = ox;
  s.offY = oy;
  s.zoom = zoom;
  s.cen = cen;
  s.wall = wall;
  s.dropMix = drop;
  s.dropR = clamp(Math.min(W, H) * 0.075, 26, 72);
  g.drops.fill(0);
  if (drop > 0.001) {
    g.drops[0] = W / 2;
    g.drops[1] = H / 2;
    g.drops[2] = (Dc / 2) * 1.05 * dropIn;
  }
  s.panX = camX * 0.12;
  s.scroll = H * 2.2 * ew;
  tPrev = t;
}

/* ---------- menu: marca a cena atual; cada link leva ao ponto do roteiro ---------- */
const navLinks = $$('.nav a');
let navCur = '';
function navMark(t: number) {
  const id = t >= K.S0 && t < K.SW ? 'projetos' : t >= K.SW && t < K.I0 + 0.5 ? 'servicos' : t >= K.F0 + 1 ? 'contato' : '';
  if (id === navCur) return;
  navCur = id;
  navLinks.forEach((a) => a.classList.toggle('is-on', a.dataset.go === id));
}
const LABEL: Record<string, () => number> = { inicio: () => 0, projetos: () => K.S1 + 0.12, servicos: () => K.O0 + 0.05, contato: () => K.END };
function goTo(id: string, immediate = false) {
  if (glass && lenis) {
    const at = LABEL[id];
    if (at) lenis.scrollTo(at() * U, { immediate, force: true });
    return;
  }
  if (id === 'inicio') return lenis ? lenis.scrollTo(0, { immediate, force: true }) : scrollTo({ top: 0 });
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { immediate, force: true });
  else el.scrollIntoView();
}

/** Uma folha cobre a tela inteira: a cena só aparece fosca, então pode ser desenhada menos vezes. */
const covered = (g: Glass) => items.some((it) => it.type === 0 && it.on && it.appear > 0.99 && it.x <= 0 && it.y <= 0 && it.x + it.w >= g.w && it.y + it.h >= g.h);

let adaptOn = false;
if (glass) {
  const g = glass;
  g.onLost = () => {
    // sem o vidro: volta para a página comum, com tudo visível
    sceneOn = false;
    root.classList.remove('gl', 'gl-img', 'roteiro');
    memo.forEach((_, el) => el.removeAttribute('style'));
    memo.clear();
    run?.remove();
    lenis?.resize();
    scrollTo(0, 0);
  };
  let rx = -1;
  let ry = -1;
  let rt = 0;
  addEventListener(
    'pointermove',
    (e) => {
      const now = poke();
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.on = true;
      if (e.pointerType === 'mouse' || light.down) {
        light.tx = e.clientX;
        light.ty = e.clientY;
        light.last = now;
      }
      const d = Math.hypot(e.clientX - rx, e.clientY - ry);
      if (rx < 0 || (d > 40 && now - rt > 70)) {
        if (rx >= 0) g.ripple(e.clientX, e.clientY, Math.min(0.22, Math.max(0.05, (d / (now - rt)) * 0.07)));
        rx = e.clientX;
        ry = e.clientY;
        rt = now;
      }
    },
    { passive: true },
  );
  addEventListener(
    'pointerdown',
    (e) => {
      light.down = true;
      light.tx = e.clientX;
      light.ty = e.clientY;
      light.last = poke();
      g.ripple(e.clientX, e.clientY, 0.8);
    },
    { passive: true },
  );
  const up = () => (light.down = false);
  addEventListener('pointerup', up, { passive: true });
  addEventListener('pointercancel', up, { passive: true });
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) ptr.on = false;
  });
  addEventListener('scroll', poke, { passive: true });
  addEventListener('wheel', poke, { passive: true });
  addEventListener('keydown', poke);

  let last = performance.now();
  let lastR = 0;
  let vel = 0;
  let prev = false;
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    vel += (clamp((lenis ? lenis.velocity : 0) / 60, -1, 1) - vel) * (1 - Math.exp(-dt * 5));
    g.state.vel = vel * 1.5;
    if (sceneOn) {
      const t = clamp((lenis ? lenis.animatedScroll : scrollY) / U, 0, K.END);
      if (t !== tCur || dirty) {
        scene(g, t);
        navMark(t);
        tCur = t;
        dirty = false;
      }
    }
    moveLight(g, dt);
    for (const it of items) if (it.appear >= 0.002) place(it, g.w, g.h);
    lensUpdate(g, dt);
    pushRects(g);
    // mexendo: todo quadro. Parado: 30 quadros por segundo, ou 11 se uma folha cobre tudo
    const active = now - lastInput < 2500 || now < busyUntil || Math.abs(vel) > 0.01;
    const gap = active ? 0 : covered(g) ? 90 : 33;
    if (now - lastR >= gap - 4) {
      g.render();
      if (active && prev && adaptOn) g.adapt(now - lastR);
      prev = active;
      lastR = now;
    } else prev = false;
  });

  let rsz = 0;
  let lw = innerWidth;
  addEventListener('resize', () => {
    clearTimeout(rsz);
    rsz = window.setTimeout(() => {
      g.resize();
      // a barra do navegador do celular aparecendo não refaz as palavras nem muda o ritmo da rolagem
      if (Math.abs(innerWidth - lw) > 2 || Math.abs(innerHeight - baseH) > baseH * 0.25) {
        lw = innerWidth;
        baseH = innerHeight;
        g.buildWords()
          .then(() => (dirty = true))
          .catch(() => null);
      }
      if (sceneOn) {
        measure();
        layout();
      }
      busy(400);
    }, 180);
  });
}

/* ---------- teclado: o foco num projeto fora da tela leva o roteiro até ele ---------- */
if (glass) {
  // a lista é movida pelo roteiro; se o navegador tentar rolar a folha (foco), ela volta ao zero
  S!.moreCard.addEventListener('scroll', () => S!.moreCard.scrollTop && (S!.moreCard.scrollTop = 0));
  document.addEventListener('focusin', (e) => {
    if (!sceneOn || !lenis) return;
    const proj = (e.target as Element).closest('.track > .proj');
    if (!proj) return;
    const i = Array.from(proj.parentElement!.children).indexOf(proj);
    let at = i === 0 ? K.S1 + 0.12 : K.P0 + (i - 1) * K.PS + K.PM + 0.1;
    const mc = S!.moreCard;
    if (K.LM > 0 && mc.contains(e.target as Node)) {
      // na lista que rola por dentro da folha, para no ponto em que a linha focada aparece
      mc.scrollTop = 0;
      const row = (e.target as HTMLElement).closest<HTMLElement>('.arc') ?? (e.target as HTMLElement);
      const need = row.offsetTop + row.offsetHeight + 40 - mc.clientHeight;
      const f = clamp(need / moreOver, 0, 1);
      at = f > 0 ? K.L0 + (K.LM * Math.acos(1 - 2 * f)) / Math.PI : at;
    }
    if (Math.abs(at - tCur) > 0.02) lenis.scrollTo(at * U, { immediate: true, force: true });
  });
}

/* ---------- navegação: a cortina cobre, troca de lugar e revela ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLElement>('[data-go]');
  if (!a) return;
  e.preventDefault();
  const id = a.dataset.go!;
  if (lite) return goTo(id);
  busy(2600);
  curtain(() => {
    goTo(id, true);
    if (!glass) ScrollTrigger.update();
  });
});

/* ---------- tema ---------- */
$('[data-theme-toggle]').addEventListener('click', (e) => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#08090D' : '#F4F5FA');
    if (glass) {
      glass.state.dark = next === 'dark' ? 1 : 0;
      glass.render();
    }
    try {
      localStorage.setItem('sd-theme', next);
    } catch {
      /* sem armazenamento */
    }
  };
  busy(1200);
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || lite) return apply();
  const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = b.left + b.width / 2;
  const y = b.top + b.height / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  doc.startViewTransition(apply).ready.then(() =>
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 800, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
    ),
  );
});

/* ---------- entrar sem animações / com animações ---------- */
const motionBtn = $('[data-motion]');
motionBtn.textContent = lite ? 'Entrar com animações' : 'Entrar sem animações';
motionBtn.addEventListener('click', () => {
  try {
    localStorage.setItem('sd-motion', lite ? 'full' : 'lite');
  } catch {
    /* sem armazenamento */
  }
  location.reload();
});

/* ---------- copiar ---------- */
$$('[data-copy]').forEach((b) =>
  b.addEventListener('click', async () => {
    const s = b.querySelector('.copy__s')!;
    try {
      await navigator.clipboard.writeText(b.dataset.copy!);
      s.textContent = 'Copiado ✓';
    } catch {
      s.textContent = 'Ctrl+C';
    }
    b.classList.add('is-copied');
    setTimeout(() => {
      b.classList.remove('is-copied');
      s.textContent = 'Copiar';
    }, 2400);
  }),
);

/* ---------- painel de detalhes ---------- */
const panel = $('.panel');
const box = $('.panel__box');
let lastFocus: HTMLElement | null = null;
function openPanel(i: number) {
  lastFocus = document.activeElement as HTMLElement;
  box.innerHTML = renderPanel(i);
  panel.hidden = false;
  lenis?.stop();
  if (!lite) {
    gsap.fromTo('.panel__veil', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
    gsap.fromTo(box, { xPercent: 105 }, { xPercent: 0, duration: 0.8 });
    gsap.fromTo(box.children, { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, stagger: 0.04, duration: 0.7, delay: 0.12 });
  }
  box.querySelector<HTMLElement>('.panel__close')?.focus();
}
function closePanel() {
  if (panel.hidden) return;
  const end = () => {
    panel.hidden = true;
    lenis?.start();
    lastFocus?.focus();
  };
  if (lite) return end();
  gsap.to('.panel__veil', { autoAlpha: 0, duration: 0.3 });
  gsap.to(box, { xPercent: 105, duration: 0.5, ease: 'expo.in', onComplete: end });
}
document.addEventListener('click', (e) => {
  const t = e.target as Element;
  const open = t.closest<HTMLElement>('[data-open]');
  if (open) return openPanel(Number(open.dataset.open));
  if (t.closest('[data-close]')) closePanel();
});
addEventListener('keydown', (e) => e.key === 'Escape' && closePanel());

/* ---------- sem WebGL: página comum, com entradas ao rolar e prints que inclinam com o mouse ---------- */
function tilt() {
  if (!fine) return;
  $$('.case__media').forEach((m) => {
    const t = m.querySelector<HTMLElement>('.case__tilt')!;
    const rx = gsap.quickTo(t, 'rotationX', { duration: 0.8, ease: 'power3' });
    const ry = gsap.quickTo(t, 'rotationY', { duration: 0.8, ease: 'power3' });
    m.addEventListener('pointermove', (e) => {
      const b = m.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width;
      const y = (e.clientY - b.top) / b.height;
      ry((x - 0.5) * 9);
      rx((0.5 - y) * 7);
      t.style.setProperty('--mx', `${x * 100}%`);
      t.style.setProperty('--my', `${y * 100}%`);
    });
    m.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}
function flow() {
  const sel = ['.sheet .kicker', '.sheet .h2', '.step', '.case__media', '.case__meta', '.proj__card--more', '.stage__sub', '.svc__item', '.faq__item', '.cta__title', '.sheet--cta .lead', '.cta__row'];
  $$(sel.join(', ')).forEach((el) =>
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }),
  );
  ['projetos', 'servicos', 'contato'].forEach((id) =>
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (st) => navLinks.forEach((a) => a.dataset.go === id && a.classList.toggle('is-on', st.isActive)),
    }),
  );
  tilt();
  ScrollTrigger.refresh();
}

/* ---------- início ---------- */
const HERO_UI = '.head > *, .hero__who > *, .hero__foot > *, .hero__hint > span';
function start() {
  root.classList.remove('is-loading');
  lenis?.start();
  if (lite) return;
  gsap.fromTo(HERO_UI, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.07 });
  if (!glass) return flow();
  const g = glass;
  measure();
  layout();
  gsap.to(head, { appear: 1, duration: 1.3, ease: 'power3.out' });
  g.loadImages(projects.map((p) => (p.preview.kind === 'image' ? p.preview.src : ''))).then(() => root.classList.add('gl-img'));
  gsap.delayedCall(1.5, () => (adaptOn = true));
}
/** Fim do carregamento: a rolagem passa a conduzir a cena (e um link com #seção já cai no lugar). */
function roll() {
  sceneOn = true;
  dirty = true;
  const id = location.hash.slice(1);
  if (LABEL[id] && id !== 'inicio') goTo(id, true);
}

/* ---------- carregamento: gotas de vidro que crescem com o progresso, se juntam e viram o nome ---------- */
function boot(g: Glass) {
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  gsap.set(HERO_UI, { autoAlpha: 0 });
  const n = $('.loader__n');
  const D = [0.62, 0.44, 0.54, 0.38, 0.5].map((r, i) => ({ r, a: i * 1.2566 + 0.4, w: (i % 2 ? -1 : 1) * (0.34 + i * 0.05), ph: i * 1.9 }));
  const ld = { p: 0, conv: 0, grow: 0 };
  const m0 = Math.min(innerWidth, innerHeight);
  g.state.a = g.state.b = 0;
  g.state.wordOn = 1;
  g.state.dropMix = 1;
  g.state.dropR = clamp(m0 * 0.075, 26, 72);
  const drops = () => {
    const w = innerWidth;
    const h = innerHeight;
    const m = Math.min(w, h);
    const t = performance.now() / 1000;
    const R = m * 0.13;
    const ring = m * 0.3 * (1 - ld.conv) * (1 - 0.3 * ld.p);
    D.forEach((d, i) => {
      const ang = d.a + t * d.w;
      g.drops[i * 3] = w / 2 + Math.cos(ang) * ring;
      g.drops[i * 3 + 1] = h / 2 + Math.sin(ang) * ring * 0.7 + Math.sin(t * 1.4 + d.ph) * 10 * (1 - ld.conv);
      g.drops[i * 3 + 2] = (R * d.r * (0.55 + 0.45 * ld.p) * (1 - ld.conv) + R * ld.conv) * ld.grow;
    });
  };
  drops();
  gsap.ticker.add(drops);
  busy(60000);
  const count = () => {
    n.textContent = String(Math.round(ld.p * 100));
  };
  gsap.to(ld, { grow: 1, duration: 1.2, ease: 'elastic.out(1, 0.6)' });
  gsap.to(g.state, { lightOn: 1, duration: 1.8, ease: 'power2.inOut', delay: 0.15 });
  const fonts = Promise.all(
    ['800 100px "Bricolage Grotesque"', '400 16px "Geist"', '400 12px "Geist Mono"'].map((f) => document.fonts.load(f).catch(() => null)),
  );
  const ready = Promise.race([fonts, wait(4)]).then(() => {
    g.buildPoster(POSTER);
    return g.buildWords().catch((err) => console.warn('[vidro]', err));
  });
  gsap.to(ld, { p: 0.8, duration: 1.6, ease: 'power2.inOut', onUpdate: count });
  Promise.all([ready, wait(1.7)]).then(() => {
    gsap
      .timeline()
      .to(ld, { p: 1, duration: 0.4, ease: 'power2.out', onUpdate: count })
      .to(ld, { conv: 1, duration: 1.05, ease: 'power3.inOut' })
      .to('.loader', { autoAlpha: 0, duration: 0.4 }, '<0.3')
      .call(() => g.ripple(innerWidth / 2, innerHeight / 2, 1))
      .to(g.state, { dropMix: 0, duration: 1.7, ease: 'power3.inOut' })
      .call(
        () => {
          start();
          busyUntil = performance.now() + 1500;
        },
        undefined,
        '-=0.5',
      )
      .call(() => {
        gsap.ticker.remove(drops);
        g.drops.fill(0);
        roll();
      });
  });
}

if (glass) boot(glass);
else start();

// testes automáticos (só com o vidro forçado): expõe o estado do roteiro
try {
  if (glass && localStorage.getItem('sd-gl') === 'force')
    Object.assign(window, { __sd: { glass, lenis, items, get K() { return K; }, get U() { return U; }, get t() { return tCur; } } });
} catch {
  /* sem armazenamento */
}
