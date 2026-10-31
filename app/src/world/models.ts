import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { canvas, mesh as meshTex, seeded, spine, toTex } from './tex';

/*
  Móveis e objetos do estúdio, modelados por código.
  Medidas em metros, próximas das reais (mesa a 74 cm, monitor de 27", cadeira de escritório).
*/

const V2 = (x: number, y: number) => new THREE.Vector2(x, y);

export const rbox = (w: number, h: number, d: number, r = 0.004, seg = 3) =>
  new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2.02, h / 2.02, d / 2.02));

export function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2,
    y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Placa com cantos arredondados e borda chanfrada, deitada no plano XZ. */
export function slab(w: number, d: number, t: number, r: number, bevel = 0.003) {
  const g = new THREE.ExtrudeGeometry(roundedRectShape(w, d, r), {
    depth: t - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 16,
  });
  g.rotateX(-Math.PI / 2);
  g.translate(0, -t / 2 + bevel, 0);
  g.computeVertexNormals();
  return g;
}

export interface Mats {
  oak: THREE.Material;
  steel: THREE.Material; // preto fosco
  alu: THREE.Material; // alumínio escovado
  chrome: THREE.Material;
  white: THREE.Material;
  plastic: THREE.Material; // plástico claro
  rubber: THREE.Material;
  fabric: THREE.Material;
  ceramic: THREE.Material;
  purple: THREE.Material;
  matte: THREE.Material; // branco fosco de móvel
  felt: THREE.Material; // feltro cinza do mouse pad
  frame: THREE.Material; // plástico cinza claro da cadeira
  slat: THREE.Material; // ripas do painel acústico
}

export function makeMats(): Mats {
  const s = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p);
  return {
    oak: s({ color: 0xdcc6a6, roughness: 0.55 }),
    steel: s({ color: 0x1b1d23, roughness: 0.42, metalness: 0.6, clearcoat: 0.3, clearcoatRoughness: 0.4 }),
    alu: s({ color: 0xd4d7de, roughness: 0.32, metalness: 0.95 }),
    chrome: s({ color: 0xe8eaf0, roughness: 0.12, metalness: 1 }),
    white: s({ color: 0xf6f6f8, roughness: 0.45, clearcoat: 0.4, clearcoatRoughness: 0.3 }),
    plastic: s({ color: 0xeceef2, roughness: 0.38 }),
    rubber: s({ color: 0x23252b, roughness: 0.85 }),
    fabric: s({ color: 0x9fa2aa, roughness: 0.95, sheen: 1, sheenColor: new THREE.Color(0xffffff), sheenRoughness: 0.6 }),
    ceramic: s({ color: 0xefebe4, roughness: 0.55, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
    purple: s({ color: 0x8b5cf6, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 }),
    matte: s({ color: 0xf4f4f6, roughness: 0.5, clearcoat: 0.25, clearcoatRoughness: 0.5 }),
    felt: s({ color: 0xc4c7ce, roughness: 1, sheen: 0.6, sheenColor: new THREE.Color(0xffffff), sheenRoughness: 0.8 }),
    frame: s({ color: 0x8d9099, roughness: 0.45, clearcoat: 0.3, clearcoatRoughness: 0.4 }),
    slat: s({ color: 0xa9adb5, roughness: 0.7 }),
  };
}

/* ---------- mesa branca com gaveteiro ---------- */

export function desk(m: Mats, w = 2.8, d = 0.8, h = 0.74) {
  const g = new THREE.Group();
  const t = 0.03;
  const board = new THREE.Mesh(slab(w, d, t, 0.012, 0.004), m.matte);
  board.position.y = h - t / 2;
  g.add(board);
  // lado esquerdo: painel inteiro, lado direito: gaveteiro com três gavetas
  const panel = new THREE.Mesh(rbox(0.03, h - t, d - 0.04, 0.004), m.matte);
  panel.position.set(-w / 2 + 0.06, (h - t) / 2, 0);
  g.add(panel);
  const pw = 0.44,
    px = w / 2 - pw / 2 - 0.02;
  const carcass = new THREE.Mesh(rbox(pw, h - t, d - 0.04, 0.004), m.matte);
  carcass.position.set(px, (h - t) / 2, -0.004);
  g.add(carcass);
  const gap = new THREE.MeshStandardMaterial({ color: 0x9a9da6, roughness: 0.8 });
  const rows = [0.2, 0.2, 0.26];
  let y = h - t - 0.025;
  rows.forEach((rh) => {
    const front = new THREE.Mesh(rbox(pw - 0.012, rh - 0.006, 0.02, 0.004), m.matte);
    front.position.set(px, y - rh / 2, d / 2 - 0.024 + 0.006);
    // puxador cavado: um vinco escuro no topo da frente
    const grip = new THREE.Mesh(new THREE.PlaneGeometry(pw - 0.07, 0.008), gap);
    grip.position.set(px, y - 0.012, d / 2 - 0.0035);
    g.add(front, grip);
    y -= rh;
  });
  // painel de fundo baixo entre os dois apoios
  const modesty = new THREE.Mesh(rbox(w - pw - 0.12, 0.3, 0.018, 0.003), m.matte);
  modesty.position.set(-pw / 2 + 0.01, h - t - 0.17, -d / 2 + 0.06);
  g.add(modesty);
  return { group: g, top: h };
}

/* ---------- monitor curvo ---------- */

/** Curva a geometria em torno de um eixo vertical à frente da tela (raio R): bordas vêm para quem olha. */
export function bend(geo: THREE.BufferGeometry, R: number) {
  const p = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      z = p.getZ(i);
    const a = x / R;
    p.setX(i, (R - z) * Math.sin(a));
    p.setZ(i, R - (R - z) * Math.cos(a));
  }
  geo.computeVertexNormals();
  return geo;
}

