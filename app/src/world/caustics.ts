import * as THREE from 'three';

/*
  Motor de luz.

  1. Um campo de altura (água + peças de vidro) é desenhado numa textura que cobre
     uma janela quadrada do chão, centrada onde a câmera olha.
  2. Uma malha densa cobre essa janela. Cada vértice é empurrado pela inclinação
     da superfície (refração de lente fina) e a malha é desenhada com mistura
     aditiva: onde os triângulos encolhem, a luz se concentra. São cáusticas de
     verdade, não textura.
  3. Cada peça de vidro carrega um relevo calculado para que a luz que passa por
     ela forme uma imagem (equação de Poisson resolvida na GPU, ver Poisson).
*/

export const MAX_GLASS = 8;
/** parte do ladrilho de relevo que a pegada ocupa (o resto é margem) */
const LIGHT_MARGIN_POISSON = 0.94;

export interface Glass {
  /** centro no chão (x, z) */
  x: number;
  z: number;
  /** meia largura e meia profundidade da pegada */
  hx: number;
  hz: number;
  rot: number;
  /** 0 = retângulo, 1 = círculo */
  round: number;
  /** quanto o relevo desvia a luz */
  amp: number;
  /** força da borda chanfrada (linha de luz na borda) */
  bevel: number;
  /** índice do ladrilho no atlas de relevos (-1 = sem imagem, só vidro liso) */
  tile: number;
  /** quanto a peça acalma a água embaixo dela */
  calm: number;
  /** 0..1, para ligar e desligar com suavidade */
  on: number;
  /** prisma: inclinação constante que desloca uma faixa de luz */
  ramp?: number;
  /** placa de projeto: índice da tela impressa (-1 = nenhuma) */
  shot?: number;
}

export const ATLAS_TILES = 4; // 4x4 ladrilhos
export const TILE = 256;

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
`;

const QUAD_VS = /* glsl */ `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}
`;

/** Campo de altura da janela: água animada + relevo de cada vidro. */
const HEIGHT_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uCenter;uniform float uSize;uniform float uTime;uniform float uWater;uniform float uScale;
uniform sampler2D uAtlas;
uniform vec4 uG0[${MAX_GLASS}];   // x z hx hz
uniform vec4 uG1[${MAX_GLASS}];   // rot round amp bevel
uniform vec4 uG2[${MAX_GLASS}];   // tile calm on ramp
${NOISE}
float water(vec2 p){
  float t=uTime;
  vec2 q=p*uScale;
  float h=snoise(q*.55+vec2(t*.05,-t*.035));
  h+=.5*snoise(q*1.1+vec2(-t*.07,t*.05)+h*.35);
  h+=.22*snoise(q*2.3+vec2(t*.11,t*.08));
  return h;
}
void main(){
  vec2 p=uCenter+(vUv-.5)*uSize;
  float calm=0.;float g=0.;
  for(int i=0;i<${MAX_GLASS};i++){
    vec4 a=uG0[i],b=uG1[i],c=uG2[i];
    if(c.z<.001)continue;
    vec2 d=p-a.xy;float cs=cos(b.x),sn=sin(b.x);
    vec2 l=vec2(cs*d.x+sn*d.y,-sn*d.x+cs*d.y)/a.zw;   // -1..1 dentro da pegada
    float edge;
    if(b.y>.5){edge=1.-length(l);}else{vec2 e=1.-abs(l);edge=min(e.x,e.y);}
    // embaixo do vidro a água some (a imagem do vidro é pré-calculada, ver LightAtlas)
    calm=max(calm,c.y*c.z*smoothstep(-.45,.0,edge));
  }
  float h=water(p)*uWater*(1.-calm*.96)+g;
  gl_FragColor=vec4(h,0.,0.,1.);
}
`;

/** Malha que leva a luz: cada vértice desvia conforme a inclinação. */
const CAUSTIC_VS = /* glsl */ `
precision highp float;
uniform sampler2D uHeight;uniform float uSize;uniform float uK;uniform float uTexel;
varying vec2 vA;varying vec2 vB;
void main(){
  vec2 uv=position.xy;
  float hl=texture2D(uHeight,uv-vec2(uTexel,0.)).r,hr=texture2D(uHeight,uv+vec2(uTexel,0.)).r;
  float hd=texture2D(uHeight,uv-vec2(0.,uTexel)).r,hu=texture2D(uHeight,uv+vec2(0.,uTexel)).r;
  vec2 grad=vec2(hr-hl,hu-hd)/(2.*uTexel*uSize);   // por unidade de mundo
  vec2 n=uv+grad*uK/uSize;
  vA=uv;vB=n;
  gl_Position=vec4(n*2.-1.,0.,1.);
}
`;
const CAUSTIC_FS = /* glsl */ `
precision highp float;
uniform vec3 uColor;
varying vec2 vA;varying vec2 vB;
void main(){
  float a=abs(dFdx(vA).x*dFdy(vA).y-dFdx(vA).y*dFdy(vA).x);
  float b=abs(dFdx(vB).x*dFdy(vB).y-dFdx(vB).y*dFdy(vB).x);
  float I=clamp(a/max(b,1e-9),0.,5.);
  gl_FragColor=vec4(uColor*I,1.);
}
`;

