import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import { GitHubIcon } from '../components/Logo';
import { projects, type Project } from '../data/content';
import { Arrow } from './bits';

/** Detalhes do projeto: entra pela direita, com problema, solução e stack. */
export function ProjectPanel({ index, onClose }: { index: number | null; onClose: () => void }) {
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
            <div className="panel__head">
              <span>
                <b>{p.index}</b> {p.kicker}
              </span>
              <button className="panel__close" onClick={onClose} aria-label="Fechar detalhes">
                Fechar ✕
              </button>
            </div>
            <h3 className="panel__title" id="panel-title">
              {p.name}
            </h3>
            {p.preview.kind === 'image' && <img className="panel__img" src={p.preview.src} alt={p.preview.alt} />}
            <p className="panel__summary">{p.summary}</p>
            <div className="panel__ps">
              <div>
                <span>Problema</span>
                <p>{p.problem}</p>
              </div>
              <div>
                <span>Solução</span>
                <p>{p.solution}</p>
              </div>
            </div>
            <ul className="chips">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="panel__links">
              <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">
                <GitHubIcon /> Repositório <Arrow />
              </a>
              {p.demo && (
                <a className="btn btn--ghost" href={p.demo.url} target="_blank" rel="noopener noreferrer">
                  {p.demo.label} <Arrow />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
