import { gsap, colName, cssPx, root } from '../lib/motion';

/*
 * Cursor = seleção de célula. Solto, ele pula de célula em célula de uma grade invisível
 * presa à página (e mostra a referência: C12, D7…). Em cima de algo clicável, a seleção
 * abraça o elemento inteiro, como quando você seleciona um intervalo, e mostra a ação.
 * Tudo num único requestAnimationFrame (o ticker do GSAP), só com transform e tamanho.
 */
export function initCursor() {
  const sel = document.querySelector<HTMLElement>('.sel')!;
  const tag = sel.querySelector<HTMLElement>('.sel__tag')!;
  const glow = document.querySelector<HTMLElement>('.gridglow')!;
  const glowIn = glow.querySelector<HTMLElement>('.gridglow__in')!;
  let cw = cssPx('--cw');
  let ch = cssPx('--ch');
  addEventListener('resize', () => {
    cw = cssPx('--cw');
    ch = cssPx('--ch');
  });

  let px = -999;
  let py = -999;
  let over: HTMLElement | null = null;
  let label = '';
  const cur = { x: 0, y: 0, w: 0, h: 0 };
  let first = true;

  const pick = (t: EventTarget | null) => {
    const el = (t as Element | null)?.closest?.<HTMLElement>('[data-sel], a, button, summary') ?? null;
    if (el && el.closest('.panel__veil')) return null;
    return el;
  };
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX;
      py = e.clientY;
      over = pick(e.target);
      if (!root.classList.contains('has-sel')) root.classList.add('has-sel');
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => root.classList.remove('has-sel'));
  addEventListener('pointerdown', () => sel.classList.add('is-down'), { passive: true });
  addEventListener('pointerup', () => sel.classList.remove('is-down'), { passive: true });
  // ao rolar com o mouse parado, o elemento embaixo muda
  addEventListener(
    'scroll',
    () => {
      if (px < 0) return;
      over = pick(document.elementFromPoint(px, py));
    },
    { passive: true },
  );

  const mod = (a: number, n: number) => ((a % n) + n) % n;
  gsap.ticker.add(() => {
    if (px < -100) return;
    let tx: number, ty: number, tw: number, th: number, text: string;
    if (over && over.isConnected) {
      const b = over.getBoundingClientRect();
      const pad = 5;
      tx = b.left - pad;
      ty = b.top - pad;
      tw = b.width + pad * 2;
      th = b.height + pad * 2;
      text = over.dataset.sel || (over.tagName === 'A' ? 'ABRIR' : 'CLICAR');
    } else {
      const sy = scrollY;
      const c = Math.floor(px / cw);
      const r = Math.floor((py + sy) / ch);
      tx = c * cw;
      ty = r * ch - sy;
      tw = cw;
      th = ch;
      text = `${colName(c)}${r + 1}`;
    }
    const k = first ? 1 : 0.3;
    first = false;
    cur.x += (tx - cur.x) * k;
    cur.y += (ty - cur.y) * k;
    cur.w += (tw - cur.w) * k;
    cur.h += (th - cur.h) * k;
    sel.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
    sel.style.width = `${cur.w.toFixed(2)}px`;
    sel.style.height = `${cur.h.toFixed(2)}px`;
    if (text !== label) {
      label = text;
      tag.textContent = text;
      sel.classList.toggle('is-over', !!over);
    }
    // a grade em volta do cursor fica alinhada com as células da página
    const gx = px - 280;
    const gy = py - 280;
    glow.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    glowIn.style.transform = `translate3d(${-mod(gx, cw) - 0}px, ${-mod(gy + scrollY, ch)}px, 0)`;
  });
}
