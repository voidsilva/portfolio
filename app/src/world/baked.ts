import * as THREE from 'three';

/*
  Luz assada no Blender (Cycles) para tudo que fica parado na sala.
  Dois lightmaps, manhã e fim de tarde, misturados pela rolagem: o dia passa sem custo.
  Nesses materiais o sol e o céu em tempo real ficam desligados (já estão no mapa);
  sobram só as luzes que contam a história: a luminária que segue o cursor e o brilho das telas.
*/

export interface DayUniforms {
  lightMap2: { value: THREE.Texture | null };
  uDay: { value: number };
  uK2: { value: number };
}

const BEGIN = THREE.ShaderChunk.lights_fragment_begin.replace('NUM_DIR_LIGHTS > 0', '0 > 0')
  .replace('NUM_HEMI_LIGHTS > 0', '0 > 0')
  .replace('getAmbientLightIrradiance( ambientLightColor )', 'vec3( 0.0 )');

const MAPS = THREE.ShaderChunk.lights_fragment_maps.replace(
  'vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;',
  'vec3 lightMapIrradiance = mix( lightMapTexel.rgb * lightMapIntensity, texture2D( lightMap2, vLightMapUv ).rgb * uK2, uDay );',
).replace('iblIrradiance += getIBLIrradiance( geometryNormal );', '');

export function bake(m: THREE.MeshStandardMaterial, lm: THREE.Texture, k: number, day: DayUniforms) {
  m.lightMap = lm;
  m.lightMapIntensity = k;
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, day);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <lightmap_pars_fragment>', '#include <lightmap_pars_fragment>\nuniform sampler2D lightMap2; uniform float uDay; uniform float uK2;')
      .replace('#include <lights_fragment_begin>', BEGIN)
      .replace('#include <lights_fragment_maps>', MAPS);
  };
  m.customProgramCacheKey = () => 'baked';
  return m;
}

/** Folha de papel que enrola e tremula enquanto voa (uniforms próprios por folha). */
export function curlPaper(m: THREE.MeshStandardMaterial) {
  const u = { uCurl: { value: 0 }, uFlutter: { value: 0 }, uTime: { value: 0 } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uCurl; uniform float uFlutter; uniform float uTime;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float cx = transformed.x / 0.105;
        transformed.y += uCurl * cx * cx * 0.045;
        transformed.y += uFlutter * sin(transformed.z * 22.0 + uTime * 9.0 + cx * 2.0) * 0.008 * (0.5 + 0.5 * abs(cx));`,
      );
  };
  m.customProgramCacheKey = () => 'curl';
  return u;
}

/** Poeira no feixe de sol: pontinhos que só aparecem dentro da luz. */
export function dustMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(1, 0.9, 0.75) }, uK: { value: 0.35 }, uPx: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime; uniform float uPx;
      varying float vA;
      void main(){
        vec3 p = position;
        float t = uTime * 0.05 + aSeed * 40.0;
        p += vec3(sin(t * 1.3 + aSeed * 9.0), sin(t * 0.7 + aSeed * 3.0) * 0.6 - 0.15 * fract(t * 0.1), cos(t * 1.1 + aSeed * 5.0)) * 0.08;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float d = -mv.z;
        vA = smoothstep(0.4, 1.2, d) * (1.0 - smoothstep(4.0, 7.0, d)) * (0.4 + 0.6 * fract(aSeed * 13.7));
        gl_PointSize = (0.6 + 1.2 * fract(aSeed * 7.3)) * uPx / max(d, 0.3);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uK;
      varying float vA;
      void main(){
        float r = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, r) * vA * uK;
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `,
  });
}

/** Sombra de contato macia (cadeira em cima do tapete). */
export function blobShadow(size: number, strength = 0.32) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d')!;
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(0,0,0,${strength})`);
  g.addColorStop(0.55, `rgba(0,0,0,${strength * 0.45})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = 2;
  return m;
}
