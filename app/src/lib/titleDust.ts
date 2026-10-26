import { ScrollTrigger } from './motion';

/**
 * O nome do herói se desfaz em milhares de partículas de luz que sobem com o scroll.
 * As partículas são amostradas do próprio texto renderizado (mesma fonte, tamanho e
 * posição), então a troca do texto para a poeira não dá salto. A posição de cada
 * partícula é função do progresso do scroll, então tudo é reversível ao voltar.
 */
export function titleDust(title: HTMLElement, trigger: string) {
  const canvas = document.createElement('canvas');
  canvas.className = 'dust';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  type P = { x: number; y: number; vx: number; vy: number; sw: number; ph: number; s: number; c: number; d: number };
  let parts: P[] = [];
  let w = 0;
  let h = 0;
  let dpr = 1;
  let progress = 0;
  let sampledAt = 0;
  const COLORS = ['238,240,246', '185,173,255', '143,211,223', '255,196,130'];

  const sample = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // desenha o texto num canvas invisível, exatamente onde ele está na tela
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const o = off.getContext('2d')!;
    sampledAt = scrollY;
    title.querySelectorAll<HTMLElement>(':scope > .mask > span').forEach((span) => {
      const cs = getComputedStyle(span);
      const r = span.getBoundingClientRect();
      o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      o.textBaseline = 'alphabetic';
      // mesmo espaçamento entre letras do CSS (senão as partículas ficam deslocadas do texto)
      (o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
      // linha de base igual à do CSS: a área do texto (ascendente + descendente) fica centrada na linha
      const m = o.measureText('Hg');
      const y = r.top + (r.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
      const stroke = parseFloat(cs.getPropertyValue('-webkit-text-stroke-width')) || 0;
      if (stroke > 0 && cs.color.includes('0)')) {
        o.lineWidth = Math.max(1.5, stroke);
        o.strokeStyle = '#fff';
        o.strokeText(span.textContent ?? '', r.left, y);
      } else {
        o.fillStyle = '#fff';
        o.fillText(span.textContent ?? '', r.left, y);
      }
    });
    const data = o.getImageData(0, 0, w, h).data;
    const step = w < 820 ? 4 : 3;
    parts = [];
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        if (data[(y * w + x) * 4 + 3] < 120) continue;
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2; // a maioria sobe, abrindo em leque
        const sp = 0.35 + Math.random() * 0.9;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          sw: 10 + Math.random() * 40,
          ph: Math.random() * Math.PI * 2,
          s: 1 + Math.random() * 1.6,
          c: Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : Math.random() < 0.5 ? 2 : 3,
          d: Math.random() * 0.35, // atraso: as partículas não saem todas juntas
        });
      }
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const p = progress;
    title.style.opacity = String(1 - Math.min(1, p / 0.05));
    if (p <= 0.001) return;
    // o texto rolou junto com a página desde a amostragem: as partículas partem de onde ele está
    const dy = sampledAt - scrollY;
    for (const q of parts) {
      const k = Math.max(0, Math.min(1, (p - q.d * 0.5) / (1 - q.d * 0.5)));
      if (k <= 0) {
        ctx.fillStyle = `rgba(238,240,246,${Math.min(1, p / 0.05)})`;
        ctx.fillRect(q.x, q.y + dy, 1.6, 1.6);
        continue;
      }
      const e = 1 - Math.pow(1 - k, 3);
      const x = q.x + q.vx * e * w * 0.45 + Math.sin(k * 5 + q.ph) * q.sw * e;
      const y = q.y + dy + q.vy * e * h * 0.9 + Math.cos(k * 4 + q.ph) * q.sw * 0.4 * e;
      const alpha = Math.pow(1 - k, 1.4);
      if (alpha < 0.02) continue;
      // nasce branca e esquenta (lilás, verde-água, âmbar) enquanto sobe
      const col = k < 0.12 ? COLORS[0] : COLORS[q.c];
      const s = q.s * (1 + e * 0.8);
      ctx.fillStyle = `rgba(${col},${alpha})`;
      ctx.fillRect(x, y, s, s);
    }
  };

  sample();
  const st = ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: '65% top',
    scrub: true,
    onUpdate: (s) => {
      progress = s.progress;
      draw();
    },
  });
  const onResize = () => {
    const prev = progress;
    progress = 0;
    title.style.opacity = '1';
    // a amostragem precisa do texto visível e no lugar
    requestAnimationFrame(() => {
      if (scrollY < 4) sample();
      progress = prev;
      draw();
    });
  };
  addEventListener('resize', onResize);

  return () => {
    st.kill();
    removeEventListener('resize', onResize);
    canvas.remove();
    title.style.opacity = '';
  };
}
