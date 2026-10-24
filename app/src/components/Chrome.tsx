import { useEffect, useRef, useState } from 'react';
import { Brand, GitHubIcon } from './Logo';
import { gsap, ScrollTrigger, magnetic, prefersReduced, setMotionOverride } from '../lib/motion';
import { profile } from '../data/content';

export function useMagnetic<T extends HTMLElement>(strength?: number) {
  const ref = useRef<T>(null);
  useEffect(() => (ref.current ? magnetic(ref.current, strength) : undefined), [strength]);
  return ref;
}

const links = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#stack', label: 'Stack' },
  { href: '#contato', label: 'Contato' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setSolid(self.scroll() > 40);
        setHidden(self.direction === 1 && self.scroll() > 400);
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${hidden && !open ? ' is-hidden' : ''}${solid && !open ? ' is-solid' : ''}`}>
      <a href="#top" className="brand" aria-label="NeutronX, voltar ao início" data-cursor>
        <Brand />
      </a>
      <nav aria-label="Principal">
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
        <ul id="menu" className={`nav__links${open ? ' is-open' : ''}`}>
          {links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} data-cursor>
                <span className="num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor>
              GitHub ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(ref.current, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' });
    root.current?.classList.add('is-hidden');
    const move = (e: PointerEvent) => {
      root.current?.classList.remove('is-hidden');
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = e.target as HTMLElement | null;
      root.current?.classList.toggle('is-hover', !!t?.closest('a, button, [data-cursor]'));
    };
    const leave = () => root.current?.classList.add('is-hidden');
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring" ref={ring} />
      <div className="cursor__dot" ref={dot} />
    </div>
  );
}

export function MotionToggle() {
  const reduced = prefersReduced();
  return (
    <button
      type="button"
      className="motion-toggle label"
      aria-pressed={!reduced}
      onClick={() => setMotionOverride(reduced ? 'full' : 'reduced')}
      data-cursor
    >
      <i aria-hidden="true" />
      {reduced ? 'Animações reduzidas · ativar' : 'Animações ligadas · reduzir'}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <a href="#top" className="brand" aria-label="Voltar ao início">
        <Brand mono />
      </a>
      <span className="label">© {new Date().getFullYear()} Paulo Silva · silvadev.xyz</span>
      <MotionToggle />
      <a className="link" href={profile.github} target="_blank" rel="noopener noreferrer">
        <GitHubIcon /> github.com/{profile.handle}
      </a>
    </footer>
  );
}
