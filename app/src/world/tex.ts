import * as THREE from 'three';

/*
  Texturas procedurais: tudo nasce em canvas, nada é baixado.
  Cada gerador devolve cor e, quando faz sentido, relevo e rugosidade.
*/

type Ctx = CanvasRenderingContext2D;

export function canvas(w: number, h = w) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, x: c.getContext('2d', { willReadFrequently: true })! };
}

export function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

/** Ruído de valor 2D com oitavas, repetível nas bordas. */
function fbm(w: number, h: number, scale: number, oct: number, seed: number) {
  const r = seeded(seed);
  const out = new Float32Array(w * h);
  let amp = 1,
    tot = 0;
  for (let o = 0; o < oct; o++) {
    const gw = Math.max(2, Math.round((w / scale) * 2 ** o)),
      gh = Math.max(2, Math.round((h / scale) * 2 ** o));
    const g = new Float32Array(gw * gh).map(() => r());
    for (let y = 0; y < h; y++) {
      const fy = (y / h) * gh,
        y0 = Math.floor(fy) % gh,
        y1 = (y0 + 1) % gh,
        ty = fy - Math.floor(fy),
        sy = ty * ty * (3 - 2 * ty);
      for (let x = 0; x < w; x++) {
        const fx = (x / w) * gw,
          x0 = Math.floor(fx) % gw,
          x1 = (x0 + 1) % gw,
          tx = fx - Math.floor(fx),
          sx = tx * tx * (3 - 2 * tx);
        const a = g[y0 * gw + x0] + (g[y0 * gw + x1] - g[y0 * gw + x0]) * sx;
        const b = g[y1 * gw + x0] + (g[y1 * gw + x1] - g[y1 * gw + x0]) * sx;
        out[y * w + x] += (a + (b - a) * sy) * amp;
      }
    }
    tot += amp;
    amp *= 0.5;
  }
  for (let i = 0; i < out.length; i++) out[i] /= tot;
  return out;
}

/** Relevo (altura em cinza) → mapa de normais. */
function normalFrom(h: Float32Array, w: number, hh: number, k: number) {
  const { c, x } = canvas(w, hh);
  const d = x.createImageData(w, hh);
  for (let y = 0; y < hh; y++)
    for (let i = 0; i < w; i++) {
      const l = h[y * w + ((i - 1 + w) % w)],
        r = h[y * w + ((i + 1) % w)],
        u = h[((y - 1 + hh) % hh) * w + i],
        dn = h[((y + 1) % hh) * w + i];
      let nx = (l - r) * k,
        ny = (dn - u) * k,
        nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      const p = (y * w + i) * 4;
      d.data[p] = (nx * 0.5 + 0.5) * 255;
      d.data[p + 1] = (ny * 0.5 + 0.5) * 255;
      d.data[p + 2] = (nz * 0.5 + 0.5) * 255;
      d.data[p + 3] = 255;
    }
  x.putImageData(d, 0, 0);
  return c;
}

