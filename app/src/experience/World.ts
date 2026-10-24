import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { LOGO, sampleLogo, toWorld } from './logoShape';
import { haloTexture, numberTexture } from './textures';

/**
 * O mundo SilvaDev: uma única cena contínua que a câmera atravessa.
 *   z ≈ 0      O Monólito (a marca NX em escala arquitetônica)
 *   z -30…-165 O Corredor (colunas com pulsos de luz)
 *   z -200…-340 A Galeria (projetos como placas flutuantes)
 *   z ≈ -400   O Núcleo (partículas que viram esfera, órbitas e a marca)
 * O estado `rig` é escrito pelo ScrollTrigger; a cena o persegue com amortecimento.
 */
export interface Rig {
  px: number; py: number; pz: number;
  lx: number; ly: number; lz: number;
  roll: number;
  fog: number;
  glitch: number;
  morph: number;
  energy: number;
}

export type Quality = 'high' | 'low';

const PURPLE = new THREE.Color('#9d8cf0');
const CYAN = new THREE.Color('#8fd3df');
// Paleta noturna e calma: azul-ardósia com toques de lavanda.
const HORIZON_TINT = new THREE.Color(0.055, 0.046, 0.1);
const FOGS = ['#0a0d14', '#0c1019', '#0b1318', '#13132a', '#0a0c12'].map((c) => new THREE.Color(c));

export const CORE_Z = -400;
export const SLOTS = Array.from({ length: 5 }, (_, i) => {
  const x = i % 2 === 0 ? -3.6 : 3.6;
  return { x, y: 4.3, z: -205 - i * 34, rotY: x < 0 ? 0.32 : -0.32 };
});

export const KEYS: Record<string, Rig> = {
  hero: { px: -4.2, py: 3.4, pz: 27, lx: -4.6, ly: 4.8, lz: 0, roll: 0, fog: 0, glitch: 0, morph: 0, energy: 1 },
  over: { px: 0, py: 13.5, pz: -8, lx: 0, ly: 4, lz: -48, roll: 0, fog: 0.6, glitch: 0, morph: 0, energy: 1 },
  corridor: { px: 0, py: 3.2, pz: -150, lx: 0, ly: 3.4, lz: -200, roll: 0.04, fog: 1, glitch: 0, morph: 0, energy: 1.2 },
  ...Object.fromEntries(
    SLOTS.map((s, i) => [
      `p${i}`,
      { px: s.x * 0.22, py: s.y + 0.2, pz: s.z + 10.5, lx: s.x * 0.92, ly: s.y, lz: s.z, roll: s.x < 0 ? 0.015 : -0.015, fog: 2, glitch: 0, morph: 0, energy: 1 },
    ]),
  ),
  about: { px: 0, py: 6, pz: CORE_Z + 17, lx: -3.6, ly: 6, lz: CORE_Z, roll: 0, fog: 3, glitch: 0, morph: 0, energy: 1 },
  stack: { px: 12, py: 12.5, pz: CORE_Z + 13, lx: -5, ly: 6.5, lz: CORE_Z, roll: -0.08, fog: 3.4, glitch: 0, morph: 1, energy: 1.2 },
  outro: { px: 0, py: 1.5, pz: CORE_Z + 40, lx: 0, ly: -0.5, lz: CORE_Z, roll: 0, fog: 4, glitch: 0, morph: 2, energy: 1.4 },
};

export class World {
  rig: Rig = { ...KEYS.hero };
  fps = 60;
  hovered = -1;
  private cur: Rig = { ...KEYS.hero };
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private finalPass: ShaderPass;
  private bloom?: UnrealBloomPass;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(40, 1, 0.1, 260);
  private fog = new THREE.FogExp2('#06070b', 0.026);
  private clock = new THREE.Clock();
  private pointer = new THREE.Vector2();
  private pointerCur = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();
  private disposables: { dispose: () => void }[] = [];
  private updaters: ((t: number, dt: number) => void)[] = [];
  private screens: THREE.Mesh[] = [];
  private reflector?: Reflector;
  private particleMat!: THREE.ShaderMaterial;
  private stripMat!: THREE.ShaderMaterial;
  private raf = 0;
  private running = false;
  private started = false;
  private fpsAcc = 0;
  private fpsN = 0;
  private high: boolean;
  private look = new THREE.Vector3();
  private tmpV = new THREE.Vector3();
  private fogBase = new THREE.Color();
  private corridor: THREE.Object3D[] = [];
  private reducedIntro = false;
  /** Reinicia o desenho da marca (chamado ao entrar na experiência). */
  introStart: () => void = () => {};
  introSkip: () => void = () => {};

