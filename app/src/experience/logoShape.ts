import * as THREE from 'three';

/**
 * A marca SilvaDev é definida uma única vez, como traços de SVG (viewBox 64×64).
 * Dela saem o logo da interface, o favicon, o monólito 3D (tubos) e as partículas.
 */
export type Tone = 'white' | 'purple' | 'cyan';
export interface LogoSpec {
  strokes: { d: string; w: number; tone: Exclude<Tone, 'cyan'> }[];
  dots: { cx: number; cy: number; r: number }[];
}

export const LOGOS: Record<'silvadev' | 'monolinha' | 'monograma' | 'minusculas', LogoSpec> = {
  silvadev: {
    strokes: [
      { d: 'M33 18H19a7 7 0 0 0 0 14h8a7 7 0 0 1 0 14H11', w: 8, tone: 'white' },
      { d: 'M36 12h1a20 20 0 0 1 0 40h-1', w: 8, tone: 'purple' },
    ],
    dots: [{ cx: 27, cy: 7.5, r: 3.4 }],
  },
  monolinha: {
    strokes: [
      { d: 'M27 17H15.5a7.5 7.5 0 0 0 0 15h3a7.5 7.5 0 0 1 0 15H7', w: 5.5, tone: 'white' },
      { d: 'M36 17v30h8a15 15 0 0 0 0-30z', w: 5.5, tone: 'purple' },
    ],
    dots: [{ cx: 57, cy: 10, r: 3.2 }],
  },
  monograma: {
    strokes: [
      { d: 'M12 10v44h20a22 22 0 0 0 0-44z', w: 5.5, tone: 'purple' },
      { d: 'M39 22H28.5a5 5 0 0 0 0 10h3a5 5 0 0 1 0 10H21', w: 5, tone: 'white' },
    ],
    dots: [{ cx: 54, cy: 10, r: 3 }],
  },
  minusculas: {
    strokes: [
      { d: 'M27 27h-9a5 5 0 0 0 0 10h3a5 5 0 0 1 0 10H10', w: 6.5, tone: 'white' },
      { d: 'M53 37a10 10 0 1 1 0-0.01', w: 6.5, tone: 'purple' },
      { d: 'M53 14v33', w: 6.5, tone: 'purple' },
    ],
    dots: [{ cx: 20, cy: 14, r: 3.4 }],
  },
};

export const LOGO = LOGOS.silvadev;
export const TONES: Record<Tone, string> = { white: '#EEF0F6', purple: '#A596F2', cyan: '#8FD3DF' };

/** Converte para coordenadas do mundo: centralizado em x, base (y=54) em 0. */
export function toWorld(x: number, y: number, scale: number) {
  return new THREE.Vector2((x - 32) * scale, (54 - y) * scale);
}

/** Pontos ao longo de um traço, usando a geometria de SVG do próprio navegador. */
export function pathPoints(d: string, step = 0.4) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  svg.appendChild(path);
  svg.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden';
  document.body.appendChild(svg);
  const len = path.getTotalLength();
  const n = Math.max(2, Math.ceil(len / step));
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const p = path.getPointAtLength((len * i) / n);
    pts.push([p.x, p.y]);
  }
  const closed = /z\s*$/i.test(d.trim());
  svg.remove();
  return { pts, closed };
}

/** Amostra pontos dentro da marca rasterizando-a num canvas (cada tom num canal). */
export function sampleLogo(spec: LogoSpec, count: number, rand = Math.random) {
  const S = 256;
  const k = S / 64;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.scale(k, k);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.globalCompositeOperation = 'lighter';
  spec.strokes.forEach((s) => {
    g.strokeStyle = s.tone === 'white' ? '#ff0000' : '#00ff00';
    g.lineWidth = s.w;
    g.stroke(new Path2D(s.d));
  });
  g.fillStyle = '#0000ff';
  spec.dots.forEach((d) => {
    g.beginPath();
    g.arc(d.cx, d.cy, d.r, 0, Math.PI * 2);
    g.fill();
  });
  const data = g.getImageData(0, 0, S, S).data;
  const out: [number, number, Tone][] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 60) {
    const px = Math.floor(rand() * S);
    const py = Math.floor(rand() * S);
    const i = (py * S + px) * 4;
    const [r, gg, b] = [data[i], data[i + 1], data[i + 2]];
    if (r + gg + b < 200) continue;
    const tone: Tone = b > 128 ? 'cyan' : gg > r ? 'purple' : 'white';
    out.push([(px + rand()) / k, (py + rand()) / k, tone]);
  }
  return out;
}