export function monitor(m: Mats, screen: THREE.Material, w = 0.6, h = 0.3375, R = 1.0) {
  const g = new THREE.Group();
  const panel = new THREE.Group();
  const seg = 48;
  const box = (bw: number, bh: number, bd: number, z: number) => {
    const geo = new THREE.BoxGeometry(bw, bh, bd, seg, 1, 1);
    geo.translate(0, 0, z);
    return bend(geo, R);
  };
  // moldura preta finíssima e traseira branca
  const front = new THREE.Mesh(box(w + 0.01, h + 0.012, 0.008, 0), m.steel);
  const shell = new THREE.Mesh(box(w + 0.008, h + 0.01, 0.014, -0.011), m.white);
  const bulge = new THREE.Mesh(box(w * 0.56, h * 0.62, 0.03, -0.03), m.white);
  bulge.position.y = -h * 0.04;
  const sg = new THREE.PlaneGeometry(w, h, seg, 1);
  sg.translate(0, 0, 0.0042);
  const scr = new THREE.Mesh(bend(sg, R), screen);
  const gg = new THREE.PlaneGeometry(w + 0.008, h + 0.008, seg, 1);
  gg.translate(0, 0, 0.0047);
  const glass = new THREE.Mesh(
    bend(gg, R),
    new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.05, transparent: true, opacity: 0.12, clearcoat: 1, depthWrite: false }),
  );
  glass.userData.noAO = true;
  // faixa de luz ambiente atrás, refletida na parede
  panel.add(front, shell, bulge, scr, glass);

  // pé branco: base oval rasa e haste plana levemente inclinada
  const foot = new THREE.Mesh(slab(0.27, 0.2, 0.012, 0.09, 0.004), m.white);
  foot.position.set(0, 0.006, -0.06);
  const neckG = rbox(0.075, 0.33, 0.022, 0.01, 4);
  const neck = new THREE.Mesh(neckG, m.white);
  neck.position.set(0, 0.17, -0.085);
  neck.rotation.x = 0.1;
  const hinge = new THREE.Mesh(rbox(0.1, 0.05, 0.03, 0.01), m.white);
  hinge.position.set(0, 0.3, -0.07);
  g.add(foot, neck, hinge);
  const top = 0.3 + 0.04;
  panel.position.set(0, top, -0.03);
  panel.rotation.x = -0.05;
  g.add(panel);
  return { group: g, panel, screen: scr, height: top + h / 2 };
}

/** Barra de luz sobre o monitor central: acende junto com as telas. */
export function lightBar(m: Mats, len = 0.5) {
  const g = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, len, 24), m.steel);
  bar.rotation.z = Math.PI / 2;
  const capA = new THREE.Mesh(new THREE.CylinderGeometry(0.0115, 0.0115, 0.012, 24), m.alu);
  capA.rotation.z = Math.PI / 2;
  capA.position.x = len / 2;
  const capB = capA.clone();
  capB.position.x = -len / 2;
  // gancho que apoia na traseira do monitor
  const clip = new THREE.Mesh(rbox(0.04, 0.05, 0.03, 0.006), m.steel);
  clip.position.set(0, -0.025, -0.03);
  const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.94, 0.86), toneMapped: false });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(len - 0.04, 0.008), glowMat);
  glow.rotation.x = Math.PI / 2 + 0.5;
  glow.position.set(0, -0.0105, 0.004);
  glow.userData.noAO = true;
  g.add(bar, capA, capB, clip, glow);
  return { group: g, glow: glowMat };
}

/** Mouse pad de feltro, grande. */
export function deskMat(m: Mats, w = 1.0, d = 0.4) {
  return new THREE.Mesh(slab(w, d, 0.003, 0.02, 0.001), m.felt);
}

/* ---------- teclado e mouse ---------- */

export function keyboard(m: Mats) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(slab(0.44, 0.14, 0.012, 0.01, 0.002), m.white);
  base.position.y = 0.006;
  base.rotation.x = 0.04;
  g.add(base);
  const u = 0.019;
  const rows: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75],
    [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
    [1, 1, 1.25, 1.25, 5.5, 1.25, 1, 1, 1],
  ];
  const cap = rbox(1, 0.007, 1, 0.0025, 2);
  let n = 0;
  rows.forEach((r) => (n += r.length));
  const keys = new THREE.InstancedMesh(cap, m.matte, n);
  const accent = new THREE.InstancedMesh(cap, m.purple, 1);
  const mm = new THREE.Matrix4();
  let k = 0;
  rows.forEach((r, ri) => {
    const total = r.reduce((a, b) => a + b, 0);
    let x = -(total * u) / 2;
    r.forEach((wu, ci) => {
      const kw = wu * u - 0.0025;
      mm.compose(new THREE.Vector3(x + (wu * u) / 2, 0.016 + ri * 0.0011, -0.048 + ri * u), new THREE.Quaternion().setFromEuler(new THREE.Euler(0.04, 0, 0)), new THREE.Vector3(kw, 1, u - 0.0025));
      if (ri === 0 && ci === 0) accent.setMatrixAt(0, mm);
      keys.setMatrixAt(k++, mm);
      x += wu * u;
    });
  });
  g.add(keys, accent);
  return g;
}

export function mouse(m: Mats) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    pts.push(V2(Math.sin(t * Math.PI) * 0.031 * (1 - 0.15 * t), t * 0.11));
  }
  const g = new THREE.LatheGeometry(pts, 40);
  g.rotateX(Math.PI / 2);
  // achata: corpo baixo com topo abaulado
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    p.setY(i, y > 0 ? y * 0.55 : 0);
  }
  g.computeVertexNormals();
  g.translate(0, 0.001, -0.055);
  return new THREE.Mesh(g, m.white);
}

/* ---------- cadeira ergonômica ---------- */

