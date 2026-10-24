import * as THREE from 'three';

/**
 * Polígonos da marca NX no espaço do SVG (viewBox 64×64, y para baixo).
 * Usados para extrudar o monólito e para posicionar partículas.
 */
export const LOGO_POLYS: { name: 'bar' | 'diag' | 'cross'; pts: [number, number][] }[] = [
  { name: 'bar', pts: [[8, 10], [16, 10], [16, 54], [8, 54]] },
  { name: 'diag', pts: [[16, 10], [26, 10], [56, 54], [46, 54]] },
  { name: 'cross', pts: [[46, 10], [56, 10], [26, 54], [16, 54]] },
];
export const LOGO_DOT: [number, number, number, number] = [50, 1, 6, 6];

/** Converte para coordenadas do mundo: centralizado em x, base em y=0. */
export function toWorld(x: number, y: number, scale: number) {
  return new THREE.Vector2((x - 32) * scale, (54 - y) * scale);
}

export function logoShapes(scale: number) {
  return LOGO_POLYS.map((p) => {
    const s = new THREE.Shape();
    p.pts.forEach(([x, y], i) => {
      const v = toWorld(x, y, scale);
      if (i === 0) s.moveTo(v.x, v.y);
      else s.lineTo(v.x, v.y);
    });
    s.closePath();
    return { name: p.name, shape: s };
  });
}

function inside(pt: [number, number], poly: [number, number][]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

/** Amostra pontos aleatórios dentro da marca (em unidades do SVG). */
export function sampleLogo(count: number, rand = Math.random) {
  const out: [number, number, boolean][] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 40) {
    const x = 6 + rand() * 52;
    const y = 0 + rand() * 56;
    const [dx, dy, dw, dh] = LOGO_DOT;
    const isDot = x >= dx && x <= dx + dw && y >= dy && y <= dy + dh;
    if (isDot || LOGO_POLYS.some((p) => inside([x, y], p.pts))) out.push([x, y, isDot]);
  }
  return out;
}
