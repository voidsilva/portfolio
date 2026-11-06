import { gsap, ScrollTrigger } from '../lib/motion';

/*
 * Processo: "arrastar a alça" de uma célula e a planilha completar a sequência.
 * A seleção desce no ritmo da rolagem; cada etapa deixa de ser fantasma quando é alcançada.
 */
export function initAutofill() {
  const list = document.querySelector<HTMLElement>('.fill');
  const sel = list?.querySelector<HTMLElement>('.fill__sel');
  if (!list || !sel) return;
  const cells = Array.from(list.querySelectorAll<HTMLElement>('.fill__cell'));
  const tag = sel.querySelector<HTMLElement>('.fill__tag')!;
  const pin = innerWidth > 860;
  let bottoms: number[] = [];
  const measure = () => {
    bottoms = cells.map((c) => c.offsetTop + c.offsetHeight + 1);
  };
  measure();
  cells.forEach((c, i) => i && c.classList.add('is-ghost'));
  const set = (p: number) => {
    const first = bottoms[0];
    const h = first + (bottoms[bottoms.length - 1] - first) * p;
    sel.style.height = `${h + 2}px`;
    let n = 1;
    cells.forEach((c, i) => {
      const on = i === 0 || bottoms[i] - 30 <= h;
      if (on) n = i + 1;
      c.classList.toggle('is-ghost', !on);
    });
    sel.classList.toggle('is-drag', p > 0.01 && p < 0.99);
    tag.textContent = n === 1 ? 'B3' : `B3:B${n + 2}`;
  };
  set(0);
  ScrollTrigger.create({
    trigger: pin ? '.process__pin' : list,
    start: pin ? 'top 64px' : 'top 70%',
    end: pin ? '+=110%' : 'bottom 45%',
    pin: pin ? '.process__pin' : false,
    scrub: true,
    onRefresh: measure,
    onUpdate: (st) => set(gsap.parseEase('power1.inOut')(st.progress)),
  });
}
