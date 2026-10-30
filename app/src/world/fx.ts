import * as THREE from 'three';
import { canvas } from './tex';

/*
  Materiais animados: telas que ligam montando a imagem em blocos,
  quadro que é escrito à mão, feixe de sol atravessando a persiana.
*/

const HASH = /* glsl */ `
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
`;

/** Tela que liga: faixa de luz, depois a imagem se monta em blocos a partir do centro. */
export function screenMaterial(map: THREE.Texture, grid: [number, number] = [24, 14]) {
  return new THREE.ShaderMaterial({
    toneMapped: false,
    uniforms: {
      map: { value: map },
      uOn: { value: 0 },
      uTime: { value: 0 },
      uGrid: { value: new THREE.Vector2(...grid) },
      uGain: { value: 1.5 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D map; uniform float uOn; uniform float uTime; uniform vec2 uGrid; uniform float uGain;
      varying vec2 vUv;
      ${HASH}
      void main(){
        vec3 off = vec3(0.006, 0.007, 0.009);
        vec3 img = texture2D(map, vUv).rgb * uGain;
        float a = smoothstep(0.0, 0.22, uOn);
        // 1. faixa de luz que abre do meio
        float band = 1.0 - smoothstep(0.0, mix(0.002, 0.5, a), abs(vUv.y - 0.5));
        float t = smoothstep(0.18, 1.0, uOn);
        vec3 col = off + vec3(0.9, 0.88, 1.0) * band * (1.0 - t) * step(0.0001, uOn) * 0.8;
        // 2. blocos acendem do centro para fora
        vec2 cell = floor(vUv * uGrid);
        float d = length((cell + 0.5) / uGrid - 0.5);
        float k = clamp((t * 1.7 - d * 0.95 - hash(cell) * 0.3) / 0.3, 0.0, 1.0);
        vec2 f = fract(vUv * uGrid);
        float edge = 1.0 - smoothstep(0.0, 0.08, min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y)));
        vec3 tc = mix(vec3(0.545, 0.36, 0.965) * 1.4, img, smoothstep(0.3, 1.0, k)) + edge * (1.0 - k) * 0.8;
        col = mix(col, tc, smoothstep(0.0, 0.15, k));
        // 3. ligado: brilho de varredura bem leve
        float on = step(0.999, t);
        col += on * 0.035 * pow(max(0.0, sin((vUv.y + uTime * 0.07) * 3.14159)), 40.0);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
}

/** Quadro escrito à mão: cada cartão aparece numa varredura, na ordem de leitura. */
export function boardMaterial(map: THREE.Texture, cols: number, rows: number, bg: THREE.Color) {
  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: map },
      uReveal: { value: 0 },
      uCols: { value: cols },
      uRows: { value: rows },
      uBg: { value: bg },
      uLight: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D map; uniform float uReveal; uniform float uCols; uniform float uRows; uniform vec3 uBg; uniform float uLight;
      varying vec2 vUv;
      ${HASH}
      void main(){
        vec2 g = vec2(uCols, uRows);
        // UV do glTF: v = 0 no topo, então a leitura já começa em cima à esquerda
        vec2 c = floor(vUv * g);
        float idx = c.y * uCols + c.x;
        vec2 l = fract(vUv * g);
        float p = clamp(uReveal * uCols * uRows - idx, 0.0, 1.0);
        // varredura com borda irregular, como traço de caneta
        float wob = (hash(vec2(floor(l.y * 40.0), idx)) - 0.5) * 0.04;
        float m = smoothstep(p * 1.08 - 0.04, p * 1.08 - 0.02, l.x + wob);
        vec3 col = mix(texture2D(map, vUv).rgb, uBg, m);
        gl_FragColor = vec4(col * uLight, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
}

/** Céu e jardim do lado de fora: claro e desfocado, como uma janela superexposta. */
export function outside() {
  const { c, x } = canvas(1024, 512);
  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#DCE8F7');
  g.addColorStop(0.55, '#F4F6FA');
  g.addColorStop(1, '#E9EEE6');
  x.fillStyle = g;
  x.fillRect(0, 0, 1024, 512);
  x.filter = 'blur(18px)';
  // copas de árvores e um prédio claro ao longe
  x.fillStyle = 'rgba(230,232,236,1)';
  x.fillRect(620, 170, 260, 260);
  for (let i = 0; i < 14; i++) {
    x.fillStyle = `rgba(${120 + (i % 3) * 18},${150 + (i % 4) * 12},${118 + (i % 2) * 10},.75)`;
    x.beginPath();
    x.arc(40 + i * 75, 380 - (i % 4) * 30, 70 + (i % 3) * 20, 0, Math.PI * 2);
    x.fill();
  }
  x.filter = 'none';
  return c;
}

/** Feixe de sol: volume aditivo do vão da janela até o chão, listrado pela persiana. */
export function beamMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(1, 0.9, 0.75) }, uStrength: { value: 0.05 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      attribute vec2 aWin; // x: distância ao longo do feixe, y: altura na janela
      varying vec2 vWin; varying vec3 vPos; varying float vDepth;
      void main(){ vWin = aWin; vPos = position; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uStrength; uniform float uTime;
      varying vec2 vWin; varying vec3 vPos; varying float vDepth;
      ${HASH}
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      void main(){
        float along = vWin.x;
        float y = vWin.y;
        // persiana na metade de cima: faixas
        float slats = y > 0.52 ? smoothstep(0.35, 0.65, fract(y * 18.0)) : 1.0;
        float fall = pow(1.0 - along, 1.6) * smoothstep(0.0, 0.08, along);
        float dust = 0.75 + 0.25 * noise(vPos.xz * 3.0 + vec2(uTime * 0.05, 0.0));
        float a = uStrength * slats * fall * dust * smoothstep(0.6, 3.0, vDepth);
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `,
  });
}

/** Ambiente para os reflexos: sala clara com uma janela muito brilhante e luz de teto. */
export function envScene() {
  const s = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(10, 4, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.85, 0.86, 0.9), side: THREE.BackSide }));
  room.position.y = 1.5;
  s.add(room);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(5, 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.97, 0.92).multiplyScalar(9) }));
  win.position.set(-4.9, 1.8, 0);
  win.rotation.y = Math.PI / 2;
  const top = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(2.2) }));
  top.position.set(0, 3.45, 0);
  top.rotation.x = Math.PI / 2;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.75, 0.68, 0.58) }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.49;
  s.add(win, top, floor);
  return s;
}
