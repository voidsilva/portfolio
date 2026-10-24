import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LOGO, sampleLogo, toWorld } from './logoShape';
import { projects } from '../data/content';
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

export interface WorldAssets {
  hdr?: THREE.DataTexture;
  laptop?: THREE.Object3D;
  lantern?: THREE.Object3D;
}

/** Carrega os modelos e o céu (CC0, Poly Haven) reportando o progresso. */
export async function loadAssets(onProgress: (k: number) => void): Promise<WorldAssets> {
  const parts = [0, 0, 0];
  const tick = (i: number) => (e: ProgressEvent) => {
    // o servidor manda o arquivo comprimido: o total informado pode ser menor que o baixado
    if (e.total) parts[i] = Math.min(1, e.loaded / e.total);
    onProgress((parts[0] + parts[1] + parts[2]) / 3);
  };
  const gltf = new GLTFLoader();
  const safe = <T,>(p: Promise<T>) => p.catch(() => undefined);
  const [hdr, laptop, lantern] = await Promise.all([
    safe(new RGBELoader().loadAsync('/hdri/lakeside_night_1k.hdr', tick(0))),
    safe(gltf.loadAsync('/models/classic_laptop/model.gltf', tick(1)).then((g) => g.scene)),
    safe(gltf.loadAsync('/models/Lantern_01/model.gltf', tick(2)).then((g) => g.scene)),
  ]);
  onProgress(1);
  return { hdr: hdr as THREE.DataTexture | undefined, laptop, lantern };
}

const PURPLE = new THREE.Color('#9d8cf0');
const CYAN = new THREE.Color('#8fd3df');
// Paleta noturna e calma: azul-ardósia com toques de lavanda.
const HORIZON_TINT = new THREE.Color(0.055, 0.046, 0.1);
const FOGS = ['#0a0d14', '#0c1019', '#0b1318', '#13132a', '#0a0c12'].map((c) => new THREE.Color(c));

export const CORE_Z = -400;
export const SLOTS = Array.from({ length: projects.length }, (_, i) => {
  const x = i % 2 === 0 ? -3.6 : 3.6;
  return { x, y: 4.3, z: -205 - i * 34, rotY: x < 0 ? 0.32 : -0.32 };
});

