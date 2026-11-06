import './styles/site.css';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, root, isLite } from './lib/motion';
import { renderPanel } from './render';
import { curtain } from './fx/curtain';
import { Liquid } from './fx/liquid';

root.classList.add('js');
const lite = isLite();
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

/* ---------- vidro ---------- */
let liquid: Liquid | null = null;
if (!lite && Liquid.supported()) {
  try {
    liquid = new Liquid($<HTMLCanvasElement>('.liquid'));
    root.classList.add('gl');
    liquid.state.dark = root.dataset.theme === 'dark' ? 1 : 0;
  } catch {
    liquid = null;
    root.classList.remove('gl');
  }
}
if (!liquid) root.classList.remove('is-loading');

/* ---------- rolagem suave (Lenis) no mesmo relógio do GSAP ---------- */
let lenis: Lenis | null = null;
if (!lite) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  if (liquid) lenis.stop();
}
const scrollToId = (id: string, immediate = false) => {
  if (id === 'inicio') return lenis ? lenis.scrollTo(0, { immediate, force: true }) : scrollTo({ top: 0 });
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { immediate, force: true });
  else el.scrollIntoView();
};

/* ---------- títulos de vidro: qual palavra aparece e quanto já derreteu ---------- */
let stages: { top: number; word: number }[] = [];
let sheets: { top: number; bottom: number }[] = [];
const measure = () => {
  const y = scrollY;
  stages = $$('[data-word]').map((el) => ({ top: el.getBoundingClientRect().top + y, word: Number(el.dataset.word) }));
  sheets = $$('.sheet').map((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top + y, bottom: r.bottom + y };
  });
};
const smooth = (x: number) => x * x * (3 - 2 * x);
function syncWord() {
  if (!liquid || !stages.length) return;
  const y = scrollY;
  const H = innerHeight;
  let k = 0;
  for (let i = 1; i < stages.length; i++) if (y >= stages[i].top - H) k = i;
  const s = liquid.state;
  if (k === 0) {
    s.a = s.b = stages[0].word;
    s.mix = 0;
  } else {
    // a faixa nova aparece com a palavra anterior, que derrete na nova conforme você rola
    s.a = stages[k - 1].word;
    s.b = stages[k].word;
    s.mix = smooth(Math.min(1, Math.max(0, (y - (stages[k].top - H * 0.55)) / (H * 0.7))));
  }
  // na saída do topo, o vidro sobe junto com o conteúdo
  s.offY = k === 0 ? -Math.min(0.5, y / H) * 0.35 : 0;
}
/** Quando uma folha de conteúdo cobre a tela inteira, o vidro não precisa ser desenhado. */
function covered() {
  const y = scrollY;
  const b = y + innerHeight;
  return sheets.some((s) => s.top <= y && s.bottom >= b);
}

/* ---------- mouse: luz e ondas ---------- */
if (liquid) {
  const L = liquid;
  let lx = -1;
  let ly = -1;
  let lt = 0;
  addEventListener(
    'pointermove',
    (e) => {
      L.mouse.tx = e.clientX / innerWidth;
      L.mouse.ty = e.clientY / innerHeight;
      const now = performance.now();
      const d = Math.hypot(e.clientX - lx, e.clientY - ly);
      if (lx < 0 || (d > 26 && now - lt > 45)) {
        if (lx >= 0) L.drop(e.clientX, e.clientY, Math.min(0.32, Math.max(0.06, (d / (now - lt)) * 0.12)));
        lx = e.clientX;
        ly = e.clientY;
        lt = now;
      }
    },
    { passive: true },
  );
  addEventListener('pointerdown', (e) => L.drop(e.clientX, e.clientY, 0.6), { passive: true });
  let vel = 0;
  gsap.ticker.add(() => {
    const v = lenis ? lenis.velocity : 0;
    vel += (Math.max(-60, Math.min(60, v)) / 60 - vel) * 0.08;
    L.state.vel = vel * 3;
    syncWord();
    if (!covered()) L.render();
  });
  let rt = 0;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = window.setTimeout(() => {
      L.resize();
      measure();
    }, 200);
  });
}

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

/* ---------- tema ---------- */
$('[data-theme-toggle]').addEventListener('click', (e) => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#08090D' : '#F4F5FA');
    if (liquid) liquid.state.dark = next === 'dark' ? 1 : 0;
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
  doc.startViewTransition(() => {
    apply();
    liquid?.render();
  }).ready.then(() =>
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

/* ---------- prints dos projetos inclinam com o mouse ---------- */
function tilt() {
  if (!matchMedia('(hover: hover)').matches) return;
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

/* ---------- entradas ao rolar (só transform e opacidade) ---------- */
function reveals() {
  $$('.sheet .kicker, .sheet .h2, .step, .case, .more, .svc__item, .faq, .cta__title, .sheet--cta .lead, .cta__row, .stage__sub').forEach((el) =>
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 92%', once: true } }),
  );
  // a folha entra com uma leve escala, como um cartão subindo
  $$('.sheet').forEach((el) =>
    gsap.fromTo(el, { scale: 0.94 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: true } }),
  );
}

/* ---------- início ---------- */
function start() {
  root.classList.remove('is-loading');
  lenis?.start();
  measure();
  if (lite) return;
  gsap.fromTo('.head, .hero__who, .hero__foot, .hero__hint', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 });
  tilt();
  reveals();
  ScrollTrigger.refresh();
  measure();
  ScrollTrigger.addEventListener('refresh', measure);
}

if (!liquid) start();
else {
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  const L = liquid;
  const s = L.state;
  const n = $('.loader__n');
  gsap.set('.head, .hero__who, .hero__foot, .hero__hint', { autoAlpha: 0 });
  // carregamento: a gota de vidro cresce com o progresso real e depois derrete no nome
  s.a = 0;
  s.b = 1;
  s.mix = 0;
  s.sa = 0.02;
  L.render();
  const fonts = Promise.all(
    ['800 100px "Bricolage Grotesque"', '400 16px "Geist"', '400 12px "Geist Mono"'].map((f) => document.fonts.load(f).catch(() => null)),
  );
  const ready = Promise.race([fonts, new Promise((r) => setTimeout(r, 4000))]);
  const prog = { p: 0 };
  const show = () => {
    n.textContent = String(Math.round(prog.p * 100));
    s.sa = 0.02 + prog.p * 0.98;
  };
  gsap.to(s, { intro: 1, duration: 1.2, ease: 'power2.out' });
  gsap.to(prog, { p: 0.85, duration: 1.4, ease: 'power2.inOut', onUpdate: show });
  Promise.all([ready, new Promise((r) => setTimeout(r, 1500))]).then(() => {
    L.rebuild();
    gsap
      .timeline()
      .to(prog, { p: 1, duration: 0.45, ease: 'power2.out', onUpdate: show })
      .to('.loader', { autoAlpha: 0, duration: 0.4 }, '+=0.1')
      .call(() => L.drop(innerWidth / 2, innerHeight / 2, 0.9), undefined, '<')
      .to(s, { mix: 1, duration: 1.6, ease: 'power3.inOut' }, '<')
      .call(() => {
        s.a = 1;
        s.mix = 0;
        start();
      }, undefined, '-=0.35');
  });
}
