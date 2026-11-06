import { gsap } from '../lib/motion';

/*
 * "Recalcular": a palavra da célula passa por valores aleatórios (como uma fórmula
 * recalculando) e assenta no novo texto, letra por letra. Depois a célula que depende
 * dela pisca e recalcula também. Passar o mouse no título refaz o cálculo.
 */
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#$%=?!0123456789';

function recalc(cell: HTMLElement, to: string, speed = 1) {
  return new Promise<void>((done) => {
    const n = Math.max(cell.textContent!.length, to.length);
    cell.classList.add('is-sel');
    const start = performance.now();
    const settle = (i: number) => (140 + i * 70) / speed;
    let last = 0;
    const tick = (t: number) => {
      const el = t - start;
      if (t - last > 45) {
        last = t;
        let s = '';
        for (let i = 0; i < n; i++) {
          if (el > settle(i)) s += to[i] ?? '';
          else s += el < 60 ? cell.textContent![i] ?? '' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        cell.textContent = s;
      }
      if (el < settle(n - 1) + 20) requestAnimationFrame(tick);
      else {
        cell.textContent = to;
        done();
      }
    };
    requestAnimationFrame(tick);
  });
}

export async function heroRecalc(onFormula: (f: string) => void) {
  const a = document.querySelector<HTMLElement>('.cell--a');
  const b = document.querySelector<HTMLElement>('.cell--b');
  if (!a || !b) return;
  let state: 'from' | 'to' = 'from';
  let busy = false;
  const run = async () => {
    if (busy) return;
    busy = true;
    const next = state === 'from' ? 'to' : 'from';
    onFormula(next === 'to' ? '=SISTEMA(sua_empresa)' : '=planilha_final_v7(2).xlsx');
    await recalc(b, b.dataset[next]!);
    b.classList.toggle('is-done', next === 'to');
    b.classList.remove('is-sel');
    // a célula dependente pisca e recalcula
    a.classList.add('is-flash', 'is-sel');
    await recalc(a, a.dataset[next]!, 1.6);
    gsap.delayedCall(0.35, () => a.classList.remove('is-flash', 'is-sel'));
    state = next;
    busy = false;
  };
  await run();
  // passar o mouse na palavra refaz a conta: volta a ser planilha e recalcula
  let armed = true;
  b.addEventListener('pointerenter', () => {
    if (!armed || busy) return;
    armed = false;
    run().then(() => gsap.delayedCall(0.4, () => run().then(() => gsap.delayedCall(1.2, () => (armed = true)))));
  });
}
