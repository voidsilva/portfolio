import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { LogoMark } from '../components/Logo';

export type Mode = 'full' | 'lite';

/** Portal de entrada: carrega o mundo e deixa o visitante escolher a experiência. */
export function Gate({ progress, ready, suggestLite, onEnter }: { progress: number; ready: boolean; suggestLite: boolean; onEnter: (m: Mode) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const pct = Math.round(progress * 100);

  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(root.current!.querySelectorAll('.gate__actions > *'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out' });
    root.current!.querySelector<HTMLButtonElement>(suggestLite ? '.gate__lite' : '.gate__enter')?.focus({ preventScroll: true });
  }, [ready, suggestLite]);

  const enter = (m: Mode) => {
    gsap
      .timeline({ onComplete: () => onEnter(m) })
      .to(root.current!.querySelectorAll('.gate__inner > *'), { autoAlpha: 0, y: -12, stagger: 0.04, duration: 0.4, ease: 'power2.in' })
      .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.1');
  };

  return (
    <div className="gate" ref={root} role="dialog" aria-modal="true" aria-label="Entrada do portfólio NeutronX">
      <div className="gate__inner">
        <LogoMark className="gate__logo" />
        <p className="gate__tag mono">[ NEUTRONX · PAULO SILVA ]</p>
        {!ready ? (
          <div className="gate__load" aria-live="polite">
            <span className="mono">Inicializando núcleo</span>
            <div className="gate__bar">
              <i style={{ transform: `scaleX(${progress})` }} />
            </div>
            <span className="mono gate__pct">{String(pct).padStart(3, '0')}%</span>
          </div>
        ) : (
          <div className="gate__actions">
            <button className="gate__enter" onClick={() => enter('full')} data-cursor>
              Entrar na experiência
            </button>
            <button className="gate__lite mono" onClick={() => enter('lite')} data-cursor>
              Versão leve, sem animações
            </button>
            {suggestLite && <p className="gate__hint mono">Seu sistema pede movimento reduzido. A escolha é sua.</p>}
          </div>
        )}
      </div>
      <p className="gate__foot mono">Role para navegar · experiência 3D em tempo real</p>
    </div>
  );
}
