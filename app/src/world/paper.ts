/*
  Tudo que aparece nos cartões é desenhado aqui, em canvas:
  - papéis: a bagunça de toda empresa (planilha, e-mail, recibo, bilhete, conversa, nota fiscal)
  - telas: o que esses papéis viram (os três sistemas, os serviços, o processo, o contato)
*/

const INK = '#10141D';
const INK2 = '#5A6070';
const LINE = '#D9DCE6';
const PURPLE = '#8B5CF6';
const CYAN = '#2BB8E6';
const SERIF = 'Newsreader, Georgia, serif';
const SANS = 'Geist, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, monospace';

function rnd(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Ctx = CanvasRenderingContext2D;

function rr(x: Ctx, a: number, b: number, w: number, h: number, r: number) {
  x.beginPath();
  x.roundRect(a, b, w, h, r);
}

/* ---------- papéis ---------- */

function sheet(x: Ctx, s: number, tint = '#FFFFFF') {
  x.fillStyle = tint;
  x.fillRect(0, 0, s, s);
}

function planilha(x: Ctx, s: number, r: () => number) {
  sheet(x, s);
  const rows = 14,
    cols = 5,
    top = 70,
    rh = (s - top - 20) / rows,
    cw = (s - 40) / cols;
  x.fillStyle = '#EEF0F6';
  x.fillRect(20, top, s - 40, rh);
  x.strokeStyle = LINE;
  x.lineWidth = 2;
  for (let i = 0; i <= rows; i++) {
    x.beginPath();
    x.moveTo(20, top + i * rh);
    x.lineTo(s - 20, top + i * rh);
    x.stroke();
  }
  for (let j = 0; j <= cols; j++) {
    x.beginPath();
    x.moveTo(20 + j * cw, top);
    x.lineTo(20 + j * cw, s - 20);
    x.stroke();
  }
  x.font = `500 26px ${SANS}`;
  x.fillStyle = INK;
  x.fillText('controle_FINAL_v3.xlsx', 22, 46);
  x.font = `400 19px ${MONO}`;
  for (let i = 1; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      const v = j === 0 ? `${String(i).padStart(2, '0')}/10` : (r() * 9000 + 120).toFixed(0);
      x.fillStyle = r() < 0.07 ? '#D0352F' : INK2;
      x.fillText(r() < 0.06 ? '#REF!' : v, 26 + j * cw, top + i * rh + rh * 0.68);
    }
  // marca-texto amarela, típica
  x.fillStyle = 'rgba(255, 214, 10, .35)';
  x.fillRect(20, top + rh * (3 + Math.floor(r() * 8)), s - 40, rh);
}

function email(x: Ctx, s: number, r: () => number) {
  sheet(x, s);
  x.fillStyle = INK;
  x.font = `600 28px ${SANS}`;
  x.fillText('RE: RE: FW: estoque??', 32, 64);
  x.font = `400 20px ${SANS}`;
  x.fillStyle = INK2;
  x.fillText('De: comercial@  Para: todos@', 32, 98);
  x.fillStyle = LINE;
  x.fillRect(32, 118, s - 64, 2);
  x.font = `400 22px ${SANS}`;
  x.fillStyle = INK;
  const lines = ['Pessoal, alguém sabe quanto', 'tem do lote 14? A planilha', 'do financeiro diz uma coisa', 'e o sistema diz outra.', '', 'Vou ver no caderno do Zé.', '', 'Abs'];
  lines.forEach((l, i) => x.fillText(l, 32, 160 + i * 36));
  for (let i = 0; i < 4; i++) {
    x.fillStyle = '#E6E8EF';
    rr(x, 32, 430 + i * 0, (s - 64) * (0.5 + r() * 0.4), 14, 7);
    x.fill();
  }
}

function recibo(x: Ctx, s: number, r: () => number) {
  sheet(x, s, '#FBFAF6');
  x.fillStyle = INK;
  x.textAlign = 'center';
  x.font = `600 26px ${MONO}`;
  x.fillText('CUPOM NÃO FISCAL', s / 2, 60);
  x.font = `400 19px ${MONO}`;
  x.fillText('-----------------------------', s / 2, 90);
  x.textAlign = 'left';
  for (let i = 0; i < 9; i++) {
    x.fillStyle = INK2;
    x.fillText(`ITEM ${String(i + 1).padStart(3, '0')}  x${1 + Math.floor(r() * 4)}`, 40, 125 + i * 32);
    x.textAlign = 'right';
    x.fillText((r() * 90 + 5).toFixed(2), s - 40, 125 + i * 32);
    x.textAlign = 'left';
  }
  x.fillStyle = INK;
  x.font = `600 24px ${MONO}`;
  x.fillText('TOTAL', 40, 445);
  x.textAlign = 'right';
  x.fillText((r() * 900 + 100).toFixed(2), s - 40, 445);
  x.textAlign = 'left';
  // código de barras
  for (let i = 0; i < 70; i++) {
    x.fillStyle = INK;
    x.fillRect(60 + i * 5.6, 462, r() < 0.5 ? 2 : 3.5, 32);
  }
}

function bilhete(x: Ctx, s: number, r: () => number) {
  sheet(x, s, '#FFF3B0');
  x.fillStyle = 'rgba(0,0,0,.05)';
  x.fillRect(0, 0, s, 40);
  x.fillStyle = '#2A2A33';
  x.font = `italic 400 44px ${SERIF}`;
  const notes = [
    ['ligar p/ cliente', 'sobre o pedido', '3 vezes já!!'],
    ['senha do sistema:', 'pergunta pra', 'Márcia'],
    ['conferir caixa', 'de sexta, não', 'bateu de novo'],
    ['NÃO apagar', 'a aba 2', 'da planilha'],
  ][Math.floor(r() * 4)];
  notes.forEach((l, i) => x.fillText(l, 40, 140 + i * 72));
  x.strokeStyle = '#D0352F';
  x.lineWidth = 4;
  x.beginPath();
  x.ellipse(s * 0.62, 140 + 144 - 12, 120, 40, -0.05, 0, Math.PI * 2);
  x.stroke();
}

function conversa(x: Ctx, s: number, r: () => number) {
  sheet(x, s, '#F2F3F7');
  x.fillStyle = INK;
  x.font = `600 24px ${SANS}`;
  x.fillText('Grupo · Operação', 28, 50);
  const msgs = ['chegou o pedido?', 'qual pedido', 'o de ontem', 'qual de ontem kkk', 'manda print', 'tá na planilha?', 'qual planilha'];
  x.font = `400 21px ${SANS}`;
  let y = 84;
  msgs.forEach((m, i) => {
    const me = i % 2 === 1;
    const w = x.measureText(m).width + 36;
    x.fillStyle = me ? '#DCD3FF' : '#FFFFFF';
    rr(x, me ? s - 28 - w : 28, y, w, 46, 16);
    x.fill();
    x.fillStyle = INK;
    x.fillText(m, (me ? s - 28 - w : 28) + 18, y + 30);
    y += 58 + r() * 4;
  });
}

function nota(x: Ctx, s: number, r: () => number) {
  sheet(x, s);
  x.strokeStyle = INK;
  x.lineWidth = 2;
  x.strokeRect(24, 24, s - 48, s - 48);
  x.fillStyle = INK;
  x.font = `600 24px ${SANS}`;
  x.fillText('NOTA FISCAL · DANFE', 44, 70);
  x.font = `400 18px ${MONO}`;
  x.fillStyle = INK2;
  for (let i = 0; i < 6; i++) x.fillText(`${(r() * 1e8).toFixed(0)}  ${(r() * 1e4).toFixed(0)}`, 44, 120 + i * 30);
  x.strokeStyle = LINE;
  for (let i = 0; i < 8; i++) {
    x.beginPath();
    x.moveTo(44, 320 + i * 22);
    x.lineTo(s - 44, 320 + i * 22);
    x.stroke();
  }
  x.save();
  x.translate(s * 0.64, s * 0.3);
  x.rotate(-0.25);
  x.strokeStyle = '#D0352F';
  x.lineWidth = 5;
  x.strokeRect(-110, -34, 220, 68);
  x.fillStyle = '#D0352F';
  x.font = `700 30px ${SANS}`;
  x.textAlign = 'center';
  x.fillText('PENDENTE', 0, 11);
  x.restore();
}

function rabisco(x: Ctx, s: number, r: () => number) {
  sheet(x, s, '#FFFFFF');
  // papel quadriculado com um gráfico à mão
  x.strokeStyle = '#E3E8F3';
  x.lineWidth = 1.5;
  for (let i = 0; i < s; i += 28) {
    x.beginPath();
    x.moveTo(i, 0);
    x.lineTo(i, s);
    x.stroke();
    x.beginPath();
    x.moveTo(0, i);
    x.lineTo(s, i);
    x.stroke();
  }
  x.strokeStyle = '#2A4BD0';
  x.lineWidth = 4;
  x.beginPath();
  x.moveTo(60, 420);
  for (let i = 0; i < 8; i++) x.lineTo(60 + i * 56, 420 - r() * 260 - i * 12);
  x.stroke();
  x.fillStyle = '#2A4BD0';
  x.font = `italic 400 36px ${SERIF}`;
  x.fillText('vendas? (aprox.)', 60, 80);
}

const PAPERS = [planilha, email, recibo, bilhete, conversa, nota, rabisco, planilha, email, bilhete, recibo, conversa, nota, planilha, rabisco, bilhete];

/** Atlas 4×4 com 16 papéis diferentes. */
export function paperAtlas(size = 2048) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d')!;
  const s = size / 4;
  PAPERS.forEach((f, i) => {
    x.save();
    x.translate((i % 4) * s, Math.floor(i / 4) * s);
    x.beginPath();
    x.rect(0, 0, s, s);
    x.clip();
    x.scale(s / 512, s / 512);
    f(x, 512, rnd(i + 3));
    x.restore();
  });
  return c;
}

