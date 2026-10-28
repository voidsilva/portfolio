import * as THREE from 'three';

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;


// Ambiente 3D do site inteiro: ~12 mil partículas que mudam de forma a cada seção.
//  0 caos · 1 painel de voxels (topo) · 2 túnel de dados (abordagem)
//  3 tela que desenha a captura do projeto (projetos) · 4 camadas do sistema (serviços)
// Um único THREE.Points com todas as formas em atributos; a troca é feita no shader.

export const COUNT = 12000;

const vert = /* glsl */ `
uniform float uTime;
uniform float uFrom;
uniform float uTo;
uniform float uMix;
uniform float uFront;
uniform float uTurb;
uniform vec3 uMouse;
uniform vec4 uShock;
uniform float uPx;
uniform float uShow;
uniform float uPMix;
uniform float uProjA;
uniform float uProjB;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec4 aSeed;
attribute float aKind;
attribute float aKind4;
attribute vec3 aC0;
attribute vec3 aC1;
attribute vec3 aC2;
uniform vec3 uInk;
uniform vec3 uChaos;
uniform vec3 uAccent;
uniform vec3 uGlow;
varying vec3 vCol;
varying float vSq;
varying float vA;
${noise}

vec3 chaos(){
  vec3 c=aSeed.xyz*vec3(3.6,2.5,2.6);
  float t=uTime*0.12;
  return c+vec3(snoise(c*0.35+vec3(t,0.0,0.0)),snoise(c*0.35+vec3(0.0,t+17.0,0.0)),snoise(c*0.35+vec3(0.0,0.0,t+31.0)))*(1.1+uTurb);
}
vec3 projCol(float i){
  return i<0.5?aC0:(i<1.5?aC1:aC2);
}
// posição, cor e "quadradice" (0 = ponto redondo, 1 = voxel) de cada forma
void shape(float s,vec3 c,out vec3 p,out vec3 col,out float sq){
  if(s<0.5){
    p=c; col=uChaos; sq=0.0;
  } else if(s<1.5){
    float lag=aSeed.w*0.9;
    float k=smoothstep(lag,lag+0.6,uFront-aP1.x-aP1.z*0.35);
    p=mix(c,aP1,k);
    vec3 ord=aKind>1.5?uAccent:(aKind>0.5?mix(uInk,uAccent,0.35):uInk);
    float edge=1.0-smoothstep(0.0,0.35,abs(uFront-aP1.x-aP1.z*0.35-lag-0.3));
    col=mix(mix(uChaos,ord,k),uGlow,edge*k);
    sq=k;
  } else if(s<2.5){
    // túnel: os anéis correm na direção da câmera
    vec3 q=aP2;
    q.z=mod(q.z+uTime*0.9+6.0,10.0)-6.0;
    p=q;
    float d=smoothstep(-6.0,3.0,q.z);
    col=mix(uChaos,mix(uAccent,uGlow,aSeed.w),d);
    sq=0.0;
  } else if(s<3.5){
    p=aP3;
    vec3 a=projCol(uProjA);
    vec3 b=projCol(uProjB);
    float m=smoothstep(aSeed.w*0.6,aSeed.w*0.6+0.4,uPMix);
    col=mix(a,b,m);
    p.z+=sin(m*3.14159)*0.6*(aSeed.x);
    sq=1.0;
  } else {
    p=aP4;
    col=aKind4>2.5?uGlow:(aKind4>1.5?uAccent:(aKind4>0.5?mix(uInk,uAccent,0.4):uInk));
    p.y+=sin(uTime*0.8+aKind4*1.3)*0.05;
    sq=1.0;
  }
}

void main(){
  vec3 c=chaos();
  vec3 pa; vec3 ca; float sa;
  vec3 pb; vec3 cb; float sb;
  shape(uFrom,c,pa,ca,sa);
  shape(uTo,c,pb,cb,sb);
  float lag=aSeed.w*0.45;
  float m=smoothstep(lag,lag+0.55,uMix);
  vec3 p=mix(pa,pb,m);
  // no meio da troca as partículas fazem um redemoinho
  float mid=sin(m*3.14159);
  p+=vec3(snoise(c*0.6+uTime*0.3),snoise(c*0.6-uTime*0.3+9.0),snoise(c*0.6+21.0))*mid*0.9;
  vec3 col=mix(ca,cb,m);
  float sq=mix(sa,sb,m);

  // mouse: empurra as partículas para fora, como um campo de força
  vec2 dv=p.xy-uMouse.xy;
  float dd=length(dv);
  float push=(1.0-smoothstep(0.0,1.1,dd));
  p.xy+=normalize(dv+1e-4)*push*0.55;
  p.z+=push*0.4;

  // onda de choque do clique
  float age=uTime-uShock.w;
  float ring=abs(distance(p.xy,uShock.xy)-age*4.0);
  float shock=(1.0-smoothstep(0.0,0.7,ring))*(1.0-smoothstep(0.0,1.6,age))*step(0.0,age);
  p+=normalize(vec3(p.xy-uShock.xy,0.3)+1e-4)*shock*0.5;
  col=mix(col,uGlow,max(shock,push*0.6));

  vCol=col;
  vSq=sq;
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  float s=mix(1.6+aSeed.w*1.6,2.9,sq)+shock*2.0+push*1.2;
  // quando a captura nítida aparece, os pontos da tela se recolhem
  float onScreen=step(2.5,uTo)*step(uTo,3.5)*m;
  gl_PointSize=s*uPx*(7.0/-mv.z)*(1.0-uShow*onScreen*0.85);
}`;

