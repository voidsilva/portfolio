"""
Converte os lightmaps assados (EXR, linear) em WebP 8 bits para a web.
Escala pelo percentil alto, aplica gama sRGB e um filtro bilateral leve para tirar o ruído do Cycles.
Uso: python luz.py <pasta com luz-*.exr> <pasta de saída> [tamanho]
Grava também luz.json com a escala de cada mapa (o site multiplica de volta).
"""
import json
import os
import sys

import bpy  # noqa: F401  (só para ler EXR sem outra dependência)
import numpy as np
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
sizes = [int(s) for s in (sys.argv[3] if len(sys.argv) > 3 else "2048,1024").split(",")]
os.makedirs(dst, exist_ok=True)


def load(path):
    img = bpy.data.images.load(path)
    w, h = img.size
    px = np.empty(w * h * 4, dtype=np.float32)
    img.pixels.foreach_get(px)
    return px.reshape(h, w, 4)[::-1, :, :3].copy()  # Blender guarda de baixo para cima


def bilateral(a, r=4, sigma_s=3.0, sigma_l=0.22):
    """Filtro bilateral simples: suaviza ruído sem borrar as bordas de sombra."""
    lum = a.mean(axis=2, keepdims=True)
    acc = np.zeros_like(a)
    wsum = np.zeros_like(lum)
    pad = np.pad(a, ((r, r), (r, r), (0, 0)), mode="edge")
    padl = np.pad(lum, ((r, r), (r, r), (0, 0)), mode="edge")
    h, w = lum.shape[:2]
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            sh = pad[r + dy : r + dy + h, r + dx : r + dx + w]
            sl = padl[r + dy : r + dy + h, r + dx : r + dx + w]
            wt = np.exp(-(dx * dx + dy * dy) / (2 * sigma_s**2)) * np.exp(-((sl - lum) ** 2) / (2 * (sigma_l * (lum + 0.05)) ** 2))
            acc += sh * wt
            wsum += wt
    return acc / wsum


meta = {}
for name in ["manha", "tarde"]:
    a = load(os.path.join(src, f"luz-{name}.exr"))
    a = np.maximum(a, 0)
    a = bilateral(a)
    lum = a.mean(axis=2)
    scale = float(np.percentile(lum[lum > 0], 99.7)) * 1.15
    enc = np.clip(a / scale, 0, 1)
    enc = np.where(enc <= 0.0031308, enc * 12.92, 1.055 * np.power(enc, 1 / 2.4) - 0.055)
    im = Image.fromarray((enc * 255 + 0.5).astype(np.uint8), "RGB")
    for s in sizes:
        out = im if s == im.size[0] else im.resize((s, s), Image.LANCZOS)
        out.save(os.path.join(dst, f"luz-{name}{'' if s == sizes[0] else '-' + str(s)}.webp"), quality=82, method=6)
    meta[name] = round(scale, 4)
    print(name, "scale", scale)
json.dump(meta, open(os.path.join(dst, "luz.json"), "w"))
