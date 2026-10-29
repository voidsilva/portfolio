import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Caustics, Poisson, LightAtlas, LIGHT_MARGIN, ATLAS_TILES, type Glass, type LightSpec, MAX_GLASS } from './caustics';
import { chart, word, ui, shot, blurred } from './content';

/*
  A câmara de luz: um espelho d'água raso num salão branco, com colunas finas
  dos lados. A luz entra pelo teto, a água espalha (o caos) e as peças de vidro
  juntam a luz em imagens (o sistema). A câmera anda pelo salão com a rolagem.
*/

export type Tier = 'high' | 'mid' | 'low';

interface Station {
  cam: THREE.Vector3;
  look: THREE.Vector3;
  /** desenho da lente do cursor nesta parada */
  lens: number;
  /** onde a lente descansa quando não há ponteiro (relativo ao alvo) */
  rest: [number, number];
  focus?: number;
}

/** Peça de vidro fixa: malha + pegada de luz. */
interface Piece {
  mesh: THREE.Object3D;
  glass: Glass;
  base: number; // amplitude cheia
}

// ladrilhos do atlas
const T = { chart: 0, name: 1, belaways: 2, ponto: 3, gastos: 4, ui: 5, ola: 6, p1: 7, p2: 8, p3: 9, p4: 10, brand: 11 };

const BG = new THREE.Color('#F4F5FA');