const frag = /* glsl */ `
uniform float uAlpha;
varying vec3 vCol;
varying float vSq;
void main(){
  vec2 q=gl_PointCoord-0.5;
  float round=1.0-smoothstep(0.25,0.5,length(q));
  float square=1.0-smoothstep(0.42,0.5,max(abs(q.x),abs(q.y)));
  float a=mix(round*0.75,square,vSq)*uAlpha;
  if(a<0.02) discard;
  gl_FragColor=vec4(vCol,a);
}`;

/** Preenche um array de COUNT posições repetindo as que sobrarem. */
function fill(list: number[]) {
  const out = new Float32Array(COUNT * 3);
  const n = list.length / 3;
  for (let i = 0; i < COUNT; i++) {
    const j = i < n ? i : (Math.random() * n) | 0;
    out[i * 3] = list[j * 3];
    out[i * 3 + 1] = list[j * 3 + 1];
    out[i * 3 + 2] = list[j * 3 + 2];
  }
  return out;
}

function dashboard() {
  const pos: number[] = [];
  const kind: number[] = [];
  const sp = 0.075;
  const N = 64;
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      if ((i + j) % 2 && (i < 3 || j < 3 || i > N - 4 || j > N - 4)) continue;
      pos.push((i - N / 2) * sp, -1.2, (j - N / 2) * sp);
      kind.push(0);
    }
  [12, 20, 15, 27, 22, 33, 26, 40].forEach((h, b) => {
    const bx = (-3.5 + b) * 0.52;
    for (let y = 0; y < h; y++)
      for (let i = 0; i < 5; i++)
        for (let j = 0; j < 5; j++) {
          if (!(i === 0 || j === 0 || i === 4 || j === 4 || y === h - 1)) continue;
          pos.push(bx + (i - 2) * sp, -1.2 + (y + 1) * sp, 0.7 + (j - 2) * sp);
          kind.push(y >= h - 2 ? 2 : 1);
        }
  });
  for (let i = 0; i < 520; i++) {
    const t = i / 519;
    pos.push(-2.2 + t * 4.4, 0.15 + t * 0.95 + Math.sin(t * 9) * 0.14, -0.9 + (i % 3) * 0.03);
    kind.push(2);
  }
  const k = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) k[i] = i < kind.length ? kind[i] : 0;
  return { p: fill(pos), kind: k, n: kind.length };
}

