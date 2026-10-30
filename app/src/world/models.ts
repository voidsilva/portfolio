import * as THREE from 'three';

/*
  O que ainda nasce por código: a folha de papel (a sala e os móveis vêm do Blender).
*/

/* ---------- papel: folha A4 com leve curvatura ---------- */

export function paperGeometry(u0: number, v0: number, size = 0.25) {
  const w = 0.21,
    h = 0.297;
  const g = new THREE.PlaneGeometry(w, h, 6, 8);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const pos = g.attributes.position as THREE.BufferAttribute;
  const cropW = size * (w / h);
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, u0 + (size - cropW) / 2 + uv.getX(i) * cropW, v0 + uv.getY(i) * size);
    const x = pos.getX(i) / (w / 2),
      y = pos.getY(i) / (h / 2);
    pos.setZ(i, (x * x * 0.004 + y * y * 0.003) * 1);
  }
  g.computeVertexNormals();
  g.rotateX(-Math.PI / 2);
  return g;
}