export function chair(m: Mats, r: THREE.WebGLRenderer) {
  const g = new THREE.Group();
  // base de cinco pés afunilados
  const legShape = new THREE.Shape();
  legShape.moveTo(0, -0.03);
  legShape.lineTo(0.31, -0.012);
  legShape.quadraticCurveTo(0.33, 0, 0.31, 0.012);
  legShape.lineTo(0, 0.03);
  legShape.lineTo(0, -0.03);
  const legG = new THREE.ExtrudeGeometry(legShape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 3 });
  legG.rotateX(Math.PI / 2);
  legG.translate(0, 0.085, 0);
  const legs: THREE.BufferGeometry[] = [];
  const casters: THREE.BufferGeometry[] = [];
  const hood: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const L = legG.clone();
    L.rotateY(a);
    legs.push(L);
    for (const side of [-1, 1]) {
      const w = new THREE.CylinderGeometry(0.025, 0.025, 0.014, 20);
      w.rotateZ(Math.PI / 2);
      w.translate(side * 0.011, 0.025, 0);
      w.rotateY(a + 0.6);
      w.translate(Math.cos(a) * 0.31, 0, -Math.sin(a) * 0.31);
      casters.push(w);
    }
    const hd = new THREE.SphereGeometry(0.02, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    hd.translate(Math.cos(a) * 0.31, 0.045, -Math.sin(a) * 0.31);
    hood.push(hd);
  }
  g.add(new THREE.Mesh(mergeGeometries(legs), m.frame), new THREE.Mesh(mergeGeometries(casters), m.rubber), new THREE.Mesh(mergeGeometries(hood), m.frame));
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.05, 24), m.frame);
  hub.position.y = 0.1;
  const gas = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.18, 20), m.chrome);
  gas.position.y = 0.22;
  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.12, 20), m.frame);
  sleeve.position.y = 0.17;
  const mech = new THREE.Mesh(rbox(0.2, 0.04, 0.24, 0.01), m.frame);
  mech.position.y = 0.33;
  g.add(hub, gas, sleeve, mech);
  // assento estofado
  const seat = new THREE.Mesh(slab(0.5, 0.48, 0.07, 0.09, 0.025), m.fabric);
  seat.position.set(0, 0.39, 0.0);
  const shell = new THREE.Mesh(slab(0.48, 0.46, 0.02, 0.085, 0.006), m.frame);
  shell.position.set(0, 0.35, 0);
  g.add(seat, shell);
  // encosto de tela, curvo, com aro
  const R = 0.55,
    th = 0.85,
    bh = 0.56;
  const back = new THREE.Group();
  const meshT = toTex(meshTex(256), r, false, [6, 6]);
  const net = new THREE.Mesh(
    new THREE.CylinderGeometry(R, R, bh, 32, 1, true, -th / 2 + Math.PI, th),
    new THREE.MeshStandardMaterial({ color: 0x5d6169, roughness: 0.8, alphaMap: meshT, alphaTest: 0.35, side: THREE.DoubleSide }),
  );
  const ring: THREE.Vector3[] = [];
  const N = 48;
  for (let i = 0; i <= N; i++) {
    // contorno de retângulo arredondado sobre o cilindro
    const t = i / N;
    const per = t * 4;
    const seg = Math.floor(per) % 4,
      f = per - Math.floor(per);
    const ax = [-1, 1, 1, -1][seg] + ([2, 0, -2, 0][seg] * f) / 1,
      ay = [-1, -1, 1, 1][seg] + ([0, 2, 0, -2][seg] * f) / 1;
    const ang = Math.PI + (ax * th) / 2 * 0.98;
    ring.push(new THREE.Vector3(Math.sin(ang) * R, (ay * bh) / 2 * 0.98, Math.cos(ang) * R));
  }
  const frame = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ring, true, 'catmullrom', 0.05), 160, 0.014, 10, true), m.frame);
  back.add(net, frame);
  // apoio lombar: barra estofada atravessando a tela
  const lumbar = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.02, R - 0.02, 0.07, 32, 1, true, -th / 2.6 + Math.PI, th / 1.3), m.frame);
  lumbar.position.y = -bh * 0.22;
  back.add(lumbar);
  // encosto de cabeça: tela curva menor sobre uma haste
  const hr = new THREE.Group();
  const hth = 0.56,
    hh = 0.13;
  const hnet = new THREE.Mesh(new THREE.CylinderGeometry(R, R, hh, 24, 1, true, -hth / 2 + Math.PI, hth), net.material);
  const hring: THREE.Vector3[] = [];
  for (let i = 0; i <= 32; i++) {
    const t = (i / 32) * Math.PI * 2;
    const ax = Math.cos(t),
      ay = Math.sin(t);
    const k = Math.pow(Math.abs(ax), 0.25) * Math.sign(ax),
      l = Math.pow(Math.abs(ay), 0.25) * Math.sign(ay);
    const ang = Math.PI + ((k * hth) / 2) * 0.98;
    hring.push(new THREE.Vector3(Math.sin(ang) * R, ((l * hh) / 2) * 0.98, Math.cos(ang) * R));
  }
  hr.add(hnet, new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hring, true, 'catmullrom', 0.1), 96, 0.016, 10, true), m.frame));
  hr.position.y = bh / 2 + 0.11;
  const stem = new THREE.Mesh(rbox(0.05, 0.14, 0.02, 0.008), m.frame);
  stem.position.set(0, bh / 2 + 0.03, -R + 0.012);
  back.add(hr, stem);
  back.position.set(0, 0.83, 0.55 + 0.23);
  back.rotation.x = -0.12;
  // haste que liga encosto e assento
  const spineShape = new THREE.Shape();
  spineShape.moveTo(0, 0);
  spineShape.quadraticCurveTo(0.22, 0.02, 0.24, 0.42);
  spineShape.lineTo(0.2, 0.42);
  spineShape.quadraticCurveTo(0.18, 0.06, 0, 0.05);
  const spG = new THREE.ExtrudeGeometry(spineShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
  spG.translate(0, 0, -0.025);
  spG.rotateY(-Math.PI / 2);
  const sp = new THREE.Mesh(spG, m.frame);
  sp.position.set(0, 0.33, 0.02);
  g.add(back, sp);
  // braços em "T"
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(rbox(0.03, 0.22, 0.05, 0.008), m.frame);
    post.position.set(sx * 0.27, 0.48, 0.05);
    const pad = new THREE.Mesh(rbox(0.07, 0.025, 0.24, 0.012, 4), m.fabric);
    pad.position.set(sx * 0.27, 0.6, 0.02);
    const brace = new THREE.Mesh(rbox(0.03, 0.02, 0.14, 0.006), m.frame);
    brace.position.set(sx * 0.2, 0.36, 0.05);
    brace.rotation.z = sx * 0.6;
    g.add(post, pad, brace);
  }
  return g;
}

