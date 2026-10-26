import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { LOGO, sampleLogo, toWorld } from './logoShape';
import { projects } from '../data/content';
import { haloTexture } from './textures';

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
const FOGS = ['#0b0e18', '#0b0e18', '#0b0e18', '#0b0e18', '#0b0e18'].map((c) => new THREE.Color(c));

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
  // "Mais trabalhos": a câmera passa a última placa e olha o lago sob a lua, sem projeto atrás da lista
  archive: { px: 0, py: 5, pz: -300, lx: -8, ly: 9, lz: -380, roll: 0, fog: 2.5, glitch: 0, morph: 0, energy: 1 },
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

  constructor(canvas: HTMLCanvasElement, quality: Quality, private screenTextures: THREE.Texture[]) {
    this.high = quality === 'high';
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.high ? 1.5 : 1));
    this.dprMax = this.renderer.getPixelRatio();
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
    this.renderer.compileAsync(this.scene, this.camera).catch(() => undefined);

    // Pós-processamento: bloom (desktop), aberração, glitch, grão e vinheta.
    // MSAA só no quadro da cena (bordas lisas); os passes de efeito usam alvos simples,
    // sem o custo de resolver multisample a cada passe.
    const rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { type: THREE.HalfFloatType });
    this.composer = new EffectComposer(this.renderer, rt);
    const msaa = this.high ? new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { type: THREE.HalfFloatType, samples: 4 }) : null;
    if (msaa) {
      const scene = this.scene;
      const camera = this.camera;
      class ScenePass extends Pass {
        constructor() {
          super();
          this.needsSwap = false;
        }
        render(renderer: THREE.WebGLRenderer) {
          renderer.setRenderTarget(msaa);
          renderer.clear();
          renderer.render(scene, camera);
        }
        setSize(w: number, h: number) {
          msaa!.setSize(w, h);
        }
      }
      this.composer.addPass(new ScenePass());
      this.disposables.push(msaa);
    } else this.composer.addPass(new RenderPass(this.scene, this.camera));
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
        }, msaa ? '' : 'tDiffuse'),
      );
      // lê direto o quadro multisample da cena
      if (msaa) ((this.composer.passes[this.composer.passes.length - 1] as ShaderPass).uniforms.tDiffuse.value = msaa.texture);
      this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.38, 0.6, 0.55);
      // o brilho é um desfoque: calculado em meia resolução fica igual e custa 1/4
      const bloomSize = this.bloom.setSize.bind(this.bloom);
      this.bloom.setSize = (w: number, h: number) => bloomSize(Math.max(1, Math.round(w / 2)), Math.max(1, Math.round(h / 2)));
      this.composer.addPass(this.bloom);
    }
    this.finalPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uGlitch: { value: 0 },
        uAberr: { value: 0.0005 },
        uPx: { value: 1 },
        uRes: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse; uniform float uTime; uniform float uGlitch; uniform float uAberr; uniform vec2 uRes; uniform float uPx;
        varying vec2 vUv;
        float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec2 uv = vUv;
          // pixelização da entrada (uPx = tamanho do bloco em pixels; 1 = imagem normal)
          if (uPx > 1.0) uv = (floor(uv * uRes / uPx) + 0.5) * uPx / uRes;
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
      const r = new Reflector(new THREE.PlaneGeometry(520, 520), {
        textureWidth: Math.round(window.innerWidth * 0.42),
        textureHeight: Math.round(window.innerHeight * 0.42),
        color: new THREE.Color('#9a98b4'),
        clipBias: 0.003,
        multisample: 0, // o reflexo é distorcido pelas ondas: serrilhado não aparece
        shader,
      });
      r.rotation.x = -Math.PI / 2;
      r.position.set(0, 0, -90);
      this.scene.add(r);
      this.reflector = r;
      // com a câmera parada, o reflexo é refeito em quadros alternados (as ondas são aplicadas
      // na leitura, então continuam a 60 fps); em movimento, refaz todo quadro
      const reflect = r.onBeforeRender.bind(r);
      const lastCam = new THREE.Matrix4();
      let odd = false;
      r.onBeforeRender = (...args: Parameters<typeof reflect>) => {
        const cam = args[2] as THREE.Camera;
        // movimento lento (parallax do mouse) também usa quadros alternados: o atraso some nas ondas
        const e = cam.matrixWorld.elements;
        const moved = e.some((v, i) => Math.abs(v - lastCam.elements[i]) > (i >= 12 ? 0.04 : 0.004));
        odd = !odd;
        if (!moved && odd) return;
        lastCam.copy(cam.matrixWorld);
        reflect(...args);
      };
      const mat = r.material as THREE.ShaderMaterial;
      this.ripples = mat.uniforms.uRip.value as THREE.Vector3[];
      let nextDrop = 3;
      let dropI = 7;
      this.updaters.push((t) => {
        if (t < nextDrop || !this.ripples) return;
        nextDrop = t + 2.2 + Math.random() * 3.5;
        const c = this.camera.position;
        this.ripples[dropI++ % this.ripples.length].set(c.x + (Math.random() - 0.5) * 18, c.z - 6 - Math.random() * 22, t);
      });
      this.updaters.push((t) => {
        mat.uniforms.uTime.value = t;
        mat.uniforms.uFog.value.copy(this.fog.color);
        mat.uniforms.uDensity.value = this.fog.density;
      });
      this.disposables.push(r.geometry, mat, r.getRenderTarget());
    }
    // Superfície do lago: no desktop escurece levemente o espelho; no celular (sem espelho)
    // vira água desenhada, com ondulação e brilhos do luar, sem grade.
    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(520, 520),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uBase: { value: new THREE.Color(this.high ? '#07080c' : '#0e1022') }, uSolid: { value: this.high ? 0.22 : 1 }, uFog: { value: new THREE.Color() }, uDensity: { value: 0.026 }, uTime: { value: 0 } },
        vertexShader: /* glsl */ `varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uBase; uniform float uSolid; uniform vec3 uFog; uniform float uDensity; uniform float uTime; varying vec3 vW; varying float vD;
          void main(){
            vec3 col = uBase;
            if (uSolid > 0.9) {
              float fade = exp(-vD * 0.03);
              float w = sin(vW.z * 4.6 + uTime * 0.9 + sin(vW.x * 0.5 + uTime * 0.3) * 2.5) * sin(vW.x * 2.2 - uTime * 0.5);
              float glint = smoothstep(0.72, 1.0, w) * fade;
              col += vec3(0.05, 0.05, 0.1) * (0.5 + 0.5 * sin(vW.z * 0.6 + uTime * 0.5)) * fade + vec3(0.55, 0.55, 0.85) * glint * 0.22;
            }
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(col, uFog, f), uSolid);
          }
        `,
      }),
    );
    grid.rotation.x = -Math.PI / 2;
    grid.position.set(0, 0.01, -300);
    this.scene.add(grid);
    const gm = grid.material as THREE.ShaderMaterial;
    this.updaters.push(() => {
      // o chão acompanha a câmera: a borda nunca entra no quadro
      grid.position.x = this.camera.position.x;
      grid.position.z = this.camera.position.z;
      gm.uniforms.uFog.value.copy(this.fog.color);
      gm.uniforms.uDensity.value = this.fog.density;
      gm.uniforms.uTime.value = this.clock.elapsedTime;
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
        uWater: { value: new THREE.Color() },
        uTime: { value: 0 },
        uMoon: { value: new THREE.Vector3(-0.3, 0.2, -0.93).normalize() },
      },
      vertexShader: /* glsl */ `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uFog; uniform vec3 uWater; uniform float uTime; uniform vec3 uMoon; varying vec3 vDir;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n1(float x, float s){ float i = floor(x); float f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(hash(vec2(i, s)), hash(vec2(i + 1.0, s)), f); }
        float n2(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
        float fbm2(vec2 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += n2(p) * a; p *= 2.07; a *= 0.5; } return v; }
        // silhueta de montanha com cristas (ridged fbm): picos recortados e encostas suaves
        float mountain(float a, float freq, float seed){
          float h = 0.0; float w = 0.55; float s = freq;
          for (int i = 0; i < 7; i++){ float n = 1.0 - abs(n1(a * s, seed + float(i)) * 2.0 - 1.0); h += n * n * w; s *= 2.03; w *= 0.48; }
          return h;
        }
        void main(){
          vec3 d = normalize(vDir);
          float y = d.y;
          vec3 zenith = uFog * 0.3 + vec3(0.008, 0.01, 0.026);
          vec3 horizon = uFog * 1.5 + vec3(0.07, 0.065, 0.13);
          vec3 col = mix(horizon, zenith, smoothstep(-0.02, 0.6, y));
          float az = atan(d.z, d.x) + 3.14159;
          // luar espalhado no céu, mais forte perto da lua
          float m = dot(d, uMoon);
          col += vec3(0.2, 0.2, 0.34) * pow(max(m, 0.0), 6.0) * 0.35;
          // estrelas (menos perto da lua e do horizonte)
          vec2 sp = vec2(az * 150.0, asin(clamp(y, -1.0, 1.0)) * 150.0);
          vec2 cell = floor(sp);
          float h = hash(cell);
          float star = step(0.9968, h) * smoothstep(0.45, 0.0, length(fract(sp) - 0.5));
          star *= (0.55 + 0.45 * sin(uTime * (1.0 + h * 3.0) + h * 40.0)) * (1.0 - pow(max(m, 0.0), 40.0));
          col += vec3(0.85, 0.88, 1.0) * star * smoothstep(0.06, 0.4, y);
          // estrela cadente
          float cyc = floor(uTime / 9.0);
          float ph = fract(uTime / 9.0) / 0.1;
          if (ph < 1.0) {
            vec2 sky = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
            float r1 = fract(sin(cyc * 12.9898) * 43758.5453);
            float r2 = fract(sin(cyc * 78.233) * 12345.678);
            vec2 a0 = vec2(-2.3 + r1 * 1.4, 0.5 + r2 * 0.3);
            vec2 a1 = a0 + vec2(0.5, -0.2);
            vec2 head = mix(a0, a1, ph);
            vec2 tail = mix(a0, a1, max(ph - 0.35, 0.0));
            vec2 pa = sky - tail, ba = head - tail;
            float hh = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
            col += vec3(0.95, 0.92, 1.0) * smoothstep(0.003, 0.0, length(pa - ba * hh)) * hh * sin(ph * 3.14159) * 1.4;
          }
          // lua: disco com mares escuros, crateras, borda mais escura e halo
          vec3 right = normalize(cross(uMoon, vec3(0.0, 1.0, 0.0)));
          vec3 up = cross(right, uMoon);
          float R = 0.036;
          vec2 lp = vec2(dot(d, right), dot(d, up)) / R;
          float r = length(lp);
          // halo da lua (o disco agora é uma esfera 3D iluminada de lado)
          float hal = max(r - 1.0, 0.0);
          col += vec3(0.5, 0.5, 0.75) * exp(-hal * 1.6) * 0.16 * step(1.0, r) * step(0.0, m);
          col += vec3(0.3, 0.28, 0.52) * exp(-hal * 0.3) * 0.07 * step(0.0, m);
          // aurora: cortinas lentas de verde-água e lilás no alto do céu
          if (y > 0.1 && y < 0.8) {
            float curtain = smoothstep(0.1, 0.3, y) * smoothstep(0.8, 0.42, y);
            float band = sin(az * 2.0 + uTime * 0.05 + sin(az * 5.0 + uTime * 0.08) * 0.7);
            float rays = n2(vec2(az * 26.0, y * 2.0 - uTime * 0.06));
            vec3 ac = mix(vec3(0.16, 0.5, 0.5), vec3(0.45, 0.33, 0.85), smoothstep(0.2, 0.6, y));
            col += ac * curtain * pow(max(band, 0.0), 2.0) * (0.35 + 0.65 * rays) * 0.3 * (1.0 - pow(max(m, 0.0), 8.0));
          }
          if (y > -0.02 && y < 0.2) {
          // montanhas em três camadas, com névoa entre elas e borda iluminada pela lua
          float moonAz = atan(uMoon.z, uMoon.x) + 3.14159;
          float lit = 0.5 + 0.5 * cos(az - moonAz);
          float far = 0.03 + mountain(az, 2.2, 3.0) * 0.13;
          float mid = 0.012 + mountain(az + 7.0, 3.4, 17.0) * 0.085;
          float near = -0.004 + mountain(az + 19.0, 5.2, 41.0) * 0.05;
          vec3 farCol = mix(horizon * 0.82, vec3(0.32, 0.34, 0.5), 0.25);
          vec3 midCol = horizon * 0.5 + vec3(0.0, 0.004, 0.012);
          vec3 nearCol = horizon * 0.27;
          float fade = smoothstep(-0.06, 0.0, y);
          // camada distante, com topos claros (neve sob a lua)
          float inFar = step(y, far) * fade;
          float snow = smoothstep(far - 0.022, far - 0.002, y) * smoothstep(0.08, 0.13, far) * lit;
          col = mix(col, farCol + vec3(0.14, 0.14, 0.2) * snow, inFar);
          // névoa subindo do lago entre as camadas
          col = mix(col, horizon * 0.95, smoothstep(0.05, 0.0, y) * 0.35 * fade);
          // camada do meio, com borda iluminada
          float inMid = step(y, mid) * fade;
          float rimM = smoothstep(0.006, 0.0, mid - y) * lit;
          col = mix(col, midCol + vec3(0.05, 0.05, 0.09) * rimM, inMid);
          col = mix(col, horizon * 0.8, smoothstep(0.025, 0.0, y) * 0.3 * fade);
          // camada próxima, mais escura e recortada
          float inNear = step(y, near) * fade;
          float rimN = smoothstep(0.004, 0.0, near - y) * lit;
          col = mix(col, nearCol + vec3(0.04, 0.04, 0.08) * rimN, inNear);
          }
          // abaixo do horizonte o céu vira a névoa do lago: a água some nele sem borda
          col = mix(col, uWater, smoothstep(0.0, -0.014, y));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    // Lua 3D: esfera com mares e crateras em ruído 3D, relevo e luz vindo de lado (fase).
    const moonMat = new THREE.ShaderMaterial({
      fog: false,
      uniforms: { uLight: { value: new THREE.Vector3(-0.49, 0.16, 0.65).normalize() } },
      vertexShader: /* glsl */ `varying vec3 vN; varying vec3 vO; void main(){ vO = normalize(position); vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uLight; varying vec3 vN; varying vec3 vO;
        float h3(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
        float n3(vec3 p){ vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z); }
        float fbm(vec3 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += n3(p) * a; p *= 2.1; a *= 0.5; } return v; }
        // crateras: bacias com borda elevada, em células de várias escalas
        float craters(vec3 p){
          float c = 0.0;
          for (int s = 0; s < 3; s++){
            float sc = 4.0 * pow(2.2, float(s));
            vec3 q = p * sc; vec3 i = floor(q);
            vec3 o = vec3(h3(i), h3(i + 3.1), h3(i + 7.7));
            float d = length(fract(q) - o);
            float r = 0.18 + h3(i + 1.3) * 0.22;
            float bowl = smoothstep(r, 0.0, d);
            float rim = smoothstep(r * 1.35, r, d) * smoothstep(r * 0.75, r, d);
            c += (rim * 0.6 - bowl * 0.9) * step(0.45, h3(i + 9.1)) / (1.0 + float(s));
          }
          return c;
        }
        float height(vec3 p){ return fbm(p * 2.2) * 0.6 + craters(p) * 0.35; }
        void main(){
          vec3 p = normalize(vO);
          // relevo: perturba a normal pelo gradiente da altura
          float e = 0.01;
          float h0 = height(p);
          vec3 g = vec3(height(p + vec3(e,0,0)) - h0, height(p + vec3(0,e,0)) - h0, height(p + vec3(0,0,e)) - h0) / e;
          vec3 n = normalize(vN - (g - dot(g, vN) * vN) * 0.06);
          float diff = smoothstep(-0.08, 0.35, dot(n, uLight));
          float maria = smoothstep(0.45, 0.62, fbm(p * 1.4 + 5.0));
          vec3 albedo = vec3(0.86, 0.86, 0.9) * (1.0 - maria * 0.4) * (0.85 + h0 * 0.3);
          vec3 col = albedo * (diff * 0.95 + 0.035);
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), moonMat);
    moonMesh.renderOrder = 1;
    moonMesh.frustumCulled = false;
    this.scene.add(moonMesh);
    const moonDir = (mat.uniforms.uMoon.value as THREE.Vector3).clone();
    this.updaters.push((t) => {
      const dist = 150;
      moonMesh.position.copy(this.camera.position).addScaledVector(moonDir, dist);
      moonMesh.scale.setScalar(dist * 0.036);
      moonMesh.rotation.y = 0.6 + t * 0.002;
    });

    const sky = new THREE.Mesh(new THREE.SphereGeometry(200, 48, 24), mat);
    sky.frustumCulled = false;
    sky.renderOrder = -1;
    this.scene.add(sky);
    this.updaters.push((t) => {
      sky.position.copy(this.camera.position);
      mat.uniforms.uFog.value.copy(this.fogBase);
      mat.uniforms.uWater.value.copy(this.fog.color);
      mat.uniforms.uTime.value = t;
    });
  }

  /**
   * A cena de abertura: um dev programando de madrugada à beira do lago.
   * Pedra na margem, notebook aberto com os projetos na tela, lanterna acesa
   * e vaga-lumes, tudo modelado no código.
   */
  private buildMonolith() {
    this.buildSky();
    const group = new THREE.Group();
    this.scene.add(group);

    // A pedra da margem: rocha procedural, achatada em cima, metade dentro d'água.
    const rockGeo = new THREE.IcosahedronGeometry(1, 4);
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
    const rock = new THREE.Mesh(rockGeo, new THREE.MeshStandardMaterial({ color: '#1c1d26', roughness: 0.92, metalness: 0.0, vertexColors: true, flatShading: true }));
    rock.position.set(0, 0.15, 0);
    group.add(rock);
    // pedras menores ao redor
    [[-2.6, 0.9, 0.6], [2.4, 1.6, 0.45], [-1.2, -1.9, 0.35], [3.4, -0.8, 0.3]].forEach(([x, z, s]) => {
      const m = new THREE.Mesh(rockGeo, rock.material);
      m.scale.setScalar(s);
      m.position.set(x, 0.05, z);
      m.rotation.y = x * 2;
      group.add(m);
    });

    // Lanterna com luz quente que tremula.
    const lanternLight = new THREE.PointLight('#ffb36b', 0, 14, 1.6);
    const { screen: screenMat, flame, light } = this.buildProps(group, rock);
    lanternLight.position.copy(light);
    group.add(lanternLight);

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
    this.scene.add(new THREE.HemisphereLight('#7d7fc8', '#0b0e18', 0.55));
    const moon = new THREE.DirectionalLight('#b8c4ff', 0.9);
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
      flame.scale.setScalar(Math.max(0.0001, lamp)).setY(Math.max(0.0001, lamp * 1.6));
      screenMat.color.setScalar(0.85 * THREE.MathUtils.smoothstep(k, 0.45, 0.8));
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
    const near: THREE.Object3D[] = [];
    group.traverse((o) => {
      if (o !== group && ((o as THREE.Mesh).isMesh || (o as THREE.Points).isPoints)) near.push(o);
    });
    let shown = true;
    this.updaters.push((t, dt) => {
      const inRange = this.camera.position.z > -115;
      if (inRange !== shown) {
        shown = inRange;
        near.forEach((o) => (o.visible = inRange));
      }
      if (!inRange) return;
      if (playing && intro < 1) {
        intro = Math.min(1, intro + dt / 3);
        apply(intro);
      }
      if (intro >= 1) {
        const fl = 1 + Math.sin(t * 9.3) * 0.06 + Math.sin(t * 23.7) * 0.04 + Math.sin(t * 3.1) * 0.05;
        lanternLight.intensity = 13 * fl;
        flame.scale.set(fl, 1.6 * fl, fl);
      }
      fmat.uniforms.uTime.value = t;
      fmat.uniforms.uPixel.value = this.renderer.getPixelRatio();
    });
  }

  /**
   * Notebook e lanterna modelados no código (sem arquivos 3D): poucas faces,
   * materiais simples e brilho feito com sprites, em vez de vidro real e sombras.
   */
  private buildProps(group: THREE.Group, rock: THREE.Mesh) {
    // altura real da pedra em cada ponto (o topo não é perfeitamente plano)
    rock.updateMatrixWorld(true);
    const ray = new THREE.Raycaster();
    const down = new THREE.Vector3(0, -1, 0);
    const yAt = (x: number, z: number) => {
      ray.set(new THREE.Vector3(x, 10, z), down);
      return ray.intersectObject(rock, false)[0]?.point.y ?? 0.8;
    };
    // apoia pelo ponto mais alto sob a peça, para nada afundar na pedra
    const restOn = (x: number, z: number, r: number) => Math.max(yAt(x, z), yAt(x + r, z), yAt(x - r, z), yAt(x, z + r), yAt(x, z - r));
    const top = restOn(-0.35, 0.1, 0.6);
    const topL = restOn(1.25, -0.25, 0.2);
    const halo = haloTexture();
    this.disposables.push(halo);
    // sombra de contato: um degradê escuro no chão, no lugar do mapa de sombras
    const sc = document.createElement('canvas');
    sc.width = sc.height = 128;
    const sg = sc.getContext('2d')!;
    const rg = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(0,0,0,0.75)');
    rg.addColorStop(0.55, 'rgba(0,0,0,0.35)');
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    sg.fillStyle = rg;
    sg.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(sc);
    this.disposables.push(shadowTex);
    const shadow = (w: number, d: number, x: number, z: number, ry = 0) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, color: 0x000000, opacity: 0.85 }));
      m.rotation.set(-Math.PI / 2, 0, ry);
      m.position.set(x, yAt(x, z) + 0.006, z);
      group.add(m);
    };

    // ---------- notebook ----------
    const lap = new THREE.Group();
    const shell = new THREE.MeshStandardMaterial({ color: '#2a2d3a', metalness: 0.55, roughness: 0.38 });
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.62, 0.06, 1.1, 3, 0.028), shell);
    base.position.y = 0.03;
    lap.add(base);
    // teclado desenhado uma vez num canvas: teclas escuras com retroiluminação lilás
    const kc = document.createElement('canvas');
    kc.width = 512;
    kc.height = 200;
    const kg = kc.getContext('2d')!;
    kg.fillStyle = '#14151c';
    kg.fillRect(0, 0, 512, 200);
    const rows = [14, 14, 13, 12, 10];
    rows.forEach((n, r) => {
      const kw = 512 / 14.6;
      const off = (14 - n) * kw * 0.5;
      for (let i = 0; i < n; i++) {
        const x = 6 + off + i * kw;
        const y = 8 + r * 37;
        const w = r === 4 && i === 4 ? kw * 4.2 : kw - 5;
        if (r === 4 && i > 4 && i < 8) continue;
        kg.fillStyle = '#0b0c11';
        kg.fillRect(x, y, w, 31);
        kg.fillStyle = 'rgba(165,150,242,0.22)';
        kg.fillRect(x + 1, y + 29, w - 2, 2);
      }
    });
    const ktex = new THREE.CanvasTexture(kc);
    ktex.colorSpace = THREE.SRGBColorSpace;
    ktex.anisotropy = 4;
    this.disposables.push(ktex);
    const keys = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.52), new THREE.MeshStandardMaterial({ map: ktex, roughness: 0.7, metalness: 0.1 }));
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(0, 0.0605, -0.13);
    lap.add(keys);
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.3), new THREE.MeshStandardMaterial({ color: '#343846', metalness: 0.4, roughness: 0.3 }));
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(0, 0.0605, 0.33);
    lap.add(pad);
    // tampa: gira a partir da dobradiça, aberta um pouco além de 90°
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.06, -0.54);
    hinge.rotation.x = -0.32;
    lap.add(hinge);
    const lid = new THREE.Mesh(new RoundedBoxGeometry(1.62, 1.06, 0.04, 3, 0.018), shell);
    lid.position.set(0, 0.53, -0.02);
    hinge.add(lid);
    const bezel = new THREE.Mesh(new THREE.PlaneGeometry(1.56, 1.0), new THREE.MeshBasicMaterial({ color: '#07080b' }));
    bezel.position.set(0, 0.53, 0.0015);
    hinge.add(bezel);
    const screen = new THREE.MeshBasicMaterial({ map: this.screenTextures[0], toneMapped: false, color: new THREE.Color(0.85, 0.85, 0.9) });
    const display = new THREE.Mesh(new THREE.PlaneGeometry(1.48, 0.925), screen);
    display.position.set(0, 0.54, 0.002);
    hinge.add(display);
    // a próxima tela entra por cima com fade; ao terminar, vira a tela de baixo
    const nextMat = new THREE.MeshBasicMaterial({ map: this.screenTextures[0], toneMapped: false, transparent: true, opacity: 0, color: new THREE.Color(0.85, 0.85, 0.9) });
    const nextDisplay = new THREE.Mesh(display.geometry, nextMat);
    nextDisplay.position.set(0, 0.54, 0.0028);
    hinge.add(nextDisplay);
    let slide = 0;
    let slideT = 0;
    this.updaters.push((_t, dt) => {
      slideT += dt;
      if (slideT > 4.5 && this.screenTextures.length > 1) {
        if (nextMat.opacity === 0) nextMat.map = this.screenTextures[(slide + 1) % this.screenTextures.length];
        nextMat.opacity = Math.min(1, nextMat.opacity + dt * 1.6);
        nextMat.color.copy(screen.color);
        if (nextMat.opacity >= 1) {
          slide = (slide + 1) % this.screenTextures.length;
          screen.map = this.screenTextures[slide];
          nextMat.opacity = 0;
          slideT = 0;
        }
      }
    });
    // borda lilás fina na tampa e brilho suave da tela sobre o teclado
    const rim = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.6, 1.04)), new THREE.LineBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.35 }));
    rim.position.set(0, 0.53, 0.0005);
    hinge.add(rim);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: '#8f86ff', transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.scale.set(2.6, 1.6, 1);
    glow.position.set(0, 0.5, 0.4);
    hinge.add(glow);
    lap.position.set(-0.35, top, 0.1);
    lap.rotation.y = 0.35;
    group.add(lap);
    shadow(2.3, 1.7, -0.35, 0.05, -0.35);

    // ---------- lanterna ----------
    const lan = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({ color: '#3a302a', metalness: 0.7, roughness: 0.42 });
    const brass = new THREE.MeshStandardMaterial({ color: '#8a6a3a', metalness: 0.8, roughness: 0.35 });
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.08, 24), metal);
    foot.position.y = 0.04;
    lan.add(foot);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.012, 8, 32), brass);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.085;
    lan.add(ring);
    // vidro: só cor e brilho aditivo (sem transmissão real, que redesenha a cena inteira)
    const glass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.145, 0.16, 0.42, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.62, 0.32), transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    );
    glass.position.y = 0.3;
    lan.add(glass);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.46, 6), metal);
      bar.position.set(Math.cos(a) * 0.175, 0.3, Math.sin(a) * 0.175);
      lan.add(bar);
    }
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.21, 0.13, 24), metal);
    cap.position.y = 0.58;
    lan.add(cap);
    const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.08, 16), brass);
    chimney.position.y = 0.68;
    lan.add(chimney);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.011, 8, 32, Math.PI), metal);
    handle.position.y = 0.66;
    handle.rotation.y = Math.PI / 2;
    lan.add(handle);
    const flame = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 1.8, 0.8), toneMapped: false }));
    flame.scale.y = 1.6;
    flame.position.y = 0.3;
    lan.add(flame);
    const fglow = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: '#ffae5c', transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }));
    fglow.scale.set(0.95, 0.95, 1);
    fglow.position.y = 0.32;
    lan.add(fglow);
    // mariposas: pontinhos de luz quente girando em volta da chama
    const moths = Array.from({ length: 5 }, (_, i) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: '#ffd9a0', transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
      sp.scale.setScalar(0.06 + (i % 2) * 0.03);
      lan.add(sp);
      return { sp, r: 0.28 + Math.random() * 0.22, s: 0.9 + Math.random() * 1.4, p: Math.random() * 6.28, h: Math.random() * 0.3 };
    });
    this.updaters.push((t) => {
      for (const m of moths) {
        const a = t * m.s + m.p;
        m.sp.position.set(Math.cos(a) * m.r, 0.36 + m.h + Math.sin(a * 2.3) * 0.08, Math.sin(a) * m.r * 0.8);
        m.sp.material.opacity = (0.5 + 0.5 * Math.sin(a * 3.1)) * Math.min(1, flame.scale.x);
      }
    });
    lan.position.set(1.25, topL, -0.25);
    lan.scale.setScalar(1.25);
    group.add(lan);
    shadow(1.1, 1.1, 1.25, -0.25);
    // a chama acende junto com a introdução (a escala da chama já é animada lá fora)
    this.updaters.push(() => {
      const k = Math.min(1, flame.scale.x);
      fglow.material.opacity = 0.6 * k;
      (glass.material as THREE.MeshBasicMaterial).opacity = 0.08 + 0.18 * k;
      glow.material.opacity = 0.32 * (screen.color.r / 0.85);
    });

    const light = new THREE.Vector3(1.25, topL + 0.32 * 1.25, -0.25);
    return { screen, flame, light };
  }

  /** Lanternas de papel acesas subindo devagar sobre o lago (capítulo Abordagem). */
  private buildCorridor() {
    const count = this.high ? 270 : 120;
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
          gl_FragColor = vec4(mix(col, uFog, f), uI);
        }`,
    });
    this.lanternMat.transparent = true;
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
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: PURPLE, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.scale.set(16, 11, 1);
      glow.position.z = -1.2;
      g.add(glow, frame, screen, edges);
      this.scene.add(g);
      const baseY = slot.y;
      // inclinação na direção do cursor quando a placa está sob ele
      const tilt = new THREE.Vector2();
      this.updaters.push((t) => {
        const dz = this.camera.position.z - slot.z;
        g.visible = dz < 120 && dz > -30;
        if (!g.visible) return;
        g.position.y = baseY + Math.sin(t * 0.8 + i) * 0.18;
        const flip = THREE.MathUtils.smoothstep(dz, 13, 34);
        const on = this.hovered === i;
        tilt.lerp(on ? this.pointerCur : new THREE.Vector2(), 0.08);
        g.rotation.y = slot.rotY + flip * (slot.x < 0 ? 1.25 : -1.25) + tilt.x * 0.22;
        g.rotation.x = -tilt.y * 0.16;
        g.scale.setScalar((1 - flip * 0.25) * (1 + (on ? 0.03 : 0)));
        g.rotation.z = Math.sin(t * 0.5 + i * 2) * 0.012;
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
    this.updaters.push(() => (pts.visible = this.camera.position.z < CORE_Z + 125));
    const glow = new THREE.PointLight(PURPLE, 60, 30, 1.5);
    glow.position.set(0, 6, CORE_Z);
    this.scene.add(glow);
  }

  private buildDust() {
    const count = this.high ? 3000 : 1200;
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

  /** Tamanho do bloco da pixelização de entrada (1 = sem efeito). */
  get pixelate() {
    return this.finalPass.uniforms.uPx.value as number;
  }
  set pixelate(v: number) {
    this.finalPass.uniforms.uPx.value = v;
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
    const k = 1 - Math.exp(-dt * 2.8);
    const c = this.cur as unknown as Record<string, number>;
    const r = this.rig as unknown as Record<string, number>;
    for (const key in r) c[key] += (r[key] - c[key]) * (key === 'glitch' ? Math.min(1, k * 3) : k);
    this.pointerCur.lerp(this.pointer, 1 - Math.exp(-dt * 1.8));
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
    const li = THREE.MathUtils.smoothstep(-s.pz, -6, 4) * (1 - THREE.MathUtils.smoothstep(-s.pz, 215, 285));
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
    if (this.reflector) {
      this.reflector.position.x = this.camera.position.x;
      this.reflector.position.z = this.camera.position.z;
    }
    this.corridor.forEach((o) => (o.visible = li > 0.002));

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

