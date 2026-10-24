import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * O "Núcleo NX": um icosaedro de placas metálicas que se separam, giram e
 * se recompõem conforme o scroll. Os valores de `state` são escritos pelo
 * GSAP/ScrollTrigger; a cena os persegue com amortecimento a cada frame.
 */
export interface SceneState {
  camX: number;
  camY: number;
  camZ: number;
  coreX: number;
  coreY: number;
  scale: number;
  spin: number;
  tilt: number;
  explode: number;
  glow: number;
  rings: number;
  dim: number;
}

export const defaultState = (): SceneState => ({
  camX: 0,
  camY: 0,
  camZ: 9,
  coreX: 1.6,
  coreY: 0,
  scale: 1,
  spin: 0,
  tilt: 0,
  explode: 0.05,
  glow: 1,
  rings: 1,
  dim: 0,
});

export type Quality = 'high' | 'low';

interface Shard {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  dir: THREE.Vector3;
  axis: THREE.Vector3;
  reach: number;
  twist: number;
}

const PURPLE = new THREE.Color('#8B5CF6');
const CYAN = new THREE.Color('#55D6FF');
const BG = new THREE.Color('#08090D');

function haloTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.35)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.flipY = false;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Cria uma placa com espessura a partir de um triângulo da superfície. */
function shardGeometry(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, center: THREE.Vector3, normal: THREE.Vector3) {
  const depth = 0.24;
  const inset = 0.72;
  const o = [a, b, c].map((v) => v.clone().sub(center));
  const i = o.map((v) => v.clone().multiplyScalar(inset).addScaledVector(normal, -depth));
  const tris: THREE.Vector3[] = [];
  const push = (...v: THREE.Vector3[]) => tris.push(...v);
  push(o[0], o[1], o[2]);
  push(i[0], i[2], i[1]);
  for (let k = 0; k < 3; k++) {
    const n = (k + 1) % 3;
    push(o[k], i[k], i[n]);
    push(o[k], i[n], o[n]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(tris.flatMap((v) => [v.x, v.y, v.z]), 3));
  g.computeVertexNormals();
  return g;
}

export class CoreScene {
  state: SceneState = defaultState();
  private cur: SceneState = defaultState();
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private core = new THREE.Group();
  private shards: Shard[] = [];
  private ghost: THREE.LineSegments;
  private inner: THREE.Mesh;
  private innerMat: THREE.ShaderMaterial;
  private halo: THREE.Sprite;
  private rings = new THREE.Group();
  private comet: THREE.Sprite;
  private particles: THREE.Points;
  private particleMat: THREE.ShaderMaterial;
  private key: THREE.DirectionalLight;
  private pmrem: THREE.PMREMGenerator;
  private envTex: THREE.Texture;
  private haloTex: THREE.Texture;
  private pointer = new THREE.Vector2();
  private pointerCur = new THREE.Vector2();
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private started = false;
  private lastDim = -1;
  private reduced: boolean;
  private tmpQ = new THREE.Quaternion();

  constructor(private canvas: HTMLCanvasElement, quality: Quality, reduced: boolean) {
    this.reduced = reduced;
    const high = quality === 'high';
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: high, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, high ? 1.75 : 1.25));
    this.renderer.setClearColor(BG, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    this.scene.fog = new THREE.Fog(BG, 12, 30);

    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envTex = this.pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.envTex;

    // Luzes: roxo como chave, ciano só como contorno.
    this.scene.add(new THREE.AmbientLight('#1b1f2e', 1.2));
    this.key = new THREE.DirectionalLight(PURPLE, 4.5);
    this.key.position.set(-3, 2.5, 4);
    this.scene.add(this.key);
    const top = new THREE.DirectionalLight('#F4F5FA', 1.1);
    top.position.set(1, 5, 2);
    this.scene.add(top);
    const rim = new THREE.PointLight(CYAN, 14, 9, 1.6);
    rim.position.set(2.6, -1.2, -2.2);
    this.scene.add(rim);

    // Placas metálicas.
    const shardMat = new THREE.MeshStandardMaterial({
      color: '#141821',
      metalness: 0.95,
      roughness: 0.24,
      envMapIntensity: 0.32,
      flatShading: true,
    });
    const ico = new THREE.IcosahedronGeometry(1.25, 0); // detalhe 0 já é não indexado
    const pos = ico.getAttribute('position');
    for (let f = 0; f < pos.count; f += 3) {
      const a = new THREE.Vector3().fromBufferAttribute(pos, f);
      const b = new THREE.Vector3().fromBufferAttribute(pos, f + 1);
      const c = new THREE.Vector3().fromBufferAttribute(pos, f + 2);
      const center = a.clone().add(b).add(c).divideScalar(3);
      const dir = center.clone().normalize();
      const mesh = new THREE.Mesh(shardGeometry(a, b, c, center, dir), shardMat);
      mesh.position.copy(center);
      this.core.add(mesh);
      this.shards.push({
        mesh,
        base: center,
        dir,
        axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        reach: 1.4 + Math.random() * 2.6,
        twist: (Math.random() - 0.5) * 2.4,
      });
    }
    ico.dispose();

    // Estrutura "fantasma": o contorno do núcleo que permanece quando ele abre.
    const ghostGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.34, 0));
    this.ghost = new THREE.LineSegments(
      ghostGeo,
      new THREE.LineBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.25, depthWrite: false }),
    );
    this.core.add(this.ghost);

    // Energia interna.
    this.innerMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uGlow: { value: 1 },
        uPurple: { value: PURPLE },
        uCyan: { value: CYAN },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vView;
        varying float vWave;
        void main() {
          vec3 p = position;
          float w = sin(p.x * 5.0 + uTime * 1.3) * sin(p.y * 4.0 - uTime) * sin(p.z * 6.0 + uTime * 0.7);
          p += normal * w * 0.05;
          vWave = w;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uGlow;
        uniform vec3 uPurple;
        uniform vec3 uCyan;
        varying vec3 vNormal;
        varying vec3 vView;
        varying float vWave;
        void main() {
          float f = pow(1.0 - abs(dot(vNormal, vView)), 2.2);
          vec3 col = mix(uPurple * 0.55, uPurple * 1.6, f);
          col += uCyan * smoothstep(0.55, 1.0, f) * 0.35;
          col += uPurple * max(vWave, 0.0) * 0.8;
          gl_FragColor = vec4(col * uGlow * 0.8, (0.2 + f * 0.7) * min(uGlow, 1.2));
        }
      `,
    });
    this.inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, high ? 5 : 3), this.innerMat);
    this.core.add(this.inner);

    this.haloTex = haloTexture();
    this.halo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: this.haloTex, color: PURPLE, transparent: true, opacity: 0.3, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    this.halo.scale.setScalar(5.5);
    this.core.add(this.halo);

    // Órbitas: linhas finas, sem neon.
    const ring = (r: number, color: THREE.Color, opacity: number) => {
      const pts = Array.from({ length: 256 }, (_, i) => {
        const a = (i / 256) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
      });
      return new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }),
      );
    };
    const r1 = ring(2.25, PURPLE, 0.45);
    r1.rotation.set(1.2, 0.2, 0);
    const r2 = ring(2.95, new THREE.Color('#969BAA'), 0.18);
    r2.rotation.set(1.45, -0.45, 0.3);
    this.rings.add(r1, r2);
    this.comet = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: this.haloTex, color: CYAN, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    this.comet.scale.setScalar(0.35);
    r1.add(this.comet);
    this.core.add(this.rings);
    this.scene.add(this.core);

    // Partículas em várias profundidades.
    const count = high ? 1800 : 520;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const tints = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.pow(Math.random(), 0.7) * 20;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      positions.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.6, r * Math.cos(ph) - 4], i * 3);
      scales[i] = 0.4 + Math.random() * 1.2;
      const p = Math.random();
      tints[i] = p < 0.05 ? 2 : p < 0.35 ? 1 : 0;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pg.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    pg.setAttribute('aTint', new THREE.BufferAttribute(tints, 1));
    this.particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixel: { value: this.renderer.getPixelRatio() },
        uPurple: { value: PURPLE },
        uCyan: { value: CYAN },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixel;
        attribute float aScale;
        attribute float aTint;
        varying float vTint;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aScale * uPixel * 26.0 / -mv.z;
          vTint = aTint;
          vAlpha = 0.45 + 0.55 * sin(uTime * (0.6 + aScale) + position.x * 3.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uPurple;
        uniform vec3 uCyan;
        varying float vTint;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 col = vTint > 1.5 ? uCyan : (vTint > 0.5 ? uPurple * 1.3 : vec3(0.85, 0.87, 0.95));
          gl_FragColor = vec4(col, a * vAlpha * 0.7);
        }
      `,
    });
    this.particles = new THREE.Points(pg, this.particleMat);
    this.scene.add(this.particles);

    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
  }

  start() {
    if (this.running) return;
    if (!this.started) {
      Object.assign(this.cur, this.state);
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

  /** Renderiza um único quadro, usado com movimento reduzido. */
  renderOnce() {
    Object.assign(this.cur, this.state);
    this.apply(0, 0);
    this.renderer.render(this.scene, this.camera);
  }

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else if (!this.reduced) this.start();
  };

  resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.reduced) this.renderOnce();
  };

  private loop = () => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 3.2);
    const c = this.cur as unknown as Record<string, number>;
    const s = this.state as unknown as Record<string, number>;
    for (const key in s) c[key] += (s[key] - c[key]) * k;
    this.pointerCur.lerp(this.pointer, 1 - Math.exp(-dt * 2.5));
    this.apply(t, dt);
    this.renderer.render(this.scene, this.camera);
  };

  private apply(t: number, dt: number) {
    const s = this.cur;
    const p = this.pointerCur;

    this.camera.position.set(s.camX + p.x * 0.35, s.camY + p.y * 0.25, s.camZ);
    this.camera.lookAt(s.camX * 0.6, s.camY * 0.6, 0);

    this.core.position.set(s.coreX, s.coreY, 0);
    this.core.scale.setScalar(s.scale);
    this.core.rotation.set(s.tilt + p.y * 0.18 + Math.sin(t * 0.3) * 0.05, s.spin + t * 0.07 + p.x * 0.25, 0);

    for (const sh of this.shards) {
      const e = s.explode;
      sh.mesh.position.copy(sh.base).addScaledVector(sh.dir, e * sh.reach + Math.sin(t * 0.8 + sh.reach) * 0.015 * (1 + e * 4));
      this.tmpQ.setFromAxisAngle(sh.axis, e * sh.twist * Math.PI);
      sh.mesh.quaternion.copy(this.tmpQ);
    }

    const ghostMat = this.ghost.material as THREE.LineBasicMaterial;
    ghostMat.opacity = 0.08 + Math.min(s.explode, 1) * 0.35;
    this.innerMat.uniforms.uTime.value = t;
    this.innerMat.uniforms.uGlow.value = s.glow;
    (this.halo.material as THREE.SpriteMaterial).opacity = 0.22 * s.glow;

    this.rings.rotation.z = t * 0.05;
    this.rings.scale.setScalar(0.85 + s.rings * 0.15);
    this.rings.children.forEach((r) => {
      const m = (r as THREE.Line).material as THREE.LineBasicMaterial;
      m.opacity = (r === this.rings.children[0] ? 0.45 : 0.18) * s.rings;
    });
    const a = t * 0.45;
    this.comet.position.set(Math.cos(a) * 2.25, Math.sin(a) * 2.25, 0);
    (this.comet.material as THREE.SpriteMaterial).opacity = s.rings;

    this.key.position.set(-3 + p.x * 2.5, 2.5 + p.y * 2, 4);
    this.particles.rotation.y = t * 0.012 + s.spin * 0.08;
    this.particles.position.y = s.camY * 0.25;
    this.particleMat.uniforms.uTime.value = t;

    const dim = Math.round(s.dim * 100) / 100;
    if (dim !== this.lastDim) {
      this.canvas.style.opacity = String(1 - dim);
      this.lastDim = dim;
    }
    void dt;
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
      else mat?.dispose();
    });
    this.haloTex.dispose();
    this.envTex.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
  }
}