/* ---------- planta: figueira-lira em vaso de cerâmica ---------- */

function leafTexture() {
  const { c, x } = canvas(256, 512);
  x.clearRect(0, 0, 256, 512);
  // contorno de violino
  x.beginPath();
  x.moveTo(128, 500);
  x.bezierCurveTo(70, 470, 30, 400, 40, 330);
  x.bezierCurveTo(48, 280, 70, 270, 60, 220);
  x.bezierCurveTo(40, 120, 70, 30, 128, 10);
  x.bezierCurveTo(186, 30, 216, 120, 196, 220);
  x.bezierCurveTo(186, 270, 208, 280, 216, 330);
  x.bezierCurveTo(226, 400, 186, 470, 128, 500);
  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#5E8C5A');
  g.addColorStop(1, '#3E6A44');
  x.fillStyle = g;
  x.fill();
  x.save();
  x.clip();
  // nervuras
  x.strokeStyle = 'rgba(210,235,190,.55)';
  x.lineWidth = 5;
  x.beginPath();
  x.moveTo(128, 505);
  x.lineTo(128, 20);
  x.stroke();
  x.lineWidth = 2.2;
  x.strokeStyle = 'rgba(200,230,180,.35)';
  for (let i = 0; i < 9; i++) {
    const y = 460 - i * 48;
    x.beginPath();
    x.moveTo(128, y);
    x.quadraticCurveTo(170, y - 30, 230, y - 70);
    x.moveTo(128, y);
    x.quadraticCurveTo(86, y - 30, 26, y - 70);
    x.stroke();
  }
  // brilho ceroso
  const s = x.createRadialGradient(100, 200, 10, 100, 200, 220);
  s.addColorStop(0, 'rgba(255,255,255,.12)');
  s.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = s;
  x.fillRect(0, 0, 256, 512);
  x.restore();
  return c;
}

export function plant(m: Mats, r: THREE.WebGLRenderer, seed = 4) {
  const g = new THREE.Group();
  const rnd = seeded(seed);
  // vaso alto de cerâmica
  const pot: THREE.Vector2[] = [V2(0, 0), V2(0.15, 0), V2(0.17, 0.02), V2(0.19, 0.42), V2(0.2, 0.44), V2(0.185, 0.445), V2(0.175, 0.42), V2(0, 0.42)];
  const potM = new THREE.Mesh(new THREE.LatheGeometry(pot, 48), m.ceramic);
  g.add(potM);
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.175, 32), new THREE.MeshStandardMaterial({ color: 0x4a3d31, roughness: 1 }));
  soil.rotation.x = -Math.PI / 2;
  soil.position.y = 0.415;
  g.add(soil);
  // tronco
  const trunkPts = [new THREE.Vector3(0, 0.41, 0), new THREE.Vector3(0.02, 0.8, 0.01), new THREE.Vector3(-0.01, 1.2, -0.02), new THREE.Vector3(0.03, 1.55, 0.02)];
  const trunkC = new THREE.CatmullRomCurve3(trunkPts);
  const bark = new THREE.MeshStandardMaterial({ color: 0x7a6650, roughness: 0.9 });
  g.add(new THREE.Mesh(new THREE.TubeGeometry(trunkC, 40, 0.016, 8), bark));
  const leafMap = toTex(leafTexture(), r);
  const leafMat = new THREE.MeshStandardMaterial({ map: leafMap, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.45 });
  const base = new THREE.PlaneGeometry(0.17, 0.32, 6, 10);
  const p = base.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i) + 0.16;
    // dobra na nervura e caimento na ponta
    p.setZ(i, Math.abs(x) * 0.35 - Math.pow(y / 0.32, 2) * 0.05);
    p.setY(i, y);
  }
  base.computeVertexNormals();
  const leaves = 30;
  for (let i = 0; i < leaves; i++) {
    const t = 0.25 + (i / leaves) * 0.75;
    const at = trunkC.getPoint(t);
    const a = i * 2.39996 + rnd() * 0.4;
    const len = 0.05 + rnd() * 0.05;
    const stem = new THREE.Vector3(Math.cos(a) * len, 0.02 + rnd() * 0.03, Math.sin(a) * len);
    const leaf = new THREE.Mesh(base, leafMat);
    leaf.position.copy(at).add(stem);
    const s = 0.75 + t * 0.45 + rnd() * 0.15;
    leaf.scale.setScalar(s);
    leaf.rotation.set(-0.9 + rnd() * 0.5 + (1 - t) * 0.5, -a + Math.PI / 2, (rnd() - 0.5) * 0.4, 'YXZ');
    g.add(leaf);
  }
  return g;
}

/* ---------- luminária articulada ---------- */

