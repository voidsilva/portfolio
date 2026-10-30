// Prepara o GLB que sai do Blender para a web:
// tira UV de quem não usa textura, junta duplicados, quantiza e comprime com Meshopt.
// Uso: node blender/otimizar.mjs <entrada.glb> <saida.glb>
import { NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { dedup, meshopt, prune, weld } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';

const [src, dst] = process.argv.slice(2);
// materiais que recebem textura pela UV 0 no site
const TEXTURED = new Set(['oak_floor', 'wall', 'art_print', 'chair_net', 'screen', 'board_face']);

await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(src);

let cut = 0;
for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const name = prim.getMaterial()?.getName() ?? '';
    // TEXCOORD_1 é o lightmap: só o que é fixo tem, e sempre fica
    if (!TEXTURED.has(name) && prim.getAttribute('TEXCOORD_0')) {
      prim.setAttribute('TEXCOORD_0', null);
      cut++;
    }
  }
}
await doc.transform(dedup(), weld(), prune({ keepAttributes: true, keepLeaves: true }), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
await io.write(dst, doc);
const tris = doc.getRoot().listMeshes().reduce((a, m) => a + m.listPrimitives().reduce((b, p) => b + (p.getIndices()?.getCount() ?? 0) / 3, 0), 0);
console.log(`uv removida de ${cut} primitivas, ${Math.round(tris)} triângulos`);
