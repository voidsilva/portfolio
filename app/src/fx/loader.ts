import { gsap, colName, root } from '../lib/motion';

/*
 * Carregamento: uma planilha bagunçada (#REF!, "final_v7", formatos misturados)
 * que se arruma em ondas a partir da célula selecionada, no ritmo do carregamento real.
 * No fim, a seleção cresce até cobrir a tela e vira a cortina roxa.
 * Desenho em canvas 2D: centenas de células custam ~1 ms por quadro.
 */
const MESSY = ['#REF!', '???', 'final_v7', 'R$1.2k', '12/3', 'ver c/ Ana', '#VALOR!', '0', 'ok?', '=SOMA(', 'pendente', '7h', 'N/D', '1.240', 'TOTAL??', 'copia (2)', '—', 'x', 'atraso', '#DIV/0!'];
// depois de arrumada, cada coluna tem um tipo só: parece uma tabela de verdade
const CLEAN = [
  ['#4821', '#4822', '#4823', '#4824', '#4825', '#4826'],
  ['06/11/2026', '07/11/2026', '08/11/2026'],
  ['R$ 1.240,00', 'R$ 3.900,00', 'R$ 840,00', 'R$ 95,00'],
  ['Pago', 'Em dia', 'Entregue'],
  ['07:02', '07:15', '06:58'],
  ['Ativo', 'Ativo', 'Concluído'],
];

interface Cell {
  x: number;
  y: number;
  d: number; // distância até a seleção (0..1)
  v: string;
  clean: string;
  ox: number;
  oy: number;
  tone: number;
  next: number;
}

