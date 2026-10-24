import * as THREE from 'three';

const W = 1280;
const H = 800;

function canvas() {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  return [c, c.getContext('2d')!] as const;
}

function finish(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
}

/** Ilustração do Belaways Intelligence, a partir dos módulos do repositório. */
export function erpTexture() {
  const [c, g] = canvas();
  g.fillStyle = '#0d1018';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#10141d';
  g.fillRect(0, 0, 250, H);
  g.strokeStyle = 'rgba(244,245,250,.08)';
  g.beginPath();
  g.moveTo(250, 0);
  g.lineTo(250, H);
  g.stroke();
  g.font = '600 22px "Space Grotesk", sans-serif';
  g.fillStyle = '#F4F5FA';
  g.fillText('Belaways', 34, 58);
  g.fillStyle = '#8B5CF6';
  g.fillText('·', 136, 58);
  g.font = '500 13px "JetBrains Mono", monospace';
  g.fillStyle = '#969BAA';
  g.fillText('OPERAÇÃO', 34, 118);
  const items = ['Dashboard', 'Produtos', 'Alertas', 'Pedidos', 'Logística'];
  items.forEach((s, i) => {
    if (i === 0) {
      g.fillStyle = 'rgba(139,92,246,.18)';
      rr(g, 22, 136, 206, 42, 10);
      g.fill();
    }
    g.font = '500 18px Manrope, sans-serif';
    g.fillStyle = i === 0 ? '#F4F5FA' : '#c4c7d1';
    g.fillText(s, 38, 164 + i * 50);
  });
  g.font = '500 13px "JetBrains Mono", monospace';
  g.fillStyle = '#969BAA';
  g.fillText('ADMINISTRAÇÃO', 34, 432);
  ['Auditoria', 'Usuários', 'Configurações'].forEach((s, i) => {
    g.font = '500 18px Manrope, sans-serif';
    g.fillStyle = '#c4c7d1';
    g.fillText(s, 38, 478 + i * 50);
  });
  // busca
  g.fillStyle = '#171c27';
  rr(g, 290, 34, 950, 54, 12);
  g.fill();
  g.font = '400 17px Manrope, sans-serif';
  g.fillStyle = '#969BAA';
  g.fillText('Pesquisar produto ou SKU', 316, 68);
  // cartões
  ['Estoque', 'Pedidos', 'Alertas', 'Logística'].forEach((s, i) => {
    const x = 290 + i * 242;
    g.fillStyle = '#141924';
    rr(g, x, 118, 226, 150, 16);
    g.fill();
    g.strokeStyle = 'rgba(244,245,250,.08)';
    g.stroke();
    g.font = '500 16px Manrope, sans-serif';
    g.fillStyle = '#969BAA';
    g.fillText(s, x + 22, 152);
    g.fillStyle = i === 0 ? '#8B5CF6' : 'rgba(244,245,250,.18)';
    rr(g, x + 22, 226, [150, 110, 70, 130][i], 10, 5);
    g.fill();
  });
  // gráfico
  g.fillStyle = '#141924';
  rr(g, 290, 298, 710, 460, 16);
  g.fill();
  g.font = '500 16px Manrope, sans-serif';
  g.fillStyle = '#969BAA';
  g.fillText('Indicadores', 314, 334);
  g.lineWidth = 4;
  g.strokeStyle = '#8B5CF6';
  g.beginPath();
  g.moveTo(320, 700);
  g.bezierCurveTo(440, 680, 500, 560, 600, 580);
  g.bezierCurveTo(700, 600, 760, 460, 860, 470);
  g.bezierCurveTo(920, 476, 950, 400, 980, 390);
  g.stroke();
  g.lineWidth = 2;
  g.strokeStyle = 'rgba(244,245,250,.25)';
  g.beginPath();
  g.moveTo(320, 730);
  g.bezierCurveTo(500, 720, 640, 690, 980, 650);
  g.stroke();
  // papéis
  g.fillStyle = '#141924';
  rr(g, 1020, 298, 220, 460, 16);
  g.fill();
  g.font = '500 16px Manrope, sans-serif';
  g.fillStyle = '#969BAA';
  g.fillText('Papéis', 1044, 334);
  ['admin', 'manager', 'operator', 'viewer'].forEach((s, i) => {
    g.strokeStyle = i === 0 ? '#8B5CF6' : 'rgba(244,245,250,.12)';
    g.lineWidth = 1.5;
    rr(g, 1044, 360 + i * 64, 172, 46, 8);
    g.stroke();
    g.font = '500 16px "JetBrains Mono", monospace';
    g.fillStyle = '#F4F5FA';
    g.fillText(s, 1062, 390 + i * 64);
  });
  return finish(c);
}

/** Terminal com as rotas reais do README da API de tarefas. */
export function terminalTexture() {
  const [c, g] = canvas();
  g.fillStyle = '#0b0d13';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#171c27';
  g.fillRect(0, 0, W, 54);
  ['#3a3f4d', '#3a3f4d', '#3a3f4d'].forEach((col, i) => {
    g.fillStyle = col;
    g.beginPath();
    g.arc(32 + i * 24, 27, 7, 0, Math.PI * 2);
    g.fill();
  });
  g.font = '500 16px "JetBrains Mono", monospace';
  g.fillStyle = '#969BAA';
  g.fillText('localhost:3000 · api-rest-tarefas', 120, 33);
  const routes: [string, string, string][] = [
    ['GET', '/health', 'público'],
    ['POST', '/auth/register', 'público'],
    ['POST', '/auth/login', 'accessToken'],
    ['GET', '/tasks?page=1&limit=10', 'JWT'],
    ['GET', '/tasks/:id', 'JWT'],
    ['POST', '/tasks', 'JWT'],
    ['PATCH', '/tasks/:id', 'JWT'],
    ['DELETE', '/tasks/:id', 'JWT'],
  ];
  g.font = '500 26px "JetBrains Mono", monospace';
  routes.forEach(([m, r, a], i) => {
    const y = 120 + i * 50;
    g.fillStyle = m === 'GET' ? '#55D6FF' : '#8B5CF6';
    g.fillText(m, 56, y);
    g.fillStyle = '#F4F5FA';
    g.fillText(r, 210, y);
    g.fillStyle = '#969BAA';
    g.textAlign = 'right';
    g.fillText(a, W - 56, y);
    g.textAlign = 'left';
  });
  g.strokeStyle = 'rgba(244,245,250,.1)';
  g.beginPath();
  g.moveTo(56, 538);
  g.lineTo(W - 56, 538);
  g.stroke();
  g.fillStyle = '#8B5CF6';
  g.fillText('$', 56, 600);
  g.fillStyle = '#F4F5FA';
  g.fillText('npm test', 210, 600);
  g.fillStyle = '#55D6FF';
  g.fillText('✓', 56, 652);
  g.fillStyle = '#F4F5FA';
  g.fillText('9 testes de integração com node:test', 210, 652);
  g.fillStyle = '#969BAA';
  g.fillText('0 dependências · Node 22 · TypeScript nativo', 210, 720);
  return finish(c);
}

/** Número editorial grande, usado atrás das placas da galeria. */
export function numberTexture(n: string) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const g = c.getContext('2d')!;
  g.font = '500 380px "Space Grotesk", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineWidth = 3;
  g.strokeStyle = 'rgba(139,92,246,.9)';
  g.strokeText(n, 256, 270);
  return finish(c);
}

export function haloTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.35)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.flipY = false;
  return t;
}