export function deskLamp(m: Mats) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.LatheGeometry([V2(0, 0), V2(0.085, 0), V2(0.088, 0.008), V2(0.08, 0.018), V2(0.02, 0.024), V2(0, 0.024)], 48), m.white);
  g.add(base);
  const yaw = new THREE.Group();
  yaw.position.y = 0.024;
  g.add(yaw);
  const j0 = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), m.frame);
  yaw.add(j0);
  const arm1 = new THREE.Group();
  arm1.rotation.z = 0.35;
  yaw.add(arm1);
  const rod1 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.36, 12), m.white);
  rod1.position.y = 0.18;
  arm1.add(rod1);
  const elbow = new THREE.Group();
  elbow.position.y = 0.36;
  arm1.add(elbow);
  elbow.add(new THREE.Mesh(new THREE.SphereGeometry(0.013, 16, 12), m.frame));
  const arm2 = new THREE.Group();
  arm2.rotation.z = -1.55;
  elbow.add(arm2);
  const rod2 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.32, 12), m.white);
  rod2.position.y = 0.16;
  arm2.add(rod2);
  const head = new THREE.Group();
  head.position.y = 0.32;
  arm2.add(head);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), m.frame));
  const shadeG = new THREE.LatheGeometry([V2(0.012, 0), V2(0.02, 0.01), V2(0.03, 0.04), V2(0.06, 0.1), V2(0.062, 0.102)], 40);
  shadeG.rotateX(Math.PI);
  const shadeOut = new THREE.Mesh(shadeG, m.white);
  const pivot = new THREE.Group(); // aponta a cúpula
  head.add(pivot);
  pivot.add(shadeOut);
  const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.055, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.86, 0.66).multiplyScalar(4), toneMapped: false }));
  bulb.rotation.x = Math.PI / 2;
  bulb.position.y = -0.095;
  pivot.add(bulb);
  const spot = new THREE.SpotLight(0xffd9a8, 6, 2.2, 0.6, 0.6, 1.6);
  spot.position.y = -0.08;
  pivot.add(spot);
  const tgt = new THREE.Object3D();
  tgt.position.y = -1;
  pivot.add(tgt);
  spot.target = tgt;
  return { group: g, yaw, pivot, spot };
}

/* ---------- estante, livros e objetos ---------- */

export function shelves(m: Mats, oakMat: THREE.Material, r: THREE.WebGLRenderer) {
  const g = new THREE.Group();
  const levels = [0.95, 1.38, 1.81];
  const titles = ['Clean Code', 'SQL', 'Design de Dados', 'Refactoring', 'TypeScript', 'Sistemas', 'DDD', 'Python', 'Redes', 'UX', 'Algoritmos', 'Arquitetura'];
  const colors = ['#E9E4DA', '#15171D', '#C9C0F7', '#F3F1EC', '#B8E6F5', '#DCD5C7', '#8B5CF6', '#E2E4EA'];
  const rnd = seeded(11);
  levels.forEach((y, li) => {
    const sh = new THREE.Mesh(slab(1.1, 0.26, 0.03, 0.01, 0.003), oakMat);
    sh.position.set(0, y, 0);
    g.add(sh);
    let x = -0.5;
    const end = li === 1 ? -0.02 : 0.25;
    while (x < end) {
      const bw = 0.022 + rnd() * 0.02,
        bh = 0.2 + rnd() * 0.07,
        bd = 0.15 + rnd() * 0.05;
      const ci = Math.floor(rnd() * colors.length);
      const tex = toTex(spine(titles[Math.floor(rnd() * titles.length)], colors[ci], ci === 1 || ci === 6 ? '#F4F5FA' : '#15171D'), r);
      const cover = new THREE.MeshStandardMaterial({ color: colors[ci], roughness: 0.75 });
      const mats = [cover, cover, cover, cover, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 }), new THREE.MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.9 })];
      const b = new THREE.Mesh(rbox(bw, bh, bd, 0.002, 1), mats);
      const lean = x > end - 0.05 ? -0.18 : 0;
      b.position.set(x + bw / 2, y + 0.015 + bh / 2, -0.01 + (rnd() - 0.5) * 0.02);
      b.rotation.z = lean;
      g.add(b);
      x += bw + 0.003;
    }
  });
  // objetos: vaso, porta-retrato, caixa de som, pilha deitada
  const vase = new THREE.Mesh(new THREE.LatheGeometry([V2(0, 0), V2(0.04, 0), V2(0.055, 0.06), V2(0.03, 0.15), V2(0.022, 0.2), V2(0.026, 0.205), V2(0, 0.205)], 40), m.ceramic);
  vase.position.set(0.35, levels[0] + 0.015, 0);
  const sprig = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.25, 4), new THREE.MeshStandardMaterial({ color: 0x8a8060 }));
  sprig.position.set(0.355, levels[0] + 0.3, 0);
  sprig.rotation.z = 0.15;
  g.add(vase, sprig);
  const spk = new THREE.Mesh(rbox(0.13, 0.2, 0.14, 0.02, 4), m.plastic);
  spk.position.set(0.33, levels[1] + 0.115, 0);
  const cone = new THREE.Mesh(new THREE.CircleGeometry(0.04, 32), m.steel);
  cone.position.set(0.33, levels[1] + 0.09, 0.0705);
  g.add(spk, cone);
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(rbox(0.24 - i * 0.015, 0.03, 0.17, 0.002, 1), new THREE.MeshStandardMaterial({ color: colors[(i * 3) % colors.length], roughness: 0.75 }));
    b.position.set(0.1, levels[2] + 0.03 + i * 0.03, 0);
    b.rotation.y = (rnd() - 0.5) * 0.15;
    g.add(b);
  }
  return g;
}

export function framedArt(oakMat: THREE.Material, art: THREE.Texture, w = 0.6, h = 0.8) {
  const g = new THREE.Group();
  const fr = new THREE.Mesh(rbox(w + 0.05, h + 0.05, 0.03, 0.004), oakMat);
  const mat = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ color: 0xfbfaf7, roughness: 0.9 }));
  mat.position.z = 0.0151;
  const print = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.72, h * 0.72), new THREE.MeshStandardMaterial({ map: art, roughness: 0.85 }));
  print.position.z = 0.0153;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.06, clearcoat: 1, depthWrite: false }));
  glass.position.z = 0.016;
  glass.userData.noAO = true;
  g.add(fr, mat, print, glass);
  return g;
}

