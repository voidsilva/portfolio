import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { beamMaterial, boardMaterial, envScene, outside, screenMaterial } from './fx';
import { bonsai, chair, deskLamp, desk, deskMat, deskPlant, floatShelf, framedArt, keyboard, laptop, lightBar, makeMats, monitor, mouse, mug, paperGeometry, pcTower, plant, raceCar, rbox, shelves, slab, slatPanel } from './models';
import { contactScreen, loadImage, paperAtlas, processBoard, screenFrom, servicesBoard } from './paper';
import { artwork, oak, pbrMat, plaster, toTex, wool } from './tex';

/*
  O estúdio. Uma sala clara, modelada só com código, atravessada por um dia de trabalho:
  o sol entra pela janela de manhã na abertura e chega dourado no contato.
  A rolagem conduz a câmera e a história:
  0 porta → 1 a papelada sobe e se organiza → 2..4 os papéis entram nos monitores, que ligam
  → 5 o quadro de serviços é escrito → 6 o processo é pregado na parede → 7 o notebook abre.
*/

export type Tier = 'high' | 'mid' | 'low';

interface Station {
  cam: THREE.Vector3;
  look: THREE.Vector3;
  shift: [number, number];
}
interface Paper {
  mesh: THREE.Mesh;
  mess: THREE.Matrix4;
  fan: THREE.Matrix4;
  into: THREE.Matrix4;
  delay: number;
}
interface Screen {
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  w: number;
  h: number;
}

const ss = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// o dia: direção do sol, cor e força em cada momento da rolagem (0..1)
const DAY = [
  { u: 0, dir: new THREE.Vector3(0.82, -0.32, -0.42), color: new THREE.Color(1, 0.84, 0.68), k: 5.2, sky: new THREE.Color(1, 0.93, 0.86) },
  { u: 0.45, dir: new THREE.Vector3(0.7, -0.68, -0.12), color: new THREE.Color(1, 0.97, 0.93), k: 5.8, sky: new THREE.Color(0.95, 0.97, 1) },
  { u: 1, dir: new THREE.Vector3(0.86, -0.26, 0.38), color: new THREE.Color(1, 0.8, 0.62), k: 4.2, sky: new THREE.Color(1, 0.9, 0.8) },
];

export class World {
  readonly renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer?: EffectComposer;
  private ao?: GTAOPass;
  private bloom?: UnrealBloomPass;
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
  private time = 0;
  private running = false;
  private intro = 0;
  private still: boolean;
  private frames: number[] = [];
  private sun!: THREE.DirectionalLight;
  private hemi!: THREE.HemisphereLight;
  private winLight!: THREE.RectAreaLight;
  private sky!: THREE.MeshBasicMaterial;
  private beam!: THREE.Mesh;
  private win = { x: -4, z0: -2.35, z1: 1.35, y0: 0.72, y1: 2.6 };
  private papers: Paper[] = [];
  private screens: Screen[] = [];
  private lap!: { lid: THREE.Object3D; screen: Screen };
  private board!: THREE.ShaderMaterial;
  private marker!: THREE.Object3D;
  private cards: { mesh: THREE.Object3D; rest: THREE.Matrix4; pin: THREE.Object3D }[] = [];
  private lamp!: ReturnType<typeof deskLamp>;
  private chair!: THREE.Object3D;
  private glows: { mat: THREE.MeshBasicMaterial; base: THREE.Color; at: number }[] = [];
  private deskTop = 0.74;
  private deskZ = -2.15;
  private diveTo = -1;
  private diveK = 0;
  private diveGoal = 0;
  private diveDone?: () => void;
  onTier?: (t: Tier) => void;

  constructor(
    canvas: HTMLCanvasElement,
    private tier: Tier,
    opts: { still: boolean },
  ) {
    this.still = opts.still;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = tier !== 'low';
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.03, 40);
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
    const high = this.tier === 'high';
    RectAreaLightUniformsLib.init();
    s.background = new THREE.Color(0xeeeff3);
    const pm = new THREE.PMREMGenerator(r);
    s.environment = pm.fromScene(envScene(), 0.02).texture;
    s.environmentIntensity = 0.45;
    pm.dispose();