function tunnel() {
  const pos: number[] = [];
  const rings = 64;
  const per = 180;
  for (let r = 0; r < rings; r++)
    for (let i = 0; i < per; i++) {
      const a = (i / per) * Math.PI * 2;
      // anéis quadrados arredondados, como um corredor de dados
      const R = 1.7;
      const x = Math.cos(a);
      const y = Math.sin(a);
      const sq = Math.pow(Math.pow(Math.abs(x), 4) + Math.pow(Math.abs(y), 4), 0.25);
      pos.push((x / sq) * R, (y / sq) * R * 0.8, -6 + (r / rings) * 10);
    }
  return fill(pos);
}

function screen() {
  const pos: number[] = [];
  const W = 96;
  const H = 60;
  const sp = 0.048;
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const x = (i - W / 2) * sp;
      // tela levemente curva
      pos.push(x, (H / 2 - j) * sp, -x * x * 0.06);
    }
  return { p: fill(pos), W, H };
}

function stack() {
  const pos: number[] = [];
  const kind: number[] = [];
  const sp = 0.09;
  const layers = [
    { y: -1.3, n: 34, k: 0 },
    { y: -0.45, n: 30, k: 1 },
    { y: 0.4, n: 26, k: 2 },
    { y: 1.25, n: 22, k: 3 },
  ];
  layers.forEach((L) => {
    for (let i = 0; i < L.n; i++)
      for (let j = 0; j < L.n; j++) {
        const edge = i === 0 || j === 0 || i === L.n - 1 || j === L.n - 1;
        if (!edge && (i + j) % 2) continue;
        pos.push((i - L.n / 2) * sp, L.y, (j - L.n / 2) * sp);
        kind.push(L.k);
      }
  });
  // feixes ligando as camadas
  for (let b = 0; b < 4; b++)
    for (let t = 0; t < 60; t++) {
      const a = (b / 4) * Math.PI * 2 + 0.6;
      pos.push(Math.cos(a) * 0.6, -1.3 + (t / 59) * 2.55, Math.sin(a) * 0.6);
      kind.push(3);
    }
  const k = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) k[i] = i < kind.length ? kind[i] : kind[(Math.random() * kind.length) | 0];
  return { p: fill(pos), kind: k, n: kind.length };
}

/* ---------- o lugar: galpão de dados com piso em grade, pilares e poeira ---------- */
const floorVert = /* glsl */ `
varying vec3 vW;
void main(){
  vec4 w=modelMatrix*vec4(position,1.0);
  vW=w.xyz;
  gl_Position=projectionMatrix*viewMatrix*w;
}`;
const floorFrag = /* glsl */ `
uniform vec3 uLine;
uniform vec3 uFog;
uniform vec3 uCam;
uniform float uTime;
varying vec3 vW;
float grid(vec2 p,float s){
  vec2 g=abs(fract(p/s-0.5)-0.5)/fwidth(p/s);
  return 1.0-min(min(g.x,g.y),1.0);
}
void main(){
  float d=distance(vW.xz,uCam.xz);
  float g=grid(vW.xz,1.0)*0.55+grid(vW.xz,5.0)*0.6;
  // um pulso de luz corre pelo piso, no sentido da caminhada
  float pulse=smoothstep(0.0,0.6,1.0-abs(fract(vW.z*0.02+uTime*0.08)-0.5)*2.0)*0.5;
  float fade=1.0-smoothstep(6.0,46.0,d);
  float a=clamp(g*(0.55+pulse),0.0,1.0)*fade;
  gl_FragColor=vec4(mix(uFog,uLine,a),a*0.9);
}`;