/* ---------- caneca ---------- */

export function mug(m: Mats) {
  const g = new THREE.Group();
  const prof = [V2(0, 0), V2(0.036, 0), V2(0.04, 0.004), V2(0.042, 0.095), V2(0.039, 0.098), V2(0.037, 0.095), V2(0.035, 0.01), V2(0, 0.01)];
  g.add(new THREE.Mesh(new THREE.LatheGeometry(prof, 48), m.ceramic));
  const h = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.0065, 12, 32, Math.PI), m.ceramic);
  h.rotation.z = -Math.PI / 2;
  h.position.set(0.041, 0.05, 0);
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.035, 32), new THREE.MeshPhysicalMaterial({ color: 0x2b1a10, roughness: 0.1, clearcoat: 1 }));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.082;
  g.add(h, coffee);
  return g;
}

/* ---------- notebook ---------- */

export function laptop(m: Mats, screen: THREE.Material) {
  const g = new THREE.Group();
  const W = 0.31,
    D = 0.215;
  const base = new THREE.Mesh(slab(W, D, 0.011, 0.01, 0.003), m.alu);
  base.position.y = 0.0055;
  const well = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.86, D * 0.42), new THREE.MeshStandardMaterial({ color: 0x1d1f25, roughness: 0.7 }));
  well.rotation.x = -Math.PI / 2;
  well.position.set(0, 0.0112, -0.03);
  const pad = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.4, D * 0.3), new THREE.MeshStandardMaterial({ color: 0xc8ccd3, roughness: 0.25, metalness: 0.6 }));
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, 0.0112, 0.06);
  g.add(base, well, pad);
  const lid = new THREE.Group();
  lid.position.set(0, 0.011, -D / 2);
  const shell = new THREE.Mesh(slab(W, D, 0.006, 0.01, 0.002), m.alu);
  shell.rotation.x = Math.PI / 2;
  shell.position.set(0, D / 2, -0.003);
  const bezel = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.006, D - 0.006), new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.3 }));
  bezel.position.set(0, D / 2, 0.0002);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.02, D - 0.03), screen);
  scr.position.set(0, D / 2 + 0.003, 0.0004);
  lid.add(shell, bezel, scr);
  g.add(lid);
  return { group: g, lid, screen: scr };
}

/* ---------- papel: folha A4 com leve curvatura ---------- */

export function paperGeometry(u0: number, v0: number, size = 0.25) {
  const w = 0.21,
    h = 0.297;
  const g = new THREE.PlaneGeometry(w, h, 6, 8);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const pos = g.attributes.position as THREE.BufferAttribute;
  const cropW = size * (w / h);
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, u0 + (size - cropW) / 2 + uv.getX(i) * cropW, v0 + uv.getY(i) * size);
    const x = pos.getX(i) / (w / 2),
      y = pos.getY(i) / (h / 2);
    pos.setZ(i, (x * x * 0.004 + y * y * 0.003) * 1);
  }
  g.computeVertexNormals();
  g.rotateX(-Math.PI / 2);
  return g;
}

/* ---------- folhagem: folhas pequenas instanciadas ---------- */

function smallLeaf() {
  const { c, x } = canvas(64, 128);
  x.clearRect(0, 0, 64, 128);
  x.beginPath();
  x.moveTo(32, 124);
  x.bezierCurveTo(4, 96, 4, 36, 32, 4);
  x.bezierCurveTo(60, 36, 60, 96, 32, 124);
  const g = x.createLinearGradient(0, 0, 64, 0);
  g.addColorStop(0, '#5F9157');
  g.addColorStop(0.5, '#4C7F4A');
  g.addColorStop(1, '#3B6A3E');
  x.fillStyle = g;
  x.fill();
  x.strokeStyle = 'rgba(205,235,180,.45)';
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(32, 122);
  x.lineTo(32, 10);
  x.stroke();
  return c;
}

let leafMatCache: THREE.Material | null = null;
function leafMat(r: THREE.WebGLRenderer) {
  if (!leafMatCache) leafMatCache = new THREE.MeshStandardMaterial({ map: toTex(smallLeaf(), r), alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.5 });
  return leafMatCache;
}

/** Tufo de folhas em volta de um centro, viradas para fora. */
export function foliage(r: THREE.WebGLRenderer, clumps: { c: THREE.Vector3; r: number; n: number }[], size = 0.035, seed = 9) {
  const rnd = seeded(seed);
  const total = clumps.reduce((a, b) => a + b.n, 0);
  const geo = new THREE.PlaneGeometry(size * 0.55, size, 1, 2);
  geo.translate(0, size / 2, 0);
  const im = new THREE.InstancedMesh(geo, leafMat(r), total);
  const mm = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    v = new THREE.Vector3(),
    col = new THREE.Color();
  let k = 0;
  for (const cl of clumps)
    for (let i = 0; i < cl.n; i++) {
      // ponto na casca de uma esfera achatada
      const u = rnd() * 2 - 1,
        a = rnd() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const dir = new THREE.Vector3(s * Math.cos(a), Math.abs(u) * 0.75 + 0.1, s * Math.sin(a)).normalize();
      v.copy(cl.c).addScaledVector(dir, cl.r * (0.55 + rnd() * 0.45));
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().lerp(new THREE.Vector3(0, 1, 0), 0.25).normalize());
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * Math.PI * 2));
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.5 + rnd() * 0.5));
      const sc = 0.7 + rnd() * 0.6;
      mm.compose(v, q, new THREE.Vector3(sc, sc, sc));
      im.setMatrixAt(k, mm);
      col.setHSL(0.27 + rnd() * 0.05, 0.35, 0.82 + rnd() * 0.25);
      im.setColorAt(k++, col);
    }
  return im;
}

