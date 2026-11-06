import { gsap } from '../lib/motion';

/** Onda líquida em duas camadas (a tela de entrada e saída do site). */
function wave(a: number, cover: boolean) {
  const b = Math.sin(a * Math.PI) * 22;
  const y = 100 - a * 100;
  return cover ? `M0 100 L0 ${y} Q50 ${y - b} 100 ${y} L100 100 Z` : `M0 0 L100 0 L100 ${y} Q50 ${y + b} 0 ${y} Z`;
}

const parts = () => {
  const el = document.querySelector<HTMLElement>('.curtain')!;
  const [back, front] = Array.from(el.querySelectorAll<SVGPathElement>('path'));
  return { el, back, front, logo: el.querySelector('.curtain__logo')! };
};

function revealTl(tl: gsap.core.Timeline, p: { b: number; f: number }, at?: string | number) {
  const { el, back, front, logo } = parts();
  const draw = () => {
    back.setAttribute('d', wave(p.b, false));
    front.setAttribute('d', wave(p.f, false));
  };
  return tl
    .set(p, { b: 0, f: 0 }, at)
    .to(logo, { autoAlpha: 0, scale: 0.8, y: -30, duration: 0.35, ease: 'power2.in' })
    .to(p, { f: 1, duration: 0.85, ease: 'power3.inOut', onUpdate: draw }, '<0.1')
    .to(p, { b: 1, duration: 0.85, ease: 'power3.inOut', onUpdate: draw }, '<0.12')
    .set(el, { visibility: 'hidden' })
    .set(logo, { y: 0 });
}

/** Cobre a tela, chama onCovered (troca de seção, tema…) e revela de novo. */
export function curtain(onCovered: () => void) {
  const { el, back, front, logo } = parts();
  const p = { b: 0, f: 0 };
  const draw = () => {
    back.setAttribute('d', wave(p.b, true));
    front.setAttribute('d', wave(p.f, true));
  };
  gsap.killTweensOf([p, logo]);
  const tl = gsap
    .timeline()
    .set(el, { visibility: 'visible' })
    .call(draw)
    .to(p, { b: 1, duration: 0.8, ease: 'power3.inOut', onUpdate: draw })
    .to(p, { f: 1, duration: 0.8, ease: 'power3.inOut', onUpdate: draw }, 0.12)
    .fromTo(logo, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 0.62)
    .call(onCovered)
    .to({}, { duration: 0.15 });
  revealTl(tl, p);
  return tl;
}

/** A tela já está toda roxa (fim do carregamento): mostra o logo e escorre para cima. */
export function revealFromCovered(onStart?: () => void) {
  const { el, back, front, logo } = parts();
  back.setAttribute('d', wave(0, false));
  front.setAttribute('d', wave(0, false));
  const tl = gsap
    .timeline()
    .set(el, { visibility: 'visible' })
    .fromTo(logo, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.5)' })
    .call(() => onStart?.())
    .to({}, { duration: 0.1 });
  revealTl(tl, { b: 0, f: 0 });
  return tl;
}
