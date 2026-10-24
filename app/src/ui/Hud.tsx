import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import { Brand, Arrow, GitHubIcon } from '../components/Logo';
import { profile, projects, type Project } from '../data/content';
import { CHAPTERS } from './Chapters';

const NAV = [
  { id: 'hero', label: 'Início', ch: 0 },
  { id: 'projetos', label: 'Projetos', ch: 2 },
  { id: 'sobre', label: 'Sobre', ch: 3 },
  { id: 'contato', label: 'Contato', ch: 5 },
];

/** Texto que "rola" para cima no hover, revelando uma cópia. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" data-t={children}>
      <span>{children}</span>
    </span>
  );
}

export function Hud({ chapter, progress, onNav, sound, onSound }: { chapter: number; progress: number; onNav: (id: string) => void; sound: boolean; onSound: () => void }) {
  const nav = useRef<HTMLElement>(null);
  const hl = useRef<HTMLSpanElement>(null);
  const active = NAV.reduce((acc, n, i) => (chapter >= n.ch ? i : acc), 0);

  // o destaque desliza até o item da seção atual
  useEffect(() => {
    const el = nav.current?.querySelectorAll<HTMLAnchorElement>('a')[active];
    if (!el || !hl.current) return;
    gsap.to(hl.current, { x: el.offsetLeft, width: el.offsetWidth, duration: 0.7, ease: 'expo.out' });
  }, [active]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNav(id);
  };
  return (
    <>
      <header className="hud hud--top">
        <a href="#hero" className="brand" onClick={(e) => go(e, 'hero')} aria-label="SilvaDev, voltar ao início" data-cursor>
          <Brand />
        </a>
        <nav className="pill" aria-label="Principal" ref={nav}>
          <span className="pill__hl" ref={hl} aria-hidden="true" />
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} className={i === active ? 'on' : ''} onClick={(e) => go(e, n.id)} aria-current={i === active ? 'true' : undefined} data-cursor>
              <Roll>{n.label}</Roll>
            </a>
          ))}
        </nav>
        <div className="hud__actions">
          <button className={`chip${sound ? ' is-on' : ''}`} onClick={onSound} aria-pressed={sound} aria-label={sound ? 'Desligar som' : 'Ligar som'} data-cursor>
            <span className="eq" aria-hidden="true"><i /><i /><i /></span>
            <Roll>{sound ? 'Som' : 'Mudo'}</Roll>
          </button>
          <a className="chip chip--solid" href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor>
            <GitHubIcon /> <Roll>GitHub</Roll>
          </a>
        </div>
      </header>
      <div className={`hud hud--bottom${chapter === 0 ? ' is-quiet' : ''}`} aria-hidden="true">
        <span className="hud__chapter">
          <b>{String(chapter + 1).padStart(2, '0')}</b> <span key={chapter} className="hud__flip">{CHAPTERS[chapter].label}</span>
        </span>
        <span className="hud__prog">
          <i style={{ transform: `scaleX(${progress})` }} />
        </span>
      </div>
    </>
  );
}

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const el = root.current!;
    const dot = el.querySelector('.cursor__dot')!;
    const ring = el.querySelector('.cursor__ring')!;
    const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    el.classList.add('is-hidden');
    const move = (e: PointerEvent) => {
      el.classList.remove('is-hidden');
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = e.target as HTMLElement | null;
      el.classList.toggle('is-hover', !!t?.closest('a, button, [data-cursor]'));
    };
    const leave = () => el.classList.add('is-hidden');
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring">
        <span className="mono">abrir</span>
      </div>
      <div className="cursor__dot" />
    </div>
  );
}

export function ProjectPanel({ index, images, onClose }: { index: number | null; images: string[]; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<number | null>(index);
  const cur = index ?? shown;
  const p: Project | null = cur !== null ? projects[cur] : null;

  useEffect(() => {
    const el = root.current!;
    if (index !== null) {
      setShown(index);
      gsap.killTweensOf(el);
      gsap.set(el, { visibility: 'visible' });
      gsap.fromTo(el.querySelector('.panel__veil'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      gsap.fromTo(el.querySelector('.panel__box'), { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: 'expo.out' });
      gsap.fromTo(el.querySelectorAll('.panel__box > *'), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.8, ease: 'expo.out', delay: 0.15 });
      setTimeout(() => el.querySelector<HTMLButtonElement>('.panel__close')?.focus(), 50);
    } else if (shown !== null) {
      gsap.to(el.querySelector('.panel__veil'), { autoAlpha: 0, duration: 0.4 });
      gsap.to(el.querySelector('.panel__box'), {
        xPercent: 100,
        duration: 0.6,
        ease: 'expo.in',
        onComplete: () => {
          gsap.set(el, { visibility: 'hidden' });
          setShown(null);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && index !== null && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose]);

  return (
    <div className="panel" ref={root} style={{ visibility: 'hidden' }} role="dialog" aria-modal="true" aria-labelledby="panel-title" data-lenis-prevent>
      <div className="panel__veil" onClick={onClose} />
      <div className="panel__box">
        {p && (
          <>
            <div className="panel__head mono">
              <span>
                <b>{p.index}</b> {p.kicker}
              </span>
              <button className="panel__close" onClick={onClose} aria-label="Fechar detalhes" data-cursor>
                Fechar
              </button>
            </div>
            <h3 className="panel__title" id="panel-title">
              {p.name}
            </h3>
            <img className="panel__img" src={images[cur!]} alt={p.preview.kind === 'image' ? p.preview.alt : `Ilustração de ${p.name}`} />
            <p className="panel__summary">{p.summary}</p>
            <div className="panel__ps">
              <div>
                <span className="mono">Problema</span>
                <p>{p.problem}</p>
              </div>
              <div>
                <span className="mono">Solução</span>
                <p>{p.solution}</p>
              </div>
            </div>
            <ul className="chips">
              {p.stack.map((s) => (
                <li key={s} className="mono">
                  {s}
                </li>
              ))}
            </ul>
            <div className="panel__links">
              <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer" data-cursor>
                <GitHubIcon /> Repositório <Arrow />
              </a>
              {p.demo && (
                <a className="btn btn--ghost" href={p.demo.url} target="_blank" rel="noopener noreferrer" data-cursor>
                  {p.demo.label} <Arrow />
                </a>
              )}
            </div>
            {p.preview.kind !== 'image' && <p className="panel__note mono">* Ilustração montada a partir do repositório.</p>}
          </>
        )}
      </div>
    </div>
  );
}