/** Vaso branco pequeno de mesa com uma planta cheia. */
export function deskPlant(m: Mats, r: THREE.WebGLRenderer, seed = 3) {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.LatheGeometry([V2(0, 0), V2(0.05, 0), V2(0.056, 0.005), V2(0.06, 0.09), V2(0.062, 0.095), V2(0.055, 0.095), V2(0, 0.085)], 40), m.ceramic);
  g.add(pot);
  const rnd = seeded(seed);
  const clumps = Array.from({ length: 6 }, (_, i) => ({ c: new THREE.Vector3((rnd() - 0.5) * 0.09, 0.12 + rnd() * 0.07 + (i === 0 ? 0.05 : 0), (rnd() - 0.5) * 0.09), r: 0.075, n: 34 }));
  g.add(foliage(r, clumps, 0.062, seed));
  return g;
}

/** Bonsai: tronco torcido e copas em nuvem, num vaso raso. */
export function bonsai(m: Mats, r: THREE.WebGLRenderer) {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(rbox(0.2, 0.045, 0.13, 0.008), m.ceramic);
  pot.position.y = 0.0225;
  const soil = new THREE.Mesh(rbox(0.185, 0.004, 0.115, 0.002), new THREE.MeshStandardMaterial({ color: 0x4a3d31, roughness: 1 }));
  soil.position.y = 0.044;
  g.add(pot, soil);
  const bark = new THREE.MeshStandardMaterial({ color: 0x6b5a48, roughness: 0.9 });
  const trunk = new THREE.CatmullRomCurve3([V3(0, 0.04, 0), V3(0.03, 0.09, 0.01), V3(-0.02, 0.15, 0), V3(0.02, 0.21, -0.01)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(trunk, 24, 0.012, 8), bark));
  const br = new THREE.CatmullRomCurve3([V3(-0.01, 0.13, 0), V3(-0.07, 0.15, 0.01), V3(-0.1, 0.17, 0.0)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(br, 16, 0.006, 6), bark));
  g.add(
    foliage(
      r,
      [
        { c: V3(0.02, 0.25, -0.01), r: 0.06, n: 60 },
        { c: V3(-0.1, 0.19, 0.0), r: 0.045, n: 40 },
        { c: V3(0.08, 0.18, 0.01), r: 0.04, n: 34 },
      ],
      0.022,
      21,
    ),
  );
  return g;
}

const V3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ---------- miniatura de carro de corrida (kit de montar) ---------- */

export function raceCar(m: Mats, livery: THREE.Material, accent: THREE.Material) {
  const g = new THREE.Group();
  const L = 0.5; // ao longo de x
  // corpo: perfil lateral extrudado na largura
  const side = new THREE.Shape();
  side.moveTo(-L / 2, 0.035);
  side.lineTo(-L / 2 + 0.12, 0.04);
  side.quadraticCurveTo(-0.04, 0.06, 0.0, 0.075);
  side.lineTo(0.06, 0.085);
  side.quadraticCurveTo(0.12, 0.1, 0.17, 0.08);
  side.lineTo(L / 2 - 0.04, 0.06);
  side.lineTo(L / 2 - 0.04, 0.03);
  side.lineTo(-L / 2 + 0.02, 0.025);
  side.lineTo(-L / 2, 0.035);
  const bodyG = new THREE.ExtrudeGeometry(side, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.008, bevelSegments: 3, curveSegments: 12 });
  bodyG.translate(0, 0, -0.035);
  // afina o bico
  const p = bodyG.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const k = THREE.MathUtils.smoothstep(x, -L / 2, -0.02);
    p.setZ(i, p.getZ(i) * (0.35 + 0.65 * k));
  }
  bodyG.computeVertexNormals();
  g.add(new THREE.Mesh(bodyG, livery));
  // laterais (sidepods)
  for (const sz of [-1, 1]) {
    const pod = new THREE.Mesh(rbox(0.16, 0.035, 0.04, 0.012), livery);
    pod.position.set(0.07, 0.05, sz * 0.06);
    g.add(pod);
  }
  // asa dianteira e traseira
  const fw = new THREE.Mesh(rbox(0.06, 0.006, 0.2, 0.002), accent);
  fw.position.set(-L / 2 + 0.02, 0.02, 0);
  const rw = new THREE.Mesh(rbox(0.05, 0.008, 0.16, 0.002), accent);
  rw.position.set(L / 2 - 0.03, 0.11, 0);
  const rw2 = rw.clone();
  rw2.position.set(L / 2 - 0.045, 0.098, 0);
  rw2.scale.set(0.8, 1, 1);
  g.add(fw, rw, rw2);
  for (const sz of [-1, 1]) {
    const ep = new THREE.Mesh(rbox(0.07, 0.06, 0.004, 0.002), livery);
    ep.position.set(L / 2 - 0.035, 0.09, sz * 0.08);
    const fe = new THREE.Mesh(rbox(0.07, 0.025, 0.004, 0.002), livery);
    fe.position.set(-L / 2 + 0.025, 0.028, sz * 0.1);
    g.add(ep, fe);
  }
  // halo
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.004, 8, 24, Math.PI), m.steel);
  halo.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
  halo.position.set(0.04, 0.1, 0);
  g.add(halo);
  // rodas
  const tire = new THREE.CylinderGeometry(0.038, 0.038, 0.04, 28);
  tire.rotateX(Math.PI / 2);
  const rim = new THREE.CylinderGeometry(0.022, 0.022, 0.042, 20);
  rim.rotateX(Math.PI / 2);
  for (const [x, z, s] of [
    [-L / 2 + 0.09, 0.105, 0.9],
    [-L / 2 + 0.09, -0.105, 0.9],
    [L / 2 - 0.1, 0.11, 1.1],
    [L / 2 - 0.1, -0.11, 1.1],
  ]) {
    const t = new THREE.Mesh(tire, m.rubber);
    t.position.set(x, 0.038 * s, z);
    t.scale.set(s, s, s * 1.1);
    const rr = new THREE.Mesh(rim, accent);
    rr.position.copy(t.position);
    rr.scale.copy(t.scale);
    g.add(t, rr);
  }
  return g;
}