function buildHall(scene: THREE.Scene) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.ShaderMaterial({
      vertexShader: floorVert,
      fragmentShader: floorFrag,
      transparent: true,
      depthWrite: false,
      uniforms: { uLine: { value: new THREE.Color() }, uFog: { value: new THREE.Color() }, uCam: { value: new THREE.Vector3() }, uTime: { value: 0 } },
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -3.2, -100);
  scene.add(floor);

  // pilares ao longo do caminho, como racks de servidor num galpão escuro
  const n = 46;
  const pillars = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, fog: true }), n);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1;
    const h = 3 + Math.random() * 9;
    const w = 0.15 + Math.random() * 0.5;
    m.compose(
      new THREE.Vector3(side * (11 + Math.random() * 12), -3.2 + h / 2, -4 - (i / n) * 190 - Math.random() * 4),
      new THREE.Quaternion(),
      new THREE.Vector3(w, h, w),
    );
    pillars.setMatrixAt(i, m);
  }
  scene.add(pillars);

  // linhas de luz finas no topo de alguns pilares
  const glow = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, fog: true }), n);
  for (let i = 0; i < n; i++) {
    pillars.getMatrixAt(i, m);
    const p = new THREE.Vector3();
    const q = new THREE.Quaternion();
    const sc = new THREE.Vector3();
    m.decompose(p, q, sc);
    m.compose(new THREE.Vector3(p.x, p.y + sc.y / 2 + 0.02, p.z), q, new THREE.Vector3(sc.x * 1.02, 0.05, sc.z * 1.02));
    glow.setMatrixAt(i, m);
  }
  scene.add(glow);

  // poeira suspensa no ar
  const dn = 1600;
  const dp = new Float32Array(dn * 3);
  for (let i = 0; i < dn; i++) dp.set([(Math.random() - 0.5) * 40, -3 + Math.random() * 12, 10 - Math.random() * 200], i * 3);
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.7, fog: true, depthWrite: false }));
  scene.add(dust);

  return { floor, pillars, glow, dust };
}

export interface Pose {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  s: number;
  a: number;
}

export class World {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  private group = new THREE.Group();
  private rig = new THREE.Group();
  private hall: ReturnType<typeof buildHall>;
  private travel = 0;
  private travelTo = 0;
  private mat: THREE.ShaderMaterial;
  private geo = new THREE.BufferGeometry();
  private raf = 0;
  private clock = new THREE.Clock();
  private target = { x: 0, y: 0 };
  private mouse = new THREE.Vector3(99, 99, 0);
  private mouseTo = new THREE.Vector3(99, 99, 0);
  private ray = new THREE.Raycaster();
  private vel = 0;
  private front = -6;
  private frontTo = -6;
  private speed = 12 / 3.2;
  private stage = 0;
  private screenStage: { W: number; H: number };
  /** pose atual do grupo (posição, giro, escala e opacidade), animada pelo App */
  pose: Pose = { x: 0, y: 0, z: -2, rx: 0, ry: 0, s: 1.3, a: 0.4 };
  private project = 0;
  private screenMesh!: THREE.Mesh;
  private show = 0;
  private showTo = 0;
  private pendingProject = -1;

  constructor(canvas: HTMLCanvasElement, dark: boolean) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    const dpr = Math.min(devicePixelRatio, 1.5);
    this.renderer.setPixelRatio(dpr);
    this.camera.position.set(0, 0, 13);
    this.scene.add(this.rig);
    this.rig.add(this.camera);
    this.hall = buildHall(this.scene);
    this.scene.fog = new THREE.Fog(0xffffff, 14, 60);

