import * as THREE from 'three';

type Pt = [number, number];

/**
 * Marca SilvaDev (SD) no espaço do SVG (viewBox 64×64, y para baixo).
 * Um S de blocos e um D com cantos chanfrados; o quadrado ciano é o acento.
 * Usada no SVG, no monólito extrudado e nas partículas.
 */
export const LOGO_POLYS: { name: 'S' | 'D'; pts: Pt[]; hole?: Pt[] }[] = [
  {
    name: 'S',
    pts: [[4, 10], [30, 10], [30, 18], [12, 18], [12, 28], [30, 28], [30, 54], [4, 54], [4, 46], [22, 46], [22, 36], [4, 36]],
  },
  {
    name: 'D',
    pts: [[34, 10], [50, 10], [60, 20], [60, 44], [50, 54], [34, 54]],
    hole: [[42, 18], [47, 18], [52, 23], [52, 41], [47, 46], [42, 46]],
  },
];
export const LOGO_DOT: [number, number, number, number] = [55, 2, 6, 6];

export const LOGO_PATHS = LOGO_POLYS.map((p) => {
  const d = (pts: Pt[]) => 'M' + pts.map(([x, y]) => `${x} ${y}`).join('L') + 'Z';
  return d(p.pts) + (p.hole ? d(p.hole) : '');
});

/** Converte para coordenadas do mundo: centralizado em x, base em y=0. */
export function toWorld(x: number, y: number, scale: number) {
  return new THREE.Vector2((x - 32) * scale, (54 - y) * scale);
}

export function logoShapes(scale: number) {
  const path = (pts: Pt[], target: THREE.Path) => {
    pts.forEach(([x, y], i) => {
      const v = toWorld(x, y, scale);
      if (i === 0) target.moveTo(v.x, v.y);
      else target.lineTo(v.x, v.y);
    });
    target.closePath();
  };
  return LOGO_POLYS.map((p) => {
    const s = new THREE.Shape();
    path(p.pts, s);
    if (p.hole) {
      const h = new THREE.Path();
      path(p.hole, h);
      s.holes.push(h);
    }
    return { name: p.name, shape: s };
  });
}

function inside(pt: Pt, poly: Pt[]) {
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
    const x = 2 + rand() * 60;
    const y = 0 + rand() * 56;
    const [dx, dy, dw, dh] = LOGO_DOT;
    const isDot = x >= dx && x <= dx + dw && y >= dy && y <= dy + dh;
    const inLetter = LOGO_POLYS.some((p) => inside([x, y], p.pts) && !(p.hole && inside([x, y], p.hole)));
    if (isDot || inLetter) out.push([x, y, isDot]);
  }
  return out;
}