const FLOOR_VS = /* glsl */ `
varying vec3 vW;
void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}
`;
const FLOOR_FS = /* glsl */ `
precision highp float;
varying vec3 vW;
uniform sampler2D uLight;uniform sampler2D uImg;uniform sampler2D uShots;uniform vec2 uCenter;uniform float uSize;uniform float uRes;
uniform vec3 uCam;uniform vec3 uFog;uniform vec2 uFogR;uniform vec3 uSun;
uniform vec4 uG0[${MAX_GLASS}];uniform vec4 uG1[${MAX_GLASS}];uniform vec4 uG2[${MAX_GLASS}];
float colShadow(vec2 p){
  // colunas em x=±12 a cada 9 unidades; sombra projetada pelo sol
  float s=0.;
  for(int k=0;k<2;k++){
    float cx=k==0?-12.:12.;
    vec2 q=vec2(p.x-cx,mod(p.y-10.+4.5,9.)-4.5);
    // segmento da sombra: da base até a base + direção do sol * altura
    vec2 dir=normalize(uSun.xz)*12.;
    vec2 pa=q, ba=dir;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
    float d=length(pa-ba*h);
    s=max(s,(1.-smoothstep(.25,.9+h*1.6,d))*(1.-h*.7));
  }
  return s;
}
float glassShadow(vec2 p){
  // sombra suave e deslocada de cada vidro (o vidro também bloqueia um pouco)
  float s=0.;
  for(int i=0;i<${MAX_GLASS};i++){
    vec4 a=uG0[i],b=uG1[i],c=uG2[i];if(c.z<.001)continue;
    vec2 d=p-a.xy-normalize(uSun.xz)*1.1;float cs=cos(b.x),sn=sin(b.x);
    vec2 l=vec2(cs*d.x+sn*d.y,-sn*d.x+cs*d.y)/a.zw;
    float e=b.y>.5?1.-length(l):min(1.-abs(l.x),1.-abs(l.y));
    s=max(s,smoothstep(-.35,.25,e)*c.z*.5);
  }
  return s;
}
void main(){
  vec2 p=vW.xz;
  vec2 wuv=(p-uCenter)/uSize+.5;
  float inW=smoothstep(0.,.3,wuv.x)*smoothstep(1.,.7,wuv.x)*smoothstep(0.,.35,wuv.y)*smoothstep(1.,.8,wuv.y);
  vec2 tx=vec2(1.4/uRes);
  vec3 I=(texture2D(uLight,wuv).rgb*2.+texture2D(uLight,wuv+vec2(tx.x,0.)).rgb+texture2D(uLight,wuv-vec2(tx.x,0.)).rgb+texture2D(uLight,wuv+vec2(0.,tx.y)).rgb+texture2D(uLight,wuv-vec2(0.,tx.y)).rgb)/6.;
  I=mix(vec3(1.),I,inW);
  // a imagem pré-calculada de cada vidro
  for(int i=0;i<${MAX_GLASS};i++){
    vec4 a=uG0[i],b=uG1[i],cc=uG2[i];if(cc.z<.001||cc.x<0.)continue;
    vec2 d=p-a.xy;float cs=cos(b.x),sn=sin(b.x);
    vec2 l=vec2(cs*d.x+sn*d.y,-sn*d.x+cs*d.y)/a.zw;
    float M=${LIGHT_MARGIN.toFixed(2)};
    float e=b.y>.5?length(l):max(abs(l.x),abs(l.y));
    if(e>M)continue;
    vec2 uv=vec2(l.x,-l.y)/(2.*M)+.5;
    vec2 t=vec2(mod(cc.x,${ATLAS_TILES}.),floor(cc.x/${ATLAS_TILES}.));
    vec3 J=texture2D(uImg,(t+uv)/${ATLAS_TILES}.).rgb;
    float w=cc.z*(1.-smoothstep(M-.25,M-.02,e));
    // placas de projeto: a luz atravessa a tela impressa no vidro (como um slide)
    if(b.w>=0.){
      vec2 su=clamp(vec2(l.x,-l.y)*.5+.5,0.,1.);
      vec3 sc=texture2D(uShots,vec2((b.w+su.x)/3.,su.y)).rgb;
      float inS=step(abs(l.x),1.)*step(abs(l.y),1.);
      J*=mix(vec3(1.),.35+sc*1.05,inS*.85);
    }
    I=mix(I,J,w);
  }
  float L=I.g;
  vec3 shade=vec3(.80,.81,.875),base=vec3(.905,.912,.945),white=vec3(1.);
  vec3 c=mix(shade,base,smoothstep(.2,1.,L));
  c=mix(c,white,smoothstep(1.,1.9,L));
  // luz muito concentrada ganha um brilho levemente lilás
  c+=vec3(.02,0.,.05)*smoothstep(1.8,3.5,L);
  // dispersão: franjas roxas e ciano
  c=mix(c,vec3(.80,.73,1.),clamp((I.r-I.g)*.45,0.,.55));
  c=mix(c,vec3(.72,.93,1.),clamp((I.b-I.g)*.45,0.,.55));
  // piso de pedra clara em placas grandes
  vec2 g=abs(fract(p/3.)-.5)*3.;float w=fwidth(p.x)*1.2;
  float line=1.-smoothstep(0.,w,min(1.5-g.x,1.5-g.y));
  c*=1.-line*.035;
  c*=1.-colShadow(p)*.09;
  c*=1.-glassShadow(p)*.06;
  float dist=length(vW-uCam);
  c=mix(c,uFog,smoothstep(uFogR.x,uFogR.y,dist));
  gl_FragColor=vec4(pow(c,vec3(2.2)),1.);
}
`;

