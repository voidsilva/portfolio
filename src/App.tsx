import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReduced, isCoarse } from './lib/motion';
import type { CoreScene, Quality, SceneState } from './three/CoreScene';
import { Cursor, Footer, Nav, Progress } from './components/Chrome';
import { Hero } from './components/Hero';
import { Manifesto, MANIFESTO_PIN } from './components/Manifesto';
import { Projects } from './components/Projects';
import { About, Outro, Stack } from './components/Sections';
import { LogoMark } from './components/Logo';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function pickQuality(): Quality {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  return isCoarse() || weak ? 'low' : 'high';
}

type Key = Partial<SceneState>;

/** Composições do núcleo ao longo da página (desktop / mobile). */
function keyframes(mobile: boolean): Record<string, Key> {
  // meia largura visível no plano do núcleo (câmera em z=9, fov 32)
  const halfW = Math.tan((16 * Math.PI) / 180) * 9 * (window.innerWidth / window.innerHeight);
  const right = Math.min(halfW * 0.6, 3.6);
  return {
    hero: mobile
      ? { coreX: 0, coreY: 1.15, scale: 0.72, camZ: 9.5, explode: 0.05, spin: 0, tilt: 0, glow: 1, rings: 1, dim: 0 }
      : { coreX: right, coreY: -0.15, scale: 1.05, camZ: 9, explode: 0.05, spin: 0, tilt: 0, glow: 1, rings: 1, dim: 0 },
    manifestoIn: mobile
      ? { coreX: 0.6, coreY: -2.2, scale: 0.6, camZ: 9, explode: 0.3, spin: Math.PI * 0.6, tilt: 0.3, glow: 0.9, rings: 0.6, dim: 0.5 }
      : { coreX: right + 0.5, coreY: -0.1, scale: 1, camZ: 8.4, explode: 0.3, spin: Math.PI * 0.6, tilt: 0.35, glow: 1.15, rings: 0.8, dim: 0.15 },
    manifestoOut: mobile
      ? { coreX: 0.6, coreY: -2.2, scale: 0.6, camZ: 9, explode: 0.7, spin: Math.PI * 1.4, tilt: 0.6, glow: 0.8, rings: 0.3, dim: 0.6 }
      : { coreX: right + 0.6, coreY: 0, scale: 1.05, camZ: 8, explode: 0.7, spin: Math.PI * 1.4, tilt: 0.6, glow: 1.1, rings: 0.4, dim: 0.2 },
    projects: { coreX: mobile ? 0 : -3.2, coreY: 0.4, scale: 1, camZ: 12, explode: 2.2, spin: Math.PI * 2, tilt: 0.2, glow: 0.4, rings: 0, dim: 0.62 },
    about: { coreX: mobile ? 0 : 2.6, coreY: 0, scale: 0.9, camZ: 11, explode: 1.2, spin: Math.PI * 2.6, tilt: -0.2, glow: 0.8, rings: 0.3, dim: 0.5 },
    stack: { coreX: mobile ? 0 : -2.8, coreY: -0.6, scale: 0.8, camZ: 12, explode: 0.9, spin: Math.PI * 3.2, tilt: 0.1, glow: 0.7, rings: 0.4, dim: 0.72 },
    outro: { coreX: 0, coreY: mobile ? 1.25 : 1.3, scale: mobile ? 0.42 : 0.5, camZ: 8.5, explode: 0.02, spin: Math.PI * 4, tilt: 0, glow: 1.6, rings: 1, dim: 0.15 },
  };
}

export default function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [webgl] = useState(hasWebGL);
  const [reduced] = useState(prefersReduced);

  useEffect(() => {
    if (!webgl || !canvas.current) return;
    let dispose = () => {};
    let cancelled = false;
    // A cena 3D chega depois do texto: o Three.js é carregado sob demanda.
    import('./three/CoreScene').then(({ CoreScene }) => {
      if (cancelled || !canvas.current) return;
      dispose = mountScene(new CoreScene(canvas.current, pickQuality(), reduced));
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [webgl, reduced]);

  function mountScene(scene: CoreScene) {
    const k = keyframes(window.innerWidth < 820);
    Object.assign(scene.state, k.hero);

    if (reduced) {
      scene.renderOnce();
      return () => scene.dispose();
    }

    // Entrada: a câmera se aproxima e o núcleo acende.
    scene.state.camZ = 16;
    scene.state.glow = 0;
    scene.state.explode = 0.9;
    scene.state.dim = 1;
    gsap.to(scene.state, { camZ: k.hero.camZ, glow: 1, explode: 0.05, dim: 0, duration: 2.4, ease: 'expo.out', delay: 0.1 });
    scene.start();
    if (import.meta.env.DEV) (window as unknown as { __scene: CoreScene }).__scene = scene;

    const onMove = (e: PointerEvent) => scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    window.addEventListener('pointermove', onMove);

    const mm = gsap.matchMedia();
    mm.add({ mobile: '(max-width: 819px)', desktop: '(min-width: 820px)' }, (c) => {
      const f = keyframes(!!c.conditions?.mobile);
      const seg = (from: Key, to: Key, st: ScrollTrigger.Vars) =>
        gsap.fromTo(scene.state, { ...from }, { ...to, ease: 'none', immediateRender: false, scrollTrigger: { ...st, scrub: true } });

      seg(f.hero, f.manifestoIn, { trigger: '#manifesto', start: 'top bottom', end: 'top top' });
      seg(f.manifestoIn, f.manifestoOut, { trigger: '#manifesto', start: 'top top', end: () => `+=${window.innerHeight * MANIFESTO_PIN}` });
      seg(f.manifestoOut, f.projects, { trigger: '#projetos', start: 'top bottom', end: 'top 15%' });
      seg(f.projects, f.about, { trigger: '#sobre', start: 'top bottom', end: 'top 30%' });
      seg(f.about, f.stack, { trigger: '#stack', start: 'top bottom', end: 'top 30%' });
      seg(f.stack, f.outro, { trigger: '#contato', start: 'top bottom', end: 'top top' });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('load', refresh);
      mm.revert();
      scene.dispose();
    };
  }

  return (
    <div className={reduced ? 'reduced' : undefined}>
      <a className="skip" href="#projetos">
        Pular para os projetos
      </a>
      {webgl ? (
        <canvas className="gl" ref={canvas} aria-hidden="true" />
      ) : (
        <div className="gl-fallback" aria-hidden="true">
          <LogoMark />
        </div>
      )}
      <div className="grain" aria-hidden="true" />
      <Progress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Projects />
        <About />
        <Stack />
        <Outro />
      </main>
      <Footer />
    </div>
  );
}
