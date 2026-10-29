import './styles.css';
import Lenis from 'lenis';
import { cases } from './cases';
import type { Tier, World } from './world/World';

const doc = document.documentElement;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const lite = doc.classList.contains('lite');
const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string | null) => {
    try {
      v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v);
    } catch {}
  },
};

/* ---------- texto: quebra em linhas reais para revelar uma por vez ---------- */
function splitLines(el: HTMLElement) {
  if (!el.dataset.src) el.dataset.src = el.innerHTML;
  el.innerHTML = el.dataset.src;
  // embrulha cada palavra mantendo itálicos
  const words: HTMLElement[] = [];
  const walk = (n: Node) => {
    for (const c of [...n.childNodes]) {
      if (c.nodeType === 3) {
        const parts = c.textContent!.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const p of parts) {
          if (!p) continue;
          if (/^\s+$/.test(p)) frag.append(' ');
          else {
            const w = document.createElement('span');
            w.className = 'w';
            w.style.whiteSpace = 'nowrap';
            w.textContent = p;
            words.push(w);
            frag.append(w);
          }
        }
        c.replaceWith(frag);
      } else if (c.nodeType === 1) walk(c);
    }
  };
  walk(el);
  // agrupa por linha visual
  const lines: HTMLElement[][] = [];
  let top = -1e9;
  for (const w of words) {
    const t = w.offsetTop;
    if (Math.abs(t - top) > 4) {
      lines.push([]);
      top = t;
    }
    lines[lines.length - 1].push(w);
  }
  el.innerHTML = '';
  lines.forEach((ws, i) => {
    const ln = document.createElement('span');
    ln.className = ws.every((w) => w.closest('em')) ? 'ln ln--em' : 'ln';
    const inner = document.createElement('span');
    inner.style.setProperty('--i', String(i));
    ws.forEach((w, j) => {
      // reaproveita o itálico/ênfase de origem
      const em = w.closest('em');
      let node: Node = document.createTextNode(w.textContent!);
      if (em) {
        const e = document.createElement('em');
        e.append(node);
        node = e;
      }
      inner.append(node);
      if (j < ws.length - 1) inner.append(' ');
    });
    ln.append(inner);
    el.append(ln);
  });
  el.setAttribute('aria-label', el.textContent!.replace(/\s+/g, ' ').trim());
}

const lineEls = $$('[data-lines]');
function splitAll() {
  // o original precisa estar no fluxo para medir
  lineEls.forEach(splitLines);
}

const io = new IntersectionObserver(
  (es) => {
    for (const e of es) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -12% 0px' },
);
function observeReveals() {
  // atrasos em cascata dentro de cada bloco
  for (const sec of $$('.sec, .work-head')) {
    $$('[data-reveal]', sec).forEach((el, i) => el.style.setProperty('--d', `${120 + i * 70}ms`));
  }
  $$('[data-lines], [data-reveal]').forEach((el) => io.observe(el));
}

/* ---------- rolagem ---------- */
let lenis: Lenis | null = null;
if (!reduced && !lite) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  const raf = (t: number) => {
    lenis!.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
function go(target: string | HTMLElement) {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!;
  if (id.length < 2) return;
  e.preventDefault();
  closeMenu();
  go(id);
  history.replaceState(null, '', id);
});

/* ---------- paradas: cada bloco leva a câmera a um lugar ---------- */
const stEls = $$('[data-st]');
// lado do texto em cada parada, para o véu de leitura
const SIDE = ['left', 'left', 'right', 'left', 'right', 'right', 'bottom', 'left'];
let centers: number[] = [];
function measure() {
  centers = stEls.map((el) => {
    const r = el.getBoundingClientRect();
    return r.top + scrollY + r.height / 2;
  });
}
function progress() {
  const y = scrollY + innerHeight / 2;
  if (y <= centers[0]) return 0;
  for (let i = 0; i < centers.length - 1; i++) {
    if (y < centers[i + 1]) {
      const k = (y - centers[i]) / (centers[i + 1] - centers[i]);
      // segura um pouco em cada parada e anda no meio do caminho
      const s = k < 0.18 ? 0 : k > 0.82 ? 1 : (k - 0.18) / 0.64;
      return i + s * s * (3 - 2 * s);
    }
  }
  return centers.length - 1;
}
const navLinks = $$<HTMLAnchorElement>('.nav a');
const navFor = (i: number) => (i >= 2 && i <= 4 ? '#trabalho' : i === 5 ? '#servicos' : i === 6 ? '#processo' : i === 7 ? '#contato' : '');
let lastSt = -1;
function onScroll() {
  const p = progress();
  world?.setProgress(p);
  const st = Math.round(p);
  if (st !== lastSt) {
    lastSt = st;
    doc.dataset.side = SIDE[st] ?? 'left';
    const h = navFor(st);
    navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === h)));
    sound.chime(st);
  }
}
addEventListener('scroll', onScroll, { passive: true });

