import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { contactScreen, loadImage, paperAtlas, processBoard, screenFrom, servicesBoard } from './paper';

/*
  O estúdio: uma sala clara, modelada só com código.
  A câmera anda por ela conforme a rolagem e para em cada bloco do site:
  porta → mesa com a papelada → três monitores (os três sistemas) → quadro de serviços
  → parede do processo → notebook do contato.
*/

export type Tier = 'high' | 'mid' | 'low';

interface Station {
  cam: THREE.Vector3;
  look: THREE.Vector3;
  /** desloca o enquadramento: o objeto vai para o lado oposto ao texto */
  shift: [number, number];
}

const C = {
  wall: 0xf1f2f6,
  white: 0xfbfbfd,
  ink: 0x15171d,
  purple: 0x8b5cf6,
  oak: 0xd9c7ad,
};

const tex = (c: HTMLCanvasElement, r: THREE.WebGLRenderer) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = Math.min(8, r.capabilities.getMaxAnisotropy());
  return t;
};

function planks() {
  // assoalho claro: tábuas com veio suave
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const x = c.getContext('2d')!;
  x.fillStyle = '#DCCFBE';
  x.fillRect(0, 0, 1024, 1024);
  const rows = 8;
  for (let i = 0; i < rows; i++) {
    const y = (i * 1024) / rows;
    let xx = -((i * 397) % 600);
    while (xx < 1024) {
      const w = 500 + ((i * 131 + Math.abs(xx)) % 300);
      const l = 80 + ((i * 7 + Math.floor(Math.abs(xx))) % 7) - 3;
      x.fillStyle = `hsl(32 30% ${l}%)`;
      x.fillRect(xx, y, w, 1024 / rows);
      for (let k = 0; k < 14; k++) {
        x.strokeStyle = `rgba(150,120,90,${0.035 + (k % 3) * 0.012})`;
        x.lineWidth = 1 + (k % 2);
        x.beginPath();
        const yy = y + 8 + k * 8.5;
        x.moveTo(xx, yy);
        x.bezierCurveTo(xx + w * 0.3, yy + 4, xx + w * 0.6, yy - 4, xx + w, yy + 1);
        x.stroke();
      }
      x.fillStyle = 'rgba(110,90,70,.22)';
      x.fillRect(xx, y, 2, 1024 / rows);
      xx += w;
    }
    x.fillStyle = 'rgba(110,90,70,.25)';
    x.fillRect(0, y, 1024, 2);
  }
  return c;
}

function keys() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 320;
  const x = c.getContext('2d')!;
  x.fillStyle = '#E4E6EC';
  x.fillRect(0, 0, 1024, 320);
  const w = 1000 / 14.6;
  [14, 14, 13, 12].forEach((n, r) => {
    for (let i = 0; i < n; i++) {
      x.fillStyle = '#FFFFFF';
      x.beginPath();
      x.roundRect(12 + i * w + (14 - n) * w * 0.5 + 3, 12 + r * 60 + 3, w - 6, 54, 8);
      x.fill();
    }
  });
  x.beginPath();
  x.roundRect(12 + w * 4 + 3, 12 + 4 * 60 + 3, w * 6 - 6, 54, 8);
  x.fill();
  return c;
}

export class World {
  readonly renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private stations: Station[] = [];
  private camCurve!: THREE.CatmullRomCurve3;
  private lookCurve!: THREE.CatmullRomCurve3;
  private shiftCurve!: THREE.CatmullRomCurve3;
  private progress = 0;
  private shown = 0;
  private pointer = new THREE.Vector2();
  private smoothPtr = new THREE.Vector2();
  private hasPointer = false;
  private clock = new THREE.Clock();
  private running = false;
  private intro = 0;
  private still: boolean;
  private frames: number[] = [];
  private papers: { mesh: THREE.Mesh; mess: THREE.Matrix4; neat: THREE.Matrix4; delay: number }[] = [];
  private sun!: THREE.DirectionalLight;
  onTier?: (t: Tier) => void;

