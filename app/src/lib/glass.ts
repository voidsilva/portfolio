/**
 * Vidro líquido: cada elemento .lg ganha um filtro SVG próprio que refrata o que está atrás.
 * O mapa de deslocamento é gerado no canvas a partir do formato do elemento (cápsula ou círculo):
 * a borda curva desvia a luz como uma lente, e o miolo fica quase plano.
 * Só o Chromium aplica filtros SVG no backdrop-filter; nos outros navegadores fica o desfoque do CSS.
 */
const NS = 'http://www.w3.org/2000/svg';
let defs: SVGDefsElement | null = null;
let seq = 0;

export const glassRefracts = () => {
  const nav = navigator as Navigator & { userAgentData?: unknown };
  return !!nav.userAgentData && CSS.supports('backdrop-filter', 'url(#a)');
};

function root() {
  if (defs) return defs;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  defs = document.createElementNS(NS, 'defs');
  svg.appendChild(defs);
  document.body.appendChild(svg);
  return defs;
}

/**
 * Mapa de deslocamento de uma cápsula w×h com raio r. Na faixa da borda (bezel) o vetor aponta
 * para dentro, com perfil de superfície convexa: forte na quina, zero no plano do centro.
 * lens > 0 soma uma ampliação radial (para a gota do cursor).
 */
function map(w: number, h: number, r: number, bezel: number, lens: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const hx = w / 2;
  const hy = h / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - hx;
      const py = y + 0.5 - hy;
      const qx = Math.abs(px) - (hx - r);
      const qy = Math.abs(py) - (hy - r);
      let nx = 0;
      let ny = 0;
      let dist: number;
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(qx, qy) || 1;
        dist = r - l;
        nx = (qx / l) * Math.sign(px);
        ny = (qy / l) * Math.sign(py);
      } else if (qx > qy) {
        dist = r - qx;
        nx = Math.sign(px);
      } else {
        dist = r - qy;
        ny = Math.sign(py);
      }
      let dx = 0;
      let dy = 0;
      if (dist > 0 && dist < bezel) {
        // inclinação de uma superfície "squircle": 1 na borda, 0 no fim do bezel
        const s = 1 - dist / bezel;
        const m = s * s * (3 - 2 * s);
        dx = -nx * m;
        dy = -ny * m;
      }
      if (lens) {
        dx -= (px / hx) * lens;
        dy -= (py / hy) * lens;
      }
      const i = (y * w + x) * 4;
      d[i] = 128 + Math.max(-1, Math.min(1, dx)) * 127;
      d[i + 1] = 128 + Math.max(-1, Math.min(1, dy)) * 127;
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

export type GlassOpts = { bezel?: number; scale?: number; blur?: number; lens?: number; sat?: number };

/** Liga o vidro refrativo num elemento. Devolve a função que desliga. */
export function glass(el: HTMLElement, o: GlassOpts = {}) {
  const id = `lg${++seq}`;
  const f = document.createElementNS(NS, 'filter');
  f.id = id;
  f.setAttribute('filterUnits', 'userSpaceOnUse');
  f.setAttribute('primitiveUnits', 'userSpaceOnUse');
  f.setAttribute('color-interpolation-filters', 'sRGB');
  f.innerHTML = `
    <feGaussianBlur in="SourceGraphic" stdDeviation="${o.blur ?? 3}" result="b"/>
    <feImage result="m" preserveAspectRatio="none"/>
    <feDisplacementMap in="b" in2="m" scale="${o.scale ?? 60}" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feColorMatrix in="d" type="saturate" values="${o.sat ?? 1.7}"/>`;
  root().appendChild(f);
  const im = f.querySelector('feImage')!;
  let lw = 0;
  let lh = 0;
  const build = () => {
    const w = Math.round(el.offsetWidth);
    const h = Math.round(el.offsetHeight);
    if (!w || !h || (w === lw && h === lh)) return;
    lw = w;
    lh = h;
    const r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
    const bezel = Math.min(o.bezel ?? 18, r || 18, w / 2, h / 2);
    for (const n of [f, im]) {
      n.setAttribute('x', '0');
      n.setAttribute('y', '0');
      n.setAttribute('width', String(w));
      n.setAttribute('height', String(h));
    }
    im.setAttribute('href', map(w, h, r, bezel, o.lens ?? 0));
    el.style.setProperty('--lg-f', `url(#${id})`);
  };
  build();
  const ro = new ResizeObserver(build);
  ro.observe(el);
  el.classList.add('lg--live');
  return () => {
    ro.disconnect();
    f.remove();
    el.classList.remove('lg--live');
    el.style.removeProperty('--lg-f');
  };
}

/** Brilho especular: a luz da borda acompanha o ponteiro sobre qualquer .lg. */
export function specular() {
  const move = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.<HTMLElement>('.lg');
    if (!el) return;
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(((e.clientX - b.left) / b.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(((e.clientY - b.top) / b.height) * 100).toFixed(1)}%`);
  };
  window.addEventListener('pointermove', move, { passive: true });
  return () => window.removeEventListener('pointermove', move);
}
