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
    fabric: s({ color: 0xc9cbd2, roughness: 0.95, sheen: 1, sheenColor: new THREE.Color(0xffffff), sheenRoughness: 0.6 }),
    ceramic: s({ color: 0xefebe4, roughness: 0.55, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
    purple: s({ color: 0x8b5cf6, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 }),
  };
}

/* ---------- mesa ---------- */

export function desk(m: Mats, top: THREE.Material, w = 2.6, d = 0.82, h = 0.74) {
  const g = new THREE.Group();
  const t = 0.036;
  const board = new THREE.Mesh(slab(w, d, t, 0.03, 0.006), top);
  board.position.y = h - t / 2;
  g.add(board);
  // estrutura em tubo retangular, pés em "T" invertido
  for (const sx of [-1, 1]) {
    const x = sx * (w / 2 - 0.16);
    const leg = new THREE.Mesh(rbox(0.06, h - t - 0.02, 0.025, 0.004), m.steel);
    leg.position.set(x, (h - t) / 2 + 0.01, 0);
    const foot = new THREE.Mesh(rbox(0.07, 0.025, d - 0.06, 0.006), m.steel);
    foot.position.set(x, 0.0125, 0);
    const arm = new THREE.Mesh(rbox(0.05, 0.025, d - 0.12, 0.004), m.steel);
    arm.position.set(x, h - t - 0.0125, 0);
    const glide1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.008, 16), m.rubber);
    glide1.position.set(x, 0.004 - 0.004, d / 2 - 0.05);
    const glide2 = glide1.clone();
    glide2.position.z = -d / 2 + 0.05;
    g.add(leg, foot, arm, glide1, glide2);
  }
  const beam = new THREE.Mesh(rbox(w - 0.36, 0.05, 0.025, 0.004), m.steel);
  beam.position.set(0, h - t - 0.05, -d / 2 + 0.12);
  // calha de cabos
  const tray = new THREE.Mesh(rbox(1.1, 0.06, 0.12, 0.004), m.steel);
  tray.position.set(0, h - t - 0.09, -d / 2 + 0.14);
  g.add(beam, tray);
  return { group: g, top: h };
}

/* ---------- monitor ---------- */

export function monitor(m: Mats, screen: THREE.Material, w = 0.6, h = 0.34) {
  const g = new THREE.Group();
  const panel = new THREE.Group();
  // moldura fina e traseira abaulada
  const front = new THREE.Mesh(rbox(w + 0.014, h + 0.014, 0.01, 0.004), m.steel);
  const backShell = new THREE.Mesh(rbox(w + 0.006, h + 0.006, 0.014, 0.006), m.plastic);
  backShell.position.z = -0.011;
  const bulge = new THREE.Mesh(rbox(w * 0.6, h * 0.62, 0.04, 0.018, 4), m.plastic);
  bulge.position.set(0, -h * 0.05, -0.024);
  const chin = new THREE.Mesh(rbox(w + 0.014, 0.016, 0.012, 0.004), m.alu);
  chin.position.set(0, -h / 2 - 0.012, 0.0);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screen);
  scr.position.z = 0.0051;
  // vidro: só reflexo
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(w + 0.01, h + 0.01),
    new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.14, clearcoat: 1, depthWrite: false }),
  );
  glass.position.z = 0.0056;
  glass.userData.noAO = true;
  panel.add(front, backShell, bulge, chin, scr, glass);

  // pé: braço em arco de alumínio
  const prof = new THREE.Shape();
  prof.moveTo(0, 0);
  prof.lineTo(0.03, 0);
  prof.bezierCurveTo(0.03, 0.12, -0.01, 0.2, -0.045, 0.28);
  prof.lineTo(-0.07, 0.28);
  prof.bezierCurveTo(-0.035, 0.2, 0.0, 0.12, 0, 0);
  const neckG = new THREE.ExtrudeGeometry(prof, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 3, curveSegments: 24 });
  neckG.translate(0, 0, -0.025);
  neckG.rotateY(Math.PI / 2);
  const neck = new THREE.Mesh(neckG, m.alu);
  neck.position.set(0, 0.01, -0.07);
  const foot = new THREE.Mesh(slab(0.25, 0.19, 0.01, 0.06, 0.003), m.alu);
  foot.position.set(0, 0.005, -0.05);
  g.add(foot, neck);
  panel.position.set(0, 0.29 + h / 2 - 0.06, 0.0);
  panel.rotation.x = -0.06;
  g.add(panel);
  return { group: g, panel, screen: scr, height: 0.29 + h / 2 - 0.06 };
}