    const d = dashboard();
    const t = tunnel();
    const sc = screen();
    this.screenStage = sc;
    const st = stack();
    const seed = new Float32Array(COUNT * 4);
    for (let i = 0; i < COUNT; i++) {
      let x, y, z;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);
      seed.set([x, y, z, Math.random()], i * 4);
    }
    this.geo.setAttribute('position', new THREE.BufferAttribute(d.p, 3));
    this.geo.setAttribute('aP1', new THREE.BufferAttribute(d.p, 3));
    this.geo.setAttribute('aP2', new THREE.BufferAttribute(t, 3));
    this.geo.setAttribute('aP3', new THREE.BufferAttribute(sc.p, 3));
    this.geo.setAttribute('aP4', new THREE.BufferAttribute(st.p, 3));
    this.geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    this.geo.setAttribute('aKind', new THREE.BufferAttribute(d.kind, 1));
    this.geo.setAttribute('aKind4', new THREE.BufferAttribute(st.kind, 1));
    const gray = new Float32Array(COUNT * 3).fill(0.5);
    this.geo.setAttribute('aC0', new THREE.BufferAttribute(gray.slice(), 3));
    this.geo.setAttribute('aC1', new THREE.BufferAttribute(gray.slice(), 3));
    this.geo.setAttribute('aC2', new THREE.BufferAttribute(gray.slice(), 3));
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    this.mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uFrom: { value: 0 },
        uTo: { value: 0 },
        uMix: { value: 1 },
        uFront: { value: this.front },
        uTurb: { value: 0 },
        uMouse: { value: this.mouse },
        uShock: { value: new THREE.Vector4(0, 0, 0, -99) },
        uPx: { value: dpr * (innerWidth < 820 ? 1.3 : 1.6) },
        uPMix: { value: 1 },
        uProjA: { value: 0 },
        uProjB: { value: 0 },
        uAlpha: { value: 1 },
        uShow: { value: 0 },
        uInk: { value: new THREE.Color() },
        uChaos: { value: new THREE.Color() },
        uAccent: { value: new THREE.Color() },
        uGlow: { value: new THREE.Color() },
      },
    });
    this.group.add(new THREE.Points(this.geo, this.mat));
    this.screenMesh = this.buildScreen(sc.W * 0.048, sc.H * 0.048);
    this.group.add(this.screenMesh);
    this.rig.add(this.group);
    this.setTheme(dark);
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerdown', this.click);
    this.loop();
  }

  /** Lê as capturas dos projetos e guarda a cor de cada ponto da tela. */
  loadProjects(images: string[]) {
    const { W, H } = this.screenStage;
    const cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext('2d', { willReadFrequently: true })!;
    images.slice(0, 3).forEach((src, k) => {
      const img = new Image();
      img.onload = () => {
        // recorte do topo à esquerda (onde fica a interface), na proporção da tela
        const sw = img.width;
        const sh = Math.min(img.height, (sw * H) / W);
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0, sw, sh, 0, 0, W, H);
        const px = ctx.getImageData(0, 0, W, H).data;
        const attr = this.geo.getAttribute(`aC${k}`) as THREE.BufferAttribute;
        const arr = attr.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          const j = i < W * H ? i : (Math.random() * W * H) | 0;
          // reforça o contraste para a captura ler bem em pontos
          // reforça contraste e saturação para a captura ler bem em pontos
          const r = px[j * 4] / 255;
          const g = px[j * 4 + 1] / 255;
          const bl = px[j * 4 + 2] / 255;
          const l = (r + g + bl) / 3;
          const sat = (v: number) => Math.min(1, Math.max(0, l + (v - l) * 1.6) * 1.1);
          arr[i * 3] = sat(r);
          arr[i * 3 + 1] = sat(g);
          arr[i * 3 + 2] = sat(bl);
        }
        attr.needsUpdate = true;
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        const su = (this.screenMesh.material as THREE.ShaderMaterial).uniforms;
        su[`uT${k}`].value = tex;
        // fração da altura da imagem usada no recorte
        su.uCrop.value.setComponent(k, sh / img.height);
      };
      img.src = src;
    });
  }

  /** Caminhada pelo galpão: 0 no topo da página, 1 no fim. */
  setTravel(p: number) {
    this.travelTo = p;
  }

  setTheme(dark: boolean) {
    const bg = new THREE.Color(dark ? '#08090d' : '#f1ecfb');
    (this.scene.fog as THREE.Fog).color.copy(bg);
    const fu = (this.hall.floor.material as THREE.ShaderMaterial).uniforms;
    fu.uFog.value.copy(bg);
    fu.uLine.value.set(dark ? '#3a3360' : '#b9a8ee');
    (this.hall.pillars.material as THREE.MeshBasicMaterial).color.set(dark ? '#121521' : '#e7e0f8');
    (this.hall.glow.material as THREE.MeshBasicMaterial).color.set(dark ? '#55d6ff' : '#8b5cf6');
    (this.hall.dust.material as THREE.PointsMaterial).color.set(dark ? '#a78bfa' : '#7c4dff');
    const u = this.mat.uniforms;
    u.uInk.value.set(dark ? '#e9e6f5' : '#14102a');
    u.uChaos.value.set(dark ? '#8b5cf6' : '#8b6cf7');
    u.uAccent.value.set(dark ? '#a78bfa' : '#7c4dff');
    u.uGlow.value.set(dark ? '#55d6ff' : '#22b8e0');
  }

  setVelocity(v: number) {
    this.vel = Math.min(1, Math.abs(v) / 40);
  }

  /** Muda para outra forma. O App anima `morph` de 0 a 1. */
  goTo(stage: number) {
    if (stage === this.stage && this.mat.uniforms.uMix.value >= 1) return null;
    const u = this.mat.uniforms;
    u.uFrom.value = u.uMix.value >= 0.5 ? this.stage : u.uFrom.value;
    u.uTo.value = stage;
    u.uMix.value = 0;
    this.stage = stage;
    if (stage === 1 && this.front < 6) this.build();
    return u.uMix;
  }

  setProject(i: number) {
    if (i === this.project) return null;
    const u = this.mat.uniforms;
    u.uProjA.value = this.project;
    u.uProjB.value = i;
    u.uPMix.value = 0;
    this.project = i;
    // a captura nítida se desfaz em pixels e volta já com o projeto novo
    this.pendingProject = i;
    this.showTo = 0;
    return u.uPMix;
  }

  /** Tela com a captura nítida, revelada por blocos (pixelado → nítido). */
  private buildScreen(w: number, h: number) {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uT0: { value: null },
        uT1: { value: null },
        uT2: { value: null },
        uIdx: { value: 0 },
        uCrop: { value: new THREE.Vector3(1, 1, 1) },
        uShow: { value: 0 },
        uRes: { value: new THREE.Vector2(96, 60) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){
          vUv=uv;
          vec3 p=position;
          p.z=-p.x*p.x*0.06;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uT0; uniform sampler2D uT1; uniform sampler2D uT2;
        uniform float uIdx; uniform vec3 uCrop; uniform float uShow; uniform vec2 uRes;
        varying vec2 vUv;
        float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
        void main(){
          // blocos grandes viram pixels pequenos conforme a tela "carrega"
          float cells=mix(12.0,240.0,uShow*uShow);
          vec2 g=floor(vUv*vec2(cells,cells*0.625))/vec2(cells,cells*0.625);
          vec2 uv=mix(g,vUv,step(0.98,uShow));
          float crop=uIdx<0.5?uCrop.x:(uIdx<1.5?uCrop.y:uCrop.z);
          vec2 tuv=vec2(uv.x,1.0-(1.0-uv.y)*crop);
          vec4 c=uIdx<0.5?texture2D(uT0,tuv):(uIdx<1.5?texture2D(uT1,tuv):texture2D(uT2,tuv));
          float cell=h(floor(vUv*vec2(24.0,15.0)));
          float a=smoothstep(cell-0.15,cell,uShow*1.15);
          // moldura fina
          vec2 e=min(vUv,1.0-vUv);
          float rim=1.0-smoothstep(0.0,0.006,min(e.x,e.y*1.6));
          gl_FragColor=vec4(mix(c.rgb,vec3(0.55,0.4,1.0),rim),a*0.97);
        }`,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 24, 1), mat);
    mesh.renderOrder = 2;
    return mesh;
  }

  build(duration = 3.2) {
    this.front = -6;
    this.frontTo = 6;
    this.speed = 12 / duration;
  }

  private resize = () => {
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  };

  private toLocal(cx: number, cy: number) {
    const nx = (cx / innerWidth) * 2 - 1;
    const ny = -(cy / innerHeight) * 2 + 1;
    this.ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    // plano que passa pelo centro do grupo, virado para a câmera
    const gp = this.group.getWorldPosition(new THREE.Vector3());
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -gp.z);
    const hit = new THREE.Vector3();
    if (!this.ray.ray.intersectPlane(plane, hit)) return null;
    return this.group.worldToLocal(hit);
  }

  private move = (e: PointerEvent) => {
    this.target.x = (e.clientX / innerWidth) * 2 - 1;
    this.target.y = (e.clientY / innerHeight) * 2 - 1;
    const p = this.toLocal(e.clientX, e.clientY);
    if (p) this.mouseTo.copy(p);
  };

  private click = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('a, button, summary, .menu, .panel, input')) return;
    const p = this.toLocal(e.clientX, e.clientY);
    if (!p) return;
    this.mat.uniforms.uShock.value.set(p.x, p.y, p.z, this.mat.uniforms.uTime.value);
  };

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (document.hidden) return;
    const u = this.mat.uniforms;
    u.uTime.value += dt * (1 + this.vel * 2);
    u.uTurb.value += (this.vel * 1.5 - u.uTurb.value) * 0.08;
    this.vel *= 0.94;
    if (this.front < this.frontTo) this.front = Math.min(this.frontTo, this.front + dt * this.speed);
    u.uFront.value = this.front;
    this.mouse.lerp(this.mouseTo, 0.15);
    const g = this.group;
    const P = this.pose;
    g.position.set(P.x, P.y, P.z);
    g.scale.setScalar(P.s);
    g.rotation.x += (P.rx + this.target.y * 0.12 - g.rotation.x) * 0.06;
    g.rotation.y += (P.ry + this.target.x * 0.25 - g.rotation.y) * 0.06;
    u.uAlpha.value = P.a;
    // captura nítida: aparece quando a forma "tela" termina de montar
    const onScreen = u.uTo.value === 3 && u.uMix.value > 0.92;
    if (this.pendingProject >= 0 && this.show < 0.04) {
      (this.screenMesh.material as THREE.ShaderMaterial).uniforms.uIdx.value = this.pendingProject;
      this.pendingProject = -1;
    }
    if (this.pendingProject < 0) this.showTo = onScreen ? 1 : 0;
    this.show += (this.showTo - this.show) * (this.showTo > this.show ? 0.035 : 0.12);
    u.uShow.value = this.show;
    (this.screenMesh.material as THREE.ShaderMaterial).uniforms.uShow.value = this.show;
    this.screenMesh.visible = this.show > 0.01;
    // a câmera (com as partículas) caminha pelo galpão; o olhar segue o mouse
    this.travel += (this.travelTo - this.travel) * 0.06;
    this.rig.position.set(Math.sin(this.travel * 9) * 1.2, 0, -this.travel * 150);
    this.camera.rotation.y += (-this.target.x * 0.05 - this.camera.rotation.y) * 0.05;
    this.camera.rotation.x += (-this.target.y * 0.03 - this.camera.rotation.x) * 0.05;
    const fu = (this.hall.floor.material as THREE.ShaderMaterial).uniforms;
    fu.uCam.value.copy(this.rig.position);
    fu.uTime.value = u.uTime.value;
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.move);
    window.removeEventListener('pointerdown', this.click);
    this.geo.dispose();
    this.mat.dispose();
    this.screenMesh.geometry.dispose();
    (this.screenMesh.material as THREE.Material).dispose();
    Object.values(this.hall).forEach((o) => {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    });
    this.renderer.dispose();
  }
}