  constructor(
    canvas: HTMLCanvasElement,
    private tier: Tier,
    opts: { still: boolean },
  ) {
    this.still = opts.still;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = tier !== 'low';
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.05, 40);
  }

  private get mobile() {
    return innerWidth < 820;
  }
  get stationCount() {
    return this.stations.length;
  }

  async init() {
    const r = this.renderer;
    const s = this.scene;
    this.setSize();
    s.background = new THREE.Color(C.wall);
    const pm = new THREE.PMREMGenerator(r);
    s.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    s.environmentIntensity = 0.55;
    pm.dispose();

    const std = (color: number, rough = 0.9, metal = 0) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
    const add = <T extends THREE.Object3D>(o: T, cast = true, recv = true) => {
      o.traverse((m) => {
        if ((m as THREE.Mesh).isMesh) {
          m.castShadow = cast;
          m.receiveShadow = recv;
        }
      });
      s.add(o);
      return o;
    };
    const box = (w: number, h: number, d: number, mat: THREE.Material, rad = 0.004, seg = 2) =>
      new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), mat);

    /* ---------- sala ---------- */
    const W = 8,
      D = 7.5,
      H = 3.1,
      back = -3,
      front = back + D;
    const floorT = tex(planks(), r);
    floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping;
    floorT.repeat.set(3, 3);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.62 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, back + D / 2);
    add(floor, false);
    const wallM = std(C.wall, 0.96);
    const wall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallM);
      m.position.set(x, y, z);
      m.rotation.y = ry;
      return add(m, false);
    };
    wall(W, H, 0, H / 2, back, 0); // fundo
    wall(D, H, W / 2, H / 2, back + D / 2, -Math.PI / 2); // direita
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), std(0xf7f7fa, 1));
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, H, back + D / 2);
    add(ceil, false);
    // esquerda com janela grande
    const winZ0 = -2.2,
      winZ1 = 1.6,
      winY0 = 0.85,
      winY1 = 2.65;
    wall(winZ0 - back, H, -W / 2, H / 2, (back + winZ0) / 2, Math.PI / 2);
    wall(front - winZ1, H, -W / 2, H / 2, (winZ1 + front) / 2, Math.PI / 2);
    wall(winZ1 - winZ0, winY0, -W / 2, winY0 / 2, (winZ0 + winZ1) / 2, Math.PI / 2);
    wall(winZ1 - winZ0, H - winY1, -W / 2, (H + winY1) / 2, (winZ0 + winZ1) / 2, Math.PI / 2);
    // céu claro atrás da janela
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
    sky.position.set(-W / 2 - 3, 2, 0);
    sky.rotation.y = Math.PI / 2;
    s.add(sky);
    // caixilho e persianas: as listras de sombra no chão vêm daqui
    const frameM = std(C.white, 0.5);
    add(box(0.06, winY1 - winY0, 0.05, frameM, 0.01), true, false).position.set(-W / 2 + 0.02, (winY0 + winY1) / 2, (winZ0 + winZ1) / 2);
    const nSlat = 9;
    const slats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 0.01, winZ1 - winZ0), std(0xffffff, 0.6), nSlat);
    const mm = new THREE.Matrix4();
    for (let i = 0; i < nSlat; i++) {
      mm.makeRotationZ(0.55).setPosition(-W / 2 + 0.09, winY1 - 0.06 - i * 0.075, (winZ0 + winZ1) / 2);
      slats.setMatrixAt(i, mm);
    }
    add(slats, true, false);
    // rodapé
    const skirt = std(C.white, 0.6);
    add(box(W, 0.08, 0.015, skirt), false).position.set(0, 0.04, back + 0.008);
    add(box(0.015, 0.08, D, skirt), false).position.set(W / 2 - 0.008, 0.04, back + D / 2);

    // sombra de contato: escurece onde as coisas tocam o chão (barato e convincente)
    const blobT = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const x = c.getContext('2d')!;
      const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g;
      x.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();
    const blob = (x: number, y: number, z: number, w: number, d: number, o: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: blobT, color: 0x2a2018, transparent: true, opacity: o, depthWrite: false }));
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, y, z);
      m.renderOrder = 1;
      s.add(m);
    };

    /* ---------- luz ---------- */
    s.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c8, 0.5));
    const sun = new THREE.DirectionalLight(0xfff4e6, 3.4);
    sun.position.set(-9, 6.2, 1.2);
    sun.target.position.set(0, 0, -1);
    sun.castShadow = this.tier !== 'low';
    const sz = this.tier === 'high' ? 4096 : 2048;
    sun.shadow.mapSize.set(sz, sz);
    Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 4, bottom: -4, near: 2, far: 20 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 3;
    s.add(sun, sun.target);
    this.sun = sun;
    // luz quente de preenchimento vinda da sala
    const fill = new THREE.PointLight(0xfff1e0, 2.4, 9, 1.6);
    fill.position.set(1.5, 2.6, 1.5);
    s.add(fill);

    /* ---------- mesa ---------- */
    const deskY = 0.74,
      deskZ = -2.05,
      deskW = 2.7,
      deskD = 0.82;
    add(box(deskW, 0.035, deskD, std(C.white, 0.45), 0.012, 3)).position.set(0, deskY, deskZ);
    const legM = std(C.ink, 0.45, 0.6);
    for (const sx of [-1, 1]) {
      const fr = new THREE.Group();
      const a = box(0.035, deskY - 0.02, 0.035, legM, 0.006);
      a.position.set(0, (deskY - 0.02) / 2, deskD / 2 - 0.08);
      const b = a.clone();
      b.position.z = -deskD / 2 + 0.08;
      const c = box(0.035, 0.035, deskD - 0.12, legM, 0.006);
      c.position.set(0, 0.02, 0);
      const d = c.clone();
      d.position.y = deskY - 0.04;
      fr.add(a, b, c, d);
      fr.position.set(sx * (deskW / 2 - 0.12), 0, deskZ);
      add(fr);
    }

    blob(0, 0.002, deskZ, deskW + 0.5, deskD + 0.6, 0.22);
    for (const sx of [-1, 1]) blob(sx * (deskW / 2 - 0.12), 0.003, deskZ, 0.22, deskD + 0.15, 0.3);

    /* ---------- monitores: um sistema em cada ---------- */
    const shots = await Promise.all(['/belaways.webp', '/pontofacial.webp', '/gastos.webp'].map(loadImage));
    const bezel = std(C.ink, 0.35, 0.3);
    const silver = std(0xc9ccd4, 0.35, 0.8);
    const monW = 0.62,
      monH = 0.36;
    const mons: [number, number][] = [
      [-0.69, 0.32],
      [0, 0],
      [0.69, -0.32],
    ];
    const monY = deskY + 0.0175 + 0.16 + monH / 2;
    const monZ = (ry: number) => deskZ - 0.12 + Math.abs(ry) * 0.25;
    mons.forEach(([mx, ry], i) => {
      const g = new THREE.Group();
      const body = box(monW + 0.024, monH + 0.024, 0.022, bezel, 0.008, 3);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(monW, monH), new THREE.MeshBasicMaterial({ map: tex(screenFrom(shots[i]), r), toneMapped: false }));
      scr.position.z = 0.0115;
      const neck = box(0.04, 0.2, 0.03, silver, 0.01);
      neck.position.set(0, -monH / 2 - 0.06, -0.03);
      const foot = box(0.22, 0.012, 0.16, silver, 0.005);
      foot.position.set(0, -monH / 2 - 0.16 + 0.006 - 0.0175 + 0.0175, -0.03);
      g.add(body, scr, neck, foot);
      g.position.set(mx, monY, monZ(ry));
      g.rotation.y = ry;
      add(g);
    });

    // teclado, mouse, caneca
    const kbg = new THREE.Group();
    const kbTop = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.13), new THREE.MeshStandardMaterial({ map: tex(keys(), r), roughness: 0.6 }));
    kbTop.rotation.x = -Math.PI / 2;
    kbTop.position.y = 0.0095;
    kbg.add(box(0.44, 0.018, 0.14, std(0xe8eaef, 0.5), 0.006), kbTop);
    kbg.position.set(-0.05, deskY + 0.027, deskZ + 0.18);
    kbg.rotation.y = 0.03;
    add(kbg);
    const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.03, 24, 16), std(0xf4f5f8, 0.4));
    mouse.scale.set(0.9, 0.45, 1.5);
    mouse.position.set(0.3, deskY + 0.03, deskZ + 0.2);
    add(mouse);
    const mugPts = [0, 0, 0.038, 0, 0.041, 0.005, 0.041, 0.1, 0.037, 0.1, 0.037, 0.008, 0, 0.008];
    const mugV = Array.from({ length: mugPts.length / 2 }, (_, i) => new THREE.Vector2(mugPts[i * 2], mugPts[i * 2 + 1]));
    const mugM = std(C.purple, 0.35);
    const mugG = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.007, 10, 24, Math.PI), mugM);
    handle.rotation.z = -Math.PI / 2;
    handle.position.set(0.041, 0.05, 0);
    const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.036, 32), std(0x3a2618, 0.2));
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.085;
    mugG.add(new THREE.Mesh(new THREE.LatheGeometry(mugV, 40), mugM), handle, coffee);
    mugG.position.set(-0.98, deskY + 0.0175, deskZ + 0.12);
    mugG.rotation.y = 2.4;
    add(mugG);

    // notebook aberto: a tela do contato
    const lap = new THREE.Group();
    const alu = std(0xd5d8df, 0.3, 0.85);
    const lid = new THREE.Group();
    const lidB = box(0.34, 0.225, 0.008, alu, 0.006);
    lidB.position.y = 0.1125;
    const lidS = new THREE.Mesh(new THREE.PlaneGeometry(0.315, 0.197), new THREE.MeshBasicMaterial({ map: tex(contactScreen(), r), toneMapped: false }));
    lidS.position.set(0, 0.1125, 0.0045);
    lid.add(lidB, lidS);
    lid.position.set(0, 0.006, -0.115);
    lid.rotation.x = -0.32;
    const lk = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.1), new THREE.MeshStandardMaterial({ map: tex(keys(), r), roughness: 0.6, color: 0xdddfe6 }));
    lk.rotation.x = -Math.PI / 2;
    lk.position.set(0, 0.0065, -0.03);
    lap.add(box(0.34, 0.012, 0.23, alu, 0.006), lid, lk);
    lap.position.set(1.02, deskY + 0.024, deskZ + 0.2);
    lap.rotation.y = -0.38;
    add(lap);

    /* ---------- a papelada: começa espalhada e se arruma ---------- */
    const atlas = tex(paperAtlas(this.tier === 'low' ? 1024 : 2048), r);
    const rng = (k: number) => {
      const v = Math.sin(k * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const paperM = new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.85, side: THREE.DoubleSide });
    for (let i = 0; i < 16; i++) {
      const g = new THREE.PlaneGeometry(0.2, 0.2);
      const u0 = (i % 4) / 4,
        v0 = 1 - (Math.floor(i / 4) + 1) / 4;
      const uv = g.attributes.uv as THREE.BufferAttribute;
      for (let k = 0; k < uv.count; k++) uv.setXY(k, u0 + uv.getX(k) * 0.25, v0 + uv.getY(k) * 0.25);
      g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, paperM);
      m.castShadow = m.receiveShadow = true;
      m.matrixAutoUpdate = false;
      // bagunça: espalhado pela mesa, alguns no chão
      const onFloor = i >= 12;
      const mess = new THREE.Matrix4().compose(
        onFloor
          ? new THREE.Vector3(-0.9 + rng(i) * 1.6, 0.002 + i * 0.0004, deskZ + 0.6 + rng(i + 9) * 0.7)
          : new THREE.Vector3(-1.15 + rng(i) * 2.2, deskY + 0.019 + i * 0.0012, deskZ + 0.02 + rng(i + 5) * 0.34),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rng(i + 1) * Math.PI * 2, 0)),
        new THREE.Vector3(1, 1, 1),
      );
      // arrumado: uma pilha só, no canto esquerdo da mesa
      const neat = new THREE.Matrix4().compose(
        new THREE.Vector3(-1.1, deskY + 0.019 + i * 0.0016, deskZ + 0.22),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.05 + (rng(i + 7) - 0.5) * 0.06, 0)),
        new THREE.Vector3(1, 1, 1),
      );
      m.matrix.copy(mess);
      s.add(m);
      this.papers.push({ mesh: m, mess, neat, delay: rng(i + 11) });
    }

    /* ---------- tapete ---------- */
    const rug = new THREE.Mesh(new RoundedBoxGeometry(3.2, 0.012, 2.1, 2, 0.006), std(0xe4e3e6, 1));
    rug.position.set(0.1, 0.006, deskZ + 0.85);
    add(rug, false, true);

    /* ---------- cadeira ---------- */
    const chair = new THREE.Group();
    const fab = std(0xe2e3e9, 0.95);
    const seat = box(0.48, 0.07, 0.46, fab, 0.03, 4);
    seat.position.y = 0.47;
    const backR = box(0.46, 0.5, 0.06, fab, 0.03, 4);
    backR.position.set(0, 0.8, 0.22);
    backR.rotation.x = -0.12;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.36, 16), legM);
    post.position.y = 0.26;
    const spine = box(0.05, 0.36, 0.03, legM, 0.01);
    spine.position.set(0, 0.6, 0.24);
    chair.add(seat, backR, post, spine);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const leg = box(0.32, 0.03, 0.04, legM, 0.01);
      leg.position.set(Math.cos(a) * 0.16, 0.07, Math.sin(a) * 0.16);
      leg.rotation.y = -a;
      const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 8), legM);
      wheel.position.set(Math.cos(a) * 0.3, 0.025, Math.sin(a) * 0.3);
      chair.add(leg, wheel);
    }
    chair.position.set(0.75, 0, deskZ + 1.0);
    blob(0.75, 0.003, deskZ + 1.0, 0.8, 0.8, 0.35);
    chair.rotation.y = -0.95;
    add(chair);

    /* ---------- quadro de serviços (parede direita) ---------- */
    const wb = new THREE.Group();
    const wbW = 2.0,
      wbH = 1.125;
    const metal = std(0xd8dbe2, 0.4, 0.7);
    const wbS = new THREE.Mesh(new THREE.PlaneGeometry(wbW, wbH), new THREE.MeshStandardMaterial({ map: tex(servicesBoard(), r), roughness: 0.35, emissive: 0xffffff, emissiveIntensity: 0.25 }));
    (wbS.material as THREE.MeshStandardMaterial).emissiveMap = (wbS.material as THREE.MeshStandardMaterial).map;
    wbS.position.z = 0.0135;
    const tray = box(0.9, 0.025, 0.06, metal, 0.006);
    tray.position.set(0, -wbH / 2 - 0.04, 0.03);
    wb.add(box(wbW + 0.05, wbH + 0.05, 0.025, metal, 0.008), wbS, tray);
    [0x8b5cf6, 0x15171d, 0x2bb8e6].forEach((c, i) => {
      const mk = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.13, 12), std(c, 0.4));
      mk.rotation.z = Math.PI / 2;
      mk.position.set(-0.2 + i * 0.16, -wbH / 2 - 0.018, 0.035);
      wb.add(mk);
    });
    wb.position.set(W / 2 - 0.02, 1.5, -0.1);
    wb.rotation.y = -Math.PI / 2;
    add(wb);

    /* ---------- parede do processo (acima da mesa) ---------- */
    const pb = new THREE.Group();
    const pbW = 2.55,
      pbH = 0.85;
    const pbS = new THREE.Mesh(new THREE.PlaneGeometry(pbW, pbH), new THREE.MeshStandardMaterial({ map: tex(processBoard(), r), roughness: 0.8, emissive: 0xffffff, emissiveIntensity: 0.25 }));
    (pbS.material as THREE.MeshStandardMaterial).emissiveMap = (pbS.material as THREE.MeshStandardMaterial).map;
    pbS.position.z = 0.0105;
    pb.add(box(pbW + 0.04, pbH + 0.04, 0.02, std(0xffffff, 0.8), 0.006), pbS);
    pb.position.set(0, 1.95, back + 0.012);
    add(pb);

    /* ---------- estante e planta ---------- */
    const shelf = new THREE.Group();
    const wood = std(C.oak, 0.7);
    for (let i = 0; i < 4; i++) {
      const b = box(0.9, 0.025, 0.3, wood, 0.004);
      b.position.y = 0.35 + i * 0.42;
      shelf.add(b);
    }
    for (const sx of [-0.44, 0.44]) {
      const side = box(0.025, 1.7, 0.3, wood, 0.004);
      side.position.set(sx, 0.85, 0);
      shelf.add(side);
    }
    const bookC = [0xe9e5dc, 0xc9c3f5, 0x15171d, 0xdfe2ea, 0xb7e9f7, 0xf4f5fa, 0x8b5cf6, 0xd2c5b0];
    for (let r0 = 0; r0 < 3; r0++) {
      let bx = -0.4,
        k = r0 * 3;
      while (bx < (r0 === 1 ? 0.05 : 0.36)) {
        const bw = 0.025 + ((k * 7) % 4) * 0.008;
        const bh = 0.24 + ((k * 13) % 5) * 0.022;
        const b = box(bw, bh, 0.2, std(bookC[k % bookC.length], 0.8), 0.003);
        b.position.set(bx + bw / 2, 0.3625 + r0 * 0.42 + bh / 2, 0);
        shelf.add(b);
        bx += bw + 0.004;
        k++;
      }
    }
    shelf.position.set(2.9, 0, back + 0.17);
    blob(2.9, 0.003, back + 0.2, 1.2, 0.5, 0.3);
    add(shelf);
    const plant = new THREE.Group();
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.36, 32), std(0xf6f6f8, 0.7));
    pot.position.y = 0.18;
    plant.add(pot);
    const leafM = new THREE.MeshStandardMaterial({ color: 0x5d8a64, roughness: 0.55, side: THREE.DoubleSide });
    // folha: contorno de gota, dobrada ao longo da nervura
    const leafG = (() => {
      const sh = new THREE.Shape();
      const n = 14;
      sh.moveTo(0, 0);
      for (let i = 1; i <= n; i++) sh.lineTo(Math.pow(Math.sin((Math.PI * i) / n), 0.7) * 0.06 * (1 - i / n / 3), (i / n) * 0.26);
      for (let i = n - 1; i >= 0; i--) sh.lineTo(-Math.pow(Math.sin((Math.PI * i) / n), 0.7) * 0.06 * (1 - i / n / 3), (i / n) * 0.26);
      const g = new THREE.ShapeGeometry(sh, 6);
      const p = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i),
          y = p.getY(i);
        p.setZ(i, Math.abs(x) * 0.5 - Math.pow(y / 0.26, 2) * 0.06);
      }
      g.computeVertexNormals();
      return g;
    })();
    for (let i = 0; i < 34; i++) {
      const a = i * 2.39,
        h = 0.35 + (i % 9) * 0.07,
        tilt = 0.15 + (i % 5) * 0.11;
      const tip = new THREE.Vector3(Math.sin(a) * Math.sin(tilt) * h, 0.34 + Math.cos(tilt) * h, Math.cos(a) * Math.sin(tilt) * h);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.005, h, 5), leafM);
      stem.position.set(tip.x / 2, 0.34 + (tip.y - 0.34) / 2, tip.z / 2);
      stem.lookAt(tip.x, tip.y + 10, tip.z);
      stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(tip.x, tip.y - 0.34, tip.z).normalize());
      const leaf = new THREE.Mesh(leafG, leafM);
      leaf.position.copy(tip);
      leaf.rotation.set(-0.6 - tilt, a, 0, 'YXZ');
      plant.add(stem, leaf);
    }
    // vaso com terra
    const soil = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), std(0x6b5a48, 1));
    soil.rotation.x = -Math.PI / 2;
    soil.position.y = 0.34;
    plant.add(soil);
    plant.position.set(-3.3, 0, back + 0.5);
    blob(-3.3, 0.003, back + 0.5, 0.6, 0.6, 0.4);
    add(plant);

    /* ---------- paradas da câmera ---------- */
    const mob = this.mobile;
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const monLook = (i: number) => {
      const [mx, ry] = mons[i];
      const p = V(mx, monY, monZ(ry));
      const n = V(Math.sin(ry), 0, Math.cos(ry));
      return { look: p, cam: p.clone().addScaledVector(n, mob ? 1.55 : 1.3).add(V(0, 0.04, 0)) };
    };
    type Sh = [number, number];
    const L: Sh = mob ? [0, 0.18] : [0.17, 0];
    const R: Sh = mob ? [0, 0.18] : [-0.17, 0];
    const m0 = monLook(0),
      m1 = monLook(1),
      m2 = monLook(2);
    const S = (cam: THREE.Vector3, look: THREE.Vector3, shift: Sh): Station => ({ cam, look, shift });
    this.stations = [
      S(V(2.1, 1.6, 2.5), V(-0.05, 0.95, -2), mob ? [0, 0.12] : [0.15, 0]),
      S(V(-0.35, 1.6, -0.75), V(-0.3, deskY, -2.0), L),
      S(m0.cam, m0.look, R),
      S(m1.cam, m1.look, L),
      S(m2.cam, m2.look, R),
      S(V(1.0, 1.5, -0.1), V(W / 2, 1.5, -0.1), R),
      S(V(0, 1.62, mob ? 0.9 : 0.3), V(0, 1.78, back), mob ? [0, 0.2] : [0, 0]),
      S(V(1.42, 1.02, -1.4), V(1.04, deskY + 0.11, deskZ + 0.08), L),
    ];
    this.camCurve = new THREE.CatmullRomCurve3(this.stations.map((s) => s.cam), false, 'centripetal');
    this.lookCurve = new THREE.CatmullRomCurve3(this.stations.map((s) => s.look), false, 'centripetal');
    this.shiftCurve = new THREE.CatmullRomCurve3(this.stations.map((s) => V(s.shift[0], s.shift[1], 0)), false, 'catmullrom', 0);

    // compila os shaders antes do primeiro quadro para não engasgar
    r.compile(s, this.camera);
  }

  setSize() {
    const w = innerWidth,
      h = innerHeight;
    const cap = this.tier === 'high' ? 2 : this.tier === 'mid' ? 1.5 : 1;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, cap));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 58 : 38;
    this.camera.updateProjectionMatrix();
  }

  /** 0..(paradas-1), contínuo */
  setProgress(p: number) {
    this.progress = THREE.MathUtils.clamp(p, 0, this.stations.length - 1);
  }
  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
    this.hasPointer = true;
  }
  clearPointer() {
    this.hasPointer = false;
  }
  /** Abertura: 1 = câmera ainda na porta. */
  setIntro(v: number) {
    this.intro = v;
  }
  reveal(ms = 1600) {
    const t0 = performance.now();
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      this.intro = Math.pow(1 - k, 3);
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    this.renderer.setAnimationLoop(() => this.frame());
  }
  stop() {
    this.running = false;
    this.renderer.setAnimationLoop(null);
  }

  private v = { p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3(), p2: new THREE.Vector3(), q2: new THREE.Quaternion(), s2: new THREE.Vector3(), zero: new THREE.Vector2() };

  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.watch(dt);

    const ease = this.still ? 1 : 1 - Math.exp(-dt * 4.5);
    this.shown += (this.progress - this.shown) * ease;
    const u = this.shown / (this.stations.length - 1);
    const cam = this.camera;
    this.camCurve.getPoint(u, cam.position);
    const look = this.lookCurve.getPoint(u);
    if (this.intro > 0) {
      const away = cam.position.clone().sub(look).normalize();
      cam.position.addScaledVector(away, this.intro * 1.4);
      cam.position.y += this.intro * 0.2;
    }
    // o olhar acompanha o ponteiro, de leve
    const k = this.still ? 1 : 1 - Math.exp(-dt * 3);
    this.smoothPtr.lerp(this.hasPointer ? this.pointer : this.v.zero, k);
    const right = new THREE.Vector3().subVectors(look, cam.position).cross(cam.up).normalize();
    const dist = cam.position.distanceTo(look);
    cam.position.addScaledVector(right, this.smoothPtr.x * 0.03 * dist);
    cam.position.y += this.smoothPtr.y * 0.018 * dist;
    cam.lookAt(look);
    // enquadramento: o objeto vai para o lado livre do texto
    const sh = this.shiftCurve.getPoint(u);
    const w = innerWidth,
      h = innerHeight;
    cam.setViewOffset(w, h, -sh.x * w, sh.y * h, w, h);

    // a papelada se arruma entre a abertura e o "quem sou"
    const t = THREE.MathUtils.clamp(this.shown, 0, 1);
    const { p, q, s, p2, q2, s2 } = this.v;
    for (const pp of this.papers) {
      const lt = THREE.MathUtils.smootherstep(THREE.MathUtils.clamp((t - pp.delay * 0.45) / 0.55, 0, 1), 0, 1);
      pp.mess.decompose(p, q, s);
      pp.neat.decompose(p2, q2, s2);
      p.lerp(p2, lt);
      p.y += Math.sin(lt * Math.PI) * 0.16;
      q.slerp(q2, lt);
      pp.mesh.matrix.compose(p, q, s);
      pp.mesh.matrixWorldNeedsUpdate = true;
    }

    this.renderer.render(this.scene, cam);
  }

  /** Mede o tempo de quadro e reduz a cena sozinho se o PC estiver sofrendo. */
  private watch(dt: number) {
    if (this.tier === 'low' || this.still) return;
    this.frames.push(dt);
    if (this.frames.length < 120) return;
    const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    this.frames.length = 0;
    if (avg > 1 / 40) {
      this.tier = this.tier === 'high' ? 'mid' : 'low';
      if (this.tier === 'low') {
        this.renderer.shadowMap.enabled = false;
        this.sun.castShadow = false;
        this.scene.traverse((o) => {
          const m = (o as THREE.Mesh).material as THREE.Material | undefined;
          if (m) m.needsUpdate = true;
        });
      }
      this.setSize();
      this.onTier?.(this.tier);
    }
  }

  dispose() {
    this.stop();
    this.renderer.dispose();
  }
}
