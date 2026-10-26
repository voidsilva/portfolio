import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import * as THREE from 'three';
import { gsap, ScrollTrigger, systemReduced, isCoarse } from './lib/motion';
import type { Rig, World as WorldT } from './experience/World';
import { Gate, type Mode } from './ui/Gate';
import { GateSky } from './ui/GateSky';
import { Chapters, CHAPTERS } from './ui/Chapters';
import { Cursor, Hud, ProjectPanel } from './ui/Hud';
import { Ambient } from './experience/Ambient';
import { projects } from './data/content';
import { magnetic, scramble, spotlight, velocitySkew } from './lib/effects';

type Phase = 'loading' | 'gate' | 'in';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

function quality() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  return isCoarse() || weak || window.innerWidth < 820 ? 'low' : 'high';
}

export default function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const world = useRef<WorldT | null>(null);
  const keys = useRef<Record<string, Rig> | null>(null);
  const lenis = useRef<Lenis | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [mode, setMode] = useState<Mode | null>(null);
  const [load, setLoad] = useState(0);
  // as imagens dos projetos são só URLs: a versão leve usa direto, sem esperar o 3D
  const [images] = useState<string[]>(() => projects.map((p) => (p.preview.kind === 'image' ? p.preview.src : '')));
  const modeRef = useRef<Mode | null>(null);
  const [chapter, setChapter] = useState(0);
  const [panel, setPanel] = useState<number | null>(null);
  const [webgl] = useState(hasWebGL);
  const ambient = useRef<Ambient | null>(null);
  const [sound, setSound] = useState(false);
  const [gateGone, setGateGone] = useState(false);

  /* ---------- carregamento ---------- */
  useEffect(() => {
    document.documentElement.classList.add('locked', 'intro');
    let alive = true;
    const steps = { fonts: 0, three: 0, tex: 0 };
    const bump = () => alive && setLoad((steps.fonts + steps.three * 2 + steps.tex * 2) / 5);

    const fonts = Promise.all(
      ['600 40px Montserrat', '800 40px Montserrat', '400 16px Manrope', '500 14px "JetBrains Mono"'].map((f) => document.fonts.load(f).catch(() => null)),
    ).then(() => {
      steps.fonts = 1;
      bump();
    });
    const mod = webgl
      ? import('./experience/World').then((m) => {
          steps.three = 1;
          bump();
          return m;
        })
      : Promise.resolve(null);
    const loader = new THREE.TextureLoader();
    const files = projects.map((p) => (p.preview.kind === 'image' ? p.preview.src : ''));
    let done = 0;
    const texs = Promise.all(
      files.map(
        (f) =>
          new Promise<THREE.Texture>((res) =>
            loader.load(
              f,
              (t) => {
                t.colorSpace = THREE.SRGBColorSpace;
                t.anisotropy = 4;
                steps.tex = ++done / files.length;
                bump();
                res(t);
              },
              undefined,
              () => res(new THREE.Texture()),
            ),
          ),
      ),
    );

    Promise.all([fonts, mod, texs]).then(([, m, loaded]) => {
      // quem entrou na versão leve durante o carregamento não precisa do mundo 3D
      if (!alive || modeRef.current === 'lite') return;
      const all = loaded;
      if (m && canvas.current) {
        if (innerWidth < 820) Object.assign(m.KEYS.hero, { px: 0, lx: 0.2, ly: 1.2, pz: 12 });
        world.current = new m.World(canvas.current, quality(), all);
        if (import.meta.env.DEV) Object.assign(window, { __world: world.current });
        keys.current = m.KEYS;
        world.current.rig.pz = 70;
        world.current.rig.py = 10;
        world.current.start();
      }
      setLoad(1);
      setTimeout(() => alive && setPhase('gate'), 450);
    });
    return () => {
      alive = false;
      world.current?.dispose();
      world.current = null;
    };
  }, [webgl]);

  /* ---------- entrada ---------- */
  const enter = useCallback((m: Mode, withSound: boolean) => {
    if (withSound) {
      ambient.current ??= new Ambient();
      ambient.current.start();
      setSound(true);
    }
    modeRef.current = m;
    setMode(m);
    setPhase('in');
    document.documentElement.classList.remove('locked');
    document.documentElement.classList.toggle('lite', m === 'lite');
  }, []);

  /* ---------- experiência completa ---------- */
  useEffect(() => {
    if (phase !== 'in' || !mode) return;
    const w = world.current;
    const K = keys.current;
    window.scrollTo(0, 0);

    if (mode === 'lite') {
      // versão leve: uma landing page. Sem mundo 3D (libera a GPU), céu em 2D ao fundo,
      // scroll suave e entradas animadas só com transform/opacity.
      world.current?.dispose();
      world.current = null;
      const l = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.current = l;
      l.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => l.raf(t * 1000);
      gsap.ticker.add(tick);
      const ctx = gsap.context(() => {
        gsap.fromTo('.ch--hero .hero__name > .mask > span', { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out', delay: 0.5 });
        gsap.fromTo('.hero__role', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
        gsap.fromTo('.hero__scroll, .hud--top', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out', delay: 1.2 });
        document.documentElement.classList.remove('intro');
        const items = '.manifesto__line, .proj__kicker, .proj__name, .proj__sum, .proj__actions, .proj__lite, .archive .ch__label, .archive li, .about > *, .stackx > .ch__label, .tech, .outro > *';
        gsap.set(items, { autoAlpha: 0, y: 36 });
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out', overwrite: true }),
        });
        // imagens dos projetos sobem um pouco mais devagar que o texto (parallax leve)
        gsap.utils.toArray<HTMLElement>('.proj__lite img').forEach((img) =>
          gsap.fromTo(img, { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }),
        );
      });
      const offMag = isCoarse() ? () => undefined : magnetic('.cta, .chip, .hud__nav a', 0.3);
      const offSpot = spotlight('#stack');
      return () => {
        ctx.revert();
        offMag();
        offSpot();
        gsap.ticker.remove(tick);
        l.destroy();
        lenis.current = null;
      };
    }

    const l = new Lenis({ lerp: 0.07, wheelMultiplier: 0.8, touchMultiplier: 1.3, smoothWheel: true });
    lenis.current = l;
    const skew = velocitySkew('.proj__name, .outro__title, .stackx__words');
    l.on('scroll', (e: Lenis) => {
      ScrollTrigger.update();
      skew(e.velocity);
      ambient.current?.push(Math.abs(e.velocity) / 80);
      world.current?.setVelocity(e.velocity);
    });
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Intro: a câmera chega de longe com um glitch.
      if (w && K) {
        w.introStart();
        gsap.to(w.rig, { pz: K.hero.pz, py: K.hero.py, duration: 3.2, ease: 'expo.out' });
        // a cena nasce em blocos grandes e vai ganhando definição enquanto os pixels do portal caem
        gsap.fromTo(w, { pixelate: 42 }, { pixelate: 1, duration: 2.6, ease: 'power2.inOut', snap: { pixelate: 1 } });
      }
      gsap.fromTo('.ch--hero .hero__name > .mask > span', { yPercent: 110 }, { yPercent: 0, duration: 1.6, stagger: 0.12, ease: 'expo.out', delay: 0.9 });
      gsap.fromTo('.hero__role', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 1.3 });
      gsap.fromTo('.hero__scroll, .hud--top', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: 'power2.out', delay: 1.8 });
      // os estados iniciais já estão aplicados: libera o que o CSS escondia durante o portal
      document.documentElement.classList.remove('intro');

      // Câmera: segmentos sequenciais, cada um amarrado a um trecho do scroll.
      if (w && K) {
        const seg = (a: Rig, b: Rig, st: ScrollTrigger.Vars) =>
          gsap.fromTo(w.rig, { ...a, glitch: 0 }, { ...b, glitch: 0, ease: 'none', immediateRender: false, scrollTrigger: { ...st, scrub: true } });

        seg(K.hero, K.over, { trigger: '#hero', start: 'top top', end: 'bottom top' });
        seg(K.over, K.corridor, { trigger: '#manifesto', start: 'top top', end: 'bottom bottom' });
        let prev = K.corridor;
        projects.forEach((p, i) => {
          seg(prev, K[`p${i}`], { trigger: `#p-${p.id}`, start: 'top bottom', end: 'top top' });
          prev = K[`p${i}`];
        });
        seg(prev, K.archive, { trigger: '.archive', start: 'top bottom', end: 'top 25%' });
        seg(K.archive, K.about, { trigger: '#sobre', start: 'top bottom', end: 'top top' });
        seg(K.about, K.stack, { trigger: '#stack', start: 'top bottom', end: 'top top' });
        seg(K.stack, K.outro, { trigger: '#contato', start: 'top bottom', end: 'top top' });
      }

      // Texto do corredor: frases que acendem e se afastam.
      const lines = gsap.utils.toArray<HTMLElement>('.manifesto__line');
      const mtl = gsap.timeline({ scrollTrigger: { trigger: '#manifesto', start: 'top top', end: 'bottom bottom', scrub: 0.5 } });
      lines.forEach((ln, i) => {
        mtl.fromTo(ln, { autoAlpha: 0, y: 50, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, i * 1.1);
        // as palavras acendem uma a uma, no ritmo do scroll
        mtl.fromTo(ln.querySelectorAll('.mw'), { opacity: 0.16 }, { opacity: 1, stagger: 0.06, duration: 0.3, ease: 'none' }, i * 1.1 + 0.25);
      });
      mtl.to(lines, { autoAlpha: 0, y: -40, stagger: 0.15, duration: 1, ease: 'power2.in' }, '+=0.8');

      // Projetos: o nome se monta letra a letra quando a placa chega.
      projects.forEach((p) => {
        const el = document.getElementById(`p-${p.id}`)!;
        const tl = gsap.timeline({ paused: true });
        const kicker = el.querySelector<HTMLElement>('.proj__kicker span');
        if (kicker) tl.call(() => void (tl.reversed() || scramble(kicker)), undefined, 0.15);
        tl.fromTo(el.querySelectorAll('.c'), { yPercent: 120, rotate: 8, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.018, duration: 0.9, ease: 'expo.out' })
          .fromTo(el.querySelectorAll('.proj__kicker, .proj__sum, .proj__actions, .proj__count'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 1, ease: 'power3.out' }, 0.2);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 15%',
          end: 'bottom 60%',
          onToggle: (s) => (s.isActive ? tl.timeScale(1).play() : tl.timeScale(2).reverse()),
        });
      });
      gsap.from('.archive li', { autoAlpha: 0, y: 40, scale: 0.96, stagger: 0.07, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.archive', start: 'top 80%' } });


      gsap.fromTo('.about > *', { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '#sobre', start: 'top 70%', end: 'top 10%', scrub: 0.6 } });
      gsap.fromTo('.tech', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.03, ease: 'none', clearProps: 'opacity,visibility', scrollTrigger: { trigger: '#stack', start: 'top 70%', end: 'top 10%', scrub: 0.6 } });
      gsap.fromTo('.ch--outro .mask > span', { yPercent: 115 }, { yPercent: 0, stagger: 0.1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '#contato', start: 'top 20%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.outro > .cta, .foot', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#contato', start: 'top 10%', toggleActions: 'play none none reverse' } });
    });
    const offMag = isCoarse() ? () => undefined : magnetic('.cta, .chip, .hud__nav a', 0.3);
    const offSpot = spotlight('#stack');

    return () => {
      ctx.revert();
      offMag();
      offSpot();
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, [phase, mode]);

  /* ---------- capítulo atual e progresso ---------- */
  useEffect(() => {
    if (phase !== 'in') return;
    const sts = CHAPTERS.map((c, i) =>
      ScrollTrigger.create({ trigger: `#${c.id}`, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setChapter(i) }),
    );
    ScrollTrigger.refresh();
    return () => sts.forEach((s) => s.kill());
  }, [phase]);

  /* ---------- subtítulo do herói: alterna o que eu faço, decodificando ---------- */
  useEffect(() => {
    if (phase !== 'in' || !mode) return;
    const el = document.querySelector<HTMLElement>('.hero__role');
    if (!el) return;
    const words = ['Desenvolvedor full stack', 'Sistemas web sob medida', 'APIs e integrações', 'Dashboards e ERPs'];
    let i = 0;
    const id = window.setInterval(() => {
      if (scrollY > innerHeight || document.hidden) return;
      i = (i + 1) % words.length;
      el.dataset.text = words[i];
      scramble(el, 0.8);
    }, 3800);
    return () => window.clearInterval(id);
  }, [phase, mode]);

  /* ---------- "hover ink": rastro líquido dentro do nome ---------- */
  useEffect(() => {
    if (phase !== 'in' || !mode || isCoarse()) return;
    const h1 = document.querySelector<HTMLElement>('.hero__name');
    const ink = h1?.querySelector<HTMLElement>('.ink');
    if (!h1 || !ink) return;
    const pts: { x: number; y: number; r: number }[] = [];
    let raf = 0;
    const move = (e: PointerEvent) => {
      if (scrollY > innerHeight) return;
      const b = h1.getBoundingClientRect();
      pts.unshift({ x: e.clientX - b.left, y: e.clientY - b.top, r: 150 });
      if (pts.length > 14) pts.pop();
    };
    let idle = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!pts.length) {
        if (idle) return;
        idle = true;
      } else idle = false;
      pts.forEach((p) => (p.r *= 0.94));
      while (pts.length && pts[pts.length - 1].r < 6) pts.pop();
      const m = pts.length
        ? pts.map((p) => `radial-gradient(circle ${p.r.toFixed(0)}px at ${p.x.toFixed(0)}px ${p.y.toFixed(0)}px, #000 35%, transparent 100%)`).join(',')
        : 'linear-gradient(transparent, transparent)';
      ink.style.webkitMaskImage = m;
      ink.style.maskImage = m;
    };
    tick();
    window.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
    };
  }, [phase, mode]);

  /* ---------- ponteiro: parallax, hover e clique nas placas ---------- */
  useEffect(() => {
    if (phase !== 'in' || mode !== 'full') return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      const w = world.current;
      if (!w) return;
      w.setPointer((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
      if (frame++ % 2) return;
      const over = (e.target as HTMLElement).closest('a, button, .panel');
      const idx = chapter === 2 && !over ? w.pick(e.clientX, e.clientY) : -1;
      if (idx >= 0 && idx !== w.hovered) ambient.current?.bell(76 + idx * 2, 0.06);
      w.hovered = idx;
      document.documentElement.toggleAttribute('data-open', idx >= 0);
    };
    const click = (e: MouseEvent) => {
      const w = world.current;
      if (!w || (e.target as HTMLElement).closest('a, button, .panel')) return;
      const idx = w.pick(e.clientX, e.clientY);
      if (idx >= 0) setPanel(idx);
      else if (chapter <= 1 && w.releaseLantern(e.clientX, e.clientY)) ambient.current?.bell(79, 0.05);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('click', click);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', click);
      document.documentElement.removeAttribute('data-open');
    };
  }, [phase, mode, chapter]);

  // trilha: cada capítulo tem seus acordes
  useEffect(() => {
    ambient.current?.setChapter(chapter);
  }, [chapter]);
  useEffect(() => () => ambient.current?.dispose(), []);

  const toggleSound = useCallback(() => {
    ambient.current ??= new Ambient();
    const on = ambient.current.toggle();
    if (on) ambient.current.setChapter(chapter, true);
    setSound(on);
    return on;
  }, [chapter]);

  // painel aberto: pausa o scroll suave
  useEffect(() => {
    if (panel !== null) ambient.current?.bell(84, 0.05);
    if (panel === null) lenis.current?.start();
    else lenis.current?.stop();
  }, [panel]);

  const nav = useCallback((id: string) => {
    if (lenis.current) lenis.current.scrollTo(`#${id}`, { duration: 2.4 });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <a className="skip" href="#projetos">
        Pular para os projetos
      </a>
      {mode === 'lite' && <GateSky className="lite-sky" rings={false} />}
      {webgl ? <canvas className="gl" ref={canvas} aria-hidden="true" /> : <div className="gl gl--fallback" aria-hidden="true" />}
      {!gateGone && <Gate progress={load} ready={phase !== 'loading'} suggestLite={systemReduced()} onEnter={enter} onGone={() => setGateGone(true)} />}
      {phase === 'in' && (
        <>
          <Hud chapter={chapter} onNav={nav} sound={sound} onSound={toggleSound} />
          <Cursor />
        </>
      )}
      <Chapters onOpen={setPanel} images={images} onNav={nav} />
      <ProjectPanel index={panel} images={images} onClose={() => setPanel(null)} />
    </>
  );
}
