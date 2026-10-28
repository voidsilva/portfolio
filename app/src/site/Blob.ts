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


// Cada partícula tem dois lugares: um no caos (deriva com ruído) e outro no "sistema",
// um painel isométrico de voxels com piso, barras e uma linha de tendência.
// Um feixe varre o painel e organiza o que passa; o mouse inverte o estado por perto;
// o clique solta uma onda de choque; o scroll desfaz o sistema.

const vert = /* glsl */ `
uniform float uTime;
uniform float uFront;
uniform float uScatter;
uniform float uTurb;
uniform vec3 uMouse;
uniform float uLens;
uniform vec4 uShock;
uniform float uPx;
attribute vec3 aOrder;
attribute vec4 aSeed;
attribute float aKind;
varying float vK;
varying float vEdge;
varying float vKind;
varying float vShock;
${noise}
void main(){
  // caos: nuvem que se move por ruído
  vec3 c=aSeed.xyz*vec3(3.4,2.4,2.6);
  float t=uTime*0.12;
  c+=vec3(snoise(c*0.35+vec3(t,0.0,0.0)),snoise(c*0.35+vec3(0.0,t+17.0,0.0)),snoise(c*0.35+vec3(0.0,0.0,t+31.0)))*(1.1+uTurb);

  // feixe: organiza da esquerda para a direita, cada partícula com um pequeno atraso
  float lag=aSeed.w*0.9;
  float k=smoothstep(lag,lag+0.6,uFront-aOrder.x-aOrder.z*0.35);

  // lente do mouse: perto do cursor o estado se inverte
  vec3 base=mix(c,aOrder,k);
  float d=distance(base.xy,uMouse.xy);
  float lens=(1.0-smoothstep(0.0,1.15,d))*uLens;
  k=mix(k,1.0-k,lens);

  // scroll desmancha o sistema (com atraso por partícula)
  k*=1.0-smoothstep(aSeed.w*0.5,aSeed.w*0.5+0.5,uScatter);

  // onda de choque: anel que expande a partir do clique
  float age=uTime-uShock.w;
  float ring=abs(distance(aOrder.xz,uShock.xz)-age*4.0);
  float shock=(1.0-smoothstep(0.0,0.7,ring))*(1.0-smoothstep(0.0,1.6,age))*step(0.0,age);
  k*=1.0-shock*0.85;

  vec3 p=mix(c,aOrder,k);
  p.y+=shock*0.35;
  vK=k;
  vKind=aKind;
  vShock=shock;
  // brilho na borda do feixe
  vEdge=1.0-smoothstep(0.0,0.35,abs(uFront-aOrder.x-aOrder.z*0.35-lag-0.3));
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  float s=mix(1.6+aSeed.w*1.6,3.0,k)+vEdge*2.0*k+shock*2.0;
  gl_PointSize=s*uPx*(7.0/-mv.z);
}`;