/* ---------- prateleira flutuante com fita de luz embaixo ---------- */

export function floatShelf(m: Mats, w = 1.7, d = 0.24) {
  const g = new THREE.Group();
  const board = new THREE.Mesh(rbox(w, 0.035, d, 0.004), m.matte);
  board.position.set(0, 0, d / 2);
  const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.9, 0.78), toneMapped: false });
  const strip = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.06, 0.01), glowMat);
  strip.rotation.x = Math.PI / 2;
  strip.position.set(0, -0.0181, 0.03);
  strip.userData.noAO = true;
  g.add(board, strip);
  return { group: g, glow: glowMat };
}

/* ---------- painel ripado acústico ---------- */

export function slatPanel(m: Mats, w: number, h: number) {
  const g = new THREE.Group();
  const felt = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ color: 0x5b5f68, roughness: 1 }));
  felt.position.z = 0.002;
  g.add(felt);
  const pitch = 0.05;
  const n = Math.floor(w / pitch);
  const slats = new THREE.InstancedMesh(rbox(0.028, h, 0.022, 0.003, 2), m.slat, n);
  const mm = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    mm.makeTranslation(-w / 2 + pitch / 2 + i * pitch, 0, 0.014);
    slats.setMatrixAt(i, mm);
  }
  g.add(slats);
  return g;
}

/* ---------- gabinete branco com vidro e fans acesas ---------- */

export function pcTower(m: Mats, w = 0.24, h = 0.46, d = 0.42) {
  const g = new THREE.Group();
  const fanLight: THREE.MeshBasicMaterial[] = [];
  // estrutura: fundo, topo, base e lado direito sólidos
  const panel = (pw: number, ph: number, pd: number, x: number, y: number, z: number) => {
    const b = new THREE.Mesh(rbox(pw, ph, pd, 0.004), m.white);
    b.position.set(x, y, z);
    g.add(b);
  };
  panel(w, 0.02, d, 0, 0.01 + 0.012, 0);
  panel(w, 0.02, d, 0, h - 0.01, 0);
  panel(w, h, 0.012, 0, h / 2, -d / 2 + 0.006);
  panel(0.012, h, d, w / 2 - 0.006, h / 2, 0);
  for (const [x, z] of [
    [-w / 2 + 0.008, d / 2 - 0.008],
    [w / 2 - 0.008, d / 2 - 0.008],
    [-w / 2 + 0.008, -d / 2 + 0.008],
  ]) {
    const post = new THREE.Mesh(rbox(0.016, h, 0.016, 0.004), m.white);
    post.position.set(x, h / 2, z);
    g.add(post);
  }
  for (const [x, z] of [
    [-w / 2 + 0.03, d / 2 - 0.04],
    [w / 2 - 0.03, d / 2 - 0.04],
    [-w / 2 + 0.03, -d / 2 + 0.04],
    [w / 2 - 0.03, -d / 2 + 0.04],
  ]) {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.012, 16), m.rubber);
    foot.position.set(x, 0.006, z);
    g.add(foot);
  }
  // por dentro: placa-mãe branca, placa de vídeo, cooler
  const mb = new THREE.Mesh(rbox(0.01, h * 0.7, d * 0.62, 0.003), m.plastic);
  mb.position.set(w / 2 - 0.02, h * 0.55, -0.04);
  const gpu = new THREE.Mesh(rbox(0.16, 0.05, d * 0.7, 0.008), m.white);
  gpu.position.set(w / 2 - 0.1, h * 0.36, -0.02);
  const cooler = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 32), m.white);
  cooler.rotation.z = Math.PI / 2;
  cooler.position.set(w / 2 - 0.045, h * 0.7, -0.06);
  g.add(mb, gpu, cooler);
  const ring = (c: THREE.Color) => {
    const mt = new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    fanLight.push(mt);
    return mt;
  };
  const cool = ring(new THREE.Color(0x8b5cf6).multiplyScalar(2.2));
  const cr = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.003, 8, 40), cool);
  cr.rotation.y = Math.PI / 2;
  cr.position.set(w / 2 - 0.061, h * 0.7, -0.06);
  g.add(cr);
  // três fans na frente, atrás do vidro
  const bladeG = new THREE.CircleGeometry(0.048, 7);
  for (let i = 0; i < 3; i++) {
    const fy = 0.09 + i * 0.135;
    const fz = d / 2 - 0.03;
    const housing = new THREE.Mesh(rbox(0.12, 0.125, 0.022, 0.01), m.white);
    housing.position.set(0, fy, fz);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.0035, 8, 48), ring(new THREE.Color(i === 1 ? 0x55d6ff : 0x8b5cf6).multiplyScalar(2.2)));
    rim.position.set(0, fy, fz + 0.012);
    const blades = new THREE.Mesh(bladeG, new THREE.MeshStandardMaterial({ color: 0xf2f2f5, roughness: 0.4, transparent: true, opacity: 0.85 }));
    blades.position.set(0, fy, fz + 0.011);
    blades.rotation.z = i;
    g.add(housing, rim, blades);
  }
  // vidro temperado na frente e no lado esquerdo
  const glassM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, transparent: true, opacity: 0.12, clearcoat: 1, depthWrite: false });
  const gf = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.01, h - 0.03), glassM);
  gf.position.set(0, h / 2, d / 2 + 0.001);
  const gs = new THREE.Mesh(new THREE.PlaneGeometry(d - 0.01, h - 0.03), glassM);
  gs.rotation.y = -Math.PI / 2;
  gs.position.set(-w / 2 - 0.001, h / 2, 0);
  gf.userData.noAO = gs.userData.noAO = true;
  g.add(gf, gs);
  return { group: g, lights: fanLight };
}
