import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'expo.out', duration: 1 });

export { gsap, ScrollTrigger };

export const root = document.documentElement;
export const isLite = () => root.classList.contains('lite');
export const isFine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Letra(s) da coluna, como na planilha: 0 → A, 25 → Z, 26 → AA. */
export function colName(i: number) {
  let s = '';
  i = Math.max(0, i);
  do {
    s = String.fromCharCode(65 + (i % 26)) + s;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return s;
}

export function cssPx(name: string) {
  return parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;
}
