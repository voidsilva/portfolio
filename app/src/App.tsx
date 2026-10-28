import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, isCoarse, systemReduced } from './lib/motion';
import { profile, projects, archive, services, faq, stack, MENU } from './data/content';
import { Brand, GitHubIcon, LogoMark } from './components/Logo';
import { Arrow, Btn, Label, Roll, Swap, Words } from './site/bits';
import { ProjectPanel } from './site/Panel';
import type { World as WorldT, Pose } from './site/World';
import { glass, glassRefracts, specular } from './lib/glass';

type Theme = 'light' | 'dark';
type Quality = 'high' | 'low';

const read = <T extends string>(k: string, ok: T[], fallback: T): T => {
  try {
    const v = localStorage.getItem(k) as T | null;
    return v && ok.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
};
const save = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* sem armazenamento: vale só para esta visita */
  }
};

function hasWebGL() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function defaultQuality(): Quality {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  return systemReduced() || weak || !hasWebGL() ? 'low' : 'high';
}

/** Onde o objeto 3D fica em cada forma (desktop: ao lado do texto; celular: centralizado e mais apagado). */
function poseFor(stage: number): Pose {
  const m = innerWidth < 820;
  const P: Record<number, Pose> = m
    ? {
        0: { x: 0, y: 0, z: -2, rx: 0, ry: 0, s: 1.1, a: 0.22 },
        1: { x: 0.5, y: 0.55, z: 0, rx: 0.42, ry: -0.62, s: 0.55, a: 1 },
        2: { x: 0, y: 0, z: 0, rx: 0.1, ry: 0.2, s: 0.8, a: 0.4 },
        3: { x: 0, y: 1.6, z: 0, rx: 0.08, ry: -0.2, s: 0.55, a: 0.5 },
        4: { x: 0.3, y: 1.4, z: 0, rx: 0.5, ry: -0.7, s: 0.6, a: 0.45 },
      }
    : {
        0: { x: 0, y: 0, z: -2, rx: 0, ry: 0, s: 1.3, a: 0.35 },
        1: { x: 2.7, y: -0.1, z: 0, rx: 0.42, ry: -0.62, s: 1, a: 1 },
        2: { x: -3.6, y: 0, z: -1, rx: 0.1, ry: -0.75, s: 0.85, a: 0.85 },
        3: { x: 2.55, y: 0, z: 0, rx: 0.06, ry: -0.34, s: 0.78, a: 1 },
        4: { x: 3, y: -0.2, z: 0, rx: 0.5, ry: -0.7, s: 0.95, a: 1 },
      };
  return P[stage] ?? P[0];
}

/** Onda líquida em duas camadas: sobe com a crista curvada, cobre a tela, executa a troca e escorre para cima. */
function wave(a: number, cover: boolean) {
  const b = Math.sin(a * Math.PI) * 22;
  if (cover) {
    const y = 100 - a * 100;
    return `M0 100 L0 ${y} Q50 ${y - b} 100 ${y} L100 100 Z`;
  }
  const y = 100 - a * 100;
  return `M0 0 L100 0 L100 ${y} Q50 ${y + b} 0 ${y} Z`;
}
function curtain(onCovered: () => void) {
  const el = document.querySelector<HTMLElement>('.curtain');
  const [back, front] = el ? Array.from(el.querySelectorAll('path')) : [];
  if (!el || !back) return void onCovered();
  const logo = el.querySelector('.curtain__logo');
  const p = { b: 0, f: 0 };
  const draw = (cover: boolean) => () => {
    back.setAttribute('d', wave(p.b, cover));
    front.setAttribute('d', wave(p.f, cover));
  };
  gsap.killTweensOf([el, p, logo]);
  gsap
    .timeline()
    .set(el, { visibility: 'visible' })
    .call(draw(true))
    .to(p, { b: 1, duration: 0.8, ease: 'power3.inOut', onUpdate: draw(true) })
    .to(p, { f: 1, duration: 0.8, ease: 'power3.inOut', onUpdate: draw(true) }, 0.12)
    .fromTo(logo, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 0.62)
    .call(onCovered)
    .set(p, { b: 0, f: 0 })
    .to(logo, { autoAlpha: 0, scale: 0.8, y: -30, duration: 0.35, ease: 'power2.in' }, '+=0.15')
    .to(p, { f: 1, duration: 0.85, ease: 'power3.inOut', onUpdate: draw(false) }, '<0.1')
    .to(p, { b: 1, duration: 0.85, ease: 'power3.inOut', onUpdate: draw(false) }, '<0.12')
    .set(el, { visibility: 'hidden' })
    .set(logo, { y: 0 });
}

/**
 * Pílula de vidro que escorre até o item sob o ponteiro: estica na direção do movimento
 * e volta ao formato com um leve quique, como uma gota.
 */