export function runLoader(ready: Promise<unknown>, onCover: () => void) {
  const el = document.querySelector<HTMLElement>('.loader')!;
  const cv = el.querySelector<HTMLCanvasElement>('.loader__grid')!;
  const selEl = el.querySelector<HTMLElement>('.loader__sel')!;
  const num = el.querySelector<HTMLElement>('.loader__n')!;
  const ref = el.querySelector<HTMLElement>('.loader__ref')!;
  const ctx = cv.getContext('2d')!;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const W = innerWidth;
  const H = innerHeight;
  cv.width = W * dpr;
  cv.height = H * dpr;
  ctx.scale(dpr, dpr);

  const mobile = W < 700;
  const cw = mobile ? 84 : 112;
  const ch = 32;
  const top = 40 + 26; // barra de fórmula + cabeçalho das colunas
  const left = 44; // números das linhas
  const cols = Math.ceil((W - left) / cw);
  const rows = Math.ceil((H - top) / ch);
  const sc = Math.floor(cols / 2) - (mobile ? 0 : 1);
  const sr = Math.floor(rows / 2);
  const sx = left + sc * cw;
  const sy = top + sr * ch;
  ref.textContent = `${colName(sc)}${sr + 1}`;
  gsap.set(selEl, { x: sx - 1, y: sy - 1, width: cw + 2, height: ch + 2 });

  const cs = getComputedStyle(root);
  const C = {
    bg: cs.getPropertyValue('--bg').trim(),
    head: cs.getPropertyValue('--bg-2').trim(),
    line: cs.getPropertyValue('--line').trim(),
    line2: cs.getPropertyValue('--line-2').trim(),
    ink: cs.getPropertyValue('--ink').trim(),
    ink2: cs.getPropertyValue('--ink-2').trim(),
    muted: cs.getPropertyValue('--muted').trim(),
    purple: cs.getPropertyValue('--purple').trim(),
  };
  const maxD = Math.hypot(Math.max(sc, cols - sc), Math.max(sr, rows - sr));
  const cells: Cell[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (c === sc && r === sr) continue;
      const filled = Math.random() < 0.62;
      const kind = CLEAN[c % CLEAN.length];
      cells.push({
        x: left + c * cw,
        y: top + r * ch,
        d: Math.hypot(c - sc, r - sr) / maxD,
        v: filled ? MESSY[(Math.random() * MESSY.length) | 0] : '',
        clean: filled && r % 7 !== 6 ? kind[r % kind.length] : '',
        ox: (Math.random() - 0.5) * cw * 0.5,
        oy: (Math.random() - 0.5) * 10,
        tone: Math.random(),
        next: 0,
      });
    }

  const font = '400 12px "Geist Mono", ui-monospace, monospace';
  const state = { p: 0 };
  let raf = 0;
  const draw = (t: number) => {
    const p = state.p;
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    // linhas da grade
    ctx.fillStyle = C.line;
    for (let c = 0; c <= cols; c++) ctx.fillRect(left + c * cw, top - 26, 1, H);
    for (let r = 0; r <= rows; r++) ctx.fillRect(0, top + r * ch, W, 1);
    // cabeçalhos
    ctx.fillStyle = C.head;
    ctx.fillRect(0, top - 26, W, 26);
    ctx.fillRect(0, top, left, H);
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = c === sc ? C.purple : C.muted;
      ctx.fillText(colName(c), left + c * cw + cw / 2, top - 13);
    }
    for (let r = 0; r < rows; r++) {
      ctx.fillStyle = r === sr ? C.purple : C.muted;
      ctx.fillText(String(r + 1), left / 2, top + r * ch + ch / 2);
    }
    ctx.fillStyle = C.line2;
    ctx.fillRect(0, top - 1, W, 1);
    ctx.fillRect(left - 1, top - 26, 1, H);
    // células: bagunça → organizado, em onda saindo da seleção
    for (const k of cells) {
      if (!k.v) continue;
      const done = k.d < p * 1.08 - 0.04;
      if (done) {
        const a = Math.min(1, (p * 1.08 - 0.04 - k.d) * 8);
        ctx.textAlign = 'right';
        ctx.fillStyle = C.ink2;
        ctx.globalAlpha = 0.35 + a * 0.4;
        ctx.fillText(k.clean, k.x + cw - 10, k.y + ch / 2 + 1);
        if (a < 1) {
          // brilho rápido da célula que acabou de recalcular
          ctx.globalAlpha = (1 - a) * 0.22;
          ctx.fillStyle = C.purple;
          ctx.fillRect(k.x + 1, k.y + 1, cw - 1, ch - 1);
        }
        ctx.globalAlpha = 1;
      } else {
        if (t > k.next) {
          k.next = t + 90 + Math.random() * 600;
          if (Math.random() < 0.5) k.v = MESSY[(Math.random() * MESSY.length) | 0];
          k.ox = (Math.random() - 0.5) * cw * 0.5;
        }
        ctx.textAlign = 'left';
        ctx.fillStyle = k.v.startsWith('#') ? C.purple : k.tone > 0.6 ? C.ink : C.muted;
        ctx.globalAlpha = 0.55 + k.tone * 0.45;
        ctx.save();
        ctx.beginPath();
        ctx.rect(k.x, k.y, cw, ch);
        ctx.clip();
        ctx.fillText(k.v, k.x + 10 + Math.max(0, k.ox), k.y + ch / 2 + k.oy);
        ctx.restore();
        ctx.globalAlpha = 1;
      }
    }
    raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);

  // progresso: anda sozinho até 80% e espera o carregamento real para terminar
  const real = { done: false };
  ready.then(() => (real.done = true));
  const tl = gsap.timeline();
  tl.to(state, {
    p: 0.8,
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate: () => void (num.textContent = String(Math.round(state.p * 100))),
  });
  tl.call(() => {
    const finish = () =>
      gsap
        .timeline()
        .to(state, { p: 1, duration: 0.6, ease: 'power2.out', onUpdate: () => void (num.textContent = String(Math.round(state.p * 100))) })
        .to(selEl, { scale: 1.08, duration: 0.12, ease: 'power2.out' }, '+=0.12')
        .to(selEl, { scale: 1, duration: 0.2, ease: 'power2.in' })
        // a seleção cresce até cobrir a tela inteira e vira a cortina
        .to(selEl, { x: 0, y: 0, width: W, height: H, backgroundColor: '#7c4ff2', borderColor: '#8b5cf6', duration: 0.75, ease: 'expo.inOut' }, '+=0.05')
        .to(selEl.children, { autoAlpha: 0, duration: 0.2 }, '<')
        .call(() => {
          cancelAnimationFrame(raf);
          onCover();
          el.remove();
        });
    if (real.done) finish();
    else ready.then(finish);
  });
}