/* ---------- cursor de foco e hover magnético ---------- */
const cur = $('.cursor');
const ptr = { x: innerWidth / 2, y: innerHeight / 2, cx: innerWidth / 2, cy: innerHeight / 2 };
if (fine && !lite) {
  doc.classList.add('has-cursor');
  addEventListener('pointermove', (e) => {
    ptr.x = e.clientX;
    ptr.y = e.clientY;
    if (!doc.classList.contains('moved')) {
      doc.classList.add('moved');
      ptr.cx = ptr.x;
      ptr.cy = ptr.y;
    }
    const hot = (e.target as HTMLElement).closest?.('a, button, [data-magnetic]');
    cur.classList.toggle('hot', !!hot);
  });
  document.addEventListener('pointerleave', () => (cur.style.opacity = '0'));
  document.addEventListener('pointerenter', () => (cur.style.opacity = ''));
  const loop = () => {
    const k = reduced ? 1 : 0.22;
    ptr.cx += (ptr.x - ptr.cx) * k;
    ptr.cy += (ptr.y - ptr.cy) * k;
    cur.style.transform = `translate3d(${ptr.cx}px, ${ptr.cy}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();
  if (!reduced) {
    for (const el of $$('[data-magnetic]')) {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2),
          dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.2,.7,.1,1)';
        el.style.transform = '';
        setTimeout(() => (el.style.transition = ''), 600);
      });
    }
  }
}

/* ---------- copiar e-mail ---------- */
const toast = $('.toast');
let toastT = 0;
function say(msg: string) {
  toast.textContent = msg;
  toast.classList.add('on');
  clearTimeout(toastT);
  toastT = window.setTimeout(() => toast.classList.remove('on'), 2200);
}
for (const b of $$('[data-copy]')) {
  b.addEventListener('click', async () => {
    const v = b.dataset.copy!;
    try {
      await navigator.clipboard.writeText(v);
      say('E-mail copiado. Fico no aguardo.');
      const h = $('.mail__hint', b);
      if (h) {
        h.textContent = 'copiado';
        setTimeout(() => (h.textContent = 'clique para copiar'), 2400);
      }
    } catch {
      location.href = `mailto:${v}`;
    }
    sound.chime(9);
  });
}

/* ---------- menu (telas pequenas) ---------- */
const menu = $('#menu');
const menuBtn = $('[data-menu]');
function closeMenu() {
  if (menu.hidden) return;
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.textContent = 'Menu';
  lenis?.start();
}
menuBtn.addEventListener('click', () => {
  if (!menu.hidden) return closeMenu();
  menu.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.textContent = 'Fechar';
  lenis?.stop();
  $('a', menu).focus();
});

/* ---------- modo leve ---------- */
for (const b of $$('[data-lite-toggle], [data-lite-enter]')) {
  b.textContent = lite ? 'Modo completo' : b.hasAttribute('data-lite-enter') ? 'Entrar sem animações' : 'Modo leve';
  b.addEventListener('click', () => {
    store.set('sd-mode', lite ? null : 'lite');
    location.reload();
  });
}

/* ---------- som (opcional, desligado por padrão) ---------- */
const sound = (() => {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let on = false;
  const btns = $$('[data-sound]');
  const sync = () => btns.forEach((b) => b.setAttribute('aria-pressed', String(on)));
  function boot() {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    // água: ruído rosa filtrado, respirando devagar
    const n = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      let b0 = 0,
        b1 = 0,
        b2 = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + w * 0.029;
        b1 = 0.985 * b1 + w * 0.032;
        b2 = 0.95 * b2 + w * 0.048;
        d[i] = (b0 + b1 + b2) * 0.25;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 700;
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoG.gain.value = 260;
    lfo.connect(lfoG).connect(lp.frequency);
    const g = ctx.createGain();
    g.gain.value = 0.5;
    src.connect(lp).connect(g).connect(master);
    src.start();
    lfo.start();
  }
  const NOTES = [523.25, 587.33, 659.25, 783.99, 880, 987.77, 1046.5, 1174.66, 0, 1318.5];
  function chime(i: number) {
    if (!on || !ctx || !master) return;
    const f = NOTES[i % NOTES.length] || 880;
    const t = ctx.currentTime;
    for (const [mul, vol] of [
      [1, 0.09],
      [2.01, 0.03],
      [3.98, 0.012],
    ]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f * mul;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 2.5);
    }
  }
  function toggle() {
    on = !on;
    if (on && !ctx) boot();
    if (ctx && master) {
      if (on) ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(on ? 0.5 : 0, ctx.currentTime, 0.4);
    }
    store.set('sd-sound', on ? '1' : null);
    sync();
    if (on) chime(lastSt < 0 ? 0 : lastSt);
  }
  btns.forEach((b) => b.addEventListener('click', toggle));
  return { chime };
})();

/* ---------- case aberto: íris a partir do clique ---------- */
const sheet = $('.sheet');
const sheetBody = $('.sheet__body', sheet);
let opener: HTMLElement | null = null;
function openCase(id: string, from: HTMLElement, x: number, y: number) {
  const c = cases[id];
  if (!c) return;
  opener = from;
  sheetBody.innerHTML = c;
  sheet.style.setProperty('--x', `${x}px`);
  sheet.style.setProperty('--y', `${y}px`);
  sheet.hidden = false;
  lenis?.stop();
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('open')));
  $('.sheet__close', sheet).focus({ preventScroll: true });
  sound.chime(8);
}
function closeCase() {
  if (sheet.hidden) return;
  sheet.classList.remove('open');
  const done = () => {
    sheet.hidden = true;
    sheetBody.innerHTML = '';
  };
  reduced ? done() : setTimeout(done, 700);
  lenis?.start();
  document.body.style.overflow = '';
  opener?.focus({ preventScroll: true });
}
for (const b of $$('[data-case]')) {
  b.addEventListener('click', (e) => {
    const r = b.getBoundingClientRect();
    const x = (e as MouseEvent).clientX || r.left + r.width / 2;
    const y = (e as MouseEvent).clientY || r.top + r.height / 2;
    openCase(b.dataset.case!, b, x, y);
  });
}
sheet.addEventListener('click', (e) => {
  if (e.target === sheet || (e.target as HTMLElement).closest('[data-close]')) closeCase();
});
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCase();
    closeMenu();
  }
  // mantém o foco dentro do case aberto
  if (e.key === 'Tab' && !sheet.hidden) {
    const f = $$<HTMLElement>('a, button', sheet);
    const first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ---------- mundo 3D: carrega depois da primeira interação ---------- */
let world: World | null = null;
function pickTier(): Tier | null {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const c = document.createElement('canvas');
  const gl = c.getContext('webgl2');
  if (!gl) return null;
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const name = String(dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)).toLowerCase();
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  // renderizador por software: melhor a imagem fixa
  if (/swiftshader|llvmpipe|software|basic render/.test(name) && !location.search.includes('force3d')) return null;
  const weak = (nav.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency ?? 8) <= 4;
  const small = innerWidth < 820;
  if (small) return weak ? 'low' : 'mid';
  if (weak || /intel|mali|adreno [1-5]/.test(name)) return 'mid';
  return 'high';
}
async function boot3d() {
  if (world || lite) return;
  const tier = pickTier();
  if (!tier) {
    doc.classList.add('no-gl');
    return;
  }
  const { World } = await import('./world/World');
  await Promise.all(['italic 300 100px Newsreader', '400 100px Newsreader', '400 20px Geist', '600 20px Geist', '400 20px "Geist Mono"'].map((f) => document.fonts.load(f)));
  const canvas = $<HTMLCanvasElement>('.stage__gl');
  try {
    const w = new World(canvas, tier, { still: reduced });
    await w.init();
    world = w;
  } catch (err) {
    console.warn('3D desligado:', err);
    return;
  }
  world.setProgress(progress());
  world.setIntro(1);
  world.start();
  requestAnimationFrame(() => {
    doc.classList.add('gl-on');
    world!.reveal(reduced ? 1 : 2200);
  });
  let visible = true;
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    visible ? world!.start() : world!.stop();
  });
  addEventListener('pointermove', (e) => world!.setPointer((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)), { passive: true });
  addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) world!.setPointer((t.clientX / innerWidth) * 2 - 1, -((t.clientY / innerHeight) * 2 - 1));
  }, { passive: true });
  document.addEventListener('pointerleave', () => world!.clearPointer());
}
function armBoot() {
  if (lite) return;
  const evs = ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown', 'scroll'] as const;
  const fire = () => {
    evs.forEach((e) => removeEventListener(e, fire));
    boot3d();
  };
  evs.forEach((e) => addEventListener(e, fire, { passive: true, once: true }));
  setTimeout(fire, 3500);
}

/* ---------- abertura ---------- */
function preload() {
  const pre = $('.pre');
  const word = $('.pre__word', pre);
  const num = $('.pre__n', pre);
  const lb = $('[data-lite-enter]', pre);
  lb.tabIndex = 0;
  pre.removeAttribute('aria-hidden');
  if (doc.classList.contains('seen') || reduced) return Promise.resolve();
  return new Promise<void>((res) => {
    const t0 = performance.now();
    const D = 1500;
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / D);
      const e = 1 - Math.pow(1 - k, 3);
      word.style.setProperty('--b', String(1 - e));
      num.textContent = String(Math.round(e * 100)).padStart(2, '0');
      if (k < 1) requestAnimationFrame(step);
      else setTimeout(res, 260);
    };
    requestAnimationFrame(step);
  });
}

async function start() {
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);
  splitAll();
  measure();
  onScroll();
  await preload();
  doc.classList.add('done', 'ready');
  $('.pre').setAttribute('aria-hidden', 'true');
  try {
    sessionStorage.setItem('sd-seen', '1');
  } catch {}
  observeReveals();
  armBoot();
}
start();

let rz = 0;
addEventListener('resize', () => {
  clearTimeout(rz);
  rz = window.setTimeout(() => {
    lineEls.forEach((el) => {
      const was = el.classList.contains('in');
      splitLines(el);
      if (was) el.classList.add('in');
    });
    measure();
    onScroll();
  }, 180);
});
new ResizeObserver(() => measure()).observe(document.body);
