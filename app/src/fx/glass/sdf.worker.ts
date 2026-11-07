/*
 * Campo de distância com sinal (SDF) das palavras de vidro, calculado fora da thread principal
 * para o carregamento não travar. Transformada de distância euclidiana exata
 * (Felzenszwalb & Huttenlocher), com o anti-serrilhado do texto usado para precisão de subpixel.
 * Saída: distância em px CSS, positiva dentro da letra.
 */
const INF = 1e20;

function edt1d(grid: Float64Array, offset: number, stride: number, length: number, f: Float64Array, v: Uint16Array, z: Float64Array) {
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  for (let q = 0; q < length; q++) f[q] = grid[offset + q * stride];
  for (let q = 1, k = 0, s = 0; q < length; q++) {
    do {
      const r = v[k];
      s = (f[q] - f[r] + q * q - r * r) / (q - r) / 2;
    } while (s <= z[k] && --k > -1);
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  for (let q = 0, k = 0; q < length; q++) {
    while (z[k + 1] < q) k++;
    const r = v[k];
    const qr = q - r;
    grid[offset + q * stride] = f[r] + qr * qr;
  }
}

function edt(grid: Float64Array, w: number, h: number, f: Float64Array, v: Uint16Array, z: Float64Array) {
  for (let x = 0; x < w; x++) edt1d(grid, x, w, h, f, v, z);
  for (let y = 0; y < h; y++) edt1d(grid, y * w, 1, w, f, v, z);
}

/** Desfoque de caixa separável (rápido, com soma corrida), borda repetida. */
function boxBlur(src: Float32Array, tmp: Float32Array, w: number, h: number, r: number) {
  const inv = 1 / (2 * r + 1);
  for (let y = 0; y < h; y++) {
    const o = y * w;
    let acc = 0;
    for (let i = -r; i <= r; i++) acc += src[o + Math.min(w - 1, Math.max(0, i))];
    for (let x = 0; x < w; x++) {
      tmp[o + x] = acc * inv;
      acc += src[o + Math.min(w - 1, x + r + 1)] - src[o + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let acc = 0;
    for (let i = -r; i <= r; i++) acc += tmp[Math.min(h - 1, Math.max(0, i)) * w + x];
    for (let y = 0; y < h; y++) {
      src[y * w + x] = acc * inv;
      acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
}

/*
 * Saída em dois canais por texel:
 *  r = distância exata (a silhueta nítida da letra)
 *  g = a mesma distância suavizada (a inclinação do vidro sai daqui: curvas lisas, sem degraus)
 */
self.onmessage = (e: MessageEvent<{ w: number; h: number; k: number; alphas: Uint8Array[] }>) => {
  const { w, h, k, alphas } = e.data;
  const size = w * h;
  const out = new Float32Array(size * alphas.length * 2);
  const outer = new Float64Array(size);
  const inner = new Float64Array(size);
  const raw = new Float32Array(size);
  const soft = new Float32Array(size);
  const tmp = new Float32Array(size);
  const L = Math.max(w, h);
  const f = new Float64Array(L);
  const z = new Float64Array(L + 1);
  const v = new Uint16Array(L);
  const rb = Math.max(2, Math.round(9 * k));
  const max: number[] = [];
  alphas.forEach((a, s) => {
    for (let i = 0; i < size; i++) {
      const c = a[i] / 255;
      if (c >= 0.999) {
        outer[i] = 0;
        inner[i] = INF;
      } else if (c <= 0.001) {
        outer[i] = INF;
        inner[i] = 0;
      } else {
        const o = Math.max(0, 0.5 - c);
        const n = Math.max(0, c - 0.5);
        outer[i] = o * o;
        inner[i] = n * n;
      }
    }
    edt(outer, w, h, f, v, z);
    edt(inner, w, h, f, v, z);
    let m = 0;
    for (let i = 0; i < size; i++) {
      const d = (Math.sqrt(inner[i]) - Math.sqrt(outer[i])) / k;
      if (d > m) m = d;
      raw[i] = soft[i] = d < -320 ? -320 : d > 320 ? 320 : d;
    }
    for (let it = 0; it < 3; it++) boxBlur(soft, tmp, w, h, rb);
    const base = s * size * 2;
    for (let i = 0; i < size; i++) {
      out[base + i * 2] = raw[i];
      out[base + i * 2 + 1] = soft[i];
    }
    // espessura máxima de cada palavra: define o raio da borda arredondada do vidro
    max.push(m);
  });
  (self as unknown as Worker).postMessage({ d: out, m: max }, [out.buffer]);
};
