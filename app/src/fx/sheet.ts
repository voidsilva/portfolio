import { ScrollTrigger } from '../lib/motion';

/*
 * Projetos: a planilha "antes" vira o print do sistema. Cada célula recalcula
 * (pisca roxo e mostra o pedaço da tela) numa onda diagonal, no ritmo da rolagem.
 * Ao chegar em 100%, a imagem real entra por cima (nítida, sem as divisórias).
 */
export function initSheets() {
  document.querySelectorAll<HTMLElement>('.case__media').forEach((media) => {
    const tiles = Array.from(media.querySelectorAll<HTMLElement>('.tile'));
    const img = media.querySelector<HTMLImageElement>('img')!;
    const cols = 6;
    const rows = 6;
    const max = cols + rows - 2;
    const order = tiles.map((_, i) => ((i % cols) + Math.floor(i / cols)) / max);
    const state = tiles.map(() => -1);
    // a imagem só é baixada quando o case chega perto da tela
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      img.loading = 'eager';
    };
    const set = (p: number) => {
      tiles.forEach((t, i) => {
        // cada célula tem a sua janela de 22% da animação
        const local = Math.min(1, Math.max(0, (p * 1.22 - order[i] * 1) / 0.22));
        const q = Math.round(local * 20) / 20;
        if (q === state[i]) return;
        state[i] = q;
        const e = 1 - Math.pow(1 - q, 3);
        t.style.setProperty('--s', String(0.7 + e * 0.3));
        t.style.setProperty('--o', String(e));
        t.classList.toggle('is-flash', q > 0 && q < 1);
      });
      const done = p >= 0.995;
      media.classList.toggle('is-system', done);
      img.style.visibility = done ? 'visible' : 'hidden';
    };
    set(0);
    ScrollTrigger.create({ trigger: media, start: 'top bottom+=400', once: true, onEnter: load });
    ScrollTrigger.create({
      trigger: media,
      start: 'top 78%',
      end: 'center 42%',
      scrub: 0.4,
      onUpdate: (st) => set(st.progress),
    });
  });
}
