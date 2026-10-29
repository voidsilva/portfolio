import { TILE } from './caustics';

/*
  Desenhos que a luz forma. Tudo em tons de cinza, 256×256, com margem:
  claro = luz concentrada. Formas grossas funcionam melhor que traço fino.
*/

function canvas() {
  const c = document.createElement('canvas');
  c.width = c.height = TILE;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  x.fillStyle = '#000';
  x.fillRect(0, 0, TILE, TILE);
  return { c, x };
}

function soften(c: HTMLCanvasElement, px: number) {
  const o = document.createElement('canvas');
  o.width = o.height = TILE;
  const x = o.getContext('2d', { willReadFrequently: true })!;
  x.filter = `blur(${px}px)`;
  x.drawImage(c, 0, 0);
  return o;
}

/** Gráfico de barras com linha de tendência: o "sistema" mais simples que existe. */
export function chart(seed = 1) {
  const { c, x } = canvas();
  const bars = [0.34, 0.46, 0.4, 0.58, 0.66, 0.6, 0.82];
  const n = bars.length;
  const left = 46,
    right = 210,
    base = 200,
    top = 64;
  const w = (right - left) / n;
  x.fillStyle = '#fff';
  bars.forEach((b, i) => {
    const v = b * (0.9 + 0.1 * Math.sin(seed * 3 + i));
    x.fillRect(left + i * w + w * 0.2, base - v * (base - top), w * 0.6, v * (base - top));
  });
  x.fillRect(left - 6, base + 6, right - left + 12, 5);
  return soften(c, 1.2);
}

/** Uma palavra em luz. */
export function word(text: string, size = 92, italic = true) {
  const { c, x } = canvas();
  x.fillStyle = '#fff';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  let s = size;
  const font = (n: number) => `${italic ? 'italic ' : ''}500 ${n}px Newsreader, Georgia, serif`;
  x.font = font(s);
  while (x.measureText(text).width > TILE - 44 && s > 20) x.font = font((s -= 4));
  x.fillText(text, TILE / 2, TILE / 2 + s * 0.04);
  return soften(c, 0.9);
}

/** Interface: barra lateral, cards e gráfico. Usada como tela de sistema genérica. */
export function ui() {
  const { c, x } = canvas();
  x.fillStyle = '#fff';
  const r = (a: number, b: number, w: number, h: number) => x.fillRect(a, b, w, h);
  r(30, 52, 34, 152);
  r(78, 52, 46, 34);
  r(132, 52, 46, 34);
  r(186, 52, 40, 34);
  x.lineWidth = 7;
  x.strokeStyle = '#fff';
  x.beginPath();
  const pts = [0.3, 0.42, 0.36, 0.58, 0.52, 0.7, 0.66, 0.84];
  pts.forEach((p, i) => {
    const px = 82 + (i / (pts.length - 1)) * 140,
      py = 196 - p * 84;
    i ? x.lineTo(px, py) : x.moveTo(px, py);
  });
  x.stroke();
  return soften(c, 1.1);
}

/** Captura de projeto simplificada para luz: tons de cinza, contraste alto e pouco detalhe. */
export async function shot(src: string) {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  await img.decode();
  const { c, x } = canvas();
  const pad = 22;
  const w = TILE - pad * 2;
  const h = (w * img.height) / img.width;
  x.filter = 'grayscale(1) contrast(1.3) blur(1px)';
  x.drawImage(img, pad, (TILE - h) / 2, w, h);
  x.filter = 'none';
  // níveis automáticos: o mais escuro vira preto e o mais claro, branco
  const d = x.getImageData(0, 0, TILE, TILE);
  let lo = 255,
    hi = 0;
  for (let i = 0; i < d.data.length; i += 4) {
    const v = d.data[i];
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const k = 255 / Math.max(1, hi - lo);
  // telas escuras viram negativo: o que é painel vira luz
  let sum = 0;
  for (let i = 0; i < d.data.length; i += 4) sum += d.data[i];
  const dark = sum / (d.data.length / 4) < 110;
  for (let i = 0; i < d.data.length; i += 4) {
    let v = ((d.data[i] - lo) * k) / 255;
    if (dark) v = 1 - v;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.pow(v, 1.4) * 255;
  }
  x.putImageData(d, 0, 0);
  // moldura clara: a borda da tela vira uma linha de luz
  x.strokeStyle = 'rgba(255,255,255,.9)';
  x.lineWidth = 4;
  x.strokeRect(pad, (TILE - h) / 2, w, h);
  return c;
}

/** Lente de processo: o mesmo gráfico, cada vez mais nítido. */
export function blurred(src: HTMLCanvasElement, px: number) {
  return soften(src, px);
}