function quad(mat: THREE.Material) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  m.frustumCulled = false;
  const s = new THREE.Scene();
  s.add(m);
  return s;
}

const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

export interface CausticOptions {
  heightRes: number;
  causticRes: number;
  grid: number;
  dispersion: boolean;
}

export class Caustics {
  readonly height: THREE.WebGLRenderTarget;
  readonly light: THREE.WebGLRenderTarget;
  readonly glass: Glass[] = [];
  center = new THREE.Vector2();
  size = 30;
  /** quanto a luz desvia (distância até o chão em unidades de lente fina) */
  k = 3.2;
  water = 0.32;
  private hMat: THREE.ShaderMaterial;
  private hScene: THREE.Scene;
  private cScene = new THREE.Scene();
  private cMats: THREE.ShaderMaterial[] = [];

  constructor(atlas: THREE.Texture, o: CausticOptions) {
    const rtOpts = { type: THREE.HalfFloatType, depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
    this.height = new THREE.WebGLRenderTarget(o.heightRes, o.heightRes, rtOpts);
    this.light = new THREE.WebGLRenderTarget(o.causticRes, o.causticRes, rtOpts);
    const z = () => Array.from({ length: MAX_GLASS }, () => new THREE.Vector4());
    this.hMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: HEIGHT_FS,
      uniforms: {
        uCenter: { value: this.center },
        uSize: { value: this.size },
        uTime: { value: 0 },
        uWater: { value: this.water },
        uScale: { value: 0.32 },
        uAtlas: { value: atlas },
        uG0: { value: z() },
        uG1: { value: z() },
        uG2: { value: z() },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.hScene = quad(this.hMat);

    // malha da luz em coordenadas da janela (0..1)
    const n = o.grid;
    const g = new THREE.PlaneGeometry(1, 1, n, n);
    g.translate(0.5, 0.5, 0);
    const channels: [number, number, number, number][] = o.dispersion
      ? [
          [1, 0, 0, 1.035],
          [0, 1, 0, 1],
          [0, 0, 1, 0.965],
        ]
      : [[1, 1, 1, 1]];
    for (const [r, gg, b, kf] of channels) {
      const m = new THREE.ShaderMaterial({
        vertexShader: CAUSTIC_VS,
        fragmentShader: CAUSTIC_FS,
        uniforms: {
          uHeight: { value: this.height.texture },
          uSize: { value: this.size },
          uK: { value: this.k * kf },
          uTexel: { value: 1 / o.heightRes },
          uColor: { value: new THREE.Vector3(r, gg, b) },
        },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });
      (m.uniforms.uK as { kf?: number }).kf = kf;
      this.cMats.push(m);
      const mesh = new THREE.Mesh(g, m);
      mesh.frustumCulled = false;
      this.cScene.add(mesh);
    }
  }

  setAtlas(t: THREE.Texture) {
    this.hMat.uniforms.uAtlas.value = t;
  }

  update(r: THREE.WebGLRenderer, time: number) {
    const u = this.hMat.uniforms;
    u.uTime.value = time;
    u.uSize.value = this.size;
    u.uWater.value = this.water;
    const g0 = u.uG0.value as THREE.Vector4[], g1 = u.uG1.value as THREE.Vector4[], g2 = u.uG2.value as THREE.Vector4[];
    for (let i = 0; i < MAX_GLASS; i++) {
      const g = this.glass[i];
      if (!g || g.on <= 0.001) {
        g2[i].set(-1, 0, 0, 0);
        continue;
      }
      g0[i].set(g.x, g.z, g.hx, g.hz);
      g1[i].set(g.rot, g.round, g.amp, g.bevel);
      g2[i].set(g.tile, g.calm, g.on, g.ramp ?? 0);
    }
    for (const m of this.cMats) {
      m.uniforms.uSize.value = this.size;
      m.uniforms.uK.value = this.k * ((m.uniforms.uK as { kf?: number }).kf ?? 1);
    }
    const prev = r.getRenderTarget();
    const ac = r.autoClear;
    r.autoClear = true;
    r.setRenderTarget(this.height);
    r.render(this.hScene, ortho);
    r.setRenderTarget(this.light);
    r.setClearColor(0x000000, 0);
    r.clear();
    r.autoClear = false;
    r.render(this.cScene, ortho);
    r.autoClear = ac;
    r.setRenderTarget(prev);
  }

  /** Converte a imagem de um vidro em amplitude: contraste desejado c ≈ k·amp·(px/mundo)². */
  ampFor(halfSize: number, contrast: number) {
    const pxPerWorld = TILE / (halfSize * 2);
    return contrast / (this.k * pxPerWorld * pxPerWorld);
  }

  dispose() {
    this.height.dispose();
    this.light.dispose();
  }
}

/*
  Poisson: dado o desenho que a luz deve formar (claro = mais luz), acha o relevo h
  com laplaciano(h) = -(imagem - média). Pela aproximação de lente fina, a intensidade
  no chão fica ≈ 1 + k·amp·(imagem - média): a luz desenha a imagem.
*/
const COPY_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;uniform sampler2D uT;uniform vec4 uRect;uniform float uScale;
void main(){
  vec2 p=(gl_FragCoord.xy-uRect.xy)/uRect.zw;
  gl_FragColor=vec4(texture2D(uT,p).r*uScale,0.,0.,1.);
}
`;

export class Poisson {
  readonly atlas: THREE.WebGLRenderTarget;
  private copy: THREE.ShaderMaterial;
  private cScene: THREE.Scene;

  constructor(private r: THREE.WebGLRenderer) {
    const S = TILE * ATLAS_TILES;
    this.atlas = new THREE.WebGLRenderTarget(S, S, { type: THREE.FloatType, depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    r.setRenderTarget(this.atlas);
    r.setClearColor(0x000000, 0);
    r.clear();
    r.setRenderTarget(null);
    this.copy = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: COPY_FS,
      uniforms: { uT: { value: null }, uRect: { value: new THREE.Vector4() }, uScale: { value: 1 } },
      depthTest: false,
    });
    this.cScene = quad(this.copy);
  }

  /** Resolve o relevo para um desenho (canvas em tons de cinza) e grava no ladrilho. */
  solve(canvas: HTMLCanvasElement, tile: number, n = TILE, round = true) {
    const r = this.r;
    const ctx = canvas.getContext('2d')!;
    // reduz para n×n se preciso
    let src = canvas;
    if (n !== canvas.width) {
      src = document.createElement('canvas');
      src.width = src.height = n;
      src.getContext('2d')!.drawImage(canvas, 0, 0, n, n);
    }
    const px = (n === canvas.width ? ctx : src.getContext('2d')!).getImageData(0, 0, n, n).data;
    // só a pegada conta: fora dela o lado direito é zero (o relevo se acomoda sozinho)
    const M = LIGHT_MARGIN_POISSON;
    const inside = (x: number, y: number) => {
      const u = ((x + 0.5) / n) * 2 - 1,
        v = ((y + 0.5) / n) * 2 - 1;
      return round ? u * u + v * v < M * M : Math.abs(u) < M && Math.abs(v) < M;
    };
    const f = new Float32Array(n * n);
    let mean = 0,
      cnt = 0;
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++)
        if (inside(x, y)) {
          mean += 0.22 + 0.78 * (px[((n - 1 - y) * n + x) * 4] / 255);
          cnt++;
        }
    mean /= Math.max(1, cnt);
    // textura com y para cima: a linha 0 da textura é a última do canvas; fundo levemente aceso
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) f[y * n + x] = inside(x, y) ? 0.22 + 0.78 * (px[((n - 1 - y) * n + x) * 4] / 255) - mean : 0;
    const h = poissonDCT(f, n);
    // escala para unidades de 256 px (o resto do motor assume TILE)
    const s = (TILE / n) ** 2;
    const data = new Float32Array(n * n * 4);
    for (let i = 0; i < n * n; i++) data[i * 4] = h[i] * s;
    const tex = new THREE.DataTexture(data, n, n, THREE.RGBAFormat, THREE.FloatType);
    tex.minFilter = tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;

    const tx = tile % ATLAS_TILES,
      ty = Math.floor(tile / ATLAS_TILES);
    this.copy.uniforms.uT.value = tex;
    this.copy.uniforms.uRect.value.set(tx * TILE, ty * TILE, TILE, TILE);
    this.copy.uniforms.uScale.value = 1;
    const A = this.atlas;
    const prevAC = r.autoClear;
    A.viewport.set(tx * TILE, ty * TILE, TILE, TILE);
    A.scissor.set(tx * TILE, ty * TILE, TILE, TILE);
    A.scissorTest = true;
    r.autoClear = false;
    r.setRenderTarget(A);
    r.render(this.cScene, ortho);
    A.viewport.set(0, 0, A.width, A.height);
    A.scissor.set(0, 0, A.width, A.height);
    A.scissorTest = false;
    r.setRenderTarget(null);
    r.autoClear = prevAC;
    tex.dispose();
  }
}

/*
  Poisson exato com contorno de Dirichlet (relevo zero na borda) via DST-I separável:
  h = IDST( DST(f) / (2cos(π(k+1)/(n+1)) + 2cos(π(l+1)/(n+1)) - 4) ).
  Borda zero = o vidro não tem degrau e a luz não sai em moldura.
*/
const sinCache = new Map<number, Float32Array>();
function sinTable(n: number) {
  let t = sinCache.get(n);
  if (!t) {
    t = new Float32Array(n * n);
    for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) t[k * n + i] = Math.sin((Math.PI * (i + 1) * (k + 1)) / (n + 1));
    sinCache.set(n, t);
  }
  return t;
}
function dstRows(a: Float32Array, n: number, scale: number) {
  const S = sinTable(n);
  const out = new Float32Array(n);
  for (let y = 0; y < n; y++) {
    const o = y * n;
    for (let k = 0; k < n; k++) {
      let s = 0;
      const ck = k * n;
      for (let i = 0; i < n; i++) s += a[o + i] * S[ck + i];
      out[k] = s * scale;
    }
    a.set(out, o);
  }
}
function transpose(a: Float32Array, n: number) {
  for (let y = 0; y < n; y++)
    for (let x = y + 1; x < n; x++) {
      const t = a[y * n + x];
      a[y * n + x] = a[x * n + y];
      a[x * n + y] = t;
    }
}
export function poissonDCT(f: Float32Array, n: number) {
  const a = Float32Array.from(f);
  dstRows(a, n, 1);
  transpose(a, n);
  dstRows(a, n, 1);
  for (let l = 0; l < n; l++)
    for (let k = 0; k < n; k++) {
      const d = 2 * Math.cos((Math.PI * (k + 1)) / (n + 1)) + 2 * Math.cos((Math.PI * (l + 1)) / (n + 1)) - 4;
      a[l * n + k] /= d;
    }
  const inv = 2 / (n + 1);
  dstRows(a, n, inv);
  transpose(a, n);
  dstRows(a, n, inv);
  // laplaciano(h) = f -> queremos laplaciano(h) = -(img - média): troca o sinal
  for (let i = 0; i < n * n; i++) a[i] = -a[i];
  return a;
}

/*
  LightAtlas: a imagem que cada vidro forma é estática em relação ao próprio vidro,
  então é calculada uma vez, em alta resolução, num ladrilho só dela. O chão só
  lê o ladrilho embaixo de cada peça. Nada disso custa por quadro.
*/
export const LIGHT_MARGIN = 1.3; // o ladrilho cobre 1.3× a pegada, para a luz desviada para fora

export interface LightSpec {
  /** ladrilho de relevo (Poisson); -1 = vidro liso */
  tile: number;
  round: number;
  contrast: number;
  bevel: number;
  ramp: number;
}

const BAKE_H_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uAtlas;uniform float uTile;uniform float uRound;uniform float uAmp;uniform float uBevel;uniform float uRamp;
void main(){
  vec2 l=(vUv*2.-1.)*${LIGHT_MARGIN.toFixed(2)};
  float edge=uRound>.5?1.-length(l):min(1.-abs(l.x),1.-abs(l.y));
  float inside=smoothstep(0.,.015,edge);
  float img=0.;
  if(uTile>=0.){
    vec2 t=vec2(mod(uTile,${ATLAS_TILES}.),floor(uTile/${ATLAS_TILES}.));
    vec2 q=l*.5+.5;float fade=step(0.,q.x)*step(q.x,1.)*step(0.,q.y)*step(q.y,1.);
    img=texture2D(uAtlas,(t+clamp(q,.002,.998))/${ATLAS_TILES}.).r*fade;
  }
  float bev=uBevel*smoothstep(0.,.05,edge)*(1.-smoothstep(.05,.13,edge));
  gl_FragColor=vec4(img*uAmp+(bev+uRamp*l.x)*inside,0.,0.,1.);
}
`;

const BAKE_C_VS = /* glsl */ `
precision highp float;
uniform sampler2D uHeight;uniform float uK;uniform float uTexel;
varying vec2 vA;varying vec2 vB;
void main(){
  vec2 uv=position.xy;
  float hl=texture2D(uHeight,uv-vec2(uTexel,0.)).r,hr=texture2D(uHeight,uv+vec2(uTexel,0.)).r;
  float hd=texture2D(uHeight,uv-vec2(0.,uTexel)).r,hu=texture2D(uHeight,uv+vec2(0.,uTexel)).r;
  // gradiente em unidades normalizadas (pegada = -1..1, ladrilho = 2·margem)
  vec2 grad=vec2(hr-hl,hu-hd)/(2.*uTexel*2.*${LIGHT_MARGIN.toFixed(2)});
  vec2 n=uv+grad*uK/(2.*${LIGHT_MARGIN.toFixed(2)});
  vA=uv;vB=n;
  gl_Position=vec4(n*2.-1.,0.,1.);
}
`;

export class LightAtlas {
  readonly rt: THREE.WebGLRenderTarget;
  readonly res: number;
  private count = 0;
  constructor(
    private r: THREE.WebGLRenderer,
    private heights: THREE.Texture,
    res: number,
    private grid: number,
    private dispersion: boolean,
  ) {
    this.res = res;
    this.rt = new THREE.WebGLRenderTarget(res * ATLAS_TILES, res * ATLAS_TILES, {
      type: THREE.HalfFloatType,
      depthBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    r.setRenderTarget(this.rt);
    r.setClearColor(0x000000, 0);
    r.clear();
    r.setRenderTarget(null);
  }

  /** Amplitude normalizada para um contraste desejado (K = 1, 256 px cobrem 2 unidades). */
  static amp(contrast: number) {
    const ppu = TILE / 2;
    return contrast / (ppu * ppu);
  }

  bake(spec: LightSpec): number {
    const slot = this.count++;
    const r = this.r;
    const hr = this.res;
    const H = new THREE.WebGLRenderTarget(hr, hr, { type: THREE.FloatType, depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    const hm = new THREE.ShaderMaterial({
      vertexShader: QUAD_VS,
      fragmentShader: BAKE_H_FS,
      uniforms: {
        uAtlas: { value: this.heights },
        uTile: { value: spec.tile },
        uRound: { value: spec.round },
        uAmp: { value: LightAtlas.amp(spec.contrast) },
        uBevel: { value: spec.bevel },
        uRamp: { value: spec.ramp },
      },
      depthTest: false,
    });
    const prevAC = r.autoClear;
    r.autoClear = true;
    r.setRenderTarget(H);
    r.render(quad(hm), ortho);

    const g = new THREE.PlaneGeometry(1, 1, this.grid, this.grid);
    g.translate(0.5, 0.5, 0);
    const scene = new THREE.Scene();
    const ch: [number, number, number, number][] = this.dispersion
      ? [
          [1, 0, 0, 1.06],
          [0, 1, 0, 1],
          [0, 0, 1, 0.94],
        ]
      : [[1, 1, 1, 1]];
    const mats: THREE.Material[] = [hm];
    for (const [cr, cg, cb, kf] of ch) {
      const m = new THREE.ShaderMaterial({
        vertexShader: BAKE_C_VS,
        fragmentShader: CAUSTIC_FS,
        uniforms: { uHeight: { value: H.texture }, uK: { value: kf }, uTexel: { value: 1 / hr }, uColor: { value: new THREE.Vector3(cr, cg, cb) } },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });
      mats.push(m);
      const mesh = new THREE.Mesh(g, m);
      mesh.frustumCulled = false;
      scene.add(mesh);
    }
    const tx = slot % ATLAS_TILES,
      ty = Math.floor(slot / ATLAS_TILES);
    const A = this.rt;
    A.viewport.set(tx * hr, ty * hr, hr, hr);
    A.scissor.set(tx * hr, ty * hr, hr, hr);
    A.scissorTest = true;
    r.autoClear = false;
    r.setRenderTarget(A);
    r.render(scene, ortho);
    A.viewport.set(0, 0, A.width, A.height);
    A.scissor.set(0, 0, A.width, A.height);
    A.scissorTest = false;
    r.setRenderTarget(null);
    r.autoClear = prevAC;
    H.dispose();
    g.dispose();
    mats.forEach((m) => m.dispose());
    return slot;
  }
}