/* ---------- teclado e mouse ---------- */

export function keyboard(m: Mats) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(slab(0.44, 0.14, 0.012, 0.01, 0.002), m.alu);
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
  const keys = new THREE.InstancedMesh(cap, m.plastic, n);
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
  g.add(new THREE.Mesh(mergeGeometries(legs), m.alu), new THREE.Mesh(mergeGeometries(casters), m.rubber), new THREE.Mesh(mergeGeometries(hood), m.steel));
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.05, 24), m.alu);
  hub.position.y = 0.1;
  const gas = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.18, 20), m.chrome);
  gas.position.y = 0.22;
  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.12, 20), m.steel);
  sleeve.position.y = 0.17;
  const mech = new THREE.Mesh(rbox(0.2, 0.04, 0.24, 0.01), m.steel);
  mech.position.y = 0.33;
  g.add(hub, gas, sleeve, mech);
  // assento estofado
  const seat = new THREE.Mesh(slab(0.5, 0.48, 0.07, 0.09, 0.025), m.fabric);
  seat.position.set(0, 0.39, 0.0);
  const shell = new THREE.Mesh(slab(0.48, 0.46, 0.02, 0.085, 0.006), m.steel);
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
    new THREE.MeshStandardMaterial({ color: 0x2a2d35, roughness: 0.8, alphaMap: meshT, alphaTest: 0.35, side: THREE.DoubleSide }),
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
  const frame = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ring, true, 'catmullrom', 0.05), 160, 0.012, 10, true), m.steel);
  back.add(net, frame);
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
  const sp = new THREE.Mesh(spG, m.steel);
  sp.position.set(0, 0.33, 0.02);
  g.add(back, sp);
  // braços em "T"
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(rbox(0.03, 0.22, 0.05, 0.008), m.steel);
    post.position.set(sx * 0.27, 0.48, 0.05);
    const pad = new THREE.Mesh(rbox(0.07, 0.025, 0.24, 0.012, 4), m.rubber);
    pad.position.set(sx * 0.27, 0.6, 0.02);
    const brace = new THREE.Mesh(rbox(0.03, 0.02, 0.14, 0.006), m.steel);
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
  const base = new THREE.Mesh(new THREE.LatheGeometry([V2(0, 0), V2(0.085, 0), V2(0.088, 0.008), V2(0.08, 0.018), V2(0.02, 0.024), V2(0, 0.024)], 48), m.steel);
  g.add(base);
  const yaw = new THREE.Group();
  yaw.position.y = 0.024;
  g.add(yaw);
  const j0 = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), m.alu);
  yaw.add(j0);
  const arm1 = new THREE.Group();
  arm1.rotation.z = 0.35;
  yaw.add(arm1);
  const rod1 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.36, 12), m.steel);
  rod1.position.y = 0.18;
  arm1.add(rod1);
  const elbow = new THREE.Group();
  elbow.position.y = 0.36;
  arm1.add(elbow);
  elbow.add(new THREE.Mesh(new THREE.SphereGeometry(0.013, 16, 12), m.alu));
  const arm2 = new THREE.Group();
  arm2.rotation.z = -1.55;
  elbow.add(arm2);
  const rod2 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.32, 12), m.steel);
  rod2.position.y = 0.16;
  arm2.add(rod2);
  const head = new THREE.Group();
  head.position.y = 0.32;
  arm2.add(head);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), m.alu));
  const shadeG = new THREE.LatheGeometry([V2(0.012, 0), V2(0.02, 0.01), V2(0.03, 0.04), V2(0.06, 0.1), V2(0.062, 0.102)], 40);
  shadeG.rotateX(Math.PI);
  const shadeOut = new THREE.Mesh(shadeG, m.steel);
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