const frag = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uChaos;
uniform vec3 uAccent;
uniform vec3 uGlow;
varying float vK;
varying float vEdge;
varying float vKind;
varying float vShock;
void main(){
  vec2 q=gl_PointCoord-0.5;
  // no caos o ponto é redondo e suave; no sistema vira um quadrado nítido (voxel)
  float round=1.0-smoothstep(0.25,0.5,length(q));
  float square=1.0-smoothstep(0.42,0.5,max(abs(q.x),abs(q.y)));
  float a=mix(round*0.75,square,vK);
  if(a<0.02) discard;
  vec3 ord=vKind>1.5?uAccent:(vKind>0.5?mix(uInk,uAccent,0.35):uInk);
  vec3 col=mix(uChaos,ord,vK);
  col=mix(col,uGlow,max(vEdge*vK,vShock));
  gl_FragColor=vec4(col,a);
}`;

/** Monta as posições do "sistema": piso, barras e linha de tendência. */
function buildOrder() {
  const order: number[] = [];
  const kind: number[] = [];
  const sp = 0.075;
  // piso: grade 64×64 (com um vão nas bordas, como um card)
  const N = 64;
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      if ((i + j) % 2 && (i < 3 || j < 3 || i > N - 4 || j > N - 4)) continue;
      order.push((i - N / 2) * sp, -1.2, (j - N / 2) * sp);
      kind.push(0);
    }
  // barras: 8 colunas de voxels
  const hs = [12, 20, 15, 27, 22, 33, 26, 40];
  hs.forEach((h, b) => {
    const bx = (-3.5 + b) * 0.52;
    for (let y = 0; y < h; y++)
      for (let i = 0; i < 5; i++)
        for (let j = 0; j < 5; j++) {
          const shell = i === 0 || j === 0 || i === 4 || j === 4 || y === h - 1;
          if (!shell) continue;
          order.push(bx + (i - 2) * sp, -1.2 + (y + 1) * sp, 0.7 + (j - 2) * sp);
          kind.push(y >= h - 2 ? 2 : 1);
        }
  });
  // linha de tendência: curva acima das barras, atrás
  for (let i = 0; i < 520; i++) {
    const t = i / 519;
    const x = -2.2 + t * 4.4;
    const y = 0.15 + t * 0.95 + Math.sin(t * 9) * 0.14;
    order.push(x, y, -0.9 + (i % 3) * 0.03);
    kind.push(2);
  }
  return { order: new Float32Array(order), kind: new Float32Array(kind) };
}

export class Blob {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  private group = new THREE.Group();
  private mat: THREE.ShaderMaterial;
  private geo = new THREE.BufferGeometry();
  private raf = 0;
  private visible = true;
  private io: IntersectionObserver;
  private clock = new THREE.Clock();
  private target = { x: 0, y: 0 };
  private mouse = new THREE.Vector3(99, 99, 0);
  private ray = new THREE.Raycaster();
  private plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private vel = 0;
  private front = -6;
  private frontTo = -6;

  constructor(private canvas: HTMLCanvasElement, dark: boolean) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    const dpr = Math.min(devicePixelRatio, 1.75);
    this.renderer.setPixelRatio(dpr);
    this.camera.position.set(0, 0.4, 13);
    this.camera.lookAt(0, 0, 0);

    const { order, kind } = buildOrder();
    const n = kind.length;
    const seed = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
      // pontos dentro de uma esfera achatada, para o caos ter forma de nuvem
      let x, y, z;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);
      seed.set([x, y, z, Math.random()], i * 4);
    }
    this.geo.setAttribute('position', new THREE.BufferAttribute(order, 3));
    this.geo.setAttribute('aOrder', new THREE.BufferAttribute(order, 3));
    this.geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    this.geo.setAttribute('aKind', new THREE.BufferAttribute(kind, 1));
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);

    this.mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uFront: { value: this.front },
        uScatter: { value: 0 },
        uTurb: { value: 0 },
        uMouse: { value: this.mouse },
        uLens: { value: 0 },
        uShock: { value: new THREE.Vector4(0, 0, 0, -99) },
        uPx: { value: dpr * (innerWidth < 820 ? 1.3 : 1.6) },
        uInk: { value: new THREE.Color() },
        uChaos: { value: new THREE.Color() },
        uAccent: { value: new THREE.Color() },
        uGlow: { value: new THREE.Color() },
      },
    });
    const pts = new THREE.Points(this.geo, this.mat);
    this.group.add(pts);
    // vista isométrica do painel
    this.group.rotation.set(0.42, -0.62, 0);
    this.scene.add(this.group);
    this.setTheme(dark);
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerdown', this.click);
    this.io = new IntersectionObserver(([e]) => (this.visible = e.isIntersecting));
    this.io.observe(canvas);
    this.loop();
  }

  setTheme(dark: boolean) {
    const u = this.mat.uniforms;
    u.uInk.value.set(dark ? '#e9e6f5' : '#14102a');
    u.uChaos.value.set(dark ? '#8b5cf6' : '#8b6cf7');
    u.uAccent.value.set(dark ? '#a78bfa' : '#7c4dff');
    u.uGlow.value.set(dark ? '#55d6ff' : '#22b8e0');
  }

  setVelocity(v: number) {
    this.vel = Math.min(1, Math.abs(v) / 40);
  }

  /** 0 = sistema montado, 1 = tudo de volta ao caos. */
  setScatter(v: number) {
    this.mat.uniforms.uScatter.value = v;
  }

  /** Reinicia a varredura do caos para o sistema. */
  build(duration = 3.2) {
    this.front = -6;
    this.frontTo = 6;
    this.speed = 12 / duration;
  }
  private speed = 12 / 3.2;

  private resize = () => {
    const r = this.canvas.getBoundingClientRect();
    this.renderer.setSize(r.width, r.height, false);
    this.camera.aspect = r.width / Math.max(1, r.height);
    this.camera.updateProjectionMatrix();
  };

  private toWorld(e: PointerEvent) {
    const r = this.canvas.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
    this.ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    const hit = new THREE.Vector3();
    if (!this.ray.ray.intersectPlane(this.plane, hit)) return null;
    // para o espaço do grupo (que está girado)
    return this.group.worldToLocal(hit);
  }

  private move = (e: PointerEvent) => {
    this.target.x = (e.clientX / innerWidth) * 2 - 1;
    this.target.y = (e.clientY / innerHeight) * 2 - 1;
    const p = this.toWorld(e);
    if (p) this.mouse.copy(p);
  };

  private click = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('a, button, summary, .menu, .panel')) return;
    const r = this.canvas.getBoundingClientRect();
    if (e.clientY > r.bottom || e.clientY < r.top) return;
    const p = this.toWorld(e);
    if (!p) return;
    this.mat.uniforms.uShock.value.set(p.x, p.y, p.z, this.mat.uniforms.uTime.value);
  };

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.visible || document.hidden) return;
    const u = this.mat.uniforms;
    u.uTime.value += dt * (1 + this.vel * 2);
    u.uTurb.value += (this.vel * 1.5 - u.uTurb.value) * 0.08;
    this.vel *= 0.94;
    if (this.front < this.frontTo) this.front = Math.min(this.frontTo, this.front + dt * this.speed);
    u.uFront.value = this.front;
    // a lente só liga depois que o sistema está quase montado
    u.uLens.value += ((this.front > 3 ? 1 : 0) - u.uLens.value) * 0.05;
    const g = this.group;
    g.rotation.y += (-0.62 + this.target.x * 0.25 - g.rotation.y) * 0.04;
    g.rotation.x += (0.42 + this.target.y * 0.12 - g.rotation.x) * 0.04;
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.io.disconnect();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.move);
    window.removeEventListener('pointerdown', this.click);
    this.geo.dispose();
    this.mat.dispose();
    this.renderer.dispose();
  }
}