  constructor(canvas: HTMLCanvasElement, quality: Quality, private screenTextures: THREE.Texture[]) {
    this.high = quality === 'high';
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.high ? 1.5 : 1));
    this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene.fog = this.fog;
    this.scene.background = new THREE.Color('#0a0d14');
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = env;
    this.disposables.push(pmrem, env);

    this.scene.add(new THREE.HemisphereLight('#2a2440', '#050507', 1.2));

    this.buildFloor();
    this.buildMonolith();
    this.buildCorridor();
    this.buildGallery();
    this.buildCore();
    this.buildDust();

    // Pós-processamento: bloom (desktop), aberração, glitch, grão e vinheta.
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    if (this.high) {
      // Higieniza o quadro antes do bloom: valores inválidos (NaN/∞) apagariam a tela inteira.
      this.composer.addPass(
        new ShaderPass({
          uniforms: { tDiffuse: { value: null } },
          vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
          fragmentShader: /* glsl */ `
            uniform sampler2D tDiffuse; varying vec2 vUv;
            void main(){
              vec4 c = texture2D(tDiffuse, vUv);
              if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0);
              gl_FragColor = vec4(clamp(c.rgb, 0.0, 24.0), 1.0);
            }`,
        }),
      );
      this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.38, 0.6, 0.55);
      this.composer.addPass(this.bloom);
    }
    this.finalPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uGlitch: { value: 0 },
        uAberr: { value: 0.0016 },
        uRes: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse; uniform float uTime; uniform float uGlitch; uniform float uAberr; uniform vec2 uRes;
        varying vec2 vUv;
        float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec2 uv = vUv;
          float g = uGlitch;
          float slice = floor(uv.y * 24.0 + floor(uTime * 14.0) * 5.0);
          float r = rand(vec2(slice, floor(uTime * 22.0)));
          uv.x += (r - 0.5) * 0.14 * g * step(1.0 - g * 0.55, r);
          vec2 dir = uv - 0.5;
          float d = length(dir);
          float ab = uAberr * (0.3 + d * 1.8) + g * 0.025;
          vec3 col;
          col.r = texture2D(tDiffuse, uv + dir * ab).r;
          col.g = texture2D(tDiffuse, uv).g;
          col.b = texture2D(tDiffuse, uv - dir * ab).b;
          col += g * 0.12 * vec3(0.55, 0.36, 0.96) * step(0.96, rand(vec2(floor(uv.y * 160.0), floor(uTime * 30.0))));
          col *= smoothstep(1.1, 0.32, d);
          col += (rand(uv * uRes + fract(uTime)) - 0.5) * 0.028;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.composer.addPass(this.finalPass);
    this.composer.addPass(new OutputPass());

    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  /* ---------------- construção ---------------- */

  private buildFloor() {
    if (this.high) {
      // Espelho d'água: o reflexo é distorcido por ondas suaves.
      const shader = {
        name: 'WaterReflector',
        uniforms: {
          color: { value: null },
          tDiffuse: { value: null },
          textureMatrix: { value: null },
          uTime: { value: 0 },
          uFog: { value: new THREE.Color() },
          uDensity: { value: 0.026 },
        },
        vertexShader: /* glsl */ `
          uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW; varying float vD;
          #include <common>
          #include <logdepthbuf_pars_vertex>
          void main(){
            vUv = textureMatrix * vec4(position, 1.0);
            vW = (modelMatrix * vec4(position, 1.0)).xyz;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vD = -mv.z;
            gl_Position = projectionMatrix * mv;
            #include <logdepthbuf_vertex>
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uFog; uniform float uDensity; varying vec4 vUv; varying vec3 vW; varying float vD;
          #include <logdepthbuf_pars_fragment>
          void main(){
            #include <logdepthbuf_fragment>
            vec2 w = vec2(
              sin(vW.x * 1.7 + uTime * 0.9) + sin(vW.z * 2.3 - uTime * 1.1) + sin((vW.x + vW.z) * 4.1 + uTime * 1.7) * 0.5,
              cos(vW.z * 1.9 + uTime * 0.8) + cos(vW.x * 2.7 - uTime * 1.3) + cos((vW.x - vW.z) * 3.7 + uTime * 1.5) * 0.5
            );
            vec4 uv = vUv;
            uv.xy += w * 0.0016 * uv.w;
            vec4 base = texture2DProj(tDiffuse, uv);
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(base.rgb * color, uFog, f), 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      };
      const r = new Reflector(new THREE.PlaneGeometry(160, 260), {
        textureWidth: Math.round(window.innerWidth * 0.6),
        textureHeight: Math.round(window.innerHeight * 0.6),
        color: new THREE.Color('#9a98b4'),
        clipBias: 0.003,
        shader,
      });
      r.rotation.x = -Math.PI / 2;
      r.position.set(0, 0, -90);
      this.scene.add(r);
      this.reflector = r;
      const mat = r.material as THREE.ShaderMaterial;
      this.updaters.push((t) => {
        mat.uniforms.uTime.value = t;
        mat.uniforms.uFog.value.copy(this.fog.color);
        mat.uniforms.uDensity.value = this.fog.density;
      });
      this.disposables.push(r.geometry, mat, r.getRenderTarget());
    }
    // Chão escuro com grade fina; no desktop fica sobre o espelho, translúcido.
    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(160, 900),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: PURPLE }, uBase: { value: new THREE.Color('#07080c') }, uSolid: { value: this.high ? 0.22 : 1 }, uFog: { value: new THREE.Color() }, uDensity: { value: 0.026 } },
        vertexShader: /* glsl */ `varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform vec3 uBase; uniform float uSolid; uniform vec3 uFog; uniform float uDensity; varying vec3 vW; varying float vD;
          float line(float v, float w){ float f = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - f); }
          void main(){
            float g = max(line(vW.x / 4.0, 0.012), line(vW.z / 4.0, 0.012));
            float fade = exp(-vD * 0.035);
            vec3 col = uBase + uColor * g * (uSolid < 0.9 ? 0.0 : 0.12) * fade;
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(col, uFog, f), max(uSolid, g * 0.3 * fade));
          }
        `,
      }),
    );
    grid.rotation.x = -Math.PI / 2;
    grid.position.set(0, 0.01, -300);
    this.scene.add(grid);
    const gm = grid.material as THREE.ShaderMaterial;
    this.updaters.push(() => {
      gm.uniforms.uFog.value.copy(this.fog.color);
      gm.uniforms.uDensity.value = this.fog.density;
    });
  }

  /** Céu noturno: degradê, estrelas, lua e silhueta de montanhas, tudo num shader. */
  private buildSky() {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uFog: { value: new THREE.Color() },
        uTime: { value: 0 },
        uMoon: { value: new THREE.Vector3(-0.55, 0.32, -0.77).normalize() },
      },
      vertexShader: /* glsl */ `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uFog; uniform float uTime; uniform vec3 uMoon; varying vec3 vDir;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(float x){ float i = floor(x); float f = fract(x); return mix(hash(vec2(i, 0.0)), hash(vec2(i + 1.0, 0.0)), smoothstep(0.0, 1.0, f)); }
        float ridge(float a, float s){ float h = 0.0; float amp = 0.5; for (int i = 0; i < 5; i++){ h += noise(a * s) * amp; s *= 2.1; amp *= 0.5; } return h; }
        void main(){
          vec3 d = normalize(vDir);
          float y = d.y;
          vec3 zenith = uFog * 0.35 + vec3(0.01, 0.012, 0.03);
          vec3 horizon = uFog * 1.6 + vec3(0.06, 0.05, 0.11);
          vec3 col = mix(horizon, zenith, smoothstep(-0.02, 0.55, y));
          // brilho suave no horizonte
          col += vec3(0.16, 0.12, 0.26) * exp(-abs(y) * 14.0) * 0.6;
          // estrelas
          vec2 sp = vec2(atan(d.z, d.x) * 140.0, asin(clamp(y, -1.0, 1.0)) * 140.0);
          vec2 cell = floor(sp);
          float h = hash(cell);
          float star = step(0.9965, h) * smoothstep(0.5, 0.0, length(fract(sp) - 0.5));
          star *= 0.6 + 0.4 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
          col += vec3(0.85, 0.88, 1.0) * star * smoothstep(0.05, 0.35, y);
          // lua
          float m = dot(d, uMoon);
          col += vec3(0.86, 0.88, 0.98) * smoothstep(0.9993, 0.9996, m);
          col += vec3(0.5, 0.48, 0.75) * pow(max(m, 0.0), 400.0) * 0.6 + vec3(0.25, 0.22, 0.4) * pow(max(m, 0.0), 30.0) * 0.25;
          // montanhas: duas camadas, a de trás mais clara (perspectiva atmosférica)
          float az = atan(d.z, d.x) + 3.14159;
          float far = 0.035 + ridge(az, 3.0) * 0.07;
          float near = 0.01 + ridge(az + 11.0, 5.0) * 0.05;
          col = mix(col, horizon * 0.62, step(y, far) * smoothstep(-0.05, 0.0, y));
          col = mix(col, horizon * 0.38, step(y, near) * smoothstep(-0.05, 0.0, y));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(200, 48, 24), mat);
    sky.frustumCulled = false;
    sky.renderOrder = -1;
    this.scene.add(sky);
    this.updaters.push((t) => {
      sky.position.copy(this.camera.position);
      mat.uniforms.uFog.value.copy(this.fogBase);
      mat.uniforms.uTime.value = t;
    });
  }

  /**
   * A peça central: um astrolábio de metal polido. Quatro anéis com marcações
   * gravadas giram em eixos diferentes ao redor de um núcleo de vidro aceso.
   */
  private buildMonolith() {
    this.buildSky();
    const group = new THREE.Group();
    group.position.set(0, 5.2, 0);
    group.scale.setScalar(1.25);

    const metal = (color: string, rough: number) =>
      new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: rough, clearcoat: 0.6, clearcoatRoughness: 0.15, envMapIntensity: 1.5 });
    const silver = metal('#d9dce6', 0.18);
    const champagne = metal('#d8c7a6', 0.24);
    const lavender = metal('#a99be8', 0.26);
    const graphite = metal('#3a3e4c', 0.35);

    const rings: { pivot: THREE.Group; axis: THREE.Vector3; speed: number; base: THREE.Euler }[] = [];
    const defs: [number, number, THREE.Material, [number, number, number], number][] = [
      [3.4, 0.11, silver, [0, 0, 0], 0.18],
      [2.85, 0.09, champagne, [Math.PI / 2, 0, 0], -0.26],
      [2.35, 0.085, lavender, [0, Math.PI / 2, 0.4], 0.34],
      [1.85, 0.07, silver, [0.9, 0.3, 0], -0.45],
    ];
    defs.forEach(([R, tube, mat, rot, speed], i) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(...rot);
      // anel principal com seção chata (fita), mais elegante que um tubo redondo
      const shape = new THREE.Shape();
      shape.absarc(0, 0, R + tube, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      hole.absarc(0, 0, R - tube, 0, Math.PI * 2, true);
      shape.holes.push(hole);
      const band = new THREE.ExtrudeGeometry(shape, { depth: tube * 1.6, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 160 });
      band.translate(0, 0, -tube * 0.8);
      pivot.add(new THREE.Mesh(band, mat));
      // marcações gravadas na face
      const ticks = i === 0 ? 120 : i === 1 ? 72 : 48;
      const tick = new THREE.InstancedMesh(new THREE.BoxGeometry(0.012, tube * 0.9, 0.02), graphite, ticks);
      const m4 = new THREE.Matrix4();
      for (let k = 0; k < ticks; k++) {
        const a = (k / ticks) * Math.PI * 2;
        const long = k % (ticks / 12) === 0 ? 1.6 : 1;
        m4.compose(
          new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, tube * 0.82 + 0.01),
          new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), a - Math.PI / 2),
          new THREE.Vector3(1, long, 1),
        );
        tick.setMatrixAt(k, m4);
      }
      pivot.add(tick);
      // pinos de articulação nos eixos
      [-1, 1].forEach((s) => {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.36, 24), champagne);
        pin.rotation.z = Math.PI / 2;
        pin.position.set(s * R, 0, 0);
        pivot.add(pin);
      });
      group.add(pivot);
      const axis = new THREE.Vector3(i % 2 ? 1 : 0, i % 2 ? 0 : 1, i === 2 ? 1 : 0).normalize();
      rings.push({ pivot, axis, speed, base: pivot.rotation.clone() });
    });

    // núcleo: esfera de vidro com uma luz lavanda e um ponto ciano dentro
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 64, 48),
      this.high
        ? new THREE.MeshPhysicalMaterial({ color: '#e8e6ff', metalness: 0, roughness: 0.04, transmission: 1, thickness: 1.2, ior: 1.5, iridescence: 0.35, clearcoat: 1, envMapIntensity: 1.2 })
        : new THREE.MeshStandardMaterial({ color: '#2a2a40', metalness: 0.4, roughness: 0.1, transparent: true, opacity: 0.4 }),
    );
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 4), new THREE.MeshBasicMaterial({ color: PURPLE.clone().multiplyScalar(1.6), toneMapped: false }));
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 16), new THREE.MeshBasicMaterial({ color: CYAN.clone().multiplyScalar(2), toneMapped: false }));
    const coreLight = new THREE.PointLight(PURPLE, 26, 12, 1.6);
    group.add(shell, core, spark, coreLight);

    // luzes de estúdio para o metal
    const key = new THREE.DirectionalLight('#f2eeff', 2.2);
    key.position.set(-6, 10, 8);
    const rim = new THREE.PointLight(CYAN, 30, 24, 1.6);
    rim.position.set(6, 6, -6);
    const fill = new THREE.PointLight('#b8a8ff', 24, 26, 1.6);
    fill.position.set(7, 3, 9);
    this.scene.add(key, rim, fill);
    this.scene.add(group);

    // Introdução: os anéis chegam girando e se encaixam; o núcleo acende.
    let intro = this.reducedIntro ? 1 : 0;
    let playing = false;
    const apply = (k: number) => {
      rings.forEach((r, i) => {
        const e = THREE.MathUtils.clamp(k * 1.4 - i * 0.12, 0, 1);
        const ease = 1 - Math.pow(1 - e, 3);
        r.pivot.scale.setScalar(Math.max(0.0001, 0.6 + ease * 0.4));
        r.pivot.visible = e > 0;
      });
      const c = THREE.MathUtils.smoothstep(k, 0.55, 1);
      core.scale.setScalar(Math.max(0.0001, c));
      spark.scale.setScalar(Math.max(0.0001, c));
      coreLight.intensity = 26 * c;
      shell.scale.setScalar(Math.max(0.0001, THREE.MathUtils.smoothstep(k, 0.35, 0.8)));
    };
    apply(intro);
    this.introStart = () => {
      intro = 0;
      playing = true;
    };
    this.introSkip = () => {
      intro = 1;
      playing = false;
      apply(1);
    };
    let spin = 0;
    this.updaters.push((t, dt) => {
      if (playing && intro < 1) {
        intro = Math.min(1, intro + dt / 3);
        apply(intro);
      }
      // gira mais rápido durante a montagem e quando o mouse se move
      const boost = 1 + (1 - intro) * 8 + this.pointerCur.length() * 0.6;
      spin += dt * boost;
      rings.forEach((r) => {
        r.pivot.rotation.copy(r.base);
        r.pivot.rotateOnAxis(r.axis, spin * r.speed);
      });
      group.position.y = 5.2 + Math.sin(t * 0.7) * 0.18;
      group.rotation.y = this.pointerCur.x * 0.35;
      group.rotation.x = -this.pointerCur.y * 0.2;
      core.rotation.y = t * 0.4;
      const pulse = 0.85 + Math.sin(t * 1.6) * 0.15;
      (core.material as THREE.MeshBasicMaterial).color.copy(PURPLE).multiplyScalar(1.4 * pulse);
      spark.position.set(Math.cos(t * 0.9) * 0.22, Math.sin(t * 1.3) * 0.18, Math.sin(t * 0.9) * 0.22);
    });
  }

  private buildCorridor() {
    const step = 3.4;
    const zs: number[] = [];
    for (let z = -32; z > -168; z -= step) zs.push(z);
    const box = new THREE.BoxGeometry(1, 1, 1);
    box.translate(0, 0.5, 0);
    const metal = new THREE.MeshStandardMaterial({ color: '#12141b', metalness: 0.9, roughness: 0.35, envMapIntensity: 0.35 });
    const pillars = new THREE.InstancedMesh(box, metal, zs.length * 2 + Math.ceil(zs.length / 3));
    const strips = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 1, 0.07).translate(0, 0.5, 0), undefined, zs.length * 2);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    let n = 0;
    let s = 0;
    const rand = mulberry(7);
    zs.forEach((z, i) => {
      [-1, 1].forEach((side) => {
        const h = 6 + rand() * 12;
        const w = 0.7 + rand() * 1.1;
        const x = side * (4.6 + rand() * 2.4);
        m.compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(w, h, w));
        pillars.setMatrixAt(n++, m);
        m.compose(new THREE.Vector3(x - side * (w / 2 + 0.06), 0, z), q, new THREE.Vector3(1, h * (0.55 + rand() * 0.4), 1));
        strips.setMatrixAt(s++, m);
      });
      if (i % 3 === 0) {
        m.compose(new THREE.Vector3(0, 11 + rand() * 4, z), q, new THREE.Vector3(14, 0.5, 0.6));
        pillars.setMatrixAt(n++, m);
      }
    });
    pillars.count = n;
    this.stripMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPurple: { value: PURPLE }, uCyan: { value: CYAN }, uEnergy: { value: 1 }, uFog: { value: new THREE.Color() }, uDensity: { value: 0.026 } },
      vertexShader: /* glsl */ `
        varying float vZ; varying float vY; varying float vD;
        void main(){
          vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
          vZ = w.z; vY = w.y;
          vec4 mv = viewMatrix * w; vD = -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform vec3 uPurple; uniform vec3 uCyan; uniform float uEnergy; uniform vec3 uFog; uniform float uDensity;
        varying float vZ; varying float vY; varying float vD;
        void main(){
          float p = fract(vZ * 0.035 + vY * 0.04 + uTime * 0.45);
          float pulse = smoothstep(0.0, 0.03, p) * smoothstep(0.3, 0.0, p);
          vec3 col = uPurple * (0.35 + pulse * 3.0 * uEnergy) + uCyan * pulse * pulse * 0.8;
          float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
          gl_FragColor = vec4(mix(col, uFog, f), 1.0);
        }`,
    });
    strips.material = this.stripMat;
    this.scene.add(pillars, strips);
    this.corridor.push(pillars, strips);
    // Luzes roxas espaçadas ao longo do corredor.
    for (let z = -45; z > -165; z -= 30) {
      const l = new THREE.PointLight(PURPLE, 40, 22, 1.7);
      l.position.set(0, 7, z);
      this.scene.add(l);
    }
    this.disposables.push(box);
  }

  private buildGallery() {
    const frameMat = new THREE.MeshStandardMaterial({ color: '#101219', metalness: 0.9, roughness: 0.3, envMapIntensity: 0.4 });
    const edgeMat = new THREE.LineBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.7 });
    const halo = haloTexture();
    this.disposables.push(halo);
    SLOTS.forEach((slot, i) => {
      const g = new THREE.Group();
      g.position.set(slot.x, slot.y, slot.z);
      g.rotation.y = slot.rotY;
      const w = 7.4;
      const h = 4.6;
      const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, h + 0.3, 0.22), frameMat);
      frame.position.z = -0.14;
      const tex = this.screenTextures[i];
      const img = tex.image as { width: number; height: number } | undefined;
      if (img?.width) {
        // "cover": recorta a imagem para a proporção da tela.
        const ia = img.width / img.height;
        const sa = w / h;
        if (ia > sa) {
          tex.repeat.set(sa / ia, 1);
          tex.offset.set((1 - sa / ia) / 2, 0);
        } else {
          tex.repeat.set(1, ia / sa);
          tex.offset.set(0, (1 - ia / sa) / 2);
        }
      }
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, color: new THREE.Color(0.62, 0.62, 0.68) }));
      screen.userData.index = i;
      this.screens.push(screen);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w + 0.3, h + 0.3, 0.22)), edgeMat);
      edges.position.z = -0.14;
      const num = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 9),
        new THREE.MeshBasicMaterial({ map: numberTexture(String(i + 1).padStart(2, '0')), transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false }),
      );
      num.position.set(slot.x < 0 ? -5.5 : 5.5, 1.2, -4);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: PURPLE, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.scale.set(16, 11, 1);
      glow.position.z = -1.2;
      g.add(glow, frame, screen, edges, num);
      this.scene.add(g);
      const baseY = slot.y;
      this.updaters.push((t) => {
        g.position.y = baseY + Math.sin(t * 0.8 + i) * 0.18;
        g.rotation.z = Math.sin(t * 0.5 + i * 2) * 0.012;
        const on = this.hovered === i;
        const mat = screen.material as THREE.MeshBasicMaterial;
        const target = on ? 0.95 : 0.62;
        mat.color.r += (target - mat.color.r) * 0.1;
        mat.color.g = mat.color.r;
        mat.color.b = mat.color.r + 0.05;
        glow.material.opacity += ((on ? 0.55 : 0.25) - glow.material.opacity) * 0.1;
      });
    });
  }

  private buildCore() {
    const count = this.high ? 9000 : 3600;
    const A = new Float32Array(count * 3);
    const B = new Float32Array(count * 3);
    const C = new Float32Array(count * 3);
    const R = new Float32Array(count);
    const T = new Float32Array(count);
    const rand = mulberry(42);
    const logo = sampleLogo(LOGO, count, rand);
    const ls = 0.27;
    for (let i = 0; i < count; i++) {
      // A: esfera (casca + volume)
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / count);
      const th = Math.PI * (1 + Math.sqrt(5)) * k;
      const rad = i % 5 === 0 ? 5.6 * Math.cbrt(rand()) : 5.6;
      A.set([rad * Math.cos(th) * Math.sin(phi), rad * Math.sin(th) * Math.sin(phi), rad * Math.cos(phi)], i * 3);
      // B: três órbitas inclinadas + aglomerado central
      const ring = i % 4;
      if (ring === 3) {
        const r2 = 1.6 * Math.cbrt(rand());
        const a = rand() * Math.PI * 2;
        const b = Math.acos(2 * rand() - 1);
        B.set([r2 * Math.sin(b) * Math.cos(a), r2 * Math.sin(b) * Math.sin(a), r2 * Math.cos(b)], i * 3);
      } else {
        const rr = [4.2, 6.6, 9][ring] + (rand() - 0.5) * 0.25;
        const a = rand() * Math.PI * 2;
        const v = new THREE.Vector3(Math.cos(a) * rr, (rand() - 0.5) * 0.15, Math.sin(a) * rr);
        v.applyEuler(new THREE.Euler([0.4, -0.7, 1.2][ring], [0, 0.6, -0.3][ring], [0.2, 0.5, 0][ring]));
        B.set([v.x, v.y, v.z], i * 3);
      }
      // C: a marca NX
      const [lx, ly, tone] = logo[i % logo.length];
      const w = toWorld(lx, ly, ls);
      C.set([w.x, w.y - 5.9, (rand() - 0.5) * 0.7], i * 3);
      R[i] = rand();
      T[i] = tone === 'cyan' ? 2 : tone === 'white' ? 1 : rand() < 0.12 ? 1 : 0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(A, 3));
    geo.setAttribute('aB', new THREE.BufferAttribute(B, 3));
    geo.setAttribute('aC', new THREE.BufferAttribute(C, 3));
    geo.setAttribute('aR', new THREE.BufferAttribute(R, 1));
    geo.setAttribute('aT', new THREE.BufferAttribute(T, 1));
    this.particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uMorph: { value: 0 }, uPixel: { value: 1 }, uEnergy: { value: 1 }, uPurple: { value: PURPLE }, uCyan: { value: CYAN }, uPointer: { value: new THREE.Vector2() } },
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uMorph; uniform float uPixel; uniform float uEnergy; uniform vec2 uPointer;
        attribute vec3 aB; attribute vec3 aC; attribute float aR; attribute float aT;
        varying float vT; varying float vA;
        void main(){
          float m1 = smoothstep(0.0, 1.0, clamp(uMorph, 0.0, 1.0));
          float m2 = smoothstep(0.0, 1.0, clamp(uMorph - 1.0, 0.0, 1.0));
          vec3 p = mix(mix(position, aB, m1), aC, m2);
          // turbulência: mais forte no meio de cada transição
          float chaos = sin(m1 * 3.14159) + sin(m2 * 3.14159);
          float t = uTime * (0.4 + aR * 0.6);
          p += vec3(sin(t + aR * 40.0), cos(t * 1.3 + aR * 20.0), sin(t * 0.7 + aR * 60.0)) * (0.05 + chaos * 1.6 * aR);
          // as órbitas giram
          float ang = uTime * 0.25 * m1 * (1.0 - m2) * (0.5 + aR);
          p.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xz;
          p.xy += uPointer * 0.6 * (1.0 - m2) * aR;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (aT > 1.5 ? 3.0 : 1.4 + aR * 1.8) * uPixel * uEnergy * 22.0 / -mv.z;
          vT = aT;
          vA = (0.55 + 0.45 * sin(uTime * 2.0 + aR * 30.0)) * (1.0 - smoothstep(55.0, 110.0, -mv.z));
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uPurple; uniform vec3 uCyan; varying float vT; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 col = vT > 1.5 ? uCyan * 1.6 : (vT > 0.5 ? vec3(0.9, 0.92, 1.0) : uPurple * 1.4);
          gl_FragColor = vec4(col * 1.25, a * vA);
        }`,
    });
    const pts = new THREE.Points(geo, this.particleMat);
    pts.position.set(0, 6, CORE_Z);
    pts.frustumCulled = false;
    this.scene.add(pts);
    const glow = new THREE.PointLight(PURPLE, 60, 30, 1.5);
    glow.position.set(0, 6, CORE_Z);
    this.scene.add(glow);
  }

  private buildDust() {
    const count = this.high ? 4200 : 1500;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    const rand = mulberry(3);
    for (let i = 0; i < count; i++) {
      pos.set([(rand() - 0.5) * 50, rand() * 18, 30 - rand() * 460], i * 3);
      rnd[i] = rand();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aR', new THREE.BufferAttribute(rnd, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixel: { value: 1 }, uPurple: { value: PURPLE } },
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uPixel; attribute float aR; varying float vR; varying float vD;
        void main(){
          vec3 p = position;
          p.y = mod(p.y + uTime * (0.1 + aR * 0.25), 18.0);
          p.x += sin(uTime * 0.3 + aR * 50.0) * 0.6;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vD = -mv.z;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (0.6 + aR * 1.6) * uPixel * 12.0 / -mv.z;
          vR = aR;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uPurple; varying float vR; varying float vD;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * exp(-vD * 0.04);
          vec3 col = vR > 0.8 ? uPurple * 1.5 : vec3(0.8, 0.82, 0.9);
          gl_FragColor = vec4(col, a * 0.55);
        }`,
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.scene.add(pts);
    this.updaters.push((t) => {
      mat.uniforms.uTime.value = t;
      mat.uniforms.uPixel.value = this.renderer.getPixelRatio();
    });
  }

  /* ---------------- ciclo ---------------- */

  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
  }

  /** Índice do projeto sob o ponteiro (coordenadas de tela), ou -1. */
  pick(clientX: number, clientY: number) {
    const v = new THREE.Vector2((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(v, this.camera);
    const hit = this.raycaster.intersectObjects(this.screens, false)[0];
    return hit && hit.distance < 30 ? (hit.object.userData.index as number) : -1;
  }

  start() {
    if (this.running) return;
    if (!this.started) {
      Object.assign(this.cur, this.rig);
      this.started = true;
    }
    this.running = true;
    this.clock.getDelta();
    this.loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  renderOnce() {
    Object.assign(this.cur, this.rig);
    this.apply(1.5, 0);
    this.composer.render();
  }

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else if (this.started) this.start();
  };

  resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.camera.aspect = w / h;
    // retrato: abre a lente para caber as cenas
    this.camera.fov = w / h < 0.8 ? 58 : 40;
    this.camera.updateProjectionMatrix();
    (this.finalPass.uniforms.uRes.value as THREE.Vector2).set(w, h);
    if (!this.running && this.started === false) return;
    if (!this.running) this.renderOnce();
  };

  private loop = () => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 3.4);
    const c = this.cur as unknown as Record<string, number>;
    const r = this.rig as unknown as Record<string, number>;
    for (const key in r) c[key] += (r[key] - c[key]) * (key === 'glitch' ? Math.min(1, k * 3) : k);
    this.pointerCur.lerp(this.pointer, 1 - Math.exp(-dt * 2.2));
    this.apply(t, dt);
    this.composer.render();
    if (dt > 0) {
      this.fpsAcc += dt;
      this.fpsN++;
      if (this.fpsAcc > 0.5) {
        this.fps = Math.round(this.fpsN / this.fpsAcc);
        this.fpsAcc = 0;
        this.fpsN = 0;
      }
    }
  };

  private apply(t: number, dt: number) {
    const s = this.cur;
    const p = this.pointerCur;
    this.camera.position.set(s.px + p.x * 1.5, s.py + p.y * 0.8, s.pz);
    this.look.set(s.lx + p.x * 0.4, s.ly + p.y * 0.3, s.lz);
    this.camera.up.set(Math.sin(s.roll), Math.cos(s.roll), 0);
    this.camera.lookAt(this.look);

    // atmosfera: interpola a cor da névoa entre os capítulos
    const f = Math.max(0, Math.min(FOGS.length - 1.001, s.fog));
    const i = Math.floor(f);
    this.fogBase.copy(FOGS[i]).lerp(FOGS[i + 1], f - i);
    // a névoa usa o tom do horizonte: o que está longe some no céu, sem silhuetas pretas
    this.fog.color.copy(this.fogBase).multiplyScalar(1.6).add(HORIZON_TINT);
    (this.scene.background as THREE.Color).copy(this.fog.color);
    this.fog.density = 0.026 + Math.sin(Math.min(f, 3) * Math.PI) * 0.004;

    this.stripMat.uniforms.uTime.value = t;
    this.stripMat.uniforms.uEnergy.value = s.energy;
    this.stripMat.uniforms.uFog.value.copy(this.fog.color);
    this.stripMat.uniforms.uDensity.value = this.fog.density;

    this.particleMat.uniforms.uTime.value = t;
    this.particleMat.uniforms.uMorph.value = s.morph;
    this.particleMat.uniforms.uEnergy.value = s.energy;
    this.particleMat.uniforms.uPixel.value = this.renderer.getPixelRatio();
    (this.particleMat.uniforms.uPointer.value as THREE.Vector2).copy(p);

    this.finalPass.uniforms.uTime.value = t;
    this.finalPass.uniforms.uGlitch.value = s.glitch * 0.35;
    if (this.bloom) this.bloom.strength = 0.38 + s.glitch * 0.4;

    // o espelho só é renderizado enquanto está perto da câmera
    if (this.reflector) this.reflector.visible = s.pz > -175;
    this.corridor.forEach((o) => (o.visible = s.pz < 4));

    this.tmpV.copy(this.camera.position);
    for (const u of this.updaters) u(t, dt);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) {
        Object.values(mat).forEach((v) => v instanceof THREE.Texture && v.dispose());
        mat.dispose();
      }
    });
    this.disposables.forEach((d) => d.dispose());
    this.composer.dispose();
    this.renderer.dispose();
  }
}

/** Gerador pseudoaleatório determinístico (mesmo mundo em toda visita). */
function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

