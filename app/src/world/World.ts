import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { bake, blobShadow, curlPaper, dustMaterial, type DayUniforms } from './baked';
import { beamMaterial, boardMaterial, envScene, outside, screenMaterial } from './fx';
import { paperGeometry } from './models';
import { contactScreen, loadImage, paperAtlas, processBoard, screenFrom, servicesBoard } from './paper';
import { artwork, mesh as meshTex, oak, pbrMat, plaster, toTex } from './tex';

/*
  O estúdio. A sala, a mesa e tudo que fica parado foram modelados no Blender por script
  (blender/estudio.py) e têm a luz assada no Cycles; aqui entram as partes que se mexem.
  A rolagem conduz a câmera e a história:
  0 porta → 1 a cadeira sai, a papelada sobe → 2..4 os papéis entram nos monitores, que ligam
  e acendem a mesa → 5 o quadro de serviços é escrito → 6 o processo é pregado na parede
  → 7 o notebook abre, já no fim da tarde.
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
  u: ReturnType<typeof curlPaper>;
}
interface Screen {
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  w: number;
  h: number;
  light?: THREE.RectAreaLight;
}
interface Glow {
  mat: THREE.MeshBasicMaterial;
  base: THREE.Color;
  at: number;
}

const ss = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// passa um pouco do ponto e volta: movimento de coisa física
const backOut = (t: number) => {
  const c = 1.4;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

// o dia: os mesmos dois sóis do bake (blender/estudio.py), interpolados pela rolagem
const SUN = {
  a: { dir: new THREE.Vector3(0.82, -0.32, -0.42).normalize(), color: new THREE.Color(1, 0.89, 0.76), sky: new THREE.Color(1, 0.95, 0.9) },
  b: { dir: new THREE.Vector3(0.86, -0.26, 0.38).normalize(), color: new THREE.Color(1, 0.77, 0.56), sky: new THREE.Color(1, 0.88, 0.76) },
};
const DESK_Z = -2.15;
const DESK_TOP = 0.74;
const WIN = { x: -4, z0: -2.35, z1: 1.35, y0: 0.72, y1: 2.6 };
const ROOM = { W: 8, H: 3.1, back: -3, front: 4.5 };
const BOARD = { w: 2.0, h: 1.125 };
// ajuste fino de exposição dos lightmaps (a escala de cada um vem do blender/luz.py)
const EXPOSE = 1.3;

export class World {
  readonly renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer?: EffectComposer;
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
  intro = 0;
  private still: boolean;
  private frames: number[] = [];
  private sun!: THREE.DirectionalLight;
  private hemi!: THREE.HemisphereLight;
  private sky!: THREE.MeshBasicMaterial;
  private beam!: THREE.Mesh;
  private dust?: THREE.Points;
  private day: DayUniforms = { lightMap2: { value: null }, uDay: { value: 0 }, uK2: { value: 1 } };
  private papers: Paper[] = [];
  private screens: Screen[] = [];
  private lap!: { lid: THREE.Object3D; screen: Screen };
  private board!: THREE.ShaderMaterial;
  private marker!: THREE.Object3D;
  private cards: { mesh: THREE.Object3D; rest: THREE.Matrix4; pin: THREE.Object3D; u: ReturnType<typeof curlPaper> }[] = [];
  private lamp!: { yaw: THREE.Object3D; pivot: THREE.Object3D; spot: THREE.SpotLight };
  private chair!: THREE.Object3D;
  private chairShadow!: THREE.Mesh;
  private glows: Glow[] = [];
  private fans: THREE.Object3D[] = [];
  private fanSpin = 0;
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
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    const small = this.tier === 'low' || this.mobile;
    RectAreaLightUniformsLib.init();
    s.background = new THREE.Color(0xeeeff3);
    const pm = new THREE.PMREMGenerator(r);
    s.environment = pm.fromScene(envScene(), 0.02).texture;
    s.environmentIntensity = 0.5;
    pm.dispose();

    /* ---------- o modelo e a luz assada ---------- */
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const texL = new THREE.TextureLoader();
    const lmUrl = (n: string) => `/models/luz-${n}${small ? '-1024' : ''}.webp`;
    const loadLm = (u: string) =>
      texL.loadAsync(u).then((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.flipY = false;
        t.channel = 1;
        return t;
      });
    const [gltf, lmA, lmB, scale, shots] = await Promise.all([
      loader.loadAsync('/models/estudio.glb'),
      loadLm(lmUrl('manha')),
      loadLm(lmUrl('tarde')),
      fetch('/models/luz.json').then((x) => x.json() as Promise<{ manha: number; tarde: number }>),
      Promise.all(['/belaways.webp', '/pontofacial.webp', '/gastos.webp'].map(loadImage)),
    ]);
    this.day.lightMap2.value = lmB;
    this.day.uK2.value = scale.tarde * Math.PI * EXPOSE;
    const kA = scale.manha * Math.PI * EXPOSE;
    const root = gltf.scene;
    s.add(root);
    const node = (n: string) => {
      const o = root.getObjectByName(n);
      if (!o) throw new Error(`modelo sem ${n}`);
      return o;
    };
    const meshOf = (n: string) => {
      const o = node(n);
      return ((o as THREE.Mesh).isMesh ? o : o.children.find((c) => (c as THREE.Mesh).isMesh)) as THREE.Mesh;
    };

    /* ---------- materiais ---------- */
    const glossy = new Set(['white_gloss', 'purple', 'cyan', 'livery_dark', 'livery_white', 'keycap', 'ceramic', 'coffee', 'black_steel', 'chrome', 'alu', 'track', 'dark_glass']);
    const soft = new Set(['fabric', 'felt', 'felt_dark', 'wool_rug']);
    // texturas aplicadas nas UVs do glTF não são invertidas no eixo v
    const uvTex = (c: HTMLCanvasElement) => {
      const t = toTex(c, r);
      t.flipY = false;
      return t;
    };
    const floorTex = oak(1024, 1024, 6, 7);
    const wallTex = plaster(512, 3);
    const upgrade = (src: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial => {
      const n = src.name;
      if (n === 'oak_floor') return pbrMat(floorTex, r, { repeat: [1 / 1.3, 1 / 1.3], bump: 0.45, color: 0xf6efe6, roughness: 0.55, roughnessMap: null });
      if (n === 'wall') return pbrMat(wallTex, r, { repeat: [1, 1], bump: 0.08, roughness: 0.95, color: 0xffffff });
      if (n === 'art_print') return new THREE.MeshStandardMaterial({ map: uvTex(artwork()), roughness: 0.85 });
      const p = new THREE.MeshPhysicalMaterial({ name: n, color: src.color, roughness: src.roughness, metalness: src.metalness });
      if (glossy.has(n)) {
        p.clearcoat = n === 'white_gloss' || n === 'ceramic' ? 0.35 : 0.8;
        p.clearcoatRoughness = 0.2;
      }
      if (soft.has(n)) {
        p.sheen = 0.6;
        p.sheenColor = new THREE.Color(0xffffff);
        p.sheenRoughness = 0.7;
      }
      if (n.startsWith('leaf')) p.side = THREE.DoubleSide;
      return p;
    };
    // o que é fixo: luz assada
    const fixed = node('static');
    fixed.traverse((o) => {
      const mm = o as THREE.Mesh;
      if (!mm.isMesh) return;
      mm.material = bake(upgrade(mm.material as THREE.MeshStandardMaterial), lmA, kA, this.day);
      mm.castShadow = true;
    });
    // o que se mexe: luz em tempo real, materiais compartilhados por nome
    const cache = new Map<string, THREE.MeshStandardMaterial>();
    const special = /^(screen_|laptop_screen|board_face|bar_glow|shelf_glow|fan_ring_|cool_ring)/;
    root.traverse((o) => {
      const mm = o as THREE.Mesh;
      if (!mm.isMesh || special.test(mm.name) || special.test(mm.parent?.name ?? '')) return;
      let p: THREE.Object3D | null = mm;
      while (p && p !== fixed) p = p.parent;
      if (p) return;
      const src = mm.material as THREE.MeshStandardMaterial;
      if (!cache.has(src.name)) cache.set(src.name, upgrade(src));
      mm.material = cache.get(src.name)!;
      mm.castShadow = !small;
      mm.receiveShadow = !small;
    });
    // tela da cadeira com trama vazada
    const net = cache.get('chair_net');
    if (net) {
      net.alphaMap = toTex(meshTex(256), r, false, [1, 1]);
      net.alphaTest = 0.35;
      net.side = THREE.DoubleSide;
    }
    const purpleMat = cache.get('purple') ?? new THREE.MeshPhysicalMaterial({ color: 0x8b5cf6, roughness: 0.3, clearcoat: 0.8 });
    const steel = cache.get('black_steel') ?? new THREE.MeshStandardMaterial({ color: 0x1b1d23, roughness: 0.4, metalness: 0.6 });

    /* ---------- luzes que acendem com a história ---------- */
    const glow = (n: string, color: THREE.Color, at: number) => {
      const mat = new THREE.MeshBasicMaterial({ color: color.clone(), toneMapped: false });
      meshOf(n).material = mat;
      this.glows.push({ mat, base: color, at });
    };
    const purple = new THREE.Color(0x8b5cf6).multiplyScalar(2.4);
    const cyan = new THREE.Color(0x55d6ff).multiplyScalar(2.2);
    glow('bar_glow', new THREE.Color(1, 0.94, 0.86).multiplyScalar(2.2), 1.4);
    glow('shelf_glow', new THREE.Color(1, 0.9, 0.78).multiplyScalar(1.6), 5.4);
    glow('cool_ring', purple, 1.3);
    for (let k = 0; k < 3; k++) {
      glow(`fan_ring_${k}`, k === 1 ? cyan : purple, 1.3 + k * 0.05);
      this.fans.push(node(`fan_blades_${k}`));
    }

    /* ---------- telas ---------- */
    const MW = 0.6,
      MH = 0.3375;
    // a luz de área ilumina para -z local; a tela olha para +z
    const screenLight = (m: THREE.Mesh, color: number, w: number, h: number) => {
      const l = new THREE.RectAreaLight(color, 0, w, h);
      l.position.z = 0.01;
      l.rotation.y = Math.PI;
      m.add(l);
      return l;
    };
    for (let i = 0; i < 3; i++) {
      const mat = screenMaterial(uvTex(screenFrom(shots[i])), [26, 15]);
      const m = meshOf(`screen_${i}`);
      m.material = mat;
      // a tela acesa ilumina a mesa e o teclado
      const lit = high || (this.tier === 'mid' && i === 1);
      this.screens.push({ mat, mesh: m, w: MW, h: MH, light: lit ? screenLight(m, 0x9fb4ff, MW, MH) : undefined });
    }
    const lapMat = screenMaterial(uvTex(contactScreen()), [20, 13]);
    const lapScreen = meshOf('laptop_screen');
    lapScreen.material = lapMat;
    this.lap = {
      lid: node('laptop_lid'),
      screen: { mat: lapMat, mesh: lapScreen, w: 0.29, h: 0.185, light: small ? undefined : screenLight(lapScreen, 0xfff4ea, 0.29, 0.185) },
    };

    /* ---------- quadro de serviços e o pincel que escreve ---------- */
    this.board = boardMaterial(uvTex(servicesBoard()), 3, 2, new THREE.Color(0xf7f8fc).convertSRGBToLinear());
    const face = meshOf('board_face');
    face.material = this.board;
    const mk = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.12, 20), purpleMat);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.0115, 0.0115, 0.035, 20), steel);
    cap.position.y = 0.075;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.007, 0.018, 16), steel);
    tip.position.y = -0.069;
    tip.rotation.x = Math.PI;
    mk.add(body, cap, tip);
    mk.traverse((o) => (o.castShadow = true));
    face.parent!.add(mk);
    this.marker = mk;

    /* ---------- luminária ---------- */
    const pivot = node('lamp_pivot');
    const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.055, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.86, 0.66).multiplyScalar(3.5), toneMapped: false }));
    bulb.rotation.x = Math.PI / 2;
    bulb.position.y = -0.095;
    const spot = new THREE.SpotLight(0xffd9a8, 4.5, 2.2, 0.62, 0.65, 1.6);
    spot.position.y = -0.08;
    spot.castShadow = high;
    spot.shadow.mapSize.set(512, 512);
    spot.shadow.bias = -0.0008;
    const tgt = new THREE.Object3D();
    tgt.position.y = -1;
    pivot.add(bulb, spot, tgt);
    spot.target = tgt;
    this.lamp = { yaw: node('lamp_yaw'), pivot, spot };

    /* ---------- cadeira ---------- */
    this.chair = node('chair');
    this.chairShadow = blobShadow(0.95, 0.3);
    s.add(this.chairShadow);

    /* ---------- céu, teto, sol, feixe e poeira ---------- */
    const { z0, z1 } = WIN;
    this.sky = new THREE.MeshBasicMaterial({ map: toTex(outside(), r), toneMapped: false, color: new THREE.Color(1, 1, 1).multiplyScalar(1.6) });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), this.sky);
    sky.position.set(WIN.x - 4.2, 1.8, (z0 + z1) / 2);
    sky.rotation.y = Math.PI / 2;
    s.add(sky);
    // teto: plano liso (no bake ele só fez sombra e rebatida)
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.W, ROOM.front - ROOM.back), new THREE.MeshBasicMaterial({ color: 0xd9d9dd }));
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, ROOM.H, (ROOM.back + ROOM.front) / 2);
    s.add(ceil);
    this.hemi = new THREE.HemisphereLight(0xf4f6ff, 0xd9c8b4, 1.1);
    s.add(this.hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.castShadow = !small;
    sun.shadow.mapSize.set(high ? 2048 : 1024, high ? 2048 : 1024);
    Object.assign(sun.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 30 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    sun.target.position.set(0, 0, -1.4);
    s.add(sun, sun.target);
    this.sun = sun;
    const beamG = new THREE.BufferGeometry();
    beamG.setAttribute('position', new THREE.BufferAttribute(new Float32Array(8 * 3), 3));
    beamG.setAttribute('aWin', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1]), 2));
    beamG.setIndex([0, 1, 5, 0, 5, 4, 2, 3, 7, 2, 7, 6, 0, 2, 6, 0, 6, 4, 1, 3, 7, 1, 7, 5]);
    this.beam = new THREE.Mesh(beamG, beamMaterial());
    this.beam.frustumCulled = false;
    this.beam.renderOrder = 5;
    s.add(this.beam);
    if (!small) {
      const n = high ? 900 : 450;
      const pos = new Float32Array(n * 3);
      const seed = new Float32Array(n);
      const d = SUN.a.dir;
      for (let i = 0; i < n; i++) {
        const t = Math.random() * 3.2;
        const y = WIN.y0 + Math.random() * (WIN.y1 - WIN.y0);
        const z = z0 + Math.random() * (z1 - z0);
        pos.set([WIN.x + d.x * t, y + d.y * t, z + d.z * t], i * 3);
        seed[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      this.dust = new THREE.Points(g, dustMaterial());
      this.dust.frustumCulled = false;
      this.dust.renderOrder = 6;
      s.add(this.dust);
    }

    /* ---------- a papelada ---------- */
    const atlas = toTex(paperAtlas(small ? 1024 : 2048), r);
    s.updateMatrixWorld(true);
    const rng = (k: number) => {
      const v = Math.sin(k * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const N = 16;
    const top = DESK_TOP,
      dz = DESK_Z;
    for (let i = 0; i < N; i++) {
      // material próprio por folha: cada uma enrola no seu tempo
      const pmat = new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.82, side: THREE.DoubleSide });
      const u = curlPaper(pmat);
      const mesh = new THREE.Mesh(paperGeometry((i % 4) / 4, 1 - (Math.floor(i / 4) + 1) / 4), pmat);
      mesh.castShadow = mesh.receiveShadow = !small;
      mesh.matrixAutoUpdate = false;
      const onFloor = i >= 13;
      const mess = new THREE.Matrix4().compose(
        onFloor
          ? new THREE.Vector3(-0.6 + rng(i) * 1.3, 0.016 + i * 0.0005, dz + 0.75 + rng(i + 9) * 0.6)
          : new THREE.Vector3(-0.78 + rng(i) * 1.5, top + 0.005 + i * 0.0011, dz + 0.06 + rng(i + 5) * 0.3),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rng(i + 1) * Math.PI * 2, 0)),
        new THREE.Vector3(1, 1, 1),
      );
      // em leque no ar, de frente para quem chega
      const t = i / (N - 1);
      const fan = new THREE.Matrix4().compose(
        new THREE.Vector3(-0.92 + t * 1.84, top + 0.42 + Math.sin(t * Math.PI) * 0.12, dz + 0.36 - Math.sin(t * Math.PI) * 0.14),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2 - 0.12, (0.5 - t) * 0.55, (t - 0.5) * 0.25, 'YXZ')),
        new THREE.Vector3(0.9, 0.9, 0.9),
      );
      // e depois para dentro do monitor
      const scr = this.screens[i % 3].mesh;
      const sp = scr.getWorldPosition(new THREE.Vector3());
      const sq = scr.getWorldQuaternion(new THREE.Quaternion()).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)));
      const into = new THREE.Matrix4().compose(sp, sq, new THREE.Vector3(0.02, 0.02, 0.02));
      mesh.matrix.copy(mess);
      s.add(mesh);
      this.papers.push({ mesh, mess, fan, into, delay: rng(i + 11), u });
    }

    /* ---------- processo: quatro cartões pregados acima da mesa ---------- */
    const prT = toTex(processBoard(2400, 800), r);
    const cw = 0.46,
      chh = 0.613;
    for (let i = 0; i < 4; i++) {
      const g = new THREE.PlaneGeometry(cw, chh, 6, 8);
      const uv = g.attributes.uv as THREE.BufferAttribute;
      for (let k = 0; k < uv.count; k++) uv.setX(k, (i + uv.getX(k)) / 4);
      // o curlPaper dobra uma folha deitada; o cartão é deitado na geometria e posto em pé no objeto
      g.rotateX(-Math.PI / 2);
      const fm = new THREE.MeshStandardMaterial({ map: prT, roughness: 0.85, side: THREE.DoubleSide });
      const u = curlPaper(fm);
      const face2 = new THREE.Mesh(g, fm);
      face2.rotation.x = Math.PI / 2;
      face2.position.z = 0.002;
      face2.castShadow = true;
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), i % 2 ? purpleMat : steel);
      pin.position.set(0, chh / 2 - 0.03, 0.012);
      const card = new THREE.Group();
      card.add(face2, pin);
      const rest = new THREE.Matrix4().compose(new THREE.Vector3(-0.84 + i * 0.56, 1.78, ROOM.back + 0.008), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, (i % 2 ? 1 : -1) * 0.012)), new THREE.Vector3(1, 1, 1));
      card.matrixAutoUpdate = false;
      card.matrix.copy(rest);
      s.add(card);
      this.cards.push({ mesh: card, rest, pin, u });
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
      S(V(1.05, 1.5, -0.25), V(ROOM.W / 2, 1.5, -0.25), Rt),
      S(V(0, 1.7, mob ? 0.2 : -0.75), V(0, 1.8, ROOM.back), mob ? [0, 0.2] : [0, 0.06]),
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
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.28, 0.55, 1.2);
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
    if (this.dust) (this.dust.material as THREE.ShaderMaterial).uniforms.uPx.value = h * dpr * 0.012;
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
    m: new THREE.Matrix4(),
    up: new THREE.Vector3(0, 1, 0),
    spinQ: new THREE.Quaternion(),
  };

  private blendPose(a: THREE.Matrix4, b: THREE.Matrix4, t: number, lift: number, out: THREE.Matrix4, spin = 0) {
    const { p, q, s, p2, q2, s2 } = this.tmp;
    a.decompose(p, q, s);
    b.decompose(p2, q2, s2);
    p.lerp(p2, t);
    p.y += Math.sin(Math.min(1, t) * Math.PI) * lift;
    q.slerp(q2, Math.min(1, t));
    // gira no ar enquanto sobe
    if (spin) q.premultiply(this.tmp.spinQ.setFromAxisAngle(this.tmp.up, Math.sin(Math.min(1, t) * Math.PI) * spin));
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
    const spring = (t: number) => (this.still ? t : backOut(t));

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

    // 0 → 1: a cadeira rola para trás girando, passa um pouco do ponto e assenta
    {
      const t = ss(0.08, 0.9, sP);
      const kk = spring(t);
      this.chair.position.set(0.45 - kk * 1.55, 0, DESK_Z + 0.8 + kk * 1.2);
      this.chair.rotation.y = -0.15 + kk * 0.9 + Math.sin(t * Math.PI) * 0.6;
      this.chairShadow.position.set(this.chair.position.x, 0.014, this.chair.position.z);
    }

    // papelada: mesa → leque no ar → para dentro dos monitores, enrolando no caminho
    const mtx = this.tmp.m;
    for (const pp of this.papers) {
      const d = pp.delay;
      const a = ss(0.12 + d * 0.3, 0.75 + d * 0.25, sP);
      const b = ss(1.12 + d * 0.25, 1.55 + d * 0.25, sP);
      if (b <= 0) this.blendPose(pp.mess, pp.fan, a > 0 ? spring(a) : 0, 0.3, mtx, 0.8 * (d - 0.5));
      else this.blendPose(pp.fan, pp.into, easeInOut(b), 0.12, mtx);
      const floating = a > 0.99 && b < 0.01;
      if (floating && !this.still) mtx.elements[13] += Math.sin(this.time * 1.4 + d * 9) * 0.006;
      pp.mesh.matrix.copy(mtx);
      pp.mesh.matrixWorldNeedsUpdate = true;
      pp.mesh.visible = b < 0.995;
      pp.u.uCurl.value = Math.sin(a * Math.PI) * 0.9 * (1 - b) + Math.sin(b * Math.PI) * 1.6;
      pp.u.uFlutter.value = (floating ? 0.6 : 0) + Math.sin(a * Math.PI) * 0.8 + b * 1.2;
      pp.u.uTime.value = this.time + d * 10;
    }

    // monitores ligam quando o papel chega; a luz da tela acende a mesa
    this.screens.forEach((sc, i) => {
      const on = ss(1.45 + i * 0.12, 1.95 + i * 0.12, sP);
      sc.mat.uniforms.uOn.value = on;
      sc.mat.uniforms.uTime.value = this.time;
      if (sc.light) sc.light.intensity = on * 2.2 * (1 - this.diveK * 0.6);
    });
    for (const gl of this.glows) gl.mat.color.copy(gl.base).multiplyScalar(0.03 + 0.97 * ss(gl.at, gl.at + 0.4, sP));
    // fans do gabinete aceleram com a máquina ligando
    if (!this.still) this.fanSpin += dt * (2 + ss(1.3, 1.8, sP) * 26);
    this.fans.forEach((f, i) => (f.rotation.z = this.fanSpin * (1 + i * 0.07) + i));

    // quadro: escrito enquanto a câmera chega
    const rv = ss(4.15, 4.95, sP);
    this.board.uniforms.uReveal.value = rv;
    {
      const n = 6,
        cell = Math.min(n - 1, Math.floor(rv * n)),
        f = rv * n - cell;
      const cx = (cell % 3) / 3,
        cy = Math.floor(cell / 3) / 2;
      const { w: bw, h: bh } = BOARD;
      const tx = (cx + (rv >= 1 ? 1 / 3 : f / 3)) * bw - bw / 2;
      const ty = bh / 2 - (cy + 0.25 + Math.sin(f * 30) * 0.02 + (rv >= 1 ? 0.6 : 0)) * bh;
      const active = rv > 0 && rv < 1;
      const target = active ? new THREE.Vector3(tx, ty, 0.08) : new THREE.Vector3(0.75, -bh / 2 - 0.02, 0.04);
      if (this.still) this.marker.position.copy(target);
      else this.marker.position.lerp(target, 1 - Math.exp(-dt * 14));
      this.marker.rotation.set(active ? -0.75 : -Math.PI / 2, 0, active ? 0.3 + Math.sin(this.time * 18) * 0.04 : Math.PI / 2);
    }

    // processo: cada cartão chega girando, é pregado e ainda balança
    this.cards.forEach((c, i) => {
      const t = ss(5.2 + i * 0.13, 5.62 + i * 0.13, sP);
      const { p, q, s } = this.tmp;
      c.rest.decompose(p, q, s);
      const off = 1 - spring(t);
      p.z += off * 0.5;
      p.y += off * 0.25;
      const sway = this.still ? 0 : Math.sin(this.time * 2.2 + i) * 0.012 * ss(5.5, 6.5, sP);
      q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-off * 0.6, off * (i % 2 ? 0.5 : -0.5), off * (i % 2 ? 0.4 : -0.4) + sway)));
      s.setScalar(t < 0.01 ? 0.0001 : 1);
      c.mesh.matrix.compose(p, q, s);
      c.mesh.matrixWorldNeedsUpdate = true;
      c.pin.visible = t > 0.95;
      c.u.uCurl.value = -off * 1.2;
      c.u.uFlutter.value = off * 1.5;
      c.u.uTime.value = this.time + i;
    });

    // notebook abre e liga no contato
    const open = ss(6.2, 6.85, sP);
    this.lap.lid.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.32, spring(open));
    const lon = ss(6.65, 7, sP);
    this.lap.screen.mat.uniforms.uOn.value = lon;
    this.lap.screen.mat.uniforms.uTime.value = this.time;
    if (this.lap.screen.light) this.lap.screen.light.intensity = lon * 1.6;

    // luminária olha para onde o cursor aponta na mesa
    this.aimLamp(dt);

    (this.beam.material as THREE.ShaderMaterial).uniforms.uTime.value = this.time;
    if (this.dust) (this.dust.material as THREE.ShaderMaterial).uniforms.uTime.value = this.time;
    if (this.composer) this.composer.render(dt);
    else this.renderer.render(this.scene, cam);
  }

  /** O dia: mistura os dois lightmaps e leva o sol, o céu, o feixe e a poeira junto. */
  dayAt(u: number) {
    const t = ss(0.25, 0.95, u);
    this.day.uDay.value = t;
    const dir = SUN.a.dir.clone().lerp(SUN.b.dir, t).normalize();
    const col = SUN.a.color.clone().lerp(SUN.b.color, t);
    this.sun.color.copy(col);
    this.sun.position.copy(this.sun.target.position).addScaledVector(dir, -14);
    this.sky.color.copy(SUN.a.sky.clone().lerp(SUN.b.sky, t)).multiplyScalar(1.6);
    this.hemi.color.copy(col).lerp(new THREE.Color(0xf4f6ff), 0.6);
    const { x, z0, z1, y0, y1 } = WIN;
    const pos = this.beam.geometry.attributes.position as THREE.BufferAttribute;
    const Lb = 6.5;
    // ordem dos vértices casa com aWin: 0..3 na janela, 4..7 no fim do feixe
    [
      [z0, y0],
      [z0, y1],
      [z1, y0],
      [z1, y1],
    ].forEach(([z, y], i) => {
      pos.setXYZ(i, x, y, z);
      pos.setXYZ(i + 4, x + dir.x * Lb, y + dir.y * Lb, z + dir.z * Lb);
    });
    pos.needsUpdate = true;
    const bm = this.beam.material as THREE.ShaderMaterial;
    bm.uniforms.uColor.value.copy(col);
    bm.uniforms.uStrength.value = 0.02 + t * 0.008;
    if (this.dust) {
      (this.dust.material as THREE.ShaderMaterial).uniforms.uColor.value.copy(col);
      // a poeira acompanha o feixe: gira o conjunto em volta do centro da janela
      const c = new THREE.Vector3(x, (y0 + y1) / 2, (z0 + z1) / 2);
      const q = new THREE.Quaternion().setFromUnitVectors(SUN.a.dir, dir);
      this.dust.quaternion.copy(q);
      this.dust.position.copy(c).sub(c.clone().applyQuaternion(q));
    }
  }

  private aimLamp(dt: number) {
    const L = this.lamp;
    const target = this.tmp.lampAim;
    const want = new THREE.Vector3(0.1, DESK_TOP, DESK_Z + 0.15);
    if (this.hasPointer && !this.mobile && this.diveK < 0.01) {
      this.tmp.ray.setFromCamera(this.pointer, this.camera);
      this.tmp.plane.constant = -DESK_TOP;
      const hit = new THREE.Vector3();
      if (this.tmp.ray.ray.intersectPlane(this.tmp.plane, hit)) {
        want.set(THREE.MathUtils.clamp(hit.x, -1.25, 1.25), DESK_TOP, THREE.MathUtils.clamp(hit.z, DESK_Z - 0.3, DESK_Z + 0.4));
      }
    }
    if (target.lengthSq() === 0 || this.still) target.copy(want);
    else target.lerp(want, 1 - Math.exp(-dt * 5));
    // base gira na direção do alvo, cúpula aponta para ele
    const base = L.yaw.getWorldPosition(new THREE.Vector3());
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
      this.lamp.spot.castShadow = false;
      this.screens.forEach((sc, i) => sc.light && (sc.light.visible = i === 1 && this.tier === 'mid'));
      if (this.dust) this.dust.visible = this.tier === 'mid';
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
