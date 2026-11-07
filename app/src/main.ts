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
const smooth = (x: number) => x * x * (3 - 2 * x);
const wait = (s: number) => new Promise<void>((r) => gsap.delayedCall(s, () => r()));

const POSTER = ['SISTEMAS SOB MEDIDA', 'ERP · PAINÉIS · INTEGRAÇÕES', 'DO BANCO DE DADOS À TELA', 'SILVADEV · PAULO SILVA'];

/* ---------- vidro ---------- */
let glass: Glass | null = null;
if (!lite && Glass.supported()) {
  try {
    glass = new Glass($<HTMLCanvasElement>('.liquid'), fine ? 6 : 4, projects.length);
    root.classList.add('gl');
    glass.state.dark = root.dataset.theme === 'dark' ? 1 : 0;
    glass.onLost = () => root.classList.remove('gl', 'gl-img');
  } catch (err) {
    console.warn('[vidro]', err);
    glass = null;
    root.classList.remove('gl');
  }
}
if (!glass) root.classList.remove('is-loading');

/* ---------- rolagem suave (Lenis) no mesmo relógio do GSAP ---------- */
let lenis: Lenis | null = null;
if (!lite) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  if (glass) lenis.stop();
}
const scrollToId = (id: string, immediate = false) => {
  if (id === 'inicio') return lenis ? lenis.scrollTo(0, { immediate, force: true }) : scrollTo({ top: 0 });
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { immediate, force: true });
  else el.scrollIntoView();
};

/* ---------- peças de vidro: posição de cada uma (medida uma vez, não a cada quadro) ---------- */
type Item = { el: HTMLElement; type: number; fixed: boolean; img: boolean; left: number; top: number; w: number; h: number; r: number; appear: number; hover: number };
const items: Item[] = [];
if (glass)
  for (const kind of ['sheet', 'pill', 'img', 'head'])
    $$(`[data-glass="${kind}"]`).forEach((el) =>
      items.push({
        el,
        type: kind === 'sheet' ? 0 : kind === 'img' ? 2 + Number(el.dataset.img) : 1,
        fixed: kind === 'head',
        img: kind === 'img',
        left: 0,
        top: 0,
        w: 0,
        h: 0,
        r: 0,
        appear: kind === 'sheet' ? 1 : 0,
        hover: 0,
      }),
    );
const imgItems = items.filter((i) => i.img);

let stages: { top: number; h: number; word: number }[] = [];
function measure() {
  const y = scrollY;
  stages = $$('[data-word]').map((el) => {
    const b = el.getBoundingClientRect();
    return { top: b.top + y, h: b.height, word: Number(el.dataset.word) - 1 };
  });
  for (const it of items) {
    const b = it.el.getBoundingClientRect();
    it.left = b.left;
    it.top = b.top + (it.fixed ? 0 : y);
    it.w = b.width;
    it.h = b.height;
    it.r = parseFloat(getComputedStyle(it.el).borderTopLeftRadius) || 0;
  }
}