/* ---------- telas ---------- */

function cover(x: Ctx, img: HTMLImageElement, w: number, h: number) {
  const k = Math.max(w / img.width, h / img.height);
  const dw = img.width * k,
    dh = img.height * k;
  x.drawImage(img, (w - dw) / 2, 0, dw, dh);
}

function services(x: Ctx, w: number, h: number) {
  x.fillStyle = '#F7F8FC';
  x.fillRect(0, 0, w, h);
  const items: [string, (x: Ctx, cx: number, cy: number) => void][] = [
    ['Sistemas internos', (x, cx, cy) => {
      for (let i = 0; i < 3; i++) {
        x.fillStyle = i === 0 ? PURPLE : '#D9D2FB';
        rr(x, cx - 70, cy - 46 + i * 34, i === 0 ? 40 : 140, 24, 6);
        x.fill();
      }
    }],
    ['APIs e integrações', (x, cx, cy) => {
      x.strokeStyle = PURPLE;
      x.lineWidth = 5;
      [[-60, -30], [60, -30], [0, 40]].forEach(([a, b]) => {
        x.beginPath();
        x.moveTo(cx, cy);
        x.lineTo(cx + a, cy + b);
        x.stroke();
      });
      [[0, 0], [-60, -30], [60, -30], [0, 40]].forEach(([a, b], i) => {
        x.fillStyle = i ? '#fff' : PURPLE;
        x.beginPath();
        x.arc(cx + a, cy + b, i ? 14 : 18, 0, 7);
        x.fill();
        x.stroke();
      });
    }],
    ['Painéis e relatórios', (x, cx, cy) => {
      [0.4, 0.65, 0.5, 0.9, 0.75].forEach((v, i) => {
        x.fillStyle = i === 3 ? PURPLE : '#D9D2FB';
        x.fillRect(cx - 70 + i * 30, cy + 50 - v * 100, 20, v * 100);
      });
    }],
    ['Automações', (x, cx, cy) => {
      x.strokeStyle = PURPLE;
      x.lineWidth = 6;
      x.beginPath();
      x.arc(cx, cy, 44, 0.3, Math.PI * 1.7);
      x.stroke();
      x.fillStyle = PURPLE;
      x.beginPath();
      x.moveTo(cx + 46, cy - 38);
      x.lineTo(cx + 54, cy + 2);
      x.lineTo(cx + 18, cy - 14);
      x.fill();
    }],
    ['Acesso e auditoria', (x, cx, cy) => {
      x.strokeStyle = PURPLE;
      x.lineWidth = 6;
      rr(x, cx - 40, cy - 6, 80, 60, 10);
      x.stroke();
      x.beginPath();
      x.arc(cx, cy - 6, 24, Math.PI, 0);
      x.stroke();
      x.fillStyle = PURPLE;
      x.beginPath();
      x.arc(cx, cy + 22, 8, 0, 7);
      x.fill();
    }],
    ['Visão computacional', (x, cx, cy) => {
      x.strokeStyle = PURPLE;
      x.lineWidth = 5;
      const k = 22;
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => {
        x.beginPath();
        x.moveTo(cx + a * 56, cy + b * (56 - k));
        x.lineTo(cx + a * 56, cy + b * 56);
        x.lineTo(cx + a * (56 - k), cy + b * 56);
        x.stroke();
      });
      x.beginPath();
      x.arc(cx, cy - 8, 20, 0, 7);
      x.stroke();
      x.beginPath();
      x.arc(cx, cy + 46, 34, Math.PI * 1.15, Math.PI * 1.85);
      x.stroke();
    }],
  ];
  const cw = w / 3,
    ch = h / 2;
  items.forEach(([t, draw], i) => {
    const a = (i % 3) * cw,
      b = Math.floor(i / 3) * ch;
    x.fillStyle = '#FFFFFF';
    rr(x, a + 18, b + 18, cw - 36, ch - 36, 18);
    x.fill();
    x.strokeStyle = '#E4E6EE';
    x.lineWidth = 2;
    x.stroke();
    draw(x, a + cw / 2, b + ch / 2 - 22);
    x.fillStyle = INK;
    x.font = `400 34px ${SERIF}`;
    x.textAlign = 'center';
    x.fillText(t, a + cw / 2, b + ch - 66);
    x.textAlign = 'left';
  });
}