function grayCanvas(h: Float32Array, w: number, hh: number, map: (v: number, i: number) => number) {
  const { c, x } = canvas(w, hh);
  const d = x.createImageData(w, hh);
  for (let i = 0; i < w * hh; i++) {
    const v = Math.max(0, Math.min(255, map(h[i], i) * 255));
    d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v;
    d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  return c;
}

export interface PBR {
  map: HTMLCanvasElement;
  normal?: HTMLCanvasElement;
  rough?: HTMLCanvasElement;
}

/** Carvalho claro: tábuas largas, veio longo, nós raros. */
export function oak(w = 1024, h = 1024, planks = 6, seed = 7): PBR {
  const r = seeded(seed);
  const grain = fbm(w, h, 64, 5, seed);
  const fine = fbm(w, h, 8, 3, seed + 1);
  const { c: map, x } = canvas(w, h);
  const img = x.createImageData(w, h);
  const height = new Float32Array(w * h);
  const ph = h / planks;
  const offs = Array.from({ length: planks }, () => r());
  const tones = Array.from({ length: planks }, () => 0.92 + r() * 0.12);
  const joints = Array.from({ length: planks }, () => r() * w);
  for (let y = 0; y < h; y++) {
    const p = Math.floor(y / ph);
    const yy = (y % ph) / ph;
    for (let i = 0; i < w; i++) {
      const g = grain[y * w + i];
      // veio: linhas esticadas ao longo da tábua, deformadas pelo ruído
      const v = Math.sin((yy * 38 + g * 9 + offs[p] * 20) * Math.PI);
      const ring = Math.pow(Math.abs(v), 6);
      const f = fine[y * w + i];
      let t = tones[p] * (0.9 + 0.1 * f) - ring * 0.07;
      const edge = Math.min(yy, 1 - yy) * ph < 1.2 ? 0.55 : 1;
      const joint = Math.abs(i - joints[p]) < 1.2 ? 0.6 : 1;
      t *= edge * joint;
      const k = (y * w + i) * 4;
      img.data[k] = 222 * t;
      img.data[k + 1] = 196 * t;
      img.data[k + 2] = 162 * t;
      img.data[k + 3] = 255;
      height[y * w + i] = (1 - ring) * 0.3 + f * 0.2 + (edge < 1 || joint < 1 ? -1 : 0);
    }
  }
  x.putImageData(img, 0, 0);
  return {
    map,
    normal: normalFrom(height, w, h, 2.2),
    rough: grayCanvas(height, w, h, (v) => 0.58 - v * 0.12),
  };
}

/** Reboco fino: parede quase lisa com variação muito leve. */
export function plaster(w = 512, seed = 3): PBR {
  const n = fbm(w, w, 40, 6, seed);
  const m = fbm(w, w, 4, 2, seed + 9);
  const h = n.map((v, i) => v * 0.7 + m[i] * 0.3);
  return {
    map: grayCanvas(h, w, w, (v) => 0.94 + v * 0.06),
    normal: normalFrom(h, w, w, 1.4),
  };
}

/** Lã do tapete: trama curta e densa. */
export function wool(w = 512, seed = 5): PBR {
  const n = fbm(w, w, 3, 2, seed);
  const big = fbm(w, w, 120, 3, seed + 2);
  const h = n.map((v, i) => v * 0.8 + big[i] * 0.2);
  const { c, x } = canvas(w, w);
  const d = x.createImageData(w, w);
  for (let i = 0; i < w * w; i++) {
    const t = 0.86 + h[i] * 0.14;
    d.data[i * 4] = 226 * t;
    d.data[i * 4 + 1] = 222 * t;
    d.data[i * 4 + 2] = 216 * t;
    d.data[i * 4 + 3] = 255;
  }
  x.putImageData(d, 0, 0);
  return { map: c, normal: normalFrom(h, w, w, 4) };
}

/** Tela de malha da cadeira: trama em losango, com transparência. */
export function mesh(w = 256): HTMLCanvasElement {
  const { c, x } = canvas(w, w);
  x.fillStyle = '#000';
  x.fillRect(0, 0, w, w);
  x.strokeStyle = '#fff';
  x.lineWidth = w / 40;
  const n = 16;
  for (let i = -n; i < n * 2; i++) {
    x.beginPath();
    x.moveTo((i * w) / n, 0);
    x.lineTo((i * w) / n + w, w);
    x.stroke();
    x.beginPath();
    x.moveTo((i * w) / n, w);
    x.lineTo((i * w) / n + w, 0);
    x.stroke();
  }
  return c;
}

/** Lombadas de livro com título. */
export function spine(title: string, color: string, ink: string, w = 64, h = 512) {
  const { c, x } = canvas(w, h);
  x.fillStyle = color;
  x.fillRect(0, 0, w, h);
  const g = x.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, 'rgba(0,0,0,.18)');
  g.addColorStop(0.15, 'rgba(255,255,255,.08)');
  g.addColorStop(0.85, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,.2)');
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  x.fillStyle = ink;
  x.fillRect(0, 40, w, 3);
  x.fillRect(0, h - 44, w, 3);
  x.save();
  x.translate(w / 2 + 9, h / 2);
  x.rotate(-Math.PI / 2);
  x.font = `500 26px Geist, sans-serif`;
  x.textAlign = 'center';
  x.fillText(title, 0, 0);
  x.restore();
  return c;
}

/** Quadro na parede: composição de linhas, no espírito do logo. */
export function artwork(w = 768, h = 1024) {
  const { c, x } = canvas(w, h);
  x.fillStyle = '#F3EFE8';
  x.fillRect(0, 0, w, h);
  x.strokeStyle = '#15171D';
  x.lineCap = 'round';
  // arco grande
  x.lineWidth = 46;
  x.beginPath();
  x.arc(w * 0.62, h * 0.48, w * 0.3, -Math.PI / 2, Math.PI / 2);
  x.stroke();
  x.strokeStyle = '#8B5CF6';
  x.lineWidth = 46;
  x.beginPath();
  x.moveTo(w * 0.52, h * 0.3);
  x.lineTo(w * 0.3, h * 0.3);
  x.arc(w * 0.3, h * 0.39, h * 0.09, -Math.PI / 2, Math.PI / 2, true);
  x.lineTo(w * 0.42, h * 0.48);
  x.arc(w * 0.42, h * 0.57, h * 0.09, -Math.PI / 2, Math.PI / 2);
  x.lineTo(w * 0.18, h * 0.66);
  x.stroke();
  x.fillStyle = '#2BB8E6';
  x.beginPath();
  x.arc(w * 0.45, h * 0.2, 24, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = '#6A7080';
  x.font = `400 22px "Geist Mono", monospace`;
  x.fillText('SILVADEV  —  ESTÚDIO', 60, h - 70);
  return c;
}

/** Legendas das teclas, em grade. */
export function keyLegends(cols: string[][], w = 1024, h = 320) {
  const { c, x } = canvas(w, h);
  x.fillStyle = '#ffffff';
  x.fillRect(0, 0, w, h);
  x.fillStyle = '#4A5061';
  x.font = `500 20px Geist, sans-serif`;
  x.textAlign = 'center';
  cols.forEach((row, r) =>
    row.forEach((k, i) => {
      x.fillText(k, ((i + 0.5) * w) / row.length, ((r + 0.62) * h) / cols.length);
    }),
  );
  return c;
}

export function toTex(c: HTMLCanvasElement, r: THREE.WebGLRenderer, srgb = true, repeat?: [number, number]) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = Math.min(8, r.capabilities.getMaxAnisotropy());
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
  }
  return t;
}

export function pbrMat(p: PBR, r: THREE.WebGLRenderer, opts: Omit<THREE.MeshStandardMaterialParameters, 'normalScale'> & { repeat?: [number, number]; bump?: number } = {}) {
  const { repeat, bump = 1, ...rest } = opts;
  const m = new THREE.MeshStandardMaterial({
    map: toTex(p.map, r, true, repeat),
    normalMap: p.normal ? toTex(p.normal, r, false, repeat) : null,
    roughnessMap: p.rough ? toTex(p.rough, r, false, repeat) : null,
    ...rest,
  });
  m.normalScale.set(bump, bump);
  return m;
}

export type { Ctx };
