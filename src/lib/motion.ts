import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'expo.out', duration: 1.1 });

export { gsap, ScrollTrigger };
if (import.meta.env.DEV) Object.assign(window, { __ST: ScrollTrigger, __gsap: gsap });

const MOTION_KEY = 'nx-motion';

/** Preferência salva pelo visitante ('full' | 'reduced'), se houver. */
export function motionOverride(): 'full' | 'reduced' | null {
  try {
    const v = localStorage.getItem(MOTION_KEY);
    return v === 'full' || v === 'reduced' ? v : null;
  } catch {
    return null;
  }
}

export function setMotionOverride(v: 'full' | 'reduced') {
  try {
    localStorage.setItem(MOTION_KEY, v);
  } catch {
    /* sem armazenamento: vale só para esta visita */
  }
  location.reload();
}

export const systemReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const prefersReduced = () => {
  const o = motionOverride();
  return o ? o === 'reduced' : systemReduced();
};
export const isCoarse = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Quebra o texto de um elemento em palavras (mantendo filhos como <em>). */
export function splitWords(el: HTMLElement) {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else {
            const s = document.createElement('span');
            s.className = 'word';
            s.textContent = p;
            words.push(s);
            frag.appendChild(s);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return words;
}

/** Efeito magnético suave para botões e links. Retorna a função de limpeza. */
export function magnetic(el: HTMLElement, strength = 0.3) {
  if (isCoarse() || prefersReduced()) return () => {};
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
  return () => {
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerleave', leave);
  };
}

/** Inclinação 3D moderada seguindo o ponteiro. */
export function tilt(el: HTMLElement, max = 6) {
  if (isCoarse() || prefersReduced()) return () => {};
  const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  gsap.set(el, { transformPerspective: 1100 });
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry(px * max);
    rx(-py * max);
  };
  const leave = () => {
    rx(0);
    ry(0);
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
  return () => {
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerleave', leave);
  };
}