    const m = makeMats();
    const shadow = <T extends THREE.Object3D>(o: T, cast = true, recv = true) => {
      o.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) {
          c.castShadow = cast;
          c.receiveShadow = recv;
        }
      });
      s.add(o);
      return o;
    };

    /* ---------- sala ---------- */
    const W = 8,
      H = 3.1,
      back = -3,
      front = 4.5,
      D = front - back;
    const floorMat = pbrMat(oak(1024, 1024, 6, 7), r, { repeat: [W / 1.3, D / 1.3], bump: 0.5, color: 0xf2ebe3 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, back + D / 2);
    shadow(floor, false);
    const pl = plaster(512, 3);
    const wallMat = (rx: number, ry: number) => pbrMat(pl, r, { repeat: [rx * 2, ry * 2], bump: 0.1, roughness: 0.95, color: 0xf3f3f6 });
    const wall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
      const mm = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat(w / 2, h / 2));
      mm.position.set(x, y, z);
      mm.rotation.y = ry;
      return shadow(mm, false);
    };
    wall(W, H, 0, H / 2, back, 0);
    wall(D, H, W / 2, H / 2, back + D / 2, -Math.PI / 2);
    wall(W, H, 0, H / 2, front, Math.PI);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ color: 0xf6f6f8, roughness: 1 }));
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, H, back + D / 2);
    shadow(ceil, false);
    // parede da janela: vão profundo
    const { z0, z1, y0, y1 } = this.win;
    const L = -W / 2;
    wall(z0 - back, H, L, H / 2, (back + z0) / 2, Math.PI / 2);
    wall(front - z1, H, L, H / 2, (z1 + front) / 2, Math.PI / 2);
    wall(z1 - z0, y0, L, y0 / 2, (z0 + z1) / 2, Math.PI / 2);
    wall(z1 - z0, H - y1, L, (H + y1) / 2, (z0 + z1) / 2, Math.PI / 2);
    const rev = 0.22;
    const revMat = new THREE.MeshStandardMaterial({ color: 0xf4f4f6, roughness: 0.9 });
    const sill = new THREE.Mesh(rbox(rev + 0.06, 0.03, z1 - z0 + 0.06, 0.006), m.white);
    sill.position.set(L - rev / 2 + 0.03, y0 - 0.015, (z0 + z1) / 2);
    const head = new THREE.Mesh(new THREE.PlaneGeometry(rev, z1 - z0), revMat);
    head.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    head.position.set(L - rev / 2, y1, (z0 + z1) / 2);
    const jambA = new THREE.Mesh(new THREE.PlaneGeometry(rev, y1 - y0), revMat);
    jambA.position.set(L - rev / 2, (y0 + y1) / 2, z0);
    const jambB = jambA.clone();
    jambB.rotation.y = Math.PI;
    jambB.position.z = z1;
    shadow(sill);
    shadow(head, false);
    shadow(jambA, false);
    shadow(jambB, false);
    // caixilho em alumínio branco com montantes
    const mull = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      const b = new THREE.Mesh(rbox(w, h, d, 0.004), m.white);
      b.position.set(x, y, z);
      shadow(b, true, false);
    };
    const fx = L - rev + 0.03;
    mull(0.05, y1 - y0, 0.05, fx, (y0 + y1) / 2, z0 + 0.025);
    mull(0.05, y1 - y0, 0.05, fx, (y0 + y1) / 2, z1 - 0.025);
    mull(0.05, y1 - y0, 0.04, fx, (y0 + y1) / 2, (z0 + z1) / 2);
    mull(0.05, 0.05, z1 - z0, fx, y0 + 0.025, (z0 + z1) / 2);
    mull(0.05, 0.05, z1 - z0, fx, y1 - 0.025, (z0 + z1) / 2);
    mull(0.05, 0.04, z1 - z0, fx, 1.9, (z0 + z1) / 2);
    // lado de fora, superexposto
    const outT = toTex(outside(), r);
    this.sky = new THREE.MeshBasicMaterial({ map: outT, toneMapped: false, color: new THREE.Color(1, 1, 1).multiplyScalar(1.6) });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), this.sky);
    sky.position.set(L - 4, 1.8, (z0 + z1) / 2);
    sky.rotation.y = Math.PI / 2;
    sky.userData.noAO = true;
    s.add(sky);
    // persiana na metade de cima
    const nSlat = 14;
    const slats = new THREE.InstancedMesh(rbox(0.05, 0.004, z1 - z0 - 0.12, 0.0015, 1), new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.6 }), nSlat);
    const mm = new THREE.Matrix4();
    for (let i = 0; i < nSlat; i++) {
      mm.compose(new THREE.Vector3(L - 0.06, y1 - 0.07 - i * 0.062, (z0 + z1) / 2), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.5)), new THREE.Vector3(1, 1, 1));
      slats.setMatrixAt(i, mm);
    }
    shadow(slats, true, false);
    const rail = new THREE.Mesh(rbox(0.06, 0.04, z1 - z0 - 0.08, 0.008), m.white);
    rail.position.set(L - 0.06, y1 - 0.03, (z0 + z1) / 2);
    shadow(rail, true, false);
    // rodapé
    const skirt = new THREE.Mesh(rbox(W, 0.09, 0.014, 0.003), m.white);
    skirt.position.set(0, 0.045, back + 0.007);
    const skirtR = new THREE.Mesh(rbox(0.014, 0.09, D, 0.003), m.white);
    skirtR.position.set(W / 2 - 0.007, 0.045, back + D / 2);
    shadow(skirt, false);
    shadow(skirtR, false);
    // trilho de luz no teto
    const track = new THREE.Mesh(rbox(3, 0.03, 0.04, 0.008), m.steel);
    track.position.set(0.5, H - 0.03, -1.1);
    s.add(track);
    for (let i = 0; i < 4; i++) {
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.11, 24), m.steel);
      can.position.set(-0.6 + i * 0.75, H - 0.1, -1.1);
      can.rotation.x = 0.5;
      s.add(can);
    }

    /* ---------- luz ---------- */
    this.hemi = new THREE.HemisphereLight(0xffffff, 0xe0d6c8, 0.5);
    s.add(this.hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 3.4);
    sun.castShadow = this.tier !== 'low';
    const sz = high ? 4096 : 2048;
    sun.shadow.mapSize.set(sz, sz);
    Object.assign(sun.shadow.camera, { left: -5.5, right: 5.5, top: 5, bottom: -5, near: 1, far: 30 });
    sun.shadow.bias = -0.00025;
    sun.shadow.normalBias = 0.015;
    sun.shadow.radius = high ? 4 : 2.5;
    sun.target.position.set(0, 0, -0.5);
    s.add(sun, sun.target);
    this.sun = sun;
    // a janela inteira como fonte de luz suave
    this.winLight = new THREE.RectAreaLight(0xfff6ea, 2.2, z1 - z0, y1 - y0);
    this.winLight.position.set(L + 0.02, (y0 + y1) / 2, (z0 + z1) / 2);
    this.winLight.lookAt(0, (y0 + y1) / 2, (z0 + z1) / 2);
    s.add(this.winLight);
    // rebatida quente vinda do chão de madeira
    const bounce = new THREE.RectAreaLight(0xffe8d0, 0.9, 4, 4);
    bounce.position.set(0, 0.05, -0.5);
    bounce.lookAt(0, 3, -0.5);
    s.add(bounce);
    // feixe de sol
    const beamG = new THREE.BufferGeometry();
    beamG.setAttribute('position', new THREE.BufferAttribute(new Float32Array(8 * 3), 3));
    beamG.setAttribute('aWin', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1]), 2));
    beamG.setIndex([0, 1, 5, 0, 5, 4, 2, 3, 7, 2, 7, 6, 0, 2, 6, 0, 6, 4, 1, 3, 7, 1, 7, 5]);
    this.beam = new THREE.Mesh(beamG, beamMaterial());
    this.beam.frustumCulled = false;
    this.beam.renderOrder = 5;
    this.beam.userData.noAO = true;
    s.add(this.beam);

    /* ---------- tapete ---------- */
    const rug = new THREE.Mesh(slab(2.8, 1.9, 0.012, 0.05, 0.004), pbrMat(wool(512, 5), r, { repeat: [3, 2], bump: 0.8, roughness: 1 }));
    rug.position.set(0.2, 0.006, this.deskZ + 1.15);
    shadow(rug, false);

    /* ---------- mesa ---------- */
    const topMat = pbrMat(oak(1024, 512, 3, 21), r, { bump: 0.12, color: 0xfaf4ec, roughnessMap: null, roughness: 0.62 });
    const dk = desk(m);
    dk.group.position.z = this.deskZ;
    shadow(dk.group);
    const top = (this.deskTop = dk.top);
    const dz = this.deskZ;
    // luz que acende quando a história pede: guarda a cor cheia e começa apagada
    const glow = (mat: THREE.MeshBasicMaterial, at: number) => {
      this.glows.push({ mat, base: mat.color.clone(), at });
      mat.color.setScalar(0.04);
    };

    /* ---------- três monitores curvos em arco ---------- */
    const shots = await Promise.all(['/belaways.webp', '/pontofacial.webp', '/gastos.webp'].map(loadImage));
    const MW = 0.6,
      MH = 0.3375;
    const monPos: [number, number, number][] = [
      [-0.63, 0.42, 0.13],
      [0, 0, 0],
      [0.63, -0.42, 0.13],
    ];
    monPos.forEach(([x, ry, fz], i) => {
      const mat = screenMaterial(toTex(screenFrom(shots[i]), r), [26, 15]);
      const mo = monitor(m, mat, MW, MH);
      mo.group.position.set(x, top, dz - 0.12 + fz);
      mo.group.rotation.y = ry;
      if (i === 1) {
        const lb = lightBar(m, 0.46);
        lb.group.position.set(0, mo.height + 0.012, -0.03);
        mo.group.add(lb.group);
        glow(lb.glow, 1.4);
      }
      shadow(mo.group);
      mo.screen.castShadow = false;
      this.screens.push({ mat, mesh: mo.screen, w: MW, h: MH });
    });

    /* ---------- sobre a mesa ---------- */
    const pad = deskMat(m, 1.05, 0.38);
    pad.position.set(0, top + 0.0015, dz + 0.2);
    shadow(pad, false);
    const kb = keyboard(m);
    kb.position.set(-0.08, top + 0.003, dz + 0.2);
    shadow(kb);
    const ms = mouse(m);
    ms.position.set(0.3, top + 0.003, dz + 0.23);
    ms.rotation.y = -0.1;
    shadow(ms);
    const cup = mug(m);
    cup.position.set(-0.88, top, dz + 0.2);
    cup.rotation.y = 2.3;
    shadow(cup);
    const lapMat = screenMaterial(toTex(contactScreen(), r), [20, 13]);
    const lp = laptop(m, lapMat);
    lp.group.position.set(0.82, top, dz + 0.22);
    lp.group.rotation.y = -0.38;
    shadow(lp.group);
    this.lap = { lid: lp.lid, screen: { mat: lapMat, mesh: lp.screen, w: 0.29, h: 0.185 } };
    this.lamp = deskLamp(m);
    this.lamp.group.position.set(-1.2, top, dz - 0.22);
    this.lamp.spot.castShadow = high;
    this.lamp.spot.shadow.mapSize.set(512, 512);
    this.lamp.spot.shadow.bias = -0.0008;
    shadow(this.lamp.group);
    const pc = pcTower(m);
    pc.group.position.set(1.2, top, dz - 0.1);
    shadow(pc.group);
    pc.lights.forEach((l) => glow(l, 1.3));
    const p1 = deskPlant(m, r, 3);
    p1.position.set(-0.98, top, dz - 0.2);
    shadow(p1);
    const p2 = deskPlant(m, r, 8);
    p2.position.set(0.98, top, dz - 0.26);
    p2.scale.setScalar(0.85);
    shadow(p2);

    /* ---------- prateleira flutuante: miniaturas e bonsai ---------- */
    const fs = floatShelf(m, 1.8, 0.24);
    fs.group.position.set(0, 2.26, back);
    shadow(fs.group);
    const shelfY = 2.26 + 0.0175;
    const livA = new THREE.MeshPhysicalMaterial({ color: 0x1c1e24, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.1 });
    const livB = new THREE.MeshPhysicalMaterial({ color: 0xf2f3f6, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 });
    const cyan = new THREE.MeshPhysicalMaterial({ color: 0x55d6ff, roughness: 0.3, clearcoat: 0.8 });
    const carA = raceCar(m, livA, m.purple);
    carA.position.set(-0.52, shelfY, back + 0.12);
    carA.rotation.y = 0.25;
    const carB = raceCar(m, livB, cyan);
    carB.position.set(0.55, shelfY, back + 0.12);
    carB.rotation.y = Math.PI - 0.25;
    const bz = bonsai(m, r);
    bz.position.set(0.02, shelfY, back + 0.12);
    shadow(carA);
    shadow(carB);
    shadow(bz);
    const shelfLight = new THREE.RectAreaLight(0xffe6c8, 1.2, 1.7, 0.05);
    shelfLight.position.set(0, 2.24, back + 0.04);
    shelfLight.lookAt(0, 0, back + 0.04);
    s.add(shelfLight);

    /* ---------- a papelada ---------- */
    const atlas = toTex(paperAtlas(this.tier === 'low' ? 1024 : 2048), r);
    const paperMat = new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.82, side: THREE.DoubleSide });
    s.updateMatrixWorld(true);
    const rng = (k: number) => {
      const v = Math.sin(k * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const N = 16;
    for (let i = 0; i < N; i++) {
      const g = paperGeometry((i % 4) / 4, 1 - (Math.floor(i / 4) + 1) / 4);
      const mesh = new THREE.Mesh(g, paperMat);
      mesh.castShadow = mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      const onFloor = i >= 13;
      const mess = new THREE.Matrix4().compose(
        onFloor
          ? new THREE.Vector3(-0.6 + rng(i) * 1.3, 0.016 + i * 0.0005, dz + 0.75 + rng(i + 9) * 0.6)
          : new THREE.Vector3(-0.98 + rng(i) * 1.9, top + 0.003 + i * 0.0011, dz + 0.02 + rng(i + 5) * 0.33),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rng(i + 1) * Math.PI * 2, 0)),
        new THREE.Vector3(1, 1, 1),
      );
      // em leque no ar, de frente para quem chega: separar o que importa
      const t = i / (N - 1);
      const fan = new THREE.Matrix4().compose(
        new THREE.Vector3(-0.92 + t * 1.84, top + 0.36 + Math.sin(t * Math.PI) * 0.1, dz + 0.32 - Math.sin(t * Math.PI) * 0.12),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2 - 0.12, (0.5 - t) * 0.5, (t - 0.5) * 0.25, 'YXZ')),
        new THREE.Vector3(0.9, 0.9, 0.9),
      );
      // e depois para dentro do monitor
      const scr = this.screens[i % 3].mesh;
      const sp = scr.getWorldPosition(new THREE.Vector3());
      const sq = scr.getWorldQuaternion(new THREE.Quaternion()).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)));
      const into = new THREE.Matrix4().compose(sp, sq, new THREE.Vector3(0.02, 0.02, 0.02));
      mesh.matrix.copy(mess);
      s.add(mesh);
      this.papers.push({ mesh, mess, fan, into, delay: rng(i + 11) });
    }

    /* ---------- cadeira, planta, estante, quadro de arte ---------- */
    const ch = chair(m, r);
    ch.position.set(0.45, 0, dz + 0.8);
    ch.rotation.y = -0.15;
    shadow(ch);
    this.chair = ch;
    const pt = plant(m, r);
    pt.position.set(-3.25, 0, back + 0.55);
    shadow(pt);
    const sh = shelves(m, topMat, r);
    sh.position.set(2.55, 0, back + 0.14);
    shadow(sh);
    const slat = slatPanel(m, 2.1, H);
    slat.position.set(-2.6, H / 2, back);
    shadow(slat);
    const art = framedArt(topMat, toTex(artwork(), r), 0.62, 0.82);
    art.position.set(-2.35, 1.55, back + 0.04);
    shadow(art);

    /* ---------- quadro de serviços (parede direita) ---------- */
    const bw = 2.0,
      bh = 1.125;
    const svT = toTex(servicesBoard(), r);
    this.board = boardMaterial(svT, 3, 2, new THREE.Color(0xf7f8fc).convertSRGBToLinear());
    const bg = new THREE.Group();
    const glass = new THREE.Mesh(rbox(bw + 0.04, bh + 0.04, 0.012, 0.01), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.15, transmission: 0, clearcoat: 1, clearcoatRoughness: 0.05 }));
    const face = new THREE.Mesh(new THREE.PlaneGeometry(bw, bh), this.board);
    face.position.z = 0.0065;
    face.receiveShadow = true;
    bg.add(glass, face);
    for (const [sx, sy] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]) {
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 20), m.chrome);
      st.rotation.x = Math.PI / 2;
      st.position.set((sx * (bw - 0.06)) / 2, (sy * (bh - 0.06)) / 2, 0.01);
      bg.add(st);
    }
    // marcador que escreve
    const mk = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.12, 20), m.purple);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.0115, 0.0115, 0.035, 20), m.steel);
    cap.position.y = 0.075;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.007, 0.018, 16), m.steel);
    tip.position.y = -0.069;
    tip.rotation.x = Math.PI;
    mk.add(body, cap, tip);
    mk.rotation.x = -0.9;
    this.marker = mk;
    bg.add(mk);
    bg.position.set(W / 2 - 0.035, 1.5, -0.25);
    bg.rotation.y = -Math.PI / 2;
    shadow(bg);

    /* ---------- processo: quatro cartões pregados acima da mesa ---------- */
    const prT = toTex(processBoard(2400, 800), r);
    const cw = 0.46,
      chh = 0.613;
    for (let i = 0; i < 4; i++) {
      const g = new THREE.PlaneGeometry(cw, chh);
      const uv = g.attributes.uv as THREE.BufferAttribute;
      for (let k = 0; k < uv.count; k++) uv.setX(k, (i + uv.getX(k)) / 4);
      const card = new THREE.Group();
      const paperB = new THREE.Mesh(rbox(cw, chh, 0.003, 0.001, 1), new THREE.MeshStandardMaterial({ color: 0xf2f3f7, roughness: 0.9 }));
      const face2 = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: prT, roughness: 0.85 }));
      face2.position.z = 0.0016;
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), i % 2 ? m.purple : m.steel);
      pin.position.set(0, chh / 2 - 0.03, 0.01);
      card.add(paperB, face2, pin);
      const rest = new THREE.Matrix4().compose(new THREE.Vector3(-0.84 + i * 0.56, 1.78, back + 0.008), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, (i % 2 ? 1 : -1) * 0.012)), new THREE.Vector3(1, 1, 1));
      card.matrixAutoUpdate = false;
      card.matrix.copy(rest);
      shadow(card);
      this.cards.push({ mesh: card, rest, pin });
    }

    /* ---------- paradas da câmera ---------- */
    const mob = this.mobile;
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const monView = (i: number) => {
      const sc = this.screens[i].mesh;
      const p = sc.getWorldPosition(new THREE.Vector3());
      const n = new THREE.Vector3(0, 0, 1).applyQuaternion(sc.getWorldQuaternion(new THREE.Quaternion()));
      return { look: p, cam: p.clone().addScaledVector(n, mob ? 1.6 : 1.25).add(V(0, 0.05, 0)) };
    };
    type Sh = [number, number];
    const Lf: Sh = mob ? [0, 0.18] : [0.17, 0];
    const Rt: Sh = mob ? [0, 0.18] : [-0.17, 0];
    const S = (cam: THREE.Vector3, look: THREE.Vector3, shift: Sh): Station => ({ cam, look, shift });
    const [m0, m1, m2] = [0, 1, 2].map(monView);
    this.stations = [
      S(V(2.35, 1.55, 2.7), V(-0.25, 0.95, -2.1), mob ? [0, 0.14] : [0.28, 0]),
      S(V(-0.05, 1.42, -0.15), V(0, top + 0.3, dz), mob ? [0, 0.16] : [0.16, 0]),
      S(m0.cam, m0.look, Rt),
      S(m1.cam, m1.look, Lf),
      S(m2.cam, m2.look, Rt),
      S(V(1.05, 1.5, -0.25), V(W / 2, 1.5, -0.25), Rt),
      S(V(0, 1.7, mob ? 0.2 : -0.75), V(0, 1.78, back), mob ? [0, 0.2] : [0, 0.06]),
      S(V(1.42, 1.08, -1.36), V(0.82, top + 0.1, dz + 0.18), mob ? Lf : [0.24, 0]),
    ];
    this.camCurve = new THREE.CatmullRomCurve3(this.stations.map((st) => st.cam), false, 'centripetal');
    this.lookCurve = new THREE.CatmullRomCurve3(this.stations.map((st) => st.look), false, 'centripetal');
    this.shiftCurve = new THREE.CatmullRomCurve3(this.stations.map((st) => V(st.shift[0], st.shift[1], 0)), false, 'catmullrom', 0);

    this.makePost();
    this.setSize();
    r.compile(s, this.camera);
  }

  private makePost() {
    if (this.tier === 'low') return;
    const r = this.renderer;
    const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    const c = new EffectComposer(r, rt);
    c.addPass(new RenderPass(this.scene, this.camera));
    if (this.tier === 'high') {
      const ao = new GTAOPass(this.scene, this.camera, 1, 1);
      ao.updateGtaoMaterial({ radius: 0.35, distanceExponent: 1.4, thickness: 1.2, scale: 1.1, samples: 16, distanceFallOff: 1, screenSpaceRadius: false });
      ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 16 });
      ao.blendIntensity = 0.9;
      // o feixe de luz e os vidros não geram sombra de contato
      const self = ao as unknown as { overrideVisibility(): void };
      const orig = self.overrideVisibility.bind(ao);
      self.overrideVisibility = () => {
        orig();
        this.scene.traverse((o) => {
          if (o.userData.noAO) o.visible = false;
        });
      };
      c.addPass(ao);
      this.ao = ao;
    }
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.5, 1.35);
    c.addPass(this.bloom);
    c.addPass(new OutputPass());
    this.composer = c;
  }

  setSize() {
    const w = innerWidth,
      h = innerHeight;
    const cap = this.tier === 'high' ? 1.75 : this.tier === 'mid' ? 1.35 : 1;
    const dpr = Math.min(devicePixelRatio || 1, cap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 60 : 38;
    this.camera.updateProjectionMatrix();
    if (this.composer) {
      this.composer.setPixelRatio(dpr);
      this.composer.setSize(w, h);
    }
  }

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

  /** Mergulha na tela de um monitor até ela tomar a janela inteira (abre o case). */
  dive(i: number | null) {
    return new Promise<void>((res) => {
      if (i === null) {
        this.diveGoal = 0;
      } else {
        this.diveTo = i;
        this.diveGoal = 1;
      }
      this.diveDone = res;
      if (this.still) {
        this.diveK = this.diveGoal;
        res();
      }
    });
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

  private tmp = {
    p: new THREE.Vector3(),
    q: new THREE.Quaternion(),
    s: new THREE.Vector3(),
    p2: new THREE.Vector3(),
    q2: new THREE.Quaternion(),
    s2: new THREE.Vector3(),
    zero: new THREE.Vector2(),
    v: new THREE.Vector3(),
    ray: new THREE.Raycaster(),
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    lampAim: new THREE.Vector3(),
    lampQ: new THREE.Quaternion(),
  };

  private blendPose(a: THREE.Matrix4, b: THREE.Matrix4, t: number, lift: number, out: THREE.Matrix4) {
    const { p, q, s, p2, q2, s2 } = this.tmp;
    a.decompose(p, q, s);
    b.decompose(p2, q2, s2);
    p.lerp(p2, t);
    p.y += Math.sin(t * Math.PI) * lift;
    q.slerp(q2, t);
    s.lerp(s2, t);
    return out.compose(p, q, s);
  }

  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.still) this.time += dt;
    this.watch(dt);
    const ease = this.still ? 1 : 1 - Math.exp(-dt * 4);
    this.shown += (this.progress - this.shown) * ease;
    const sP = this.shown;
    const u = sP / (this.stations.length - 1);
    const cam = this.camera;

    // câmera
    this.camCurve.getPoint(u, cam.position);
    const look = this.lookCurve.getPoint(u);
    if (this.intro > 0) {
      const away = cam.position.clone().sub(look).normalize();
      cam.position.addScaledVector(away, this.intro * 1.5);
      cam.position.y += this.intro * 0.3;
    }
    const k = this.still ? 1 : 1 - Math.exp(-dt * 3);
    this.smoothPtr.lerp(this.hasPointer ? this.pointer : this.tmp.zero, k);
    const right = this.tmp.v.subVectors(look, cam.position).cross(cam.up).normalize();
    const dist = cam.position.distanceTo(look);
    cam.position.addScaledVector(right, this.smoothPtr.x * 0.03 * dist);
    cam.position.y += this.smoothPtr.y * 0.018 * dist;
    const sh = this.shiftCurve.getPoint(u);

    // mergulho na tela
    if (!this.still) this.diveK += (this.diveGoal - this.diveK) * (1 - Math.exp(-dt * 3.2));
    if (Math.abs(this.diveGoal - this.diveK) < 0.004) {
      this.diveK = this.diveGoal;
      if (this.diveDone) {
        const d = this.diveDone;
        this.diveDone = undefined;
        d();
      }
    }
    if (this.diveK > 0.0005 && this.diveTo >= 0) {
      const sc = this.screens[this.diveTo];
      const p = sc.mesh.getWorldPosition(new THREE.Vector3());
      const n = new THREE.Vector3(0, 0, 1).applyQuaternion(sc.mesh.getWorldQuaternion(new THREE.Quaternion()));
      const vf = THREE.MathUtils.degToRad(cam.fov) / 2;
      const hf = Math.atan(Math.tan(vf) * cam.aspect);
      const d = Math.min(sc.h / 2 / Math.tan(vf), sc.w / 2 / Math.tan(hf)) * 0.97;
      const e = easeInOut(this.diveK);
      cam.position.lerp(p.clone().addScaledVector(n, d), e);
      look.lerp(p, e);
      sh.multiplyScalar(1 - e);
    }
    cam.lookAt(look);
    const w = innerWidth,
      h = innerHeight;
    cam.setViewOffset(w, h, -sh.x * w, sh.y * h, w, h);

    this.dayAt(u);

    // papelada: mesa → leque no ar → para dentro dos monitores
    const mtx = new THREE.Matrix4();
    for (const pp of this.papers) {
      const d = pp.delay;
      const a = ss(0.12 + d * 0.3, 0.75 + d * 0.25, sP);
      const b = ss(1.12 + d * 0.25, 1.55 + d * 0.25, sP);
      if (b <= 0) this.blendPose(pp.mess, pp.fan, a, 0.25, mtx);
      else this.blendPose(pp.fan, pp.into, easeInOut(b), 0.12, mtx);
      // leve respiração enquanto flutua
      if (a > 0.99 && b < 0.01 && !this.still) mtx.elements[13] += Math.sin(this.time * 1.4 + d * 9) * 0.006;
      pp.mesh.matrix.copy(mtx);
      pp.mesh.matrixWorldNeedsUpdate = true;
      pp.mesh.visible = b < 0.995;
    }
    // os monitores ligam quando o papel chega
    this.screens.forEach((sc, i) => {
      sc.mat.uniforms.uOn.value = ss(1.45 + i * 0.12, 1.95 + i * 0.12, sP);
      sc.mat.uniforms.uTime.value = this.time;
    });

    // a cadeira rola para trás e gira, abrindo lugar para quem chega
    {
      const k = easeInOut(ss(0.1, 0.95, sP));
      this.chair.position.set(0.45 - k * 1.55, 0, this.deskZ + 0.8 + k * 1.2);
      this.chair.rotation.y = -0.15 + k * 0.9;
    }

    // barra de luz e fans acendem com as telas
    for (const gl of this.glows) gl.mat.color.copy(gl.base).multiplyScalar(0.04 + 0.96 * ss(gl.at, gl.at + 0.4, sP));

    // quadro: escrito enquanto a câmera chega
    const rv = ss(4.15, 4.95, sP);
    this.board.uniforms.uReveal.value = rv;
    {
      const n = 6,
        cell = Math.min(n - 1, Math.floor(rv * n)),
        f = rv * n - cell;
      const cx = (cell % 3) / 3,
        cy = Math.floor(cell / 3) / 2;
      const bw = 2.0,
        bh = 1.125;
      const tx = (cx + (rv >= 1 ? 1 / 3 : f / 3)) * bw - bw / 2;
      const ty = bh / 2 - (cy + 0.25 + Math.sin(f * 30) * 0.02 + (rv >= 1 ? 0.6 : 0)) * bh;
      const active = rv > 0 && rv < 1;
      const restX = 0.75,
        restY = -bh / 2 - 0.05;
      const target = active ? new THREE.Vector3(tx, ty, 0.08) : new THREE.Vector3(restX, restY, 0.03);
      if (this.still) this.marker.position.copy(target);
      else this.marker.position.lerp(target, 1 - Math.exp(-dt * 14));
      this.marker.rotation.set(active ? -0.75 : -Math.PI / 2, 0, active ? 0.3 : Math.PI / 2);
    }

    // processo: cada cartão é pregado na sua vez
    this.cards.forEach((c, i) => {
      const t = ss(5.2 + i * 0.13, 5.62 + i * 0.13, sP);
      const { p, q, s } = this.tmp;
      c.rest.decompose(p, q, s);
      const off = 1 - easeInOut(t);
      p.z += off * 0.5;
      p.y += off * 0.25;
      q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-off * 0.6, off * (i % 2 ? 0.5 : -0.5), off * (i % 2 ? 0.4 : -0.4))));
      s.setScalar(Math.max(0.0001, t < 0.01 ? 0.0001 : 1));
      c.mesh.matrix.compose(p, q, s);
      c.mesh.matrixWorldNeedsUpdate = true;
      c.pin.visible = t > 0.95;
    });

    // notebook abre e liga no contato
    const open = ss(6.2, 6.85, sP);
    this.lap.lid.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.32, easeInOut(open));
    this.lap.screen.mat.uniforms.uOn.value = ss(6.65, 7, sP);
    this.lap.screen.mat.uniforms.uTime.value = this.time;

    // luminária olha para onde o cursor aponta na mesa
    this.aimLamp(dt);

    (this.beam.material as THREE.ShaderMaterial).uniforms.uTime.value = this.time;
    if (this.composer) this.composer.render(dt);
    else this.renderer.render(this.scene, cam);
  }

  /** Sol, céu e luz da janela acompanham o dia. */
  private dayAt(u: number) {
    let a = DAY[0],
      b = DAY[1];
    if (u > DAY[1].u) {
      a = DAY[1];
      b = DAY[2];
    }
    const t = ss(a.u, b.u, u);
    const dir = a.dir.clone().lerp(b.dir, t).normalize();
    const col = a.color.clone().lerp(b.color, t);
    this.sun.color.copy(col);
    this.sun.intensity = THREE.MathUtils.lerp(a.k, b.k, t);
    this.sun.position.copy(this.sun.target.position).addScaledVector(dir, -14);
    this.sky.color.copy(a.sky.clone().lerp(b.sky, t)).multiplyScalar(1.6);
    this.winLight.color.copy(col).lerp(new THREE.Color(0xffffff), 0.5);
    // feixe: do vão da janela ao longo da direção do sol
    const { x, z0, z1, y0, y1 } = this.win;
    const pos = this.beam.geometry.attributes.position as THREE.BufferAttribute;
    const Lb = 6.5;
    // ordem dos vértices casa com aWin: 0..3 na janela, 4..7 no fim do feixe
    const pts = [
      [z0, y0],
      [z0, y1],
      [z1, y0],
      [z1, y1],
    ];
    pts.forEach(([z, y], i) => {
      pos.setXYZ(i, x, y, z);
      pos.setXYZ(i + 4, x + dir.x * Lb, y + dir.y * Lb, z + dir.z * Lb);
    });
    pos.needsUpdate = true;
    const bm = this.beam.material as THREE.ShaderMaterial;
    bm.uniforms.uColor.value.copy(col);
    bm.uniforms.uStrength.value = 0.022 + (1 - Math.abs(t - 0.5) * 2) * 0.006;
  }

  private aimLamp(dt: number) {
    const L = this.lamp;
    const target = this.tmp.lampAim;
    const want = new THREE.Vector3(0.1, this.deskTop, this.deskZ + 0.15);
    if (this.hasPointer && !this.mobile && this.diveK < 0.01) {
      this.tmp.ray.setFromCamera(this.pointer, this.camera);
      this.tmp.plane.constant = -this.deskTop;
      const hit = new THREE.Vector3();
      if (this.tmp.ray.ray.intersectPlane(this.tmp.plane, hit)) {
        want.set(THREE.MathUtils.clamp(hit.x, -1.25, 1.25), this.deskTop, THREE.MathUtils.clamp(hit.z, this.deskZ - 0.3, this.deskZ + 0.4));
      }
    }
    if (target.lengthSq() === 0 || this.still) target.copy(want);
    else target.lerp(want, 1 - Math.exp(-dt * 5));
    // base gira na direção do alvo, cúpula aponta para ele
    const base = L.group.getWorldPosition(new THREE.Vector3());
    L.yaw.rotation.y = Math.atan2(-(target.z - base.z), target.x - base.x);
    L.yaw.updateMatrixWorld(true);
    const head = L.pivot.parent!;
    const hp = head.getWorldPosition(new THREE.Vector3());
    const dirW = target.clone().sub(hp).normalize();
    const hq = head.getWorldQuaternion(new THREE.Quaternion()).invert();
    const dirL = dirW.applyQuaternion(hq);
    this.tmp.lampQ.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dirL);
    if (this.still) L.pivot.quaternion.copy(this.tmp.lampQ);
    else L.pivot.quaternion.slerp(this.tmp.lampQ, 1 - Math.exp(-dt * 8));
  }

  /** Mede o tempo de quadro e alivia a cena sozinho se o PC estiver sofrendo. */
  private watch(dt: number) {
    if (this.tier === 'low' || this.still) return;
    this.frames.push(dt);
    if (this.frames.length < 90) return;
    const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    this.frames.length = 0;
    if (avg > 1 / 42) {
      this.tier = this.tier === 'high' ? 'mid' : 'low';
      if (this.ao) this.ao.enabled = false;
      this.lamp.spot.castShadow = false;
      if (this.tier === 'low') {
        if (this.bloom) this.bloom.enabled = false;
        this.renderer.shadowMap.enabled = false;
        this.sun.castShadow = false;
        this.scene.traverse((o) => {
          const mt = (o as THREE.Mesh).material as THREE.Material | undefined;
          if (mt && !Array.isArray(mt)) mt.needsUpdate = true;
        });
      }
      this.setSize();
      this.onTier?.(this.tier);
    }
  }

  dispose() {
    this.stop();
    this.composer?.dispose();
    this.renderer.dispose();
  }
}