/* ---------- palavra de vidro: qual aparece, quanto já derreteu, onde está ---------- */
function syncWord(g: Glass) {
  if (!stages.length) return;
  const y = scrollY;
  const H = innerHeight;
  let k = 0;
  for (let i = 1; i < stages.length; i++) if (y >= stages[i].top - H) k = i;
  const s = g.state;
  const cur = stages[k];
  if (k === 0) {
    s.a = s.b = cur.word;
    s.morph = 0;
  } else {
    // a faixa nova chega com a palavra anterior, que derrete na nova enquanto sobe
    s.a = stages[k - 1].word;
    s.b = cur.word;
    s.morph = smooth(clamp((y - (cur.top - H * 0.55)) / (H * 0.7)));
  }
  const vis = (st: { top: number; h: number }) => clamp((Math.min(y + H, st.top + st.h) - Math.max(y, st.top)) / H);
  // coberta por uma folha, a palavra afina até sumir; descoberta, volta a encher
  s.wordOn = smooth(clamp(Math.max(vis(cur), k > 0 ? vis(stages[k - 1]) : 0) / 0.3));
  s.offY = clamp((cur.top - y) * 0.3, -H * 0.25, H * 0.25);
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

/* ---------- lupa de vidro sobre os prints ---------- */
const lens = { x: 0, y: 0, a: 0, it: null as Item | null };
function lensUpdate(g: Glass, dt: number) {
  const y = scrollY;
  let hit: Item | null = null;
  if (fine && ptr.on && g.imgsReady)
    for (const it of imgItems) {
      const top = it.top - y;
      if (it.appear > 0.6 && ptr.x >= it.left && ptr.x <= it.left + it.w && ptr.y >= top && ptr.y <= top + it.h) hit = it;
    }
  const kh = 1 - Math.exp(-dt * 7);
  for (const it of imgItems) it.hover += ((it === hit ? 1 : 0) - it.hover) * kh;
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
  const y = scrollY;
  const H = innerHeight;
  let n = 0;
  g.lensI = -1;
  for (const it of items) {
    if (n >= 16 || it.appear < 0.002 || (it.img && !g.imgsReady)) continue;
    const top = it.fixed ? it.top : it.top - y;
    if (top > H + 60 || top + it.h < -60) continue;
    const o = n * 4;
    g.rects[o] = it.left;
    g.rects[o + 1] = top;
    g.rects[o + 2] = it.w;
    g.rects[o + 3] = it.h;
    g.rectP[o] = it.r;
    g.rectP[o + 1] = it.appear;
    g.rectP[o + 2] = it.hover;
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

/** Uma folha cobre a tela inteira: a cena só aparece fosca, então pode ser desenhada menos vezes. */
const covered = () => {
  const y = scrollY;
  const H = innerHeight;
  return items.some((it) => it.type === 0 && it.top - y <= 0 && it.top + it.h - y >= H);
};

let adaptOn = false;
if (glass) {
  const g = glass;
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
  gsap.ticker.add(() => {
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    vel += (clamp((lenis ? lenis.velocity : 0) / 60, -1, 1) - vel) * (1 - Math.exp(-dt * 5));
    g.state.vel = vel * 1.5;
    g.state.scroll = scrollY;
    syncWord(g);
    moveLight(g, dt);
    lensUpdate(g, dt);
    pushRects(g);
    // mexendo: todo quadro. Parado: 30 quadros por segundo, ou 11 se uma folha cobre tudo
    const active = now - lastInput < 2500 || now < busyUntil || Math.abs(vel) > 0.01;
    const gap = active ? 0 : covered() ? 90 : 33;
    if (now - lastR >= gap - 4) {
      g.render();
      if (active && prev && adaptOn) g.adapt(now - lastR);
      prev = active;
      lastR = now;
    } else prev = false;
  });

  let rsz = 0;
  let lw = innerWidth;
  let lh = innerHeight;
  addEventListener('resize', () => {
    clearTimeout(rsz);
    rsz = window.setTimeout(() => {
      measure();
      g.resize();
      // a barra do navegador do celular aparecendo não refaz as palavras; mudar a largura refaz
      if (Math.abs(innerWidth - lw) > 2 || Math.abs(innerHeight - lh) > lh * 0.25) {
        lw = innerWidth;
        lh = innerHeight;
        g.buildWords().catch(() => null);
      }
      busy(400);
    }, 180);
  });
  // qualquer mudança de altura do conteúdo (perguntas abrindo, fontes) atualiza as posições
  new ResizeObserver(() => requestAnimationFrame(measure)).observe($('main'));
}

/* ---------- navegação: a cortina cobre, troca de lugar e revela ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLElement>('[data-go]');
  if (!a) return;
  e.preventDefault();
  const id = a.dataset.go!;
  if (lite) return scrollToId(id);
  busy(2600);
  curtain(() => {
    scrollToId(id, true);
    ScrollTrigger.update();
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

/* ---------- menu marca a seção atual ---------- */
const navLinks = $$('.nav a');
['projetos', 'servicos', 'contato'].forEach((id) =>
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: 'top 50%',
    endTrigger: `#${id} + .sheet`,
    end: 'bottom 50%',
    onToggle: (st) => navLinks.forEach((a) => a.dataset.go === id && a.classList.toggle('is-on', st.isActive)),
  }),
);

/* ---------- sem WebGL: os prints inclinam com o mouse ---------- */
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

/* ---------- entradas ao rolar (DOM: só transform e opacidade; vidro: enche de baixo para cima) ---------- */
function reveals() {
  const sel = ['.sheet .kicker', '.sheet .h2', '.step', '.case__meta', '.more', '.svc__item', '.faq', '.cta__title', '.sheet--cta .lead', '.cta__row'];
  if (!glass) sel.push('.case__media', '.stage__sub');
  $$(sel.join(', ')).forEach((el) =>
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }),
  );
  if (!glass) return;
  for (const it of items) {
    if (it.type === 0 || it.fixed) continue;
    if (!it.img) gsap.set(it.el, { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: it.el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        busy(1800);
        gsap.to(it, { appear: 1, duration: it.img ? 1.5 : 1.1, ease: 'power2.inOut' });
        if (!it.img) gsap.to(it.el, { autoAlpha: 1, duration: 0.8, delay: 0.4 });
      },
    });
  }
}

/* ---------- início ---------- */
const HERO_UI = '.head > *, .hero__who, .hero__foot, .hero__hint';
function start() {
  root.classList.remove('is-loading');
  lenis?.start();
  measure();
  if (lite) return;
  gsap.fromTo(HERO_UI, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.07 });
  if (glass) {
    const g = glass;
    const hd = items.find((i) => i.fixed);
    if (hd) gsap.to(hd, { appear: 1, duration: 1.3, ease: 'power3.out' });
    g.loadImages(projects.map((p) => (p.preview.kind === 'image' ? p.preview.src : ''))).then(() => root.classList.add('gl-img'));
    gsap.delayedCall(1.5, () => (adaptOn = true));
  } else tilt();
  reveals();
  ScrollTrigger.refresh();
  measure();
  ScrollTrigger.addEventListener('refresh', measure);
}

/* ---------- carregamento: gotas de vidro que crescem com o progresso, se juntam e viram o nome ---------- */
function boot(g: Glass) {
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  gsap.set(HERO_UI, { autoAlpha: 0 });
  measure();
  const n = $('.loader__n');
  const D = [0.62, 0.44, 0.54, 0.38, 0.5].map((r, i) => ({ r, a: i * 1.2566 + 0.4, w: (i % 2 ? -1 : 1) * (0.34 + i * 0.05), ph: i * 1.9 }));
  const ld = { p: 0, conv: 0, grow: 0 };
  const m0 = Math.min(innerWidth, innerHeight);
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
  const show = () => {
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
  gsap.to(ld, { p: 0.8, duration: 1.6, ease: 'power2.inOut', onUpdate: show });
  Promise.all([ready, wait(1.7)]).then(() => {
    gsap
      .timeline()
      .to(ld, { p: 1, duration: 0.4, ease: 'power2.out', onUpdate: show })
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
      });
  });
}

if (glass) boot(glass);
else start();
