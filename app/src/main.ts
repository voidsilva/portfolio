import './styles/site.css';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, root, isLite, isFine } from './lib/motion';
import { renderPanel } from './render';
import { curtain, revealFromCovered } from './fx/curtain';
import { runLoader } from './fx/loader';
import { initCursor } from './fx/cursor';
import { heroRecalc } from './fx/recalc';
import { initAutofill } from './fx/autofill';
import { initSheets } from './fx/sheet';

root.classList.add('js');
const lite = isLite();
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

/* ---------- caixa de nome + fórmula no topo ---------- */
const nbRef = $('.namebox__ref');
const nbF = $('.namebox__f');
let typing = 0;
function setFormula(ref: string, f: string) {
  nbRef.textContent = ref;
  cancelAnimationFrame(typing);
  if (lite) return void (nbF.textContent = f);
  let i = 0;
  let last = 0;
  nbF.classList.add('is-typing');
  const step = (t: number) => {
    if (t - last > 28) {
      last = t;
      nbF.textContent = f.slice(0, ++i);
    }
    if (i < f.length) typing = requestAnimationFrame(step);
    else nbF.classList.remove('is-typing');
  };
  typing = requestAnimationFrame(step);
}

/* ---------- rolagem suave (Lenis) no mesmo relógio do GSAP ---------- */
let lenis: Lenis | null = null;
if (!lite) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
const scrollToId = (id: string, immediate = false) => {
  const el = id === 'inicio' ? 0 : document.getElementById(id);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el as HTMLElement | number, { immediate, force: true, offset: id === 'inicio' ? 0 : -64 });
  else if (el === 0) scrollTo({ top: 0 });
  else (el as HTMLElement).scrollIntoView();
};

/* ---------- navegação: a cortina cobre, troca de lugar e revela ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLElement>('[data-go]');
  if (!a) return;
  e.preventDefault();
  const id = a.dataset.go!;
  if (lite) return scrollToId(id);
  curtain(() => {
    scrollToId(id, true);
    ScrollTrigger.update();
  });
});

/* ---------- tema: círculo que se espalha a partir do botão ---------- */
$('[data-theme-toggle]').addEventListener('click', (e) => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#08090D' : '#F4F5FA');
    try {
      localStorage.setItem('sd-theme', next);
    } catch {
      /* sem armazenamento */
    }
  };
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

/* ---------- copiar (com a borda tracejada de "célula copiada") ---------- */
$$('[data-copy]').forEach((b) =>
  b.addEventListener('click', async () => {
    const s = b.querySelector('.copy__s')!;
    try {
      await navigator.clipboard.writeText(b.dataset.copy!);
      s.textContent = 'Copiado';
    } catch {
      s.textContent = 'Ctrl+C';
    }
    b.classList.add('is-copied');
    setTimeout(() => {
      b.classList.remove('is-copied');
      s.textContent = 'Ctrl+C';
    }, 2600);
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
    gsap.fromTo(box, { xPercent: 100 }, { xPercent: 0, duration: 0.8 });
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
  gsap.to(box, { xPercent: 100, duration: 0.5, ease: 'expo.in', onComplete: end });
}
document.addEventListener('click', (e) => {
  const t = e.target as Element;
  const open = t.closest<HTMLElement>('[data-open]');
  if (open) return openPanel(Number(open.dataset.open));
  const media = t.closest<HTMLElement>('.case__media');
  if (media) return openPanel(Number(media.closest<HTMLElement>('.case')!.dataset.i));
  if (t.closest('[data-close]')) closePanel();
});
addEventListener('keydown', (e) => e.key === 'Escape' && closePanel());

/* ---------- seção atual: caixa de nome e menu ---------- */
let heroFormula = '';
const navLinks = $$('.nav a');
$$<HTMLElement>('[data-ref]').forEach((sec) =>
  ScrollTrigger.create({
    trigger: sec,
    start: 'top 45%',
    end: 'bottom 45%',
    onToggle: (st) => {
      if (!st.isActive) return;
      if (sec.classList.contains('hero') && heroFormula) setFormula('A1', heroFormula);
      else setFormula(sec.dataset.ref!, sec.dataset.f!);
      navLinks.forEach((a) => a.classList.toggle('is-on', a.dataset.go === sec.id));
    },
  }),
);

/* ---------- entradas ao rolar (só transform e opacidade) ---------- */
function reveals() {
  $$('.sec-head, .case__meta, .svc__item, .faq__item, .row, .cta .lead, .cta__row').forEach((el) => {
    gsap.from(el, { y: 36, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  $$('.cta__title .line, .foot__word').forEach((el, i) =>
    gsap.from(el, { yPercent: 40, autoAlpha: 0, duration: 1.2, delay: (i % 3) * 0.06, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }),
  );
}

/* ---------- início ---------- */
function start() {
  root.classList.remove('is-loading');
  lenis?.start();
  if (lite) {
    $$<HTMLElement>('.cell').forEach((c) => (c.textContent = c.dataset.to!));
    $('.cell--b').classList.add('is-done');
    return;
  }
  gsap.from('.hero__title .line', { yPercent: 60, autoAlpha: 0, duration: 1.3, stagger: 0.08 });
  gsap.from('.hero__who, .hero__foot, .head', { autoAlpha: 0, y: 16, duration: 1.1, stagger: 0.08, delay: 0.25 });
  initAutofill();
  initSheets();
  reveals();
  if (isFine()) initCursor();
  ScrollTrigger.refresh();
  gsap.delayedCall(1.1, () =>
    heroRecalc((f) => {
      heroFormula = f;
      if (scrollY < innerHeight * 0.5) setFormula('A1', f);
    }),
  );
}

if (lite) start();
else {
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  const fonts = Promise.all(
    ['600 100px "Bricolage Grotesque"', '400 16px "Geist"', '400 12px "Geist Mono"'].map((f) => document.fonts.load(f).catch(() => null)),
  );
  const ready = Promise.race([fonts, new Promise((r) => setTimeout(r, 3500))]);
  runLoader(ready, () => {
    revealFromCovered(start);
  });
}