export const KEYS: Record<string, Rig> = {
  hero: { px: -2.6, py: 2.4, pz: 9.5, lx: -2.9, ly: 1.5, lz: 0, roll: 0, fog: 0, glitch: 0, morph: 0, energy: 1 },
  over: { px: 0, py: 13.5, pz: -8, lx: 0, ly: 4, lz: -48, roll: 0, fog: 0.6, glitch: 0, morph: 0, energy: 1 },
  corridor: { px: 0, py: 3.2, pz: -150, lx: 0, ly: 3.4, lz: -200, roll: 0.04, fog: 1, glitch: 0, morph: 0, energy: 1.2 },
  ...Object.fromEntries(
    SLOTS.map((s, i) => [
      `p${i}`,
      { px: s.x * 0.22 - 1.6, py: s.y + 0.4, pz: s.z + 11, lx: s.x - 2.4, ly: s.y + 0.3, lz: s.z, roll: s.x < 0 ? 0.015 : -0.015, fog: 2, glitch: 0, morph: 0, energy: 1 },
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
  private ripples?: THREE.Vector3[];
  private pointerMoved = false;
  private released: THREE.Object3D[] = [];
  private waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private hitV = new THREE.Vector3();
  private raycaster = new THREE.Raycaster();
  private disposables: { dispose: () => void }[] = [];
  private updaters: ((t: number, dt: number) => void)[] = [];
  private screens: THREE.Mesh[] = [];
  private reflector?: Reflector;
  private particleMat!: THREE.ShaderMaterial;
  private lanternMat!: THREE.ShaderMaterial;
  private haloMat!: THREE.ShaderMaterial;
  private velocity = 0;
  private raf = 0;
  private running = false;
  private started = false;
  private fpsAcc = 0;
  private fpsN = 0;
  private high: boolean;
  private look = new THREE.Vector3();
  private tmpV = new THREE.Vector3();
  private lanternHalo = haloTexture();
  private fogBase = new THREE.Color();
  private corridor: THREE.Object3D[] = [];
  private reducedIntro = false;
  /** Reinicia o desenho da marca (chamado ao entrar na experiência). */
  introStart: () => void = () => {};
  introSkip: () => void = () => {};

  constructor(canvas: HTMLCanvasElement, quality: Quality, private screenTextures: THREE.Texture[], private assets?: WorldAssets) {
    this.high = quality === 'high';
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.high ? 1.5 : 1));
    this.dprMax = this.renderer.getPixelRatio();
    this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = this.high;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
    // MSAA no alvo do compositor: bordas lisas mesmo com pós-processamento
    const rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { type: THREE.HalfFloatType, samples: this.high ? 4 : 0 });
    this.composer = new EffectComposer(this.renderer, rt);
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
          col += (rand(uv * uRes + fract(uTime)) - 0.5) * 0.014;
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
          uRip: { value: Array.from({ length: 10 }, () => new THREE.Vector3(0, 0, -99)) },
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
          uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uFog; uniform float uDensity; uniform vec3 uRip[10]; varying vec4 vUv; varying vec3 vW; varying float vD;
          #include <logdepthbuf_pars_fragment>
          void main(){
            #include <logdepthbuf_fragment>
            vec2 w = vec2(
              sin(vW.x * 1.7 + uTime * 0.9) + sin(vW.z * 2.3 - uTime * 1.1) + sin((vW.x + vW.z) * 4.1 + uTime * 1.7) * 0.5,
              cos(vW.z * 1.9 + uTime * 0.8) + cos(vW.x * 2.7 - uTime * 1.3) + cos((vW.x - vW.z) * 3.7 + uTime * 1.5) * 0.5
            );
            // anéis que se espalham a partir de onde o cursor passou
            float ring = 0.0;
            for (int i = 0; i < 10; i++) {
              float age = uTime - uRip[i].z;
              if (age < 0.0 || age > 3.5) continue;
              float dd = distance(vW.xz, uRip[i].xy);
              float front = age * 2.4;
              ring += sin((dd - front) * 7.0) * exp(-abs(dd - front) * 2.2) * exp(-age * 1.1);
            }
            w += vec2(ring * 6.0);
            vec4 uv = vUv;
            uv.xy += w * 0.0016 * uv.w;
            vec4 base = texture2DProj(tDiffuse, uv);
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            vec3 wc = base.rgb * color + vec3(0.6, 0.55, 0.9) * max(ring, 0.0) * 0.05;
            gl_FragColor = vec4(mix(wc, uFog, f), 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      };
      const r = new Reflector(new THREE.PlaneGeometry(160, 260), {
        textureWidth: Math.round(window.innerWidth * 0.5),
        textureHeight: Math.round(window.innerHeight * 0.5),
        color: new THREE.Color('#9a98b4'),
        clipBias: 0.003,
        shader,
      });
      r.rotation.x = -Math.PI / 2;
      r.position.set(0, 0, -90);
      this.scene.add(r);
      this.reflector = r;
      const mat = r.material as THREE.ShaderMaterial;
      this.ripples = mat.uniforms.uRip.value as THREE.Vector3[];
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
          // estrela cadente: a cada 7s uma risca atravessa o céu
          float cyc = floor(uTime / 7.0);
          float ph = fract(uTime / 7.0) / 0.12;
          if (ph < 1.0) {
            vec2 sky = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
            float r1 = fract(sin(cyc * 12.9898) * 43758.5453);
            float r2 = fract(sin(cyc * 78.233) * 12345.678);
            vec2 a0 = vec2(-2.4 + r1 * 1.6, 0.45 + r2 * 0.35);
            vec2 a1 = a0 + vec2(0.55, -0.22);
            vec2 head = mix(a0, a1, ph);
            vec2 tail = mix(a0, a1, max(ph - 0.35, 0.0));
            vec2 pa = sky - tail, ba = head - tail;
            float hh = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
            float dist = length(pa - ba * hh);
            col += vec3(0.95, 0.92, 1.0) * smoothstep(0.004, 0.0, dist) * hh * sin(ph * 3.14159) * 1.6;
          }
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
   * A cena de abertura: um dev programando de madrugada à beira do lago.
   * Pedra na margem, notebook aberto com os projetos na tela, lanterna acesa
   * e vaga-lumes, sob o céu fotográfico de uma noite real (HDRI CC0).
   */
  private buildMonolith() {
    this.buildSky();
    const A = this.assets;
    const group = new THREE.Group();
    this.scene.add(group);

    // Céu fotográfico: domo com a HDRI, que some quando a câmera sai da margem.
    let dome: THREE.Mesh | null = null;
    if (A?.hdr) {
      const tex = A.hdr;
      const pm = new THREE.PMREMGenerator(this.renderer);
      const env = pm.fromEquirectangular(tex).texture;
      this.scene.environment = env;
      this.scene.environmentIntensity = 0.35;
      this.disposables.push(pm, env);
      // domo com a foto acima do horizonte; abaixo dele, a cor da névoa (emenda com o lago)
      const domeMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        transparent: true,
        fog: false,
        uniforms: { uTime: { value: 0 }, tMap: { value: tex }, uTint: { value: new THREE.Color(0.085, 0.095, 0.18) }, uFog: { value: new THREE.Color() }, opacity: { value: 1 }, uRot: { value: 0 } },
        vertexShader: /* glsl */ `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform sampler2D tMap; uniform vec3 uTint; uniform vec3 uFog; uniform float opacity; uniform float uRot; varying vec3 vDir;
          void main(){
            vec3 d = normalize(vDir);
            float a = atan(d.z, d.x) + uRot;
            vec2 uv = vec2(fract(a / 6.28318 + 0.5), acos(clamp(d.y, -1.0, 1.0)) / 3.14159);
            vec3 col = texture2D(tMap, vec2(uv.x, 1.0 - uv.y)).rgb * uTint;
            col = mix(uFog, col, smoothstep(-0.01, 0.06, d.y));
          // estrela cadente: a cada 7s uma risca atravessa o céu
          float cyc = floor(uTime / 7.0);
          float ph = fract(uTime / 7.0) / 0.12;
          if (ph < 1.0) {
            vec2 sky = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
            float r1 = fract(sin(cyc * 12.9898) * 43758.5453);
            float r2 = fract(sin(cyc * 78.233) * 12345.678);
            vec2 a0 = vec2(-2.4 + r1 * 1.6, 0.45 + r2 * 0.35);
            vec2 a1 = a0 + vec2(0.55, -0.22);
            vec2 head = mix(a0, a1, ph);
            vec2 tail = mix(a0, a1, max(ph - 0.35, 0.0));
            vec2 pa = sky - tail, ba = head - tail;
            float hh = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
            float dist = length(pa - ba * hh);
            col += vec3(0.95, 0.92, 1.0) * smoothstep(0.004, 0.0, dist) * hh * sin(ph * 3.14159) * 1.6;
          }
            gl_FragColor = vec4(col, opacity);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      });
      dome = new THREE.Mesh(new THREE.SphereGeometry(180, 64, 32), domeMat);
      dome.renderOrder = 0;
      dome.frustumCulled = false;
      this.scene.add(dome);
      // a névoa da margem usa a cor média do horizonte da foto
      const img = tex.image as unknown as { data: Uint16Array | Float32Array; width: number; height: number };
      const row = Math.floor(img.height * 0.5);
      const acc = [0, 0, 0];
      const half = img.data instanceof Uint16Array;
      for (let x = 0; x < img.width; x += 4) {
        const i = (row * img.width + x) * 4;
        for (let c = 0; c < 3; c++) acc[c] += half ? THREE.DataUtils.fromHalfFloat(img.data[i + c]) : (img.data[i + c] as number);
      }
      const n = img.width / 4;
      const h = acc.map((v, c) => (v / n) * [0.085, 0.095, 0.18][c]);
      FOGS[0].setRGB(Math.max(0, (h[0] - HORIZON_TINT.r) / 1.6), Math.max(0, (h[1] - HORIZON_TINT.g) / 1.6), Math.max(0, (h[2] - HORIZON_TINT.b) / 1.6), THREE.LinearSRGBColorSpace);
    }

    // A pedra da margem: rocha procedural, achatada em cima, metade dentro d'água.
    const rockGeo = new THREE.IcosahedronGeometry(1, 6);
    const p = rockGeo.getAttribute('position');
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const nz = Math.sin(v.x * 3.1 + v.z * 1.7) * 0.08 + Math.sin(v.y * 5.3 + v.x * 2.9) * 0.05 + Math.sin(v.z * 9.1 + v.y * 7.7) * 0.025;
      v.multiplyScalar(1 + nz);
      if (v.y > 0.35) v.y = 0.35 + (v.y - 0.35) * 0.18; // topo plano onde o notebook fica
      p.setXYZ(i, v.x * 2.4, v.y * 1.6, v.z * 1.7);
    }
    rockGeo.computeVertexNormals();
    // variação de cor (musgo e manchas) para a pedra não parecer plástica
    const col = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const k = 0.75 + 0.25 * Math.sin(v.x * 4.7 + v.z * 3.3) * Math.sin(v.y * 6.1 + v.x * 1.3) + (Math.random() - 0.5) * 0.12;
      const moss = THREE.MathUtils.smoothstep(v.y, -0.2, 0.25) * 0.12;
      col.set([k - moss * 0.5, k + moss * 0.2, k - moss * 0.3], i * 3);
    }
    rockGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const rock = new THREE.Mesh(rockGeo, new THREE.MeshStandardMaterial({ color: '#2f3038', roughness: 0.95, metalness: 0.0, vertexColors: true }));
    rock.position.set(0, 0.15, 0);
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
    const top = 0.15 + 0.35 * 1.6 + 0.02;
    // pedras menores ao redor
    [[-2.6, 0.9, 0.6], [2.4, 1.6, 0.45], [-1.2, -1.9, 0.35], [3.4, -0.8, 0.3]].forEach(([x, z, s]) => {
      const m = new THREE.Mesh(rockGeo, rock.material);
      m.scale.setScalar(s);
      m.position.set(x, 0.05, z);
      m.rotation.y = x * 2;
      m.receiveShadow = true;
      group.add(m);
    });

    // Notebook aberto com os projetos passando na tela.
    let screenMat: THREE.MeshBasicMaterial | null = null;
    if (A?.laptop) {
      const lap = A.laptop;
      const box = new THREE.Box3().setFromObject(lap);
      const size = box.getSize(new THREE.Vector3());
      const s = 1.7 / Math.max(size.x, size.z);
      lap.scale.setScalar(s);
      lap.position.set(-0.35, top - box.min.y * s, 0.1);
      lap.rotation.y = 0.35;
      lap.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.castShadow = true;
        m.receiveShadow = true;
        const mat = m.material as THREE.MeshStandardMaterial;
        if (mat.name === 'classic_laptop_screen') {
          // a tela do modelo não tem UV útil: projeta coordenadas no plano da tela
          const g = m.geometry;
          const pos = g.getAttribute('position');
          const nrm = g.getAttribute('normal');
          const nAvg = new THREE.Vector3();
          for (let i = 0; i < nrm.count; i++) nAvg.add(new THREE.Vector3().fromBufferAttribute(nrm, i));
          nAvg.normalize();
          const vAx = new THREE.Vector3(0, 1, 0).projectOnPlane(nAvg).normalize();
          const uAx = new THREE.Vector3().crossVectors(vAx, nAvg).normalize();
          const uv = new Float32Array(pos.count * 2);
          let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
          const q = new THREE.Vector3();
          for (let i = 0; i < pos.count; i++) {
            q.fromBufferAttribute(pos, i);
            const uu = q.dot(uAx), vv = q.dot(vAx);
            uv[i * 2] = uu;
            uv[i * 2 + 1] = vv;
            u0 = Math.min(u0, uu); u1 = Math.max(u1, uu); v0 = Math.min(v0, vv); v1 = Math.max(v1, vv);
          }
          for (let i = 0; i < pos.count; i++) {
            uv[i * 2] = (uv[i * 2] - u0) / (u1 - u0);
            uv[i * 2 + 1] = (uv[i * 2 + 1] - v0) / (v1 - v0);
          }
          g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
          screenMat = new THREE.MeshBasicMaterial({ map: this.screenTextures[0], toneMapped: false, color: new THREE.Color(0.85, 0.85, 0.9), side: THREE.DoubleSide });
          m.material = screenMat;
        } else if (mat.envMapIntensity !== undefined) {
          mat.envMapIntensity = 1.1;
          // o plástico bege do modelo estoura com a luz da lanterna: escurece um pouco
          mat.color.multiplyScalar(0.72);
          [mat.map, mat.normalMap, mat.roughnessMap].forEach((t) => t && (t.anisotropy = 8));
        }
      });
      group.add(lap);
      const glow = new THREE.PointLight('#b9b3ff', 1.2, 4, 2);
      glow.position.set(-0.2, top + 0.8, 0.9);
      group.add(glow);
    }

    // Lanterna com luz quente que tremula e projeta sombras.
    const lanternLight = new THREE.PointLight('#ffb36b', 0, 14, 1.6);
    let flame: THREE.Mesh | null = null;
    if (A?.lantern) {
      const lan = A.lantern;
      const box = new THREE.Box3().setFromObject(lan);
      const size = box.getSize(new THREE.Vector3());
      const s = 1.15 / size.y;
      lan.scale.setScalar(s);
      lan.position.set(1.25, top - box.min.y * s, -0.25);
      lan.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.castShadow = true;
        const mat = m.material as THREE.MeshStandardMaterial;
        if (mat.name === 'Lantern_01_glass') {
          m.castShadow = false;
          m.material = new THREE.MeshPhysicalMaterial({ color: '#ffe2b8', roughness: 0.15, transmission: 0.85, thickness: 0.05, emissive: '#ff9a4a', emissiveIntensity: 0.35, transparent: true, opacity: 0.6 });
        } else if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 1.5;
      });
      group.add(lan);
      flame = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 1.8, 0.8), toneMapped: false }));
      flame.scale.y = 1.6;
      flame.position.set(1.25, top + 0.45, -0.25);
      group.add(flame);
      lanternLight.position.set(1.25, top + 0.5, -0.25);
    }
    if (this.high) {
      lanternLight.castShadow = true;
      lanternLight.shadow.mapSize.set(512, 512);
      lanternLight.shadow.bias = -0.002;
      lanternLight.shadow.radius = 4;
    }
    group.add(lanternLight);

    // Palavra gigante do outro lado do lago: fica atrás da cena e reflete na água.
    const wc = document.createElement('canvas');
    wc.width = 2048;
    wc.height = 400;
    const wg = wc.getContext('2d')!;
    wg.font = '800 330px Montserrat, sans-serif';
    wg.textAlign = 'center';
    wg.textBaseline = 'middle';
    const grad = wg.createLinearGradient(0, 40, 0, 360);
    grad.addColorStop(0, 'rgba(238,240,246,0.95)');
    grad.addColorStop(1, 'rgba(165,150,242,0.55)');
    wg.fillStyle = grad;
    wg.fillText('SILVADEV', 1024, 215);
    const wtex = new THREE.CanvasTexture(wc);
    wtex.colorSpace = THREE.SRGBColorSpace;
    wtex.anisotropy = 8;
    const word = new THREE.Mesh(
      new THREE.PlaneGeometry(34, 6.6),
      new THREE.MeshBasicMaterial({ map: wtex, transparent: true, depthWrite: false, opacity: 1, fog: false, color: new THREE.Color(0.36, 0.36, 0.44) }),
    );
    word.position.set(1.5, 3.2, -24);
    word.renderOrder = 2; // desenha depois do céu (que é transparente e fica no plano de fundo)
    group.add(word);
    this.disposables.push(wtex);
    this.updaters.push((t) => {
      word.position.y = 3.2 + Math.sin(t * 0.4) * 0.08;
      word.visible = this.cur.pz > -20;
    });

    // Luz que acompanha o cursor sobre a água.
    const cursorLight = new THREE.PointLight('#d8ccff', 0, 7, 1.6);
    this.scene.add(cursorLight);
    let lastRip = 0;
    let ripI = 0;
    const lastPos = new THREE.Vector3(1e3, 0, 0);
    this.updaters.push((t) => {
      const hit = this.waterPoint(this.pointer);
      const near = this.cur.pz > -40 && hit;
      cursorLight.intensity += ((near ? 9 : 0) - cursorLight.intensity) * 0.08;
      if (hit) {
        cursorLight.position.set(hit.x, 0.9, hit.z);
        // cria uma onda quando o cursor anda o bastante
        if (this.ripples && t - lastRip > 0.12 && hit.distanceTo(lastPos) > 0.7 && this.pointerMoved) {
          this.ripples[ripI % this.ripples.length].set(hit.x, hit.z, t);
          ripI++;
          lastRip = t;
          lastPos.copy(hit);
        }
      }
      this.pointerMoved = false;
      // lanternas soltas pelo visitante
      for (let i = this.released.length - 1; i >= 0; i--) {
        const l = this.released[i];
        const age = t - l.userData.t0;
        if (l.userData.t0 < 0) l.userData.t0 = t;
        l.position.y = l.userData.y0 + age * 0.7;
        l.position.x += Math.sin(t * 0.6 + l.userData.s) * 0.004;
        l.rotation.y = t * 0.3;
        if (age > 22) {
          this.scene.remove(l);
          this.released.splice(i, 1);
        }
      }
    });

    // luar suave vindo de trás, para recortar as silhuetas
    const moon = new THREE.DirectionalLight('#b8c4ff', 0.7);
    moon.position.set(-8, 10, -12);
    this.scene.add(moon);

    // Vaga-lumes.
    const N = this.high ? 140 : 60;
    const fp = new Float32Array(N * 3);
    const fr = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      fp.set([(Math.random() - 0.5) * 18, 0.4 + Math.random() * 3.5, (Math.random() - 0.5) * 12 - 1], i * 3);
      fr[i] = Math.random();
    }
    const fg = new THREE.BufferGeometry();
    fg.setAttribute('position', new THREE.BufferAttribute(fp, 3));
    fg.setAttribute('aR', new THREE.BufferAttribute(fr, 1));
    const fmat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixel: { value: 1 }, uI: { value: 0 } },
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uPixel; attribute float aR; varying float vA;
        void main(){
          vec3 p = position;
          float t = uTime * (0.25 + aR * 0.35) + aR * 60.0;
          p += vec3(sin(t) * 0.8, sin(t * 1.7) * 0.35, cos(t * 0.8) * 0.8);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + aR * 2.5) * uPixel * 18.0 / -mv.z;
          vA = pow(0.5 + 0.5 * sin(uTime * (1.2 + aR * 2.0) + aR * 30.0), 3.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uI; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(1.0, 0.85, 0.45) * 1.6, a * vA * uI);
        }`,
    });
    const flies = new THREE.Points(fg, fmat);
    flies.frustumCulled = false;
    group.add(flies);

    // Introdução: a lanterna acende, a tela liga, os vaga-lumes aparecem.
    let intro = this.reducedIntro ? 1 : 0;
    let playing = false;
    const apply = (k: number) => {
      const lamp = THREE.MathUtils.smoothstep(k, 0.1, 0.5);
      lanternLight.intensity = 13 * lamp;
      if (flame) flame.scale.setScalar(Math.max(0.0001, lamp)).setY(Math.max(0.0001, lamp * 1.6));
      if (screenMat) screenMat.color.setScalar(0.85 * THREE.MathUtils.smoothstep(k, 0.45, 0.8));
      fmat.uniforms.uI.value = THREE.MathUtils.smoothstep(k, 0.6, 1);
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
    let slide = 0;
    let slideT = 0;
    this.updaters.push((t, dt) => {
      if (playing && intro < 1) {
        intro = Math.min(1, intro + dt / 3);
        apply(intro);
      }
      if (intro >= 1) {
        const fl = 1 + Math.sin(t * 9.3) * 0.06 + Math.sin(t * 23.7) * 0.04 + Math.sin(t * 3.1) * 0.05;
        lanternLight.intensity = 13 * fl;
        if (flame) flame.scale.set(fl, 1.6 * fl, fl);
      }
      // a tela troca de projeto a cada 4 segundos
      slideT += dt;
      if (screenMat && slideT > 4) {
        slideT = 0;
        slide = (slide + 1) % this.screenTextures.length;
        screenMat.map = this.screenTextures[slide];
      }
      fmat.uniforms.uTime.value = t;
      fmat.uniforms.uPixel.value = this.renderer.getPixelRatio();
      if (dome) {
        dome.position.copy(this.camera.position);
        const dm = dome.material as THREE.ShaderMaterial;
        dm.uniforms.opacity.value = 1 - THREE.MathUtils.smoothstep(this.cur.fog, 0.3, 0.95);
        dm.uniforms.uFog.value.copy(this.fog.color);
        dm.uniforms.uTime.value = t;
        dome.visible = dm.uniforms.opacity.value > 0.001;
      }
    });
  }

  /** Lanternas de papel acesas subindo devagar sobre o lago (capítulo Abordagem). */
  private buildCorridor() {
    const count = this.high ? 340 : 140;
    const geo = new THREE.CylinderGeometry(0.2, 0.15, 0.42, 10, 1, true);
    const seeds = new Float32Array(count * 4);
    const rand = mulberry(11);
    for (let i = 0; i < count; i++) {
      seeds.set([(rand() - 0.5) * 34, -15 - rand() * 160, rand(), rand()], i * 4);
    }
    const inst = new THREE.InstancedBufferGeometry();
    inst.index = geo.index;
    inst.setAttribute('position', geo.getAttribute('position'));
    inst.setAttribute('uv', geo.getAttribute('uv'));
    inst.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4));
    inst.instanceCount = count;
    const common = /* glsl */ `
      uniform float uTime;
      attribute vec4 aSeed;
      vec3 lanternPos(){
        float rise = mod(aSeed.z * 22.0 + uTime * (0.35 + aSeed.w * 0.35), 22.0);
        return vec3(aSeed.x + sin(uTime * 0.3 + aSeed.w * 20.0) * 0.6, 0.6 + rise, aSeed.y + cos(uTime * 0.25 + aSeed.z * 30.0) * 0.6);
      }`;
    this.lanternMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 }, uFog: { value: new THREE.Color() }, uDensity: { value: 0.026 }, uI: { value: 0 } },
      vertexShader: common + /* glsl */ `
        varying vec2 vUv; varying float vD; varying float vF;
        void main(){
          vec3 p = position * (0.85 + aSeed.w * 0.5) + lanternPos();
          vec4 mv = viewMatrix * vec4(p, 1.0);
          vD = -mv.z; vUv = uv;
          vF = 0.8 + 0.2 * sin(uTime * (6.0 + aSeed.z * 5.0) + aSeed.w * 40.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uFog; uniform float uDensity; uniform float uI; varying vec2 vUv; varying float vD; varying float vF;
        void main(){
          // papel: mais claro em baixo (onde está a chama), bordas mais escuras
          float glow = mix(1.6, 0.55, vUv.y) * vF;
          float edge = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
          vec3 col = vec3(1.0, 0.56, 0.24) * glow * (0.55 + edge * 0.45) * uI;
          float f = 1.0 - exp(-uDensity * uDensity * vD * vD * 0.5);
          gl_FragColor = vec4(mix(col, uFog, f), 1.0);
        }`,
    });
    const lanterns = new THREE.Mesh(inst, this.lanternMat);
    lanterns.frustumCulled = false;

    // halo de cada lanterna
    const pts = new THREE.InstancedBufferGeometry();
    pts.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
    pts.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4));
    pts.instanceCount = count;
    this.haloMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixel: { value: 1 }, uI: { value: 0 } },
      vertexShader: common + /* glsl */ `
        uniform float uPixel; varying float vD;
        void main(){
          vec4 mv = viewMatrix * vec4(lanternPos(), 1.0);
          vD = -mv.z;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixel * 90.0 / max(vD, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uI; varying float vD;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = pow(smoothstep(0.5, 0.0, d), 2.2) * 0.55 * uI * exp(-vD * 0.012);
          gl_FragColor = vec4(1.0, 0.62, 0.3, a);
        }`,
    });
    const halos = new THREE.Points(pts, this.haloMat);
    halos.frustumCulled = false;
    this.scene.add(lanterns, halos);
    this.corridor.push(lanterns, halos);
    // uma luz quente geral sobre o campo de lanternas
    const warm = new THREE.PointLight('#ff9a52', 30, 60, 1.4);
    warm.position.set(0, 8, -90);
    this.scene.add(warm);
    this.disposables.push(geo);
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
        const dz = this.camera.position.z - slot.z;
        const flip = THREE.MathUtils.smoothstep(dz, 13, 34);
        g.rotation.y = slot.rotY + flip * (slot.x < 0 ? 1.25 : -1.25);
        g.scale.setScalar(1 - flip * 0.25);
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
      // B: fita ondulante (a onda anima no shader)
      const u = rand() * 2 - 1;
      const vv = rand() * 2 - 1;
      B.set([u * 13, vv * 0.25, vv * 3.2], i * 3);
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
          vec3 b = aB;
          b.y += sin(b.x * 0.45 + uTime * 0.9) * 1.6 + sin(b.z * 0.9 + b.x * 0.2 + uTime * 1.3) * 0.5;
          b.z += cos(b.x * 0.3 + uTime * 0.6) * 1.2;
          vec3 p = mix(mix(position, b, m1), aC, m2);
          // turbulência: mais forte no meio de cada transição
          float chaos = sin(m1 * 3.14159) + sin(m2 * 3.14159);
          float t = uTime * (0.4 + aR * 0.6);
          p += vec3(sin(t + aR * 40.0), cos(t * 1.3 + aR * 20.0), sin(t * 0.7 + aR * 60.0)) * (0.05 + chaos * 1.6 * aR);
          // as órbitas giram
          float ang = 0.0;
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

  /** Velocidade do scroll (px/frame), usada no efeito de lente das transições. */
  setVelocity(v: number) {
    this.velocity = Math.max(this.velocity, Math.min(1, Math.abs(v) / 60));
  }

  /** Ponto do lago sob o cursor (ou null). */
  private waterPoint(ndc: THREE.Vector2) {
    this.raycaster.setFromCamera(ndc, this.camera);
    const hit = this.raycaster.ray.intersectPlane(this.waterPlane, this.hitV);
    return hit && hit.distanceTo(this.camera.position) < 60 ? hit : null;
  }

  /** Solta uma lanterna no ponto do lago onde o visitante clicou. */
  releaseLantern(clientX: number, clientY: number) {
    const ndc = new THREE.Vector2((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    const hit = this.waterPoint(ndc);
    if (!hit || this.released.length > 40) return false;
    // nunca nasce colada na câmera: empurra para pelo menos 10 unidades adiante
    const cam = this.camera.position;
    const flat = new THREE.Vector3(hit.x - cam.x, 0, hit.z - cam.z);
    if (flat.length() < 10) {
      flat.setLength(10);
      hit.set(cam.x + flat.x, 0, cam.z + flat.z);
    }
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.2, 0.55, 12, 1, true),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.2, 0.5), side: THREE.DoubleSide, toneMapped: false, transparent: true, opacity: 0.92 }),
    );
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.lanternHalo, color: '#ffae5c', transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.scale.setScalar(2.4);
    g.add(body, glow);
    g.position.set(hit.x, 0.4, hit.z);
    g.scale.setScalar(0.75);
    g.userData = { t0: -1, y0: 0.4, s: Math.random() * 10 };
    this.scene.add(g);
    this.released.push(g);
    if (this.ripples) this.ripples[Math.floor(Math.random() * 10)].set(hit.x, hit.z, this.clock.elapsedTime);
    return true;
  }

  setPointer(x: number, y: number) {
    this.pointerMoved = true;
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
        this.adapt();
        this.fpsAcc = 0;
        this.fpsN = 0;
      }
    }
  };

  /** Qualidade adaptativa: baixa a resolução se o FPS cair, sobe de volta se sobrar folga. */
  private dprMax = Math.min(window.devicePixelRatio, 1.5);
  private slow = 0;
  private adapt() {
    const dpr = this.renderer.getPixelRatio();
    if (this.fps < 48) this.slow++;
    else if (this.fps > 58) this.slow--;
    let next = dpr;
    if (this.slow >= 2 && dpr > 0.75) next = Math.max(0.75, dpr - 0.25);
    if (this.slow <= -6 && dpr < this.dprMax) next = Math.min(this.dprMax, dpr + 0.25);
    if (next !== dpr) {
      this.slow = 0;
      this.renderer.setPixelRatio(next);
      this.composer.setPixelRatio(next);
      this.resize();
    }
  }

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

    // lanternas acendem conforme a câmera chega ao campo delas
    const li = THREE.MathUtils.smoothstep(-s.pz, -6, 4);
    this.lanternMat.uniforms.uTime.value = t;
    this.lanternMat.uniforms.uFog.value.copy(this.fog.color);
    this.lanternMat.uniforms.uDensity.value = this.fog.density;
    this.lanternMat.uniforms.uI.value = li;
    this.haloMat.uniforms.uTime.value = t;
    this.haloMat.uniforms.uPixel.value = this.renderer.getPixelRatio();
    this.haloMat.uniforms.uI.value = li;
    // transição: a lente abre um pouco quando o scroll acelera
    this.velocity *= 0.92;
    const baseFov = this.camera.aspect < 0.8 ? 58 : 40;
    const fov = baseFov + Math.min(this.velocity, 1) * 9;
    if (Math.abs(this.camera.fov - fov) > 0.01) {
      this.camera.fov += (fov - this.camera.fov) * 0.12;
      this.camera.updateProjectionMatrix();
    }

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
    this.corridor.forEach((o) => (o.visible = s.pz < 4 && s.pz > -240));

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