function pillSlider(list: HTMLElement, items: HTMLElement[]) {
  const pill = list.querySelector<HTMLElement>('.pill');
  if (!pill) return () => {};
  let on = -1;
  const to = (el: HTMLElement) => {
    const i = items.indexOf(el);
    if (i === on) return;
    const first = on < 0;
    on = i;
    const y = el.offsetTop;
    const h = el.offsetHeight;
    if (first) gsap.set(pill, { y, height: h });
    gsap.to(pill, { y, height: h, autoAlpha: 1, duration: 0.75, ease: 'expo.out', overwrite: 'auto' });
    if (!first) gsap.fromTo(pill, { scaleY: 0.78, scaleX: 1.025 }, { scaleY: 1, scaleX: 1, duration: 1, ease: 'elastic.out(1, 0.45)', overwrite: false });
  };
  const enter = (e: Event) => to(e.currentTarget as HTMLElement);
  const leave = () => {
    on = -1;
    gsap.to(pill, { autoAlpha: 0, scaleY: 0.6, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
  };
  items.forEach((it) => it.addEventListener('pointerenter', enter));
  list.addEventListener('pointerleave', leave);
  return () => {
    items.forEach((it) => it.removeEventListener('pointerenter', enter));
    list.removeEventListener('pointerleave', leave);
  };
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => read('sd-theme', ['light', 'dark'], 'light'));
  const [quality, setQuality] = useState<Quality>(() => read('sd-quality', ['high', 'low'], defaultQuality()));
  const [loaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<number | null>(null);
  const [active, setActive] = useState('');
  const lenis = useRef<Lenis | null>(null);
  const world = useRef<WorldT | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  /* ---------- tema ---------- */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#08090D' : '#F1ECFB');
    world.current?.setTheme(theme === 'dark');
    save('sd-theme', theme);
  }, [theme]);

  /** Troca de tema com uma gota que se espalha a partir do botão (onde houver View Transitions). */
  const flipTheme = (next: Theme, from?: HTMLElement) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || systemReduced() || next === theme) return setTheme(next);
    const b = from?.getBoundingClientRect();
    const x = b ? b.left + b.width / 2 : innerWidth / 2;
    const y = b ? b.top + b.height / 2 : 0;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(() => flushSync(() => setTheme(next))).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 900, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    );
  };

  /* ---------- carregamento: 000% → 100% ---------- */
  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    const shown = { v: 0 };
    const real = { v: 0 };
    const fonts = Promise.all(
      ['500 80px "Inter Tight"', '400 16px "Inter Tight"', 'italic 400 80px "Instrument Serif"', '400 12px "JetBrains Mono"'].map((f) =>
        document.fonts.load(f).catch(() => null),
      ),
    ).then(() => (real.v += 0.5));
    const three = quality === 'high' ? import('./site/World').then((m) => ((real.v += 0.5), m)) : Promise.resolve((real.v += 0.5, null));
    // o contador anda sozinho e espera o carregamento real nos últimos pontos
    const tick = gsap.to(shown, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.min(shown.v, 40 + real.v * 60);
        if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, '0');
      },
    });
    let alive = true;
    Promise.all([fonts, three, new Promise((r) => setTimeout(r, 1600))]).then(([, mod]) => {
      if (!alive) return;
      if (count.current) count.current.textContent = '100';
      if (mod && canvas.current) {
        world.current = new mod.World(canvas.current, document.documentElement.dataset.theme === 'dark');
        world.current.loadProjects(projects.map((p) => (p.preview.kind === 'image' ? p.preview.src : '')));
        document.documentElement.classList.add('has-3d');
      }
      const el = document.querySelector('.loader');
      gsap
        .timeline({ delay: 0.25, onComplete: () => setLoaded(true) })
        .to('.loader__in > *', { yPercent: -120, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'power3.in' })
        .to(el, { yPercent: -100, borderBottomLeftRadius: '50% 34vh', borderBottomRightRadius: '50% 34vh', duration: 1.15, ease: 'expo.inOut' }, '-=0.15')
        .call(() => document.documentElement.classList.remove('is-loading'), undefined, '-=0.7');
    });
    return () => {
      alive = false;
      tick.kill();
      world.current?.dispose();
      world.current = null;
    };
    // a qualidade só muda recarregando a página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- scroll suave e animações ---------- */
  useEffect(() => {
    const l = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.current = l;
    const head = document.querySelector<HTMLElement>('.head');
    let last = 0;
    l.on('scroll', (e: Lenis) => {
      ScrollTrigger.update();
      world.current?.setVelocity(e.velocity);
      // descendo, a cápsula do topo se recolhe um pouco (como a barra do iPhone); subindo, volta
      const y = e.scroll;
      if (Math.abs(y - last) > 4) head?.classList.toggle('is-compact', y > 200 && y > last);
      last = y;
    });
    const raf = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    l.stop();
    return () => {
      gsap.ticker.remove(raf);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    lenis.current?.start();
    const ctx = gsap.context(() => {
      // entrada do topo
      gsap.fromTo('.hero .w > span', { yPercent: 110, filter: 'blur(14px)' }, { yPercent: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.06, ease: 'expo.out', clearProps: 'filter' });
      gsap.fromTo('.hero__fade', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.stage', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' });
      // ambiente 3D: cada seção pede uma forma; a troca é animada no shader
      const w = world.current;
      if (w) {
        const show = (s: number) => {
          // no celular o texto ocupa a tela toda: fora do topo, as partículas só flutuam ao fundo
          const stage = innerWidth < 820 && s !== 1 ? 0 : s;
          const mix = w.goTo(stage);
          if (mix) gsap.to(mix, { value: 1, duration: 2.2, ease: 'power2.inOut', overwrite: true });
          gsap.to(w.pose, { ...poseFor(stage), duration: 2.2, ease: 'expo.inOut', overwrite: true });
        };
        gsap.set(w.pose, poseFor(1));
        show(1);
        // a câmera caminha pelo galpão conforme a página desce
        ScrollTrigger.create({ trigger: 'main', start: 'top top', end: 'bottom bottom', onUpdate: (st) => w.setTravel(st.progress) });
        gsap.utils.toArray<HTMLElement>('[data-stage]').forEach((el) =>
          ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (st) => st.isActive && show(Number(el.dataset.stage)) }),
        );
      }

      // a bolha da cápsula do topo acompanha a seção visível
      ['abordagem', 'trabalhos', 'servicos', 'contato'].forEach((id) =>
        ScrollTrigger.create({ trigger: `#${id}`, start: 'top 50%', end: 'bottom 50%', onToggle: (st) => setActive((a) => (st.isActive ? id : a === id ? '' : a)) }),
      );

      // títulos: palavras sobem ao entrar na tela
      gsap.utils.toArray<HTMLElement>('main [data-reveal="words"]').forEach((el) => {
        if (el.closest('.hero')) return;
        gsap.fromTo(el.querySelectorAll('.w > span'), { yPercent: 110, filter: 'blur(12px)' }, { yPercent: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.045, ease: 'expo.out', clearProps: 'filter', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      // blocos simples
      gsap.set('[data-fade]', { autoAlpha: 0, y: 34, filter: 'blur(10px)' });
      ScrollTrigger.batch('[data-fade]', {
        start: 'top 90%',
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.07, ease: 'power3.out', overwrite: true, clearProps: 'filter' }),
      });
      // linhas das listas se desenham
      gsap.utils.toArray<HTMLElement>('.rule').forEach((el) =>
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } }),
      );

      // abordagem: palavras acendem no ritmo do scroll
      gsap.fromTo(
        '.approach__text .lw',
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.approach', start: 'top 65%', end: 'bottom 70%', scrub: 0.6 } },
      );

      // afirmações: o texto desliza na horizontal conforme a rolagem
      gsap.utils.toArray<HTMLElement>('.claim__big').forEach((el, i) =>
        gsap.fromTo(el, { xPercent: i % 2 ? -6 : 6 }, { xPercent: i % 2 ? 6 : -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }),
      );

      // projetos: a imagem de cada linha (no celular) abre como cortina
      gsap.utils.toArray<HTMLElement>('.work__thumb').forEach((el) =>
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }),
      );

      // números contam
      gsap.utils.toArray<HTMLElement>('.stat b').forEach((el) => {
        const to = Number(el.dataset.n);
        const o = { v: to > 1000 ? to - 40 : 0 };
        gsap.to(o, { v: to, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => void (el.textContent = String(Math.round(o.v))) });
      });

      // contato: título gigante cresce ao entrar
      gsap.fromTo('.cta__title', { scale: 0.86 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'center center', scrub: true } });

      // fim da página: continuar rolando leva de volta ao começo
      const bar = document.querySelector<HTMLElement>('.loop__bar i');
      let busy = false;
      ScrollTrigger.create({
        trigger: '.loop',
        start: 'top bottom',
        end: 'bottom bottom',
        onUpdate: (st) => {
          if (bar) bar.style.transform = `scaleX(${st.progress.toFixed(3)})`;
          if (st.progress > 0.995 && !busy) {
            busy = true;
            curtain(() => {
              lenis.current?.scrollTo(0, { immediate: true, force: true });
              ScrollTrigger.update();
              setTimeout(() => (busy = false), 900);
            });
          }
        },
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loaded]);

  /* ---------- projetos: com 3D a tela de partículas mostra o projeto; sem 3D, uma prévia segue o mouse ---------- */
  useEffect(() => {
    if (!loaded || isCoarse()) return;
    const list = document.querySelector<HTMLElement>('.work__list');
    const prev = document.querySelector<HTMLElement>('.preview');
    if (!list || !prev) return;
    const rows = list.querySelectorAll<HTMLElement>('.work__row');
    const w = world.current;
    if (w) {
      const enter = (e: Event) => {
        const mix = w.setProject(Number((e.currentTarget as HTMLElement).dataset.i));
        if (mix) gsap.to(mix, { value: 1, duration: 1.1, ease: 'power2.inOut', overwrite: true });
      };
      rows.forEach((r) => r.addEventListener('pointerenter', enter));
      return () => rows.forEach((r) => r.removeEventListener('pointerenter', enter));
    }
    const imgs = prev.querySelectorAll<HTMLElement>('.preview__img');
    gsap.set(imgs, { yPercent: 100 });
    const x = gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3' });
    const rot = gsap.quickTo(prev, 'rotate', { duration: 0.8, ease: 'power3' });
    let lx = 0;
    let px = -1;
    let py = -1;
    let shown = -1;
    const leave = () => {
      if (shown < 0) return;
      shown = -1;
      gsap.to(prev, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    };
    // confere o que está sob o cursor (também ao rolar, quando o mouse fica parado)
    const check = () => {
      const row = px < 0 ? null : (document.elementFromPoint(px, py)?.closest<HTMLElement>('.work__row') ?? null);
      if (!row) return leave();
      const i = Number(row.dataset.i);
      if (i === shown) return;
      shown = i;
      imgs.forEach((im, k) => gsap.to(im, { yPercent: k === i ? 0 : k < i ? -100 : 100, duration: 0.7, ease: 'expo.out' }));
      gsap.to(prev, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      x(px);
      y(py);
      rot(gsap.utils.clamp(-8, 8, (px - lx) * 0.4));
      lx = px;
      check();
    };
    const out = () => {
      px = -1;
      leave();
    };
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', out);
    lenis.current?.on('scroll', check);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', out);
      lenis.current?.off('scroll', check);
    };
  }, [loaded]);

  /* ---------- vidro líquido: refração, brilho, aperto elástico e pílulas ---------- */
  useEffect(() => {
    if (!loaded) return;
    const offs: (() => void)[] = [specular()];
    if (glassRefracts()) {
      document.documentElement.classList.add('lg-refract');
      document.querySelectorAll<HTMLElement>('.head__nav, .brand, .head .chip:not(.chip--solid)').forEach((el) => offs.push(glass(el, { bezel: 16, scale: 46 })));
      document.querySelectorAll<HTMLElement>('.stat').forEach((el) => offs.push(glass(el, { bezel: 22, scale: 50, blur: 1.5 })));
      document.querySelectorAll<HTMLElement>('.pill').forEach((el) => offs.push(glass(el, { bezel: 24, scale: 70, blur: 2 })));
      const drop = document.querySelector<HTMLElement>('.cursor__drop');
      if (drop && !isCoarse()) offs.push(glass(drop, { bezel: 30, scale: 44, blur: 0.3, lens: 0.26, sat: 1.4 }));
    }
    // apertar: o elemento achata e volta com quique, como gelatina
    const sel = '.chip, .btn, .brand, .seg button, .menu__link, .work__row, .panel__close';
    const down = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>(sel);
      if (!el || systemReduced()) return;
      gsap.to(el, { scaleX: 1.05, scaleY: 0.93, duration: 0.16, ease: 'power2.out', overwrite: 'auto' });
      const up = () => {
        gsap.to(el, { scaleX: 1, scaleY: 1, duration: 1.1, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
      };
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    };
    window.addEventListener('pointerdown', down);
    offs.push(() => window.removeEventListener('pointerdown', down));
    if (!isCoarse()) {
      document.querySelectorAll<HTMLElement>('.work__list, .svc__list').forEach((list) =>
        offs.push(pillSlider(list, Array.from(list.querySelectorAll<HTMLElement>(':scope > li:not(.pill)')))),
      );
    }
    return () => offs.forEach((f) => f());
  }, [loaded]);

  /* ---------- contato: gotas que se fundem e seguem o ponteiro; rodapé: nome que ondula como água ---------- */
  useEffect(() => {
    if (!loaded) return;
    const cta = document.querySelector<HTMLElement>('.cta');
    const goo = cta?.querySelector<HTMLElement>('.goo');
    const me = goo?.querySelector<HTMLElement>('.goo__me');
    const word = document.querySelector<HTMLElement>('.foot__word');
    const disp = document.querySelector('#ripple feDisplacementMap');
    const turb = document.querySelector('#ripple feTurbulence');
    const offs: (() => void)[] = [];
    if (cta && goo && me) {
      // as gotas só se mexem com o contato na tela
      const io = new IntersectionObserver(([e]) => goo.classList.toggle('is-on', e.isIntersecting));
      io.observe(cta);
      offs.push(() => io.disconnect());
      if (!isCoarse()) {
        const x = gsap.quickTo(me, 'x', { duration: 1.2, ease: 'power3' });
        const y = gsap.quickTo(me, 'y', { duration: 1.2, ease: 'power3' });
        const move = (e: PointerEvent) => {
          const b = goo.getBoundingClientRect();
          x(e.clientX - b.left - b.width / 2);
          y(e.clientY - b.top - b.height / 2);
        };
        const out = () => (x(0), y(0));
        cta.addEventListener('pointermove', move);
        cta.addEventListener('pointerleave', out);
        offs.push(() => (cta.removeEventListener('pointermove', move), cta.removeEventListener('pointerleave', out)));
      }
    }
    if (word && disp && turb && !isCoarse() && !systemReduced()) {
      const r = { s: 0, t: 0 };
      const paint = () => {
        disp.setAttribute('scale', r.s.toFixed(1));
        turb.setAttribute('baseFrequency', `${(0.004 + Math.sin(r.t) * 0.0015).toFixed(4)} ${(0.018 + Math.cos(r.t * 0.7) * 0.006).toFixed(4)}`);
      };
      const flow = () => {
        r.t += 0.035;
        paint();
      };
      const enter = () => {
        word.classList.add('is-wet');
        gsap.ticker.add(flow);
        gsap.to(r, { s: 40, duration: 0.8, ease: 'power2.out', overwrite: true });
      };
      const leave = () =>
        gsap.to(r, {
          s: 0,
          duration: 1.4,
          ease: 'elastic.out(1, 0.4)',
          overwrite: true,
          onComplete: () => {
            gsap.ticker.remove(flow);
            word.classList.remove('is-wet');
          },
        });
      word.addEventListener('pointerenter', enter);
      word.addEventListener('pointerleave', leave);
      offs.push(() => {
        word.removeEventListener('pointerenter', enter);
        word.removeEventListener('pointerleave', leave);
        gsap.ticker.remove(flow);
      });
    }
    return () => offs.forEach((f) => f());
  }, [loaded]);

  /* ---------- bolha da cápsula do topo: escorre entre os itens, a borda da frente vai primeiro ---------- */
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.head__nav');
    const blob = nav?.querySelector<HTMLElement>('.head__blob');
    if (!nav || !blob) return;
    const st = { l: 0, r: 0 };
    const paint = () => {
      const w = st.r - st.l;
      blob.style.transform = `translateX(${st.l}px)`;
      blob.style.width = `${w}px`;
    };
    let cur: HTMLElement | null = null;
    const to = (a: HTMLElement | null) => {
      if (a === cur) return;
      const had = cur;
      cur = a;
      if (!a) return void gsap.to(blob, { autoAlpha: 0, scale: 0.7, duration: 0.4, ease: 'power3.out' });
      const l = a.offsetLeft;
      const r = l + a.offsetWidth;
      if (!had) {
        Object.assign(st, { l, r });
        paint();
        gsap.fromTo(blob, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
        return;
      }
      const right = l > st.l;
      gsap.to(st, { r, duration: right ? 0.45 : 0.75, delay: right ? 0 : 0.09, ease: right ? 'power3.out' : 'elastic.out(1, 0.6)', onUpdate: paint, overwrite: false });
      gsap.to(st, { l, duration: right ? 0.75 : 0.45, delay: right ? 0.09 : 0, ease: right ? 'elastic.out(1, 0.6)' : 'power3.out', onUpdate: paint, overwrite: false });
      gsap.fromTo(blob, { scaleY: 0.72 }, { scaleY: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    };
    const links = Array.from(nav.querySelectorAll<HTMLElement>('a'));
    const activeEl = () => links.find((a) => a.dataset.id === active) ?? null;
    to(activeEl());
    const over = (e: Event) => to(e.currentTarget as HTMLElement);
    const out = () => to(activeEl());
    links.forEach((a) => a.addEventListener('pointerenter', over));
    nav.addEventListener('pointerleave', out);
    return () => {
      links.forEach((a) => a.removeEventListener('pointerenter', over));
      nav.removeEventListener('pointerleave', out);
    };
  }, [active]);

  /* ---------- botões magnéticos e cursor de gota ---------- */
  useEffect(() => {
    if (!loaded || isCoarse()) return;
    const offs = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]')).map((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const m = (e: PointerEvent) => {
        const b = el.getBoundingClientRect();
        mx((e.clientX - b.left - b.width / 2) * 0.25);
        my((e.clientY - b.top - b.height / 2) * 0.25);
      };
      const out = () => (mx(0), my(0));
      el.addEventListener('pointermove', m);
      el.addEventListener('pointerleave', out);
      return () => {
        el.removeEventListener('pointermove', m);
        el.removeEventListener('pointerleave', out);
      };
    });
    // a gota segue o ponteiro com atraso, estica na direção da velocidade e muda de tamanho pelo alvo
    const cur = document.querySelector<HTMLElement>('.cursor')!;
    const drop = cur.querySelector<HTMLElement>('.cursor__drop')!;
    const reduced = systemReduced();
    const s = { tx: -200, ty: -200, x: -200, y: -200, st: 0, a: 0, k: 0.46, kt: 0.46, sq: 0 };
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      cur.classList.add('is-on');
      s.tx = e.clientX;
      s.ty = e.clientY;
      const t = e.target as HTMLElement;
      const view = !!t.closest('.work__row');
      const link = !view && !!t.closest('a, button, summary, [tabindex]');
      cur.classList.toggle('is-link', link);
      cur.classList.toggle('is-view', view);
      s.kt = view ? 1.15 : link ? 0.7 : 0.46;
    };
    const press = () => (s.sq = 1);
    const tick = () => {
      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      s.x += dx * 0.2;
      s.y += dy * 0.2;
      const v = Math.hypot(dx, dy);
      s.st += (Math.min(v / 90, 0.5) - s.st) * 0.18;
      if (v > 1) s.a = Math.atan2(dy, dx);
      s.k += (s.kt - s.k) * 0.14;
      s.sq *= 0.86;
      const st = reduced ? 0 : s.st;
      const k = s.k * (1 - s.sq * 0.2);
      cur.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`;
      drop.style.transform = `rotate(${s.a.toFixed(3)}rad) scale(${(k * (1 + st)).toFixed(3)}, ${(k * (1 - st * 0.45)).toFixed(3)})`;
    };
    gsap.ticker.add(tick);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', press);
    return () => {
      offs.forEach((f) => f());
      gsap.ticker.remove(tick);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [loaded]);

  /* ---------- menu e painel pausam o scroll ---------- */
  useEffect(() => {
    if (menu || panel !== null) lenis.current?.stop();
    else if (loaded) lenis.current?.start();
  }, [menu, panel, loaded]);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.menu')!;
    gsap.killTweensOf(el);
    const b = document.querySelector('.chip--menu')?.getBoundingClientRect();
    const at = b ? `${Math.round(b.left + b.width / 2)}px ${Math.round(b.top + b.height / 2)}px` : '100% 0%';
    const r = Math.hypot(innerWidth, innerHeight);
    if (menu) {
      gsap.set(el, { visibility: 'visible' });
      gsap.fromTo(el, { clipPath: `circle(0px at ${at})` }, { clipPath: `circle(${r}px at ${at})`, duration: 1.1, ease: 'expo.inOut' });
      gsap.fromTo(
        el.querySelectorAll('.menu__link > span'),
        { yPercent: 110, filter: 'blur(10px)' },
        { yPercent: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.06, ease: 'expo.out', delay: 0.35, clearProps: 'filter' },
      );
      gsap.fromTo(el.querySelectorAll('.menu__side > *'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out', delay: 0.5 });
    } else if (el.style.visibility === 'visible') {
      gsap.to(el, { clipPath: `circle(0px at ${at})`, duration: 0.8, ease: 'expo.inOut', onComplete: () => void gsap.set(el, { visibility: 'hidden' }) });
    }
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [menu]);

  const go = useCallback((id: string, viaCurtain = false) => {
    const to = () => {
      lenis.current?.start();
      lenis.current?.scrollTo(id === 'top' ? 0 : `#${id}`, { immediate: viaCurtain, force: true, duration: 1.6 });
      ScrollTrigger.update();
    };
    if (viaCurtain) {
      setMenu(false);
      curtain(to);
    } else to();
  }, []);

  const changeQuality = (q: Quality) => {
    if (q === quality) return;
    save('sd-quality', q);
    setQuality(q);
    curtain(() => location.reload());
  };

  const link = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    go(id);
  };

  return (
    <>
      <a className="skip" href="#trabalhos">
        Pular para os projetos
      </a>

      {/* carregamento */}
      <div className="loader" aria-live="polite">
        <div className="loader__in">
          <p className="loader__label">Experiência carregando, aguarde</p>
          <p className="loader__count">
            <span ref={count}>000</span>
            <small>%</small>
          </p>
        </div>
        <LogoMark className="loader__logo" />
      </div>

      {/* cabeçalho */}
      <header className="head">
        <a href="#top" className="brand lg" onClick={link('top')} aria-label="SilvaDev, voltar ao início">
          <Brand />
        </a>
        <nav className="head__nav lg" aria-label="Principal">
          <span className="head__blob" aria-hidden="true" />
          {[
            ['abordagem', 'Abordagem'],
            ['trabalhos', 'Projetos'],
            ['servicos', 'Serviços'],
            ['contato', 'Contato'],
          ].map(([id, l]) => (
            <a key={id} href={`#${id}`} data-id={id} className={active === id ? 'on' : undefined} onClick={link(id)}>
              <Roll>{l}</Roll>
            </a>
          ))}
        </nav>
        <div className="head__actions">
          <button
            type="button"
            className="chip chip--icon lg"
            onClick={(e) => flipTheme(theme === 'dark' ? 'light' : 'dark', e.currentTarget)}
            aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
          >
            <span className="chip__moon" aria-hidden="true" />
          </button>
          <button type="button" className={`chip chip--menu lg${menu ? ' is-open' : ''}`} onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-controls="menu">
            <span className="burger" aria-hidden="true">
              <i />
              <i />
            </span>
            <Roll>{menu ? 'Fechar' : 'Menu'}</Roll>
          </button>
          <a className="chip chip--solid" href="#contato" onClick={link('contato')} data-magnetic>
            <Roll>Vamos conversar</Roll>
          </a>
        </div>
      </header>

      {/* menu de tela cheia */}
      <div className="menu" id="menu" style={{ visibility: 'hidden' }} role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent>
        <nav className="menu__links" aria-label="Seções">
          {MENU.map((m, i) => (
            <a
              key={m.id}
              className="menu__link"
              href={`#${m.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(m.id, true);
              }}
            >
              <span>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <Roll>{m.label}</Roll>
              </span>
            </a>
          ))}
        </nav>
        <div className="menu__side">
          <p className="menu__h">Ajustes</p>
          <div className="menu__set">
            <span>Tema</span>
            <div className="seg" role="group" aria-label="Tema">
              <button type="button" className={theme === 'light' ? 'on' : ''} aria-pressed={theme === 'light'} onClick={(e) => flipTheme('light', e.currentTarget)}>
                Claro
              </button>
              <button type="button" className={theme === 'dark' ? 'on' : ''} aria-pressed={theme === 'dark'} onClick={(e) => flipTheme('dark', e.currentTarget)}>
                Escuro
              </button>
            </div>
          </div>
          <div className="menu__set">
            <span>Qualidade</span>
            <div className="seg" role="group" aria-label="Qualidade">
              <button type="button" className={quality === 'high' ? 'on' : ''} aria-pressed={quality === 'high'} onClick={() => changeQuality('high')}>
                Alta · 3D
              </button>
              <button type="button" className={quality === 'low' ? 'on' : ''} aria-pressed={quality === 'low'} onClick={() => changeQuality('low')}>
                Leve
              </button>
            </div>
          </div>
          <a className="menu__gh" href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon /> github.com/{profile.handle}
          </a>
        </div>
      </div>

      <div className="stage" aria-hidden="true">
        {quality === 'high' ? (
          <canvas ref={canvas} />
        ) : (
          <>
            <div className="aura" />
            <div className="hero__orb" />
          </>
        )}
      </div>

      <main id="top">
        {/* 01 · topo */}
        <section className="hero" aria-labelledby="hero-title" data-stage="1">
          <p className="hero__intro hero__fade">
            <b>Oi, eu sou o Paulo.</b> Desenvolvedor full stack. Cuido de cada parte do sistema, do banco de dados à tela, para empresas que querem
            sair da planilha.
          </p>
          <h1 className="hero__title" id="hero-title">
            <Words text="Transformo processos *confusos* em sistemas" />
            <span className="hero__swap hero__fade">
              <Swap a="que a equipe usa todo dia." b="que ninguém quer largar." />
            </span>
          </h1>
          <div className="hero__foot hero__fade">
            <span>[ Role para explorar ]</span>
            <span>Full stack · TypeScript · Python</span>
            <span>Brasil · {new Date().getFullYear()}</span>
          </div>
        </section>

        {/* 02 · abordagem */}
        <section className="approach" id="abordagem" data-stage="2">
          <Label n="01">Abordagem</Label>
          <h2 className="approach__title">
            <Words text="Construo *mais* que telas" />
          </h2>
          <p className="approach__text">
            {'Meus projetos vivem na parte que ninguém vê: autenticação, validação, papéis de acesso e regras de negócio. E em interfaces que deixam tudo isso simples para quem usa no dia a dia.'
              .split(' ')
              .map((w, i) => (
                <span className="lw" key={i}>
                  {w}{' '}
                </span>
              ))}
          </p>
        </section>

        {/* 03 · afirmações */}
        <section className="claims" aria-label="Princípios" data-stage="0">
          {[
            { l: 'Código', t: 'Tecnologia *a serviço* da operação', p: 'Nada de tecnologia pela tecnologia. Cada escolha resolve um problema que existe hoje na empresa.' },
            { l: 'Design', t: 'Beleza *com motivo*', p: 'Interface clara reduz erro, treinamento e retrabalho. Bonito é o que funciona sem explicação.' },
            { l: 'Pessoas', t: 'Feito para quem usa *o dia inteiro*', p: 'Quem opera o sistema é quem mais importa. Ouço essas pessoas antes de escrever a primeira linha.' },
          ].map((c, i) => (
            <article className="claim" key={c.l}>
              <div className="claim__meta" data-fade>
                <Label n={`0${i + 1}`}>{c.l}</Label>
                <p>{c.p}</p>
              </div>
              <div className="claim__big">
                <Words text={c.t} as="h3" />
              </div>
            </article>
          ))}
        </section>

        {/* 04 · projetos */}
        <section className="work" id="trabalhos" aria-labelledby="work-title">
          <div className="sec-head">
            <Label n="02">Projetos selecionados</Label>
            <Words text="Trabalho *real* em produção" as="h2" className="sec-title" />
          </div>
          <div className="work__cols" data-fade>
            <span>Projeto</span>
            <span>Tipo</span>
            <span>Stack</span>
            <span>Ano</span>
          </div>
          <span className="rule" />
          <ul className="work__list" data-stage="3">
            <li className="pill lg" aria-hidden="true" />
            {projects.map((p, i) => (
              <li key={p.id}>
                <button type="button" className="work__row" data-i={i} onClick={() => setPanel(i)} data-fade>
                  <span className="work__n">{p.index}</span>
                  <span className="work__name">
                    <Roll>{p.name}</Roll>
                  </span>
                  <span className="work__type">{p.kicker}</span>
                  <span className="work__stack">{p.stack.slice(0, 3).join(', ')}</span>
                  <span className="work__year">2025</span>
                  <span className="work__go" aria-hidden="true">
                    <Arrow />
                  </span>
                  {p.preview.kind === 'image' && <img className="work__thumb" src={p.preview.src} alt="" loading="lazy" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="preview" aria-hidden="true">
            {projects.map((p) => (p.preview.kind === 'image' ? <img key={p.id} className="preview__img" src={p.preview.src} alt="" /> : null))}
          </div>

          <div className="more" data-stage="0">
            <Label>Mais trabalhos</Label>
            <ul className="more__list">
              {archive.map((a) => (
                <li key={a.name} data-fade>
                  {a.url ? (
                    <a href={a.url} target="_blank" rel="noopener noreferrer">
                      <strong>
                        <Roll>{a.name}</Roll>
                      </strong>
                      <span>{a.note}</span>
                      <em>
                        {a.tags.join(' · ')} <Arrow />
                      </em>
                    </a>
                  ) : (
                    <div>
                      <strong>{a.name}</strong>
                      <span>{a.note}</span>
                      <em>{a.tags.join(' · ')}</em>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 · serviços */}
        <section className="svc" id="servicos" aria-labelledby="svc-title" data-stage="4">
          <div className="sec-head">
            <Label n="03">O que eu faço</Label>
            <Words text="Do banco de dados *até a tela*" as="h2" className="sec-title" />
          </div>
          <span className="rule" />
          <ol className="svc__list">
            <li className="pill lg" aria-hidden="true" />
            {services.map((s, i) => (
              <li key={s.name} data-fade tabIndex={0}>
                <span className="svc__n">{String(i + 1).padStart(3, '0')}</span>
                <strong>{s.name}</strong>
                <span className="svc__note">{s.note}</span>
                <em>{s.tags.join(' · ')}</em>
              </li>
            ))}
          </ol>
        </section>

        {/* 06 · números */}
        <section className="stats" aria-label="Números" data-stage="0">
          <Label n="04">Em números</Label>
          <div className="stats__grid">
            {[
              { n: profile.publicRepos, l: 'repositórios públicos' },
              { n: projects.length, l: 'sistemas em produção' },
              { n: stack.length, l: 'tecnologias em uso' },
              { n: profile.since, l: 'no GitHub desde' },
            ].map((s) => (
              <div className="stat lg" key={s.l} data-fade>
                <b data-n={s.n}>{s.n}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 07 · perguntas */}
        <section className="faq" id="faq" aria-labelledby="faq-title">
          <div className="sec-head">
            <Label n="05">Perguntas</Label>
            <Words text="O que costumam *me perguntar*" as="h2" className="sec-title" />
          </div>
          <span className="rule" />
          <ol className="faq__list">
            {faq.map((f, i) => (
              <li key={f.q} data-fade>
                <details>
                  <summary>
                    <span className="svc__n">{String(i + 1).padStart(2, '0')}</span>
                    <strong>{f.q}</strong>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              </li>
            ))}
          </ol>
        </section>

        {/* 08 · contato */}
        <section className="cta" id="contato" aria-labelledby="cta-title">
          <div className="goo" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i className="goo__me" />
          </div>
          <Label>Vamos conversar</Label>
          <h2 className="cta__title" id="cta-title">
            <Words text="Vamos construir" />
            <Words text="*algo que importa*" />
          </h2>
          <p className="cta__sub" data-fade>
            Tem um processo que hoje vive em planilha? Não precisa chegar com tudo definido.
          </p>
          <div data-fade>
            <Btn href={profile.github}>Falar comigo no GitHub</Btn>
          </div>
        </section>

        {/* rodapé */}
        <footer className="foot">
          <div className="foot__cols">
            <div>
              <p className="foot__h">Páginas</p>
              {MENU.map((m, i) => (
                <a key={m.id} href={`#${m.id}`} onClick={link(m.id)}>
                  <b>{String(i + 1).padStart(2, '0')}</b> <Roll>{m.label}</Roll>
                </a>
              ))}
            </div>
            <div>
              <p className="foot__h">Links</p>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <b>01</b> <Roll>GitHub</Roll>
              </a>
              <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                <b>02</b> <Roll>Repositórios</Roll>
              </a>
            </div>
            <div>
              <p className="foot__h">Site</p>
              <span>silvadev.xyz</span>
              <span className="foot__muted">Feito à mão com React, GSAP e Three.js</span>
            </div>
          </div>
          <p className="foot__word" aria-hidden="true">
            Silva<span>Dev</span>
          </p>
          <div className="foot__bar">
            <span>© 2025–{new Date().getFullYear()} SilvaDev · Paulo Silva</span>
            <button type="button" onClick={() => go('top')}>
              Voltar ao início ↑
            </button>
          </div>
        </footer>

        <div className="loop" aria-hidden="true">
          <div className="loop__in">
            <p>[ Continue rolando ]</p>
            <p className="loop__big">para voltar ao início</p>
            <span className="loop__bar">
              <i />
            </span>
          </div>
        </div>
      </main>

      <ProjectPanel index={panel} onClose={() => setPanel(null)} />
      <svg className="fx" aria-hidden="true">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b" />
          <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
        </filter>
        <filter id="ripple" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.018" numOctaves="1" seed="3" result="t" />
          <feGaussianBlur in="t" stdDeviation="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="curtain" aria-hidden="true" style={{ visibility: 'hidden' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#5b2fe0" />
            </linearGradient>
          </defs>
          <path className="curtain__back" />
          <path className="curtain__front" fill="url(#cg)" />
        </svg>
        <LogoMark className="curtain__logo" />
      </div>
      <div className="cursor" aria-hidden="true">
        <span className="cursor__drop lg" />
        <span className="cursor__label">Ver</span>
      </div>
    </>
  );
}