function process(x: Ctx, w: number, h: number) {
  x.fillStyle = '#E6E8F0';
  x.fillRect(0, 0, w, h);
  const cw = w / 4;
  const names = ['Escuto', 'Desenho', 'Construo', 'Acompanho'];
  for (let i = 0; i < 4; i++) {
    const a = i * cw + 16,
      b = 90,
      ww = cw - 32,
      hh = h - 200;
    x.fillStyle = '#FFFFFF';
    rr(x, a, b, ww, hh, 16);
    x.fill();
    x.strokeStyle = '#E4E6EE';
    x.lineWidth = 2;
    x.stroke();
    const cx = a + ww / 2;
    if (i === 0) {
      // bilhetes da conversa
      ['#FFF3B0', '#DCD3FF', '#CFF3FF'].forEach((c, k) => {
        x.save();
        x.translate(cx - 40 + k * 40, b + 140 + k * 70);
        x.rotate((k - 1) * 0.12);
        x.fillStyle = c;
        x.fillRect(-60, -40, 120, 80);
        x.fillStyle = '#4A5061';
        x.fillRect(-44, -14, 70, 6);
        x.fillRect(-44, 4, 50, 6);
        x.restore();
      });
    } else if (i === 1) {
      // esboço: caixas tracejadas
      x.setLineDash([10, 8]);
      x.strokeStyle = '#4A5061';
      x.lineWidth = 3;
      x.strokeRect(a + 24, b + 30, ww - 48, 40);
      x.strokeRect(a + 24, b + 90, 70, hh - 130);
      x.strokeRect(a + 110, b + 90, ww - 134, 110);
      x.strokeRect(a + 110, b + 220, ww - 134, hh - 260);
      x.setLineDash([]);
    } else {
      // interface de verdade, e no fim com dado vivo
      x.fillStyle = '#D5D9E4';
      x.fillRect(a + 24, b + 30, ww - 48, 40);
      x.fillStyle = '#CBBFFB';
      x.fillRect(a + 24, b + 90, 70, hh - 130);
      x.fillStyle = '#E3E6EE';
      x.fillRect(a + 110, b + 90, ww - 134, 110);
      x.fillRect(a + 110, b + 220, ww - 134, hh - 260);
      const bars = i === 3 ? [0.4, 0.55, 0.5, 0.72, 0.9] : [0.4, 0.4, 0.4, 0.4, 0.4];
      bars.forEach((v, k) => {
        x.fillStyle = i === 3 && k === 4 ? PURPLE : '#A996F7';
        x.fillRect(a + 130 + k * 30, b + 190 - v * 80, 18, v * 80);
      });
      if (i === 3) {
        x.fillStyle = CYAN;
        x.beginPath();
        x.arc(a + ww - 44, b + 50, 10, 0, 7);
        x.fill();
      }
    }
    x.fillStyle = PURPLE;
    x.font = `400 22px ${MONO}`;
    x.fillText(`0${i + 1}`, a, 60);
    x.fillStyle = INK;
    x.font = `400 40px ${SERIF}`;
    x.fillText(names[i], a, h - 50);
  }
}

function contact(x: Ctx, w: number, h: number) {
  const g = x.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#FFFFFF');
  g.addColorStop(1, '#EEEAFE');
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  x.fillStyle = INK;
  x.font = `italic 300 300px ${SERIF}`;
  x.textAlign = 'center';
  x.fillText('olá.', w / 2, h / 2 + 70);
  x.font = `400 28px ${MONO}`;
  x.fillStyle = INK2;
  x.fillText('tudo no lugar. agora é a sua vez.', w / 2, h - 90);
  x.textAlign = 'left';
}

export async function loadImage(src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

function canvasOf(w: number, h: number, draw: (x: Ctx) => void) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!);
  return c;
}

/** Captura de tela de projeto ajustada ao formato do monitor (16:9). */
export const screenFrom = (img: HTMLImageElement, w = 1280, h = 720) => canvasOf(w, h, (x) => cover(x, img, w, h));
export const servicesBoard = (w = 1600, h = 900) => canvasOf(w, h, (x) => services(x, w, h));
export const processBoard = (w = 2400, h = 800) => canvasOf(w, h, (x) => process(x, w, h));
export const contactScreen = (w = 1280, h = 800) => canvasOf(w, h, (x) => contact(x, w, h));
