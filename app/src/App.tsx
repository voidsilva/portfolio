import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import * as THREE from 'three';
import { gsap, ScrollTrigger, systemReduced, isCoarse } from './lib/motion';
import type { Rig, World as WorldT } from './experience/World';
import { erpTexture, terminalTexture } from './experience/textures';
import { Gate, type Mode } from './ui/Gate';
import { Chapters, CHAPTERS } from './ui/Chapters';
import { Cursor, Hud, ProjectPanel } from './ui/Hud';
import { projects } from './data/content';

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
  const [images, setImages] = useState<string[]>(projects.map(() => ''));
  const [chapter, setChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState<number | null>(null);
  const [webgl] = useState(hasWebGL);

  /* ---------- carregamento ---------- */
  useEffect(() => {
    document.documentElement.classList.add('locked');
    let alive = true;
    const steps = { fonts: 0, three: 0, tex: 0 };
    const bump = () => alive && setLoad((steps.fonts + steps.three + steps.tex) / 3);

    const fonts = Promise.all(
      ['500 40px "Space Grotesk"', '400 16px Manrope', '500 14px "JetBrains Mono"'].map((f) => document.fonts.load(f).catch(() => null)),
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
    const files = ['/gastos.webp', '/studiaflow.webp', '/vidflow.webp'];
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
      if (!alive) return;
      const erp = erpTexture();
      const term = terminalTexture();
      const all = [erp, term, ...loaded];
      setImages([(erp.image as HTMLCanvasElement).toDataURL('image/webp', 0.85), (term.image as HTMLCanvasElement).toDataURL('image/webp', 0.85), ...files]);
      if (m && canvas.current) {
        world.current = new m.World(canvas.current, quality(), all);
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
  const enter = useCallback((m: Mode) => {
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
      if (w && K) {
        w.stop();
        Object.assign(w.rig, K.hero);
        w.renderOnce();
      }
      const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => setProgress(s.progress) });
      return () => st.kill();
    }

    const l = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.current = l;
    l.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Intro: a câmera chega de longe com um glitch.
      if (w && K) {
        gsap.fromTo(w.rig, { glitch: 1 }, { glitch: 0, duration: 1.4, ease: 'power2.out' });
        gsap.to(w.rig, { pz: K.hero.pz, py: K.hero.py, duration: 3.2, ease: 'expo.out' });
      }
      gsap.from('.ch--hero .mask > span', { yPercent: 115, duration: 1.4, stagger: 0.08, ease: 'expo.out', delay: 0.5 });
      gsap.from('.hero__scroll, .hud', { autoAlpha: 0, duration: 1.2, delay: 1.2 });

      // Câmera: segmentos sequenciais, cada um amarrado a um trecho do scroll.
      if (w && K) {
        const seg = (a: Rig, b: Rig, st: ScrollTrigger.Vars) =>
          gsap.fromTo(w.rig, { ...a, glitch: 0 }, { ...b, glitch: 0, ease: 'none', immediateRender: false, scrollTrigger: { ...st, scrub: true } });
        const pulse = (trigger: string, start: string, end: string) =>
          gsap
            .timeline({ scrollTrigger: { trigger, start, end, scrub: true } })
            .to(w.rig, { glitch: 1, duration: 0.5, ease: 'none' }, 0)
            .to(w.rig, { glitch: 0, duration: 0.5, ease: 'none' }, 0.5);

        seg(K.hero, K.over, { trigger: '#hero', start: 'top top', end: 'bottom top' });
        seg(K.over, K.corridor, { trigger: '#manifesto', start: 'top top', end: 'bottom bottom' });
        pulse('#hero', '75% top', 'bottom top');
        let prev = K.corridor;
        projects.forEach((p, i) => {
          seg(prev, K[`p${i}`], { trigger: `#p-${p.id}`, start: 'top bottom', end: 'top top' });
          prev = K[`p${i}`];
        });
        pulse('#projetos', 'top bottom', 'top 60%');
        seg(prev, K.about, { trigger: '#sobre', start: 'top bottom', end: 'top top' });
        pulse('#sobre', 'top bottom', 'top 55%');
        seg(K.about, K.stack, { trigger: '#stack', start: 'top bottom', end: 'top top' });
        seg(K.stack, K.outro, { trigger: '#contato', start: 'top bottom', end: 'top top' });
      }

      // Texto do corredor: frases que acendem e se afastam.
      const lines = gsap.utils.toArray<HTMLElement>('.manifesto__line');
      const mtl = gsap.timeline({ scrollTrigger: { trigger: '#manifesto', start: 'top top', end: 'bottom bottom', scrub: 0.5 } });
      lines.forEach((ln, i) => {
        mtl.fromTo(ln, { autoAlpha: 0, y: 60, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1 }, i * 1.1);
      });
      mtl.to(lines, { autoAlpha: 0, y: -50, filter: 'blur(10px)', stagger: 0.15, duration: 1 }, '+=0.8');

      // Projetos: o nome se monta letra a letra quando a placa chega.
      projects.forEach((p) => {
        const el = document.getElementById(`p-${p.id}`)!;
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(el.querySelectorAll('.c'), { yPercent: 120, rotate: 8, autoAlpha: 0 }, { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.018, duration: 0.9, ease: 'expo.out' })
          .fromTo(el.querySelectorAll('.proj__kicker, .proj__open, .proj__meta'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.8, ease: 'expo.out' }, 0.15);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 15%',
          end: 'bottom 60%',
          onToggle: (s) => (s.isActive ? tl.timeScale(1).play() : tl.timeScale(2).reverse()),
        });
      });
      gsap.from('.archive li', { autoAlpha: 0, y: 30, stagger: 0.06, scrollTrigger: { trigger: '.archive', start: 'top 80%' } });

      gsap.fromTo('.about > *', { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '#sobre', start: 'top 70%', end: 'top 10%', scrub: 0.6 } });
      gsap.fromTo('.tech', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.03, ease: 'none', clearProps: 'opacity,visibility', scrollTrigger: { trigger: '#stack', start: 'top 70%', end: 'top 10%', scrub: 0.6 } });
      gsap.fromTo('.stackx__map', { autoAlpha: 0 }, { autoAlpha: 1, scrollTrigger: { trigger: '#stack', start: 'top 40%', toggleActions: 'play none none reverse' } });
      gsap.from('.ch--outro .mask > span', { yPercent: 115, stagger: 0.1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '#contato', start: 'top 20%' } });
      gsap.from('.outro > p, .outro > .btn, .foot', { autoAlpha: 0, y: 20, stagger: 0.08, scrollTrigger: { trigger: '#contato', start: 'top 10%' } });
    });

    return () => {
      ctx.revert();
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
    const all = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => setProgress(s.progress) });
    ScrollTrigger.refresh();
    return () => {
      sts.forEach((s) => s.kill());
      all.kill();
    };
  }, [phase]);

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
      w.hovered = idx;
      document.documentElement.toggleAttribute('data-open', idx >= 0);
    };
    const click = (e: MouseEvent) => {
      const w = world.current;
      if (!w || (e.target as HTMLElement).closest('a, button, .panel')) return;
      const idx = w.pick(e.clientX, e.clientY);
      if (idx >= 0) setPanel(idx);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('click', click);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', click);
      document.documentElement.removeAttribute('data-open');
    };
  }, [phase, mode, chapter]);

  // painel aberto: pausa o scroll suave
  useEffect(() => {
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
      {webgl ? <canvas className="gl" ref={canvas} aria-hidden="true" /> : <div className="gl gl--fallback" aria-hidden="true" />}
      {phase !== 'in' && <Gate progress={load} ready={phase === 'gate'} suggestLite={systemReduced()} onEnter={enter} />}
      {phase === 'in' && (
        <>
          <Hud chapter={chapter} progress={progress} onNav={nav} />
          <Cursor />
        </>
      )}
      <Chapters onOpen={setPanel} images={images} />
      <ProjectPanel index={panel} images={images} onClose={() => setPanel(null)} />
    </>
  );
}
