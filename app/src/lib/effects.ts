import { gsap } from './motion';

/** Botões magnéticos: puxam levemente na direção do cursor e voltam com mola. */
export function magnetic(selector: string, strength = 0.35) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  const offs = els.map((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      x((e.clientX - (b.left + b.width / 2)) * strength);
      y((e.clientY - (b.top + b.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { clearProps: 'x,y' });
    };
  });
  return () => offs.forEach((f) => f());
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/<>';

/** Texto que embaralha e assenta letra a letra (efeito de decodificação). */
export function scramble(el: HTMLElement, duration = 0.9) {
  const final = el.dataset.text ?? el.textContent ?? '';
  el.dataset.text = final;
  const obj = { k: 0 };
  return gsap.to(obj, {
    k: 1,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      const n = Math.floor(obj.k * final.length);
      let out = final.slice(0, n);
      for (let i = n; i < final.length; i++) out += final[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

/** Holofote que segue o cursor dentro de uma seção (via variáveis CSS). */
export function spotlight(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return () => undefined;
  const move = (e: PointerEvent) => {
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - b.left}px`);
    el.style.setProperty('--my', `${e.clientY - b.top}px`);
  };
  el.addEventListener('pointermove', move);
  return () => el.removeEventListener('pointermove', move);
}

/**
 * Inclinação leve dos títulos conforme a velocidade do scroll. Escreve o transform
 * só nesses elementos (uma variável CSS na raiz recalcularia o estilo da página toda).
 */
export function velocitySkew(selector: string) {
  const els = gsap.utils.toArray<HTMLElement>(selector);
  const state = { v: 0 };
  const set = gsap.quickTo(state, 'v', {
    duration: 0.5,
    ease: 'power3.out',
    onUpdate: () => {
      gsap.set(els, { skewY: state.v, transformOrigin: '0% 50%' });
    },
  });
  return (velocity: number) => set(gsap.utils.clamp(-4, 4, -velocity * 0.12));
}