const POST_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tColor;uniform sampler2D tDepth;
uniform vec2 uRes;uniform float uFocus;uniform float uAperture;uniform float uIntro;uniform float uNear;uniform float uFar;
float lin(float d){float z=d*2.-1.;return 2.*uNear*uFar/(uFar+uNear-z*(uFar-uNear));}
void main(){
  float d=lin(texture2D(tDepth,vUv).x);
  float coc=clamp(abs(d-uFocus)/d*uAperture,0.,1.);
  coc=max(coc,uIntro);
  float rad=coc*14.;
  vec3 acc=vec3(0.);float wsum=0.;
  const float GA=2.39996323;
  for(int i=0;i<24;i++){
    float fi=float(i);float r=sqrt((fi+.5)/24.)*rad;float th=fi*GA;
    vec2 o=vec2(cos(th),sin(th))*r/uRes;
    vec3 s=texture2D(tColor,vUv+o).rgb;
    float w=1.;acc+=s*w;wsum+=w;
  }
  vec3 c=rad<.5?texture2D(tColor,vUv).rgb:acc/wsum;
  c=pow(c,vec3(1./2.2));
  // vinheta clara, quase imperceptível
  vec2 q=vUv-.5;c=mix(c,c*.985,dot(q,q)*1.2);
  gl_FragColor=vec4(c,1.);
}
`;

function lensGeometry(R: number, t: number) {
  const pts: THREE.Vector2[] = [];
  const N = 28,
    e = 0.04;
  for (let i = 0; i <= N; i++) {
    const r = (i / N) * R;
    pts.push(new THREE.Vector2(r, -(e + (t / 2) * (1 - (r / R) ** 2))));
  }
  for (let i = N; i >= 0; i--) {
    const r = (i / N) * R;
    pts.push(new THREE.Vector2(r, e + (t / 2) * (1 - (r / R) ** 2)));
  }
  const g = new THREE.LatheGeometry(pts, 96);
  g.computeVertexNormals();
  return g;
}

export class World {
  readonly renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private caustics!: Caustics;
  private lights!: LightAtlas;
  private floorMat!: THREE.ShaderMaterial;
  private glassMat!: THREE.Material;
  private pieces: Piece[] = [];
  private lens!: THREE.Mesh;
  private lensSlots: Glass[] = [];
  private lensTile = -1;
  private stations: Station[] = [];
  private camCurve!: THREE.CatmullRomCurve3;
  private lookCurve!: THREE.CatmullRomCurve3;
  private progress = 0;
  private shown = 0;
  private pointer = new THREE.Vector2(0, 0);
  private hasPointer = false;
  private lensPos = new THREE.Vector3(0, 0, 0);
  private lensVel = new THREE.Vector3();
  private ray = new THREE.Raycaster();
  private plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private clock = new THREE.Clock();
  private time = 0;
  private running = false;
  private rt?: THREE.WebGLRenderTarget;
  private post?: { scene: THREE.Scene; mat: THREE.ShaderMaterial };
  private intro = 1;
  private still: boolean;
  private frames: number[] = [];
  waterAmp = 0.065;
  onTier?: (t: Tier) => void;

  constructor(
    canvas: HTMLCanvasElement,
    private tier: Tier,
    opts: { still: boolean },
  ) {
    this.still = opts.still;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: tier === 'low', powerPreference: 'high-performance', alpha: false });
    this.renderer.setClearColor(BG);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // a conversão final é feita no pós
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.5, 220);
  }

  private get mobile() {
    return innerWidth < 820;
  }

  async init() {
    const r = this.renderer;
    const high = this.tier === 'high';
    this.setSize();

    // 1. relevos: cada desenho vira uma lente que forma aquela imagem
    const poisson = new Poisson(r);
    const base = chart();
    const jobs: [number, HTMLCanvasElement | Promise<HTMLCanvasElement>][] = [
      [T.chart, base],
      [T.name, word('Paulo', 104)],
      [T.ola, word('olá', 132)],
      [T.brand, word('SilvaDev', 80, false)],
      [T.ui, ui()],
      [T.p1, blurred(base, 9)],
      [T.p2, blurred(base, 5)],
      [T.p3, blurred(base, 2.4)],
      [T.p4, base],
      [T.belaways, shot('/belaways.webp')],
      [T.ponto, shot('/pontofacial.webp')],
      [T.gastos, shot('/gastos.webp')],
    ];
    const rect = new Set([T.belaways, T.ponto, T.gastos]);
    for (const [tile, c] of jobs) {
      const cv = await c;
      poisson.solve(cv, tile, high ? 256 : 128, !rect.has(tile));
      await new Promise((res) => setTimeout(res, 0)); // devolve o controle entre ladrilhos
    }

    // 2. a luz que cada vidro forma, calculada uma vez
    this.lights = new LightAtlas(r, poisson.atlas.texture, high ? 512 : 256, high ? 512 : this.tier === 'mid' ? 384 : 256, this.tier !== 'low');
    const L = (spec: Partial<LightSpec> & { tile: number }) => this.lights.bake({ round: 1, contrast: 1.25, bevel: 0.0007, ramp: 0, ...spec });
    const lit = {
      chart: L({ tile: T.chart }),
      name: L({ tile: T.name, contrast: 1 }),
      ui: L({ tile: T.ui }),
      brand: L({ tile: T.brand, contrast: 1 }),
      belaways: L({ tile: T.belaways, round: 0, contrast: 2, bevel: 0.001 }),
      ponto: L({ tile: T.ponto, round: 0, contrast: 2, bevel: 0.001 }),
      gastos: L({ tile: T.gastos, round: 0, contrast: 2, bevel: 0.001 }),
      p1: L({ tile: T.p1 }),
      p2: L({ tile: T.p2 }),
      p3: L({ tile: T.p3 }),
      p4: L({ tile: T.p4 }),
      ola: L({ tile: T.ola, contrast: 1 }),
      prismA: L({ tile: -1, round: 0, bevel: 0.002, ramp: 0.35 }),
      prismB: L({ tile: -1, round: 0, bevel: 0.002, ramp: 0.55 }),
    };

    this.caustics = new Caustics(poisson.atlas.texture, {
      heightRes: high ? 512 : 256,
      causticRes: high ? 1024 : this.tier === 'mid' ? 768 : 512,
      grid: high ? 400 : this.tier === 'mid' ? 260 : 170,
      dispersion: this.tier !== 'low',
    });
    this.caustics.size = this.mobile ? 22 : 38;

    // 2. ambiente: luz de estúdio para os reflexos do vidro
    const pm = new THREE.PMREMGenerator(r);
    this.scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    this.scene.background = BG.clone().convertSRGBToLinear();
    this.scene.fog = new THREE.Fog(BG.clone().convertSRGBToLinear(), 34, 90);

    const hemi = new THREE.HemisphereLight(0xffffff, 0xdfe2ee, 1.15);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(-5, 14, 4);
    this.scene.add(sun);
    const sunDir = sun.position.clone().normalize().negate();

    // telas dos projetos lado a lado (para a projeção no chão e o slide no vidro)
    const shotImgs = await Promise.all(['/belaways.webp', '/pontofacial.webp', '/gastos.webp'].map(async (src) => {
      const im = new Image();
      im.src = src;
      await im.decode();
      return im;
    }));
    const sc = document.createElement('canvas');
    sc.width = 1536;
    sc.height = 512;
    const sx = sc.getContext('2d')!;
    shotImgs.forEach((im, i) => {
      const w = 512 - 24,
        h = (w * im.height) / im.width;
      sx.fillStyle = '#000';
      sx.drawImage(im, i * 512 + 12, (512 - h) / 2, w, h);
    });
    const shots = new THREE.CanvasTexture(sc);
    shots.colorSpace = THREE.NoColorSpace;
    shots.anisotropy = 8;

    // 3. chão de pedra clara que recebe a luz
    const c = this.caustics;
    this.floorMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VS,
      fragmentShader: FLOOR_FS,
      uniforms: {
        uLight: { value: c.light.texture },
        uImg: { value: this.lights.rt.texture },
        uShots: { value: shots },
        uCenter: { value: c.center },
        uSize: { value: c.size },
        uRes: { value: c.light.width },
        uCam: { value: this.camera.position },
        uFog: { value: new THREE.Vector3(BG.r, BG.g, BG.b) },
        uFogR: { value: new THREE.Vector2(30, 80) },
        uSun: { value: sunDir },
        uG0: { value: Array.from({ length: MAX_GLASS }, () => new THREE.Vector4(0, 0, 1, 1)) },
        uG1: { value: Array.from({ length: MAX_GLASS }, () => new THREE.Vector4()) },
        uG2: { value: Array.from({ length: MAX_GLASS }, () => new THREE.Vector4(-1, 0, 0, 0)) },
      },
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(64, 200), this.floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.z = -60;
    this.scene.add(floor);

    // 4. arquitetura: borda do espelho d'água e colunas finas
    const stone = new THREE.MeshStandardMaterial({ color: 0xe9ebf2, roughness: 0.9, envMapIntensity: 0.25 });
    const edge = new THREE.BoxGeometry(0.7, 0.28, 200);
    for (const x of [-10.6, 10.6]) {
      const e = new THREE.Mesh(edge, stone);
      e.position.set(x, 0.14, -60);
      this.scene.add(e);
    }
    const colGeo = new THREE.CylinderGeometry(0.34, 0.34, 16, 24);
    const cols = new THREE.InstancedMesh(colGeo, stone, 46);
    const m = new THREE.Matrix4();
    let n = 0;
    for (let i = 0; i < 23; i++)
      for (const x of [-12, 12]) {
        m.makeTranslation(x, 8, 10 - i * 9);
        cols.setMatrixAt(n++, m);
      }
    this.scene.add(cols);

    // 5. vidro
    this.glassMat =
      this.tier === 'low'
        ? new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.28, envMapIntensity: 1.4, clearcoat: 1 })
        : new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.035,
            metalness: 0,
            transmission: 1,
            thickness: 0.7,
            ior: 1.5,
            dispersion: high ? 4 : 0,
            attenuationColor: new THREE.Color('#E9E2FF'),
            attenuationDistance: 5,
            specularIntensity: 1,
            envMapIntensity: 1.3,
          });

    // lente do cursor
    const LR = this.mobile ? 2 : 2.5;
    this.lens = new THREE.Mesh(lensGeometry(LR, 0.75), this.glassMat);
    this.scene.add(this.lens);
    const lensGlass = (tile: number, on: number): Glass => ({ x: 0, z: 0, hx: LR, hz: LR, rot: 0, round: 1, amp: 0, bevel: 0.006, tile, calm: 1, on });
    this.lensSlots = [lensGlass(lit.chart, 1), lensGlass(lit.name, 0)];
    this.lensTile = lit.chart;

    const add = (mesh: THREE.Object3D, g: Omit<Glass, 'on'>, contrast: number) => {
      const glass: Glass = { ...g, on: 0 };
      void contrast;
      this.pieces.push({ mesh, glass, base: glass.amp });
      this.scene.add(mesh);
    };

    // projetos: placas de vidro que projetam a tela do sistema em luz
    const slab = (x: number, z: number, rot: number, tile: number, shot: number) => {
      const w = 6.4,
        d = 6.4;
      const g = new THREE.Group();
      const glass = new THREE.Mesh(new RoundedBoxGeometry(w, 0.22, d, 4, 0.09), this.glassMat);
      g.add(glass);
      // a tela impressa no vidro, como um slide
      const tex = shots.clone();
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.repeat.set(1 / 3, 1);
      tex.offset.set(shot / 3, 0);
      tex.needsUpdate = true;
      const film = new THREE.Mesh(
        new THREE.PlaneGeometry(w * 0.96, d * 0.96),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.82, depthWrite: false }),
      );
      film.rotation.x = -Math.PI / 2;
      film.position.y = 0.113;
      g.add(film);
      g.position.set(x, 1.45, z);
      g.rotation.y = rot;
      add(g, { x, z, hx: w / 2, hz: d / 2, rot: -rot, round: 0, amp: 0, bevel: 0.01, tile, calm: 1, shot }, 1.8);
    };
    slab(-3.2, -38, 0.12, lit.belaways, 0);
    slab(3.4, -50, -0.1, lit.ponto, 1);
    slab(-3.2, -62, 0.08, lit.gastos, 2);

    // serviços: prismas que desviam faixas de luz (cada faixa, um serviço)
    for (let i = 0; i < 6; i++) {
      const x = -7.5 + i * 3;
      const z = -80 + (i % 2) * 1.6;
      const prism = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 7.4, 3, 1), this.glassMat);
      prism.rotation.set(Math.PI / 2, 0, Math.PI / 6 + i * 0.07);
      prism.position.set(x, 1 + (i % 3) * 0.18, z);
      add(prism, { x, z, hx: 0.54, hz: 3.7, rot: 0, round: 0, amp: 0, bevel: 0.014, tile: i % 2 ? lit.prismB : lit.prismA, calm: 0.7, ramp: 0.22 + i * 0.03 }, 0);
    }

    // processo: quatro lentes em fila, cada uma mais nítida
    [lit.p1, lit.p2, lit.p3, lit.p4].forEach((tile, i) => {
      const R = 1.75;
      const x = -6.3 + i * 4.2,
        z = -98;
      const l = new THREE.Mesh(lensGeometry(R, 0.55), this.glassMat);
      l.position.set(x, 1.1 + i * 0.12, z);
      add(l, { x, z, hx: R, hz: R, rot: 0, round: 1, amp: 0, bevel: 0.005, tile, calm: 1 }, 2);
    });

    // contato: a lente grande
    {
      const R = 3.6;
      const l = new THREE.Mesh(lensGeometry(R, 1), this.glassMat);
      l.position.set(0, 1.6, -116);
      add(l, { x: 0, z: -116, hx: R, hz: R, rot: 0, round: 1, amp: 0, bevel: 0.006, tile: lit.ola, calm: 1 }, 2.2);
    }

    // 6. paradas da câmera (uma por bloco de conteúdo)
    const mob = this.mobile;
    const S = (cam: [number, number, number], look: [number, number, number], lens: number, rest: [number, number]): Station => ({
      cam: new THREE.Vector3(...cam),
      look: new THREE.Vector3(...look),
      lens,
      rest,
    });
    this.stations = mob
      ? [
          S([0, 13, 8], [0, 0, -1.5], lit.chart, [0, 1.2]),
          S([-2, 10, -12], [0.5, 0, -21], lit.name, [0.5, 0]),
          S([-3.2, 11, -31], [-3.2, 0, -38.5], lit.ui, [-3.2, -33]),
          S([3.4, 11, -43], [3.4, 0, -50.5], lit.ui, [3.4, -45]),
          S([-3.2, 11, -55], [-3.2, 0, -62.5], lit.ui, [-3.2, -57]),
          S([0, 15, -73], [0, 0, -80.5], lit.chart, [0, -75]),
          S([0, 14, -91], [0, 0, -98.5], lit.chart, [0, -93]),
          S([0, 15, -108], [0, 0, -116.5], lit.brand, [0, -111]),
        ]
      : [
          S([-1, 7, 12], [3, 0.4, -3], lit.chart, [7.4, -1.5]),
          S([-5, 7, -12], [2.5, 0, -21], lit.name, [4.5, -21]),
          S([3.5, 8, -31], [-2.2, 0, -38.5], lit.ui, [5.2, -36]),
          S([-3.5, 8, -43], [2.6, 0, -50.5], lit.ui, [-5, -48]),
          S([3.5, 8, -55], [-2.2, 0, -62.5], lit.ui, [5.2, -60]),
          S([0, 12.5, -71], [0, 0, -80.5], lit.chart, [0, -75]),
          S([-9, 8.5, -91], [0, 0, -98.5], lit.chart, [0, -93.5]),
          S([0, 13, -106], [0, 0, -116.5], lit.brand, [6.4, -112]),
        ];
    this.camCurve = new THREE.CatmullRomCurve3(this.stations.map((s) => s.cam), false, 'centripetal');
    this.lookCurve = new THREE.CatmullRomCurve3(this.stations.map((s) => s.look), false, 'centripetal');
    this.lensPos.set(this.stations[0].rest[0], 0, this.stations[0].rest[1]);

    // 7. pós: profundidade de campo (o "foco")
    if (this.tier !== 'low') this.makePost();

    this.place(0);
    // compila tudo antes do primeiro quadro para não engasgar
    await (r as THREE.WebGLRenderer & { compileAsync?: (s: THREE.Scene, c: THREE.Camera) => Promise<unknown> }).compileAsync?.(this.scene, this.camera);
  }

  private makePost() {
    const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 0 });
    rt.depthTexture = new THREE.DepthTexture(1, 1);
    this.rt = rt;
    const mat = new THREE.ShaderMaterial({
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
      fragmentShader: POST_FS,
      uniforms: {
        tColor: { value: rt.texture },
        tDepth: { value: rt.depthTexture },
        uRes: { value: new THREE.Vector2() },
        uFocus: { value: 12 },
        uAperture: { value: 0.55 },
        uIntro: { value: 1 },
        uNear: { value: this.camera.near },
        uFar: { value: this.camera.far },
      },
      depthTest: false,
      depthWrite: false,
    });
    const s = new THREE.Scene();
    const q = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    q.frustumCulled = false;
    s.add(q);
    this.post = { scene: s, mat };
    this.setSize();
  }

  setSize() {
    const w = innerWidth,
      h = innerHeight;
    const cap = this.tier === 'high' ? 1.75 : this.tier === 'mid' ? 1.25 : 1;
    const dpr = Math.min(devicePixelRatio || 1, cap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 52 : 36;
    this.camera.updateProjectionMatrix();
    if (this.rt) {
      this.rt.setSize(Math.floor(w * dpr), Math.floor(h * dpr));
      this.post!.mat.uniforms.uRes.value.set(w * dpr, h * dpr);
    }
  }

  /** 0..(paradas-1), contínuo */
  setProgress(p: number) {
    this.progress = THREE.MathUtils.clamp(p, 0, this.stations.length - 1);
  }
  get stationCount() {
    return this.stations.length;
  }

  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
    this.hasPointer = true;
  }
  clearPointer() {
    this.hasPointer = false;
  }

  /** Abertura: foco sai do borrado para o nítido. */
  setIntro(v: number) {
    this.intro = v;
  }
  reveal(ms = 1600) {
    const t0 = performance.now();
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      this.intro = 1 - (1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }

  private place(p: number) {
    const u = p / (this.stations.length - 1);
    this.camCurve.getPoint(u, this.camera.position);
    const look = this.lookCurve.getPoint(u);
    // leve paralaxe com o ponteiro
    if (this.hasPointer && !this.still) {
      this.camera.position.x += this.pointer.x * 0.35;
      this.camera.position.y += this.pointer.y * 0.2;
    }
    this.camera.lookAt(look);
    this.caustics.center.set(look.x, look.z - (this.mobile ? 1 : 5));
    return look;
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

  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.still) this.time += dt;
    this.watch(dt);

    // câmera segue a rolagem com inércia
    const ease = this.still ? 1 : 1 - Math.exp(-dt * 6);
    this.shown += (this.progress - this.shown) * ease;
    const look = this.place(this.shown);
    const st = this.stations[Math.round(this.shown)];

    // lente do cursor: segue o ponto do chão sob o ponteiro, com mola
    const target = new THREE.Vector3(st.rest[0], 0, st.rest[1]);
    if (this.hasPointer && !this.mobile) {
      this.ray.setFromCamera(this.pointer, this.camera);
      this.ray.ray.intersectPlane(this.plane, target);
    }
    if (this.still) this.lensPos.copy(target);
    else {
      const k = 34,
        damp = 9;
      const a = target.clone().sub(this.lensPos).multiplyScalar(k).sub(this.lensVel.clone().multiplyScalar(damp));
      this.lensVel.addScaledVector(a, dt);
      this.lensPos.addScaledVector(this.lensVel, dt);
    }
    const lift = 1.5;
    this.lens.position.set(this.lensPos.x, lift, this.lensPos.z);
    this.lens.rotation.set(this.lensVel.z * 0.03, 0, -this.lensVel.x * 0.03);

    // troca o desenho da lente com cruzamento suave
    if (st.lens !== this.lensTile) {
      const [a, b] = this.lensSlots;
      if (b.on <= 0.02) {
        b.tile = st.lens;
        this.lensTile = st.lens;
        this.lensSlots = [b, a];
      }
    }
    const [cur, old] = this.lensSlots;
    const fade = this.still ? 1 : Math.min(1, dt * 3.5);
    cur.on += (1 - cur.on) * fade;
    old.on += (0 - old.on) * (this.still ? 1 : Math.min(1, dt * 5));
    for (const s of this.lensSlots) {
      s.x = this.lensPos.x;
      s.z = this.lensPos.z;
    }

    // peças perto da janela de luz ganham os espaços livres
    const c = this.caustics;
    const half = c.size / 2;
    const active: Glass[] = [this.lensSlots[0], this.lensSlots[1]];
    for (const pc of this.pieces) {
      const g = pc.glass;
      const dx = Math.abs(g.x - c.center.x) + Math.max(g.hx, g.hz),
        dz = Math.abs(g.z - c.center.y) + Math.max(g.hx, g.hz);
      const inside = dx < half * 0.92 && dz < half * 0.92;
      g.on += ((inside ? 1 : 0) - g.on) * (this.still ? 1 : Math.min(1, dt * 4));
      if (g.on > 0.002 && active.length < MAX_GLASS) active.push(g);
      // flutua devagar
      if (!this.still) pc.mesh.position.y += Math.sin(this.time * 0.6 + g.x) * 0.0009;
    }
    c.glass.length = 0;
    c.glass.push(...active);
    // a água acalma perto dos vidros que formam imagem
    c.water = this.waterAmp;
    c.update(this.renderer, this.time);
    this.syncFloor(active);

    // foco da lente da câmera: no ponto que ela olha
    if (this.post) {
      const u = this.post.mat.uniforms;
      u.uFocus.value = this.camera.position.distanceTo(look);
      u.uIntro.value = this.intro;
      u.uAperture.value = this.tier === 'high' ? 0.5 : 0.35;
      this.renderer.setRenderTarget(this.rt!);
      this.renderer.render(this.scene, this.camera);
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.post.scene, this.camera);
    } else {
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.render(this.scene, this.camera);
    }
  }

  private syncFloor(active: Glass[]) {
    const u = this.floorMat.uniforms;
    const pack = (f: (g: Glass) => [number, number, number, number]) =>
      Array.from({ length: MAX_GLASS }, (_, i) => (active[i] ? new THREE.Vector4(...f(active[i])) : new THREE.Vector4(0, 0, 1, 1)));
    u.uG0.value = pack((g) => [g.x, g.z, g.hx, g.hz]);
    u.uG1.value = pack((g) => [g.rot, g.round, g.amp, g.shot ?? -1]);
    u.uG2.value = Array.from({ length: MAX_GLASS }, (_, i) => (active[i] ? new THREE.Vector4(active[i].tile, active[i].calm, active[i].on, active[i].ramp ?? 0) : new THREE.Vector4(-1, 0, 0, 0)));
    u.uSize.value = this.caustics.size;
  }

  /** Mede o tempo de quadro e reduz a cena sozinho se o PC estiver sofrendo. */
  private watch(dt: number) {
    if (this.tier === 'low') return;
    this.frames.push(dt);
    if (this.frames.length < 120) return;
    const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
    this.frames.length = 0;
    if (avg > 1 / 40) {
      this.tier = this.tier === 'high' ? 'mid' : 'low';
      if (this.tier === 'low' && this.post) {
        this.post = undefined;
        this.rt?.dispose();
        this.rt = undefined;
      }
      this.setSize();
      this.onTier?.(this.tier);
    }
  }

  /** Depuração: mostra o atlas de luz na tela. */
  debugAtlas() {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: { t: { value: this.lights.rt.texture } },
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
        fragmentShader: `uniform sampler2D t;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(t,vUv).rgb*.4,1.);}`,
      }),
    );
    const s = new THREE.Scene();
    s.add(m);
    this.renderer.setRenderTarget(null);
    this.renderer.render(s, this.camera);
  }

  dispose() {
    this.stop();
    this.caustics?.dispose();
    this.renderer.dispose();
  }
}
