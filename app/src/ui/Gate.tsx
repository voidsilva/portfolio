import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { LogoMark } from '../components/Logo';
import { GateSky } from './GateSky';

export type Mode = 'full' | 'lite';

/** Portal de entrada: carrega o mundo e deixa o visitante escolher a experiência. */
export function Gate({ progress, ready, suggestLite, onEnter, onGone }: { progress: number; ready: boolean; suggestLite: boolean; onEnter: (m: Mode, sound: boolean) => void; onGone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const k = Math.min(1, Math.max(0, progress));
  const pct = Math.round(k * 100);

  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(root.current!.querySelectorAll('.gate__actions > *'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out' });
    root.current!.querySelector<HTMLButtonElement>(suggestLite ? '.gate__lite' : '.gate__enter')?.focus({ preventScroll: true });
  }, [ready, suggestLite]);

  const enter = (m: Mode, sound = false) => {
    gsap
      .timeline({ onComplete: onGone })
      .to(root.current!.querySelectorAll('.gate__inner > *'), { autoAlpha: 0, y: -12, stagger: 0.04, duration: 0.4, ease: 'power2.in' })
      // o céu do portal se abre e dissolve na cena do lago
      .to(root.current!.querySelector('.gate__bg'), { scale: 1.12, duration: 1.4, ease: 'power2.inOut' }, 0.15)
      .call(() => onEnter(m, sound), undefined, 0.4)
      .to(root.current, { autoAlpha: 0, duration: 1.3, ease: 'power2.inOut' }, 0.45);
  };

  return (
    <div className="gate" ref={root} role="dialog" aria-modal="true" aria-label="Entrada do portfólio SilvaDev">
      <GateSky />
      <div className="gate__inner">
        <LogoMark className="gate__logo" />
        <p className="gate__word">Silva<b>Dev</b></p>
        <p className="gate__tag">Ideias · Código · Resultados</p>
        {!ready ? (
          <div className="gate__load" aria-live="polite">
            <span>Carregando</span>
            <div className="gate__bar">
              <i style={{ transform: `scaleX(${k})` }} />
            </div>
            <span className="gate__pct">{pct}%</span>
          </div>
        ) : (
          <div className="gate__actions">
            <button className="gate__enter" onClick={() => enter('full', true)} data-cursor>
              <span className="eq" aria-hidden="true"><i /><i /><i /></span> Entrar com som
            </button>
            <button className="gate__nosound" onClick={() => enter('full', false)} data-cursor>
              Entrar sem som
            </button>
            <button className="gate__lite" onClick={() => enter('lite')} data-cursor>
              versão leve, sem animações
            </button>
            {suggestLite && <p className="gate__hint">Seu sistema pede movimento reduzido. A escolha é sua.</p>}
          </div>
        )}
      </div>
      <p className="gate__foot">Use o scroll para navegar</p>
    </div>
  );
}
