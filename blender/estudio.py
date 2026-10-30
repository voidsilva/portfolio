"""
Estúdio do SilvaDev modelado por script no Blender (bpy + bmesh).

Uso:  python estudio.py <saida>   (bpy como módulo, sem interface)
Gera:
  <saida>/estudio-raw.glb   cena inteira; o que é fixo vem juntado e com UV de lightmap
  <saida>/luz-manha.exr     luz difusa assada no Cycles com o sol da manhã
  <saida>/luz-tarde.exr     o mesmo com o sol do fim de tarde

Tudo é escrito em coordenadas do Three.js (Y para cima, +Z para quem olha)
e convertido para o Blender (Z para cima) na hora de criar a malha.
"""

import math
import os
import random
import sys

import bpy  # noqa: I001  (bmesh só existe depois do bpy)
import bmesh
from mathutils import Matrix, Vector

OUT = sys.argv[-1] if len(sys.argv) > 1 and not sys.argv[-1].endswith(".py") else "."
LM_SIZE = int(os.environ.get("LM", "2048"))
SAMPLES = int(os.environ.get("SAMPLES", "256"))
ONLY_EXPORT = os.environ.get("NOBAKE") == "1"

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# three → blender: x fica, y vira z, z vira -y
C3 = Matrix(((1, 0, 0), (0, 0, -1), (0, 1, 0)))
C4 = C3.to_4x4()


def lin(h):
    """#RRGGBB em sRGB → cor linear."""
    h = h.lstrip("#")
    c = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


# ---------------------------------------------------------------- materiais

MATS = {}


def mat(name, color="#ffffff", rough=0.5, metal=0.0, emit=None):
    if name in MATS:
        return MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = (*lin(color), 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*lin(emit[0]), 1)
        b.inputs["Emission Strength"].default_value = emit[1]
    MATS[name] = m
    return m


M = dict(
    floor=mat("oak_floor", "#D8C2A4", 0.55),
    wall=mat("wall", "#F1F1F4", 0.95),
    ceil=mat("ceiling", "#F5F5F7", 1),
    matte=mat("white_matte", "#F2F2F4", 0.5),
    gloss=mat("white_gloss", "#F5F5F7", 0.35),
    black=mat("black_steel", "#1A1C22", 0.42, 0.6),
    alu=mat("alu", "#D0D3DA", 0.32, 0.95),
    chrome=mat("chrome", "#E6E8EE", 0.12, 1),
    felt=mat("felt", "#C2C5CC", 1),
    feltDark=mat("felt_dark", "#55595F", 1),
    slat=mat("slat", "#A7ABB3", 0.7),
    ceramic=mat("ceramic", "#ECE8E1", 0.5),
    rubber=mat("rubber", "#222429", 0.85),
    frame=mat("frame_gray", "#8B8E97", 0.45),
    fabric=mat("fabric", "#9DA0A8", 0.95),
    net=mat("chair_net", "#5B5F67", 0.8),
    leaf=mat("leaf", "#4E7F4B", 0.5),
    leafB=mat("leaf_light", "#6B9A5D", 0.5),
    bark=mat("bark", "#6B5A48", 0.9),
    soil=mat("soil", "#4A3D31", 1),
    purple=mat("purple", "#8B5CF6", 0.3),
    cyan=mat("cyan", "#55D6FF", 0.3),
    livA=mat("livery_dark", "#1C1E24", 0.35),
    livB=mat("livery_white", "#F1F2F5", 0.3),
    rug=mat("wool_rug", "#E2DED8", 1),
    oak=mat("oak", "#D9C3A1", 0.55),
    art=mat("art_print", "#F3EFE8", 0.85),
    paper=mat("paper_white", "#FBFAF7", 0.9),
    screen=mat("screen", "#050608", 0.2),
    board=mat("board_face", "#F7F8FC", 0.6),
    glowBar=mat("glow_bar", "#FFF0DC", 1, emit=("#FFF0DC", 0)),
    fanA=mat("fan_purple", "#8B5CF6", 1, emit=("#8B5CF6", 0)),
    fanB=mat("fan_cyan", "#55D6FF", 1, emit=("#55D6FF", 0)),
    blade=mat("fan_blade", "#F2F2F5", 0.4),
    pcb=mat("pcb_white", "#E8E9EC", 0.5),
    keyLegend=mat("keycap", "#F4F4F6", 0.45),
    coffee=mat("coffee", "#2B1A10", 0.1),
    darkGlass=mat("dark_glass", "#0C0D10", 0.3),
    track=mat("track", "#1B1D23", 0.4, 0.6),
    books=[mat(f"book_{i}", c, 0.75) for i, c in enumerate(["#E9E4DA", "#15171D", "#C9C0F7", "#F3F1EC", "#B8E6F5", "#DCD5C7", "#8B5CF6", "#E2E4EA"])],
)

# ---------------------------------------------------------------- objetos

STATIC = []  # entram no lightmap e são juntados
OCCLUDERS = []  # aparecem no bake só para fazer sombra, exportados à parte


def link(o):
    scene.collection.objects.link(o)
    return o


def rot3(r):
    rx, ry, rz = r
    return Matrix.Rotation(rx, 3, "X") @ Matrix.Rotation(ry, 3, "Y") @ Matrix.Rotation(rz, 3, "Z")


def place(o, pos=(0, 0, 0), r=(0, 0, 0), parent=None, s=1.0):
    o.parent = parent
    R = C3 @ rot3(r) @ C3.transposed()
    o.matrix_basis = Matrix.Translation(C3 @ Vector(pos)) @ R.to_4x4() @ Matrix.Scale(s, 4)
    return o


def mesh_obj(name, bm, material, kind="static", smooth=False):
    bm.transform(C4)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    mats = material if isinstance(material, list) else [material]
    for m_ in mats:
        me.materials.append(m_)
    if smooth:
        for p in me.polygons:
            p.use_smooth = True
    o = link(bpy.data.objects.new(name, me))
    if not me.uv_layers:
        me.uv_layers.new(name="UVMap")
    if kind == "static":
        STATIC.append(o)
    elif kind == "occluder":
        OCCLUDERS.append(o)
    return o


def empty(name, parent=None, pos=(0, 0, 0), r=(0, 0, 0)):
    o = link(bpy.data.objects.new(name, None))
    place(o, pos, r, parent)
    return o


def bevel(o, w=0.004, seg=3, angle=0.6):
    md = o.modifiers.new("bevel", "BEVEL")
    md.width = w
    md.segments = seg
    md.limit_method = "ANGLE"
    md.angle_limit = angle
    md.harden_normals = True
    md.use_clamp_overlap = True
    for p in o.data.polygons:
        p.use_smooth = True
    return o


def subsurf(o, lv=2):
    md = o.modifiers.new("sub", "SUBSURF")
    md.levels = lv
    md.render_levels = lv
    for p in o.data.polygons:
        p.use_smooth = True
    return o


# ---- primitivas em coordenadas three (y para cima)


def bm_box(w, h, d, segx=1):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co = Vector((v.co.x * w, v.co.y * h, v.co.z * d))
    if segx > 1:
        edges = [e for e in bm.edges if abs(e.verts[0].co.x - e.verts[1].co.x) > 1e-6]
        bmesh.ops.subdivide_edges(bm, edges=edges, cuts=segx - 1, use_grid_fill=True)
    return bm


def box(name, w, h, d, m, pos=(0, 0, 0), r=(0, 0, 0), bev=0.004, seg=3, kind="static", parent=None):
    o = mesh_obj(name, bm_box(w, h, d), m, kind)
    if bev:
        bevel(o, min(bev, w / 2.05, h / 2.05, d / 2.05), seg)
    return place(o, pos, r, parent)


def bm_cyl(r1, r2, h, seg=32, cap=True):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=seg, radius1=r1, radius2=r2, depth=h)
    # create_cone fica no eixo Z do bmesh; aqui o eixo do cilindro é o y do three
    bm.transform(Matrix.Rotation(-math.pi / 2, 4, "X"))
    return bm


def cyl(name, r1, r2, h, m, pos=(0, 0, 0), r=(0, 0, 0), seg=32, kind="static", parent=None, bev=0.0):
    o = mesh_obj(name, bm_cyl(r1, r2, h, seg), m, kind, smooth=True)
    if bev:
        bevel(o, bev, 2, 0.8)
    return place(o, pos, r, parent)


def bm_lathe(pts, seg=48):
    """Perfil (raio, altura) girado em torno do y."""
    bm = bmesh.new()
    rings = []
    for i in range(seg):
        a = i / seg * math.tau
        rings.append([bm.verts.new((rr * math.sin(a), y, rr * math.cos(a))) for rr, y in pts])
    for i in range(seg):
        A, B = rings[i], rings[(i + 1) % seg]
        for k in range(len(pts) - 1):
            bm.faces.new((A[k], A[k + 1], B[k + 1], B[k]))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def lathe(name, pts, m, pos=(0, 0, 0), r=(0, 0, 0), seg=48, kind="static", parent=None):
    return place(mesh_obj(name, bm_lathe(pts, seg), m, kind, smooth=True), pos, r, parent)


def bm_tube(points, radius, seg=8, closed=False):
    """Tubo ao longo de uma polilinha suavizada."""
    from mathutils import geometry  # noqa: F401

    pts = [Vector(p) for p in points]
    # Catmull-Rom simples para suavizar
    smooth = []
    n = len(pts)
    for i in range(n - (0 if closed else 1)):
        p0 = pts[(i - 1) % n] if closed or i > 0 else pts[0]
        p1, p2 = pts[i], pts[(i + 1) % n]
        p3 = pts[(i + 2) % n] if closed or i + 2 < n else pts[-1]
        for t in [k / 8 for k in range(8)]:
            t2, t3 = t * t, t * t * t
            smooth.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    if not closed:
        smooth.append(pts[-1])
    bm = bmesh.new()
    rings = []
    up = Vector((0, 1, 0))
    for i, p in enumerate(smooth):
        tg = (smooth[min(i + 1, len(smooth) - 1)] - smooth[max(i - 1, 0)]).normalized()
        ref = up if abs(tg.dot(up)) < 0.9 else Vector((1, 0, 0))
        nx = tg.cross(ref).normalized()
        ny = tg.cross(nx).normalized()
        rings.append([bm.verts.new(p + (nx * math.cos(a) + ny * math.sin(a)) * radius) for a in [k / seg * math.tau for k in range(seg)]])
    m = len(rings)
    for i in range(m if closed else m - 1):
        A, B = rings[i], rings[(i + 1) % m]
        for k in range(seg):
            bm.faces.new((A[k], A[(k + 1) % seg], B[(k + 1) % seg], B[k]))
    if not closed:
        bm.faces.new(list(reversed(rings[0])))
        bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def tube(name, points, radius, m, seg=8, closed=False, pos=(0, 0, 0), r=(0, 0, 0), kind="static", parent=None):
    return place(mesh_obj(name, bm_tube(points, radius, seg, closed), m, kind, smooth=True), pos, r, parent)


def bend(bm, R):
    """Curva em torno de um eixo vertical à frente (+z): as bordas vêm para quem olha."""
    for v in bm.verts:
        x, z = v.co.x, v.co.z
        a = x / R
        v.co.x = (R - z) * math.sin(a)
        v.co.z = R - (R - z) * math.cos(a)


def bm_plane(w, h, sx=1, sy=1):
    """Plano no XY do three, virado para +z, com UV 0..1."""
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new("UVMap")
    grid = [[bm.verts.new(((i / sx - 0.5) * w, (j / sy - 0.5) * h, 0)) for i in range(sx + 1)] for j in range(sy + 1)]
    for j in range(sy):
        for i in range(sx):
            f = bm.faces.new((grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]))
            for lp, (a, b) in zip(f.loops, [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]):
                lp[uv].uv = (a / sx, b / sy)
    return bm


def plane(name, w, h, m, pos=(0, 0, 0), r=(0, 0, 0), sx=1, sy=1, kind="static", parent=None):
    return place(mesh_obj(name, bm_plane(w, h, sx, sy), m, kind), pos, r, parent)


def bm_rounded_slab(w, d, t, rad, seg=8):
    """Placa deitada (XZ) com cantos arredondados, espessura t, centrada."""
    bm = bmesh.new()
    pts = []
    for cx, cz, a0 in [(w / 2 - rad, d / 2 - rad, 0), (-w / 2 + rad, d / 2 - rad, 90), (-w / 2 + rad, -d / 2 + rad, 180), (w / 2 - rad, -d / 2 + rad, 270)]:
        for k in range(seg + 1):
            a = math.radians(a0 + 90 * k / seg)
            pts.append((cx + rad * math.cos(a), cz + rad * math.sin(a)))
    top = [bm.verts.new((x, t / 2, z)) for x, z in pts]
    bot = [bm.verts.new((x, -t / 2, z)) for x, z in pts]
    bm.faces.new(top)
    bm.faces.new(list(reversed(bot)))
    n = len(pts)
    for i in range(n):
        bm.faces.new((top[i], bot[i], bot[(i + 1) % n], top[(i + 1) % n]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def slab(name, w, d, t, rad, m, pos=(0, 0, 0), r=(0, 0, 0), kind="static", parent=None, bev=0.003):
    o = mesh_obj(name, bm_rounded_slab(w, d, t, rad), m, kind)
    if bev:
        bevel(o, bev, 2, 0.6)
    return place(o, pos, r, parent)


def planar_uv(o, scale=1.0, axis="auto"):
    """UV em metros projetado pelo eixo dominante da face (para piso e paredes)."""
    me = o.data
    uv = me.uv_layers["UVMap"]
    mw = o.matrix_world
    for p in me.polygons:
        n = p.normal
        for li in p.loop_indices:
            co = mw @ me.vertices[me.loops[li].vertex_index].co
            ax = abs(n.x), abs(n.y), abs(n.z)
            if ax[2] >= ax[0] and ax[2] >= ax[1]:
                u, v = co.x, co.y
            elif ax[0] >= ax[1]:
                u, v = co.y, co.z
            else:
                u, v = co.x, co.z
            uv.data[li].uv = (u / scale, v / scale)


rnd = random.Random(7)

# ================================================================ sala
W, H, BACK, FRONT = 8.0, 3.1, -3.0, 4.5
D = FRONT - BACK
L = -W / 2
WIN = dict(z0=-2.35, z1=1.35, y0=0.72, y1=2.6)
REV = 0.22
T = 0.12  # espessura das paredes

floor = box("floor", W + 0.4, 0.1, D + 0.4, M["floor"], (0, -0.05, BACK + D / 2), bev=0)
ceil = box("ceiling", W + 0.4, 0.1, D + 0.4, M["ceil"], (0, H + 0.05, BACK + D / 2), bev=0, kind="occluder")
ceil.name = "occ_ceiling"  # o teto no site é um plano liso, sem lightmap
backW = box("wall_back", W + 0.4, H, T, M["wall"], (0, H / 2, BACK - T / 2), bev=0)
rightW = box("wall_right", T, H, D, M["wall"], (W / 2 + T / 2, H / 2, BACK + D / 2), bev=0)
frontW = box("wall_front", W + 0.4, H, T, M["wall"], (0, H / 2, FRONT + T / 2), bev=0, kind="occluder")
frontW.name = "occ_front_wall"
z0, z1, y0, y1 = WIN["z0"], WIN["z1"], WIN["y0"], WIN["y1"]
xw = L - REV / 2
box("wall_left_a", REV, H, z0 - BACK + 0.12, M["wall"], (xw, H / 2, (BACK - 0.12 + z0) / 2), bev=0)
box("wall_left_b", REV, H, FRONT - z1 + 0.12, M["wall"], (xw, H / 2, (z1 + FRONT + 0.12) / 2), bev=0)
box("wall_left_low", REV, y0, z1 - z0, M["wall"], (xw, y0 / 2, (z0 + z1) / 2), bev=0)
box("wall_left_high", REV, H - y1, z1 - z0, M["wall"], (xw, (H + y1) / 2, (z0 + z1) / 2), bev=0)
bpy.context.view_layer.update()
planar_uv(floor, 1.0)
for o in STATIC:
    if o.name.startswith("wall") or o.name == "ceiling":
        planar_uv(o, 1.0)

# peitoril, caixilho e montantes
box("sill", REV + 0.06, 0.03, z1 - z0 + 0.06, M["gloss"], (L - REV / 2 + 0.03, y0 - 0.015, (z0 + z1) / 2), bev=0.006)
fx = L - REV + 0.03
for dims, pos in [
    ((0.05, y1 - y0, 0.05), (fx, (y0 + y1) / 2, z0 + 0.025)),
    ((0.05, y1 - y0, 0.05), (fx, (y0 + y1) / 2, z1 - 0.025)),
    ((0.05, y1 - y0, 0.04), (fx, (y0 + y1) / 2, (z0 + z1) / 2)),
    ((0.05, 0.05, z1 - z0), (fx, y0 + 0.025, (z0 + z1) / 2)),
    ((0.05, 0.05, z1 - z0), (fx, y1 - 0.025, (z0 + z1) / 2)),
    ((0.05, 0.04, z1 - z0), (fx, 1.9, (z0 + z1) / 2)),
]:
    box("mullion", *dims, M["gloss"], pos, bev=0.006)
# persiana na metade de cima
for i in range(14):
    box("blind", 0.05, 0.004, z1 - z0 - 0.12, M["gloss"], (L - 0.06, y1 - 0.07 - i * 0.062, (z0 + z1) / 2), (0, 0, 0.5), bev=0.0015, seg=1)
box("blind_rail", 0.06, 0.04, z1 - z0 - 0.08, M["gloss"], (L - 0.06, y1 - 0.03, (z0 + z1) / 2), bev=0.008)
for i in range(2):
    cyl("blind_cord", 0.0018, 0.0018, 0.85, M["gloss"], (L - 0.03, y1 - 0.47, z0 + 0.2 + i * 0.03), seg=6)

# rodapés
box("skirt", W, 0.09, 0.014, M["gloss"], (0, 0.045, BACK + 0.007), bev=0.003)
box("skirt", 0.014, 0.09, D, M["gloss"], (W / 2 - 0.007, 0.045, BACK + D / 2), bev=0.003)
# trilho de luz no teto
box("track", 3, 0.03, 0.04, M["track"], (0.5, H - 0.015, -1.1), bev=0.008)
for i in range(4):
    cyl("track_can", 0.035, 0.035, 0.11, M["track"], (-0.6 + i * 0.75, H - 0.09, -1.1), (0.5, 0, 0), bev=0.004)

# ================================================================ painel ripado + quadro de arte
SX, SW = -2.6, 2.1
box("slat_felt", SW, H, 0.01, M["feltDark"], (SX, H / 2, BACK + 0.005), bev=0)
n = int(SW / 0.05)
for i in range(n):
    box("slat", 0.028, H - 0.002, 0.022, M["slat"], (SX - SW / 2 + 0.025 + i * 0.05, H / 2, BACK + 0.021), bev=0.003, seg=2)
ax, ay, az = -2.35, 1.55, BACK + 0.06
box("art_frame", 0.67, 0.87, 0.03, M["oak"], (ax, ay, az), bev=0.004)
plane("art_mat", 0.62, 0.82, M["paper"], (ax, ay, az + 0.0152))
plane("art_print", 0.62 * 0.72, 0.82 * 0.72, M["art"], (ax, ay, az + 0.0156))

# ================================================================ mesa branca com gaveteiro
DZ, TOP = -2.15, 0.74
DW, DD, DT = 2.8, 0.8, 0.03
slab("desk_top", DW, DD, DT, 0.012, M["matte"], (0, TOP - DT / 2, DZ), bev=0.004)
box("desk_leg", 0.03, TOP - DT, DD - 0.04, M["matte"], (-DW / 2 + 0.06, (TOP - DT) / 2, DZ), bev=0.004)
PW = 0.44
PX = DW / 2 - PW / 2 - 0.02
box("desk_pedestal", PW, TOP - DT, DD - 0.04, M["matte"], (PX, (TOP - DT) / 2, DZ - 0.004), bev=0.004)
yy = TOP - DT - 0.025
for rh in [0.2, 0.2, 0.26]:
    box("drawer", PW - 0.012, rh - 0.006, 0.02, M["matte"], (PX, yy - rh / 2, DZ + DD / 2 - 0.018), bev=0.004)
    box("drawer_grip", PW - 0.07, 0.01, 0.012, M["feltDark"], (PX, yy - 0.014, DZ + DD / 2 - 0.004), bev=0.002)
    yy -= rh
box("desk_modesty", DW - PW - 0.12, 0.3, 0.018, M["matte"], (-PW / 2 + 0.01, TOP - DT - 0.17, DZ - DD / 2 + 0.06), bev=0.003)

# ================================================================ monitores curvos em arco
MW, MH, MR = 0.6, 0.3375, 1.0
MONS = [(-0.63, 0.42, 0.13), (0.0, 0.0, 0.0), (0.63, -0.42, 0.13)]
for i, (mx, ry, fz) in enumerate(MONS):
    root = empty(f"monitor_{i}", None, (mx, TOP, DZ - 0.12 + fz), (0, ry, 0))
    slab(f"mon_foot_{i}", 0.27, 0.2, 0.012, 0.09, M["gloss"], (0, 0.006, -0.06), parent=root)
    box(f"mon_neck_{i}", 0.075, 0.33, 0.022, M["gloss"], (0, 0.17, -0.085), (0.1, 0, 0), bev=0.01, seg=4, parent=root)
    box(f"mon_hinge_{i}", 0.1, 0.05, 0.03, M["gloss"], (0, 0.3, -0.07), bev=0.01, parent=root)
    panel = empty(f"mon_panel_{i}", root, (0, 0.34, -0.03), (-0.05, 0, 0))
    for nm, bw, bh, bd, z, m_ in [
        ("bezel", MW + 0.01, MH + 0.012, 0.008, 0.0, M["black"]),
        ("shell", MW + 0.008, MH + 0.01, 0.014, -0.011, M["gloss"]),
        ("bulge", MW * 0.56, MH * 0.62, 0.03, -0.03, M["gloss"]),
    ]:
        bm = bm_box(bw, bh, bd, segx=40)
        bm.transform(Matrix.Translation((0, -MH * 0.04 if nm == "bulge" else 0, z)))
        bend(bm, MR)
        o = mesh_obj(f"mon_{nm}_{i}", bm, m_)
        bevel(o, 0.003 if nm != "bulge" else 0.012, 3, 0.6)
        place(o, parent=panel)
    sb = bm_plane(MW, MH, 40, 1)
    sb.transform(Matrix.Translation((0, 0, 0.0042)))
    bend(sb, MR)
    place(mesh_obj(f"screen_{i}", sb, M["screen"], kind="dynamic"), parent=panel)
    if i == 1:
        # barra de luz sobre o monitor central
        bar = empty("lightbar", root, (0, 0.34 + MH / 2 + 0.024, -0.06))
        cyl("bar_body", 0.011, 0.011, 0.46, M["black"], (0, 0, 0), (0, 0, math.pi / 2), seg=24, parent=bar)
        for sx in (-1, 1):
            cyl("bar_cap", 0.0115, 0.0115, 0.012, M["alu"], (sx * 0.23, 0, 0), (0, 0, math.pi / 2), seg=24, parent=bar)
        box("bar_clip", 0.04, 0.05, 0.03, M["black"], (0, -0.025, -0.03), bev=0.006, parent=bar)
        place(mesh_obj("bar_glow", bm_plane(0.42, 0.008), M["glowBar"], kind="dynamic"), (0, -0.0105, 0.004), (math.pi / 2 + 0.5, 0, 0), parent=bar)

# ================================================================ sobre a mesa
slab("desk_mat", 1.05, 0.38, 0.003, 0.02, M["felt"], (0, TOP + 0.0015, DZ + 0.2), bev=0.001)
# teclado baixo, branco
kb = empty("keyboard", None, (-0.08, TOP + 0.003, DZ + 0.2), (0, 0, 0))
slab("kb_base", 0.44, 0.14, 0.012, 0.01, M["gloss"], (0, 0.006, 0), (0.04, 0, 0), parent=kb)
u = 0.019
rows = [
    [1] * 13 + [1.5],
    [1.5] + [1] * 13,
    [1.75] + [1] * 11 + [1.75],
    [2.25] + [1] * 10 + [2.25],
    [1, 1, 1.25, 1.25, 5.5, 1.25, 1, 1, 1],
]
for ri, row in enumerate(rows):
    total = sum(row)
    x = -total * u / 2
    for ci, wu in enumerate(row):
        kw = wu * u - 0.0026
        box("key", kw, 0.007, u - 0.0026, M["purple"] if (ri == 0 and ci == 0) else M["keyLegend"], (x + wu * u / 2, 0.016 + ri * 0.0011, -0.048 + ri * u), (0.04, 0, 0), bev=0.0022, seg=2, parent=kb)
        x += wu * u
# mouse
mbm = bm_lathe([(0.0, 0.0), *[(math.sin(t / 16 * math.pi) * 0.031 * (1 - 0.15 * t / 16), t / 16 * 0.11) for t in range(1, 16)], (0.0, 0.11)], 40)
mbm.transform(Matrix.Rotation(math.pi / 2, 4, "X"))
for v in mbm.verts:
    v.co.y = max(0.0, v.co.y) * 0.55
mbm.transform(Matrix.Translation((0, 0.001, -0.055)))
place(mesh_obj("mouse", mbm, M["gloss"], smooth=True), (0.3, TOP + 0.003, DZ + 0.23), (0, -0.1, 0))
# caneca
lathe("mug", [(0, 0), (0.036, 0), (0.04, 0.004), (0.042, 0.095), (0.039, 0.098), (0.037, 0.095), (0.035, 0.01), (0, 0.01)], M["ceramic"], (-0.88, TOP, DZ + 0.2))
tube("mug_handle", [(0.041, 0.075, 0), (0.066, 0.07, 0), (0.07, 0.045, 0), (0.06, 0.028, 0), (0.041, 0.025, 0)], 0.0065, M["ceramic"], pos=(-0.88, TOP, DZ + 0.2), r=(0, 2.3, 0))
cyl("coffee", 0.035, 0.035, 0.002, M["coffee"], (-0.88, TOP + 0.082, DZ + 0.2), seg=32)

# notebook: base fica (faz sombra no bake), tampa é animada
lap = empty("laptop", None, (0.82, TOP, DZ + 0.22), (0, -0.38, 0))
LW, LD = 0.31, 0.215
lb = slab("lap_base", LW, LD, 0.011, 0.01, M["alu"], (0, 0.0055, 0), kind="occluder", parent=lap)
plane("lap_well", LW * 0.86, LD * 0.42, M["darkGlass"], (0, 0.0112, -0.03), (-math.pi / 2, 0, 0), kind="occluder", parent=lap)
plane("lap_pad", LW * 0.4, LD * 0.3, M["alu"], (0, 0.0112, 0.06), (-math.pi / 2, 0, 0), kind="occluder", parent=lap)
lid = empty("laptop_lid", lap, (0, 0.011, -LD / 2))
slab("lid_shell", LW, LD, 0.006, 0.01, M["alu"], (0, LD / 2, -0.003), (math.pi / 2, 0, 0), kind="dynamic", parent=lid)
plane("lid_bezel", LW - 0.006, LD - 0.006, M["darkGlass"], (0, LD / 2, 0.0002), kind="dynamic", parent=lid)
plane("laptop_screen", LW - 0.02, LD - 0.03, M["screen"], (0, LD / 2 + 0.003, 0.0004), kind="dynamic", parent=lid)

# luminária articulada branca: base fixa, braços seguem o cursor
LX, LZ = -1.2, DZ - 0.22
lathe("lamp_base", [(0, 0), (0.085, 0), (0.088, 0.008), (0.08, 0.018), (0.02, 0.024), (0, 0.024)], M["gloss"], (LX, TOP, LZ))
yaw = empty("lamp_yaw", None, (LX, TOP + 0.024, LZ))
cyl("lamp_j0", 0.014, 0.014, 0.02, M["frame"], (0, 0, 0), kind="dynamic", parent=yaw)
arm1 = empty("lamp_arm1", yaw, (0, 0, 0), (0, 0, 0.35))
cyl("lamp_rod1", 0.006, 0.006, 0.36, M["gloss"], (0, 0.18, 0), kind="dynamic", parent=arm1, seg=12)
elbow = empty("lamp_elbow", arm1, (0, 0.36, 0))
cyl("lamp_j1", 0.013, 0.013, 0.02, M["frame"], (0, 0, 0), (math.pi / 2, 0, 0), kind="dynamic", parent=elbow)
arm2 = empty("lamp_arm2", elbow, (0, 0, 0), (0, 0, -1.55))
cyl("lamp_rod2", 0.006, 0.006, 0.32, M["gloss"], (0, 0.16, 0), kind="dynamic", parent=arm2, seg=12)
head = empty("lamp_head", arm2, (0, 0.32, 0))
cyl("lamp_j2", 0.012, 0.012, 0.02, M["frame"], (0, 0, 0), (math.pi / 2, 0, 0), kind="dynamic", parent=head)
pivot = empty("lamp_pivot", head)
sh = bm_lathe([(0.012, 0), (0.02, 0.01), (0.03, 0.04), (0.06, 0.1), (0.062, 0.102), (0.058, 0.102), (0.028, 0.042), (0.018, 0.012), (0.01, 0.003)], 40)
sh.transform(Matrix.Rotation(math.pi, 4, "X"))
place(mesh_obj("lamp_shade", sh, M["gloss"], kind="dynamic", smooth=True), parent=pivot)

# gabinete branco com vidro
PCX, PCZ = 1.2, DZ - 0.1
pc = empty("pc", None, (PCX, TOP, PCZ))
pw_, ph_, pd_ = 0.24, 0.46, 0.42
for dims, pos in [
    ((pw_, 0.02, pd_), (0, 0.022, 0)),
    ((pw_, 0.02, pd_), (0, ph_ - 0.01, 0)),
    ((pw_, ph_, 0.012), (0, ph_ / 2, -pd_ / 2 + 0.006)),
    ((0.012, ph_, pd_), (pw_ / 2 - 0.006, ph_ / 2, 0)),
    ((0.016, ph_, 0.016), (-pw_ / 2 + 0.008, ph_ / 2, pd_ / 2 - 0.008)),
    ((0.016, ph_, 0.016), (pw_ / 2 - 0.008, ph_ / 2, pd_ / 2 - 0.008)),
    ((0.016, ph_, 0.016), (-pw_ / 2 + 0.008, ph_ / 2, -pd_ / 2 + 0.008)),
]:
    box("pc_panel", *dims, M["gloss"], pos, bev=0.004, parent=pc)
for x_, z_ in [(-1, 1), (1, 1), (-1, -1), (1, -1)]:
    cyl("pc_foot", 0.014, 0.016, 0.012, M["rubber"], (x_ * (pw_ / 2 - 0.03), 0.006, z_ * (pd_ / 2 - 0.04)), parent=pc, seg=16)
box("pc_board", 0.01, ph_ * 0.7, pd_ * 0.62, M["pcb"], (pw_ / 2 - 0.02, ph_ * 0.55, -0.04), parent=pc)
box("pc_gpu", 0.16, 0.05, pd_ * 0.7, M["gloss"], (pw_ / 2 - 0.1, ph_ * 0.36, -0.02), bev=0.008, parent=pc)
for k in range(3):
    cyl("pc_gpu_fan", 0.03, 0.03, 0.004, M["blade"], (pw_ / 2 - 0.1, ph_ * 0.36 - 0.027, -0.13 + k * 0.1), parent=pc, seg=24)
cyl("pc_cooler", 0.035, 0.035, 0.03, M["gloss"], (pw_ / 2 - 0.045, ph_ * 0.7, -0.06), (0, 0, math.pi / 2), parent=pc)
for k in range(4):
    box("pc_ram", 0.004, 0.035, 0.11, M["gloss"], (pw_ / 2 - 0.035 - k * 0.008, ph_ * 0.7 + 0.01, 0.05), bev=0.001, parent=pc)
tor = bmesh.new()
for k in range(3):
    fy = 0.09 + k * 0.135
    fz = pd_ / 2 - 0.03
    box("pc_fan_housing", 0.12, 0.125, 0.022, M["gloss"], (0, fy, fz), bev=0.01, parent=pc)
    ring = mesh_obj(f"fan_ring_{k}", bm_tube([(0.052 * math.cos(a), 0.052 * math.sin(a), 0) for a in [t / 12 * math.tau for t in range(12)]], 0.0035, 6, True), M["fanB"] if k == 1 else M["fanA"], kind="dynamic", smooth=True)
    place(ring, (0, fy, fz + 0.012), parent=pc)
    bl = bmesh.new()
    for b_ in range(7):
        a = b_ / 7 * math.tau
        c, s_ = math.cos(a), math.sin(a)
        v0 = bl.verts.new((0.012 * c, 0.012 * s_, 0))
        v1 = bl.verts.new((0.048 * math.cos(a + 0.25), 0.048 * math.sin(a + 0.25), 0.004))
        v2 = bl.verts.new((0.048 * math.cos(a + 0.75), 0.048 * math.sin(a + 0.75), 0.004))
        v3 = bl.verts.new((0.012 * math.cos(a + 0.6), 0.012 * math.sin(a + 0.6), 0))
        bl.faces.new((v0, v1, v2, v3))
    hub = bmesh.ops.create_circle(bl, cap_ends=True, segments=20, radius=0.016)
    place(mesh_obj(f"fan_blades_{k}", bl, M["blade"], kind="dynamic"), (0, fy, fz + 0.011), parent=pc)
place(mesh_obj("cool_ring", bm_tube([(0, 0.03 * math.cos(a), 0.03 * math.sin(a)) for a in [t / 12 * math.tau for t in range(12)]], 0.003, 6, True), M["fanA"], kind="dynamic", smooth=True), (pw_ / 2 - 0.061, ph_ * 0.7, -0.06), parent=pc)


# ---- folhagem de verdade: cada folha é uma malha com nervura dobrada
def bm_leaf(length, width, fold=0.25, droop=0.15, seg=7):
    bm = bmesh.new()
    left, right, mid = [], [], []
    for i in range(seg + 1):
        t = i / seg
        w = math.sin(math.pi * min(1, t * 1.08)) ** 0.8 * width / 2
        y = t * length
        drop = -droop * length * t * t
        mid.append(bm.verts.new((0, y, drop)))
        if 0 < i < seg:
            left.append(bm.verts.new((-w, y, drop + w * fold)))
            right.append(bm.verts.new((w, y, drop + w * fold)))
    for i in range(seg):
        if i == 0:
            bm.faces.new((mid[0], right[0], mid[1]))
            bm.faces.new((mid[0], mid[1], left[0]))
        elif i == seg - 1:
            bm.faces.new((mid[i], right[i - 1], mid[i + 1]))
            bm.faces.new((mid[i], mid[i + 1], left[i - 1]))
        else:
            bm.faces.new((mid[i], right[i - 1], right[i], mid[i + 1]))
            bm.faces.new((mid[i], mid[i + 1], left[i], left[i - 1]))
    return bm


def foliage(name, clumps, length, width, mats, seed, pos, parent=None, r=(0, 0, 0)):
    """Junta várias folhas num só objeto, viradas para fora de cada tufo."""
    rr = random.Random(seed)
    big = bmesh.new()
    for cx, cy, cz, rad, n in clumps:
        for _ in range(n):
            uu = rr.uniform(-1, 1)
            a = rr.uniform(0, math.tau)
            s_ = math.sqrt(1 - uu * uu)
            d = Vector((s_ * math.cos(a), abs(uu) * 0.7 + 0.15, s_ * math.sin(a))).normalized()
            base = Vector((cx, cy, cz)) + d * rad * rr.uniform(0.35, 0.8)
            lf = bm_leaf(length * rr.uniform(0.75, 1.2), width * rr.uniform(0.8, 1.15), droop=rr.uniform(0.05, 0.3))
            # folha nasce em +y; vira para a direção d com giro aleatório
            q = Vector((0, 1, 0)).rotation_difference(d.lerp(Vector((0, 1, 0)), 0.2).normalized())
            spin = Matrix.Rotation(rr.uniform(0, math.tau), 4, "Y")
            lf.transform(Matrix.Translation(base) @ q.to_matrix().to_4x4() @ spin)
            mi = 0 if rr.random() < 0.65 else 1
            tmp = bpy.data.meshes.new("tmp")
            lf.to_mesh(tmp)
            for p in tmp.polygons:
                p.material_index = mi
            big.from_mesh(tmp)
            bpy.data.meshes.remove(tmp)
            lf.free()
    o = mesh_obj(name, big, mats, smooth=True)
    return place(o, pos, r, parent)


# plantinhas na mesa
for k, (px_, pz_, sc) in enumerate([(-0.98, DZ - 0.2, 1.0), (0.98, DZ - 0.26, 0.85)]):
    lathe("desk_pot", [(0, 0), (0.05 * sc, 0), (0.056 * sc, 0.005), (0.06 * sc, 0.09 * sc), (0.062 * sc, 0.095 * sc), (0.055 * sc, 0.095 * sc), (0, 0.085 * sc)], M["ceramic"], (px_, TOP, pz_))
    rr = random.Random(3 + k)
    cl = [(rr.uniform(-0.04, 0.04) * sc, (0.12 + rr.uniform(0, 0.07)) * sc, rr.uniform(-0.04, 0.04) * sc, 0.07 * sc, 22) for _ in range(6)]
    foliage("desk_plant", cl, 0.055 * sc, 0.032 * sc, [M["leaf"], M["leafB"]], 11 + k, (px_, TOP, pz_))

# figueira grande no canto
FX_, FZ_ = -3.25, BACK + 0.55
lathe("fig_pot", [(0, 0), (0.15, 0), (0.17, 0.02), (0.19, 0.42), (0.2, 0.44), (0.185, 0.445), (0.175, 0.42), (0, 0.42)], M["ceramic"], (FX_, 0, FZ_))
cyl("fig_soil", 0.175, 0.175, 0.01, M["soil"], (FX_, 0.415, FZ_))
trunk = [(0, 0.41, 0), (0.02, 0.8, 0.01), (-0.01, 1.2, -0.02), (0.03, 1.55, 0.02)]
tube("fig_trunk", trunk, 0.016, M["bark"], pos=(FX_, 0, FZ_))
fig = bmesh.new()
rr = random.Random(4)
for i in range(34):
    t = 0.25 + i / 34 * 0.75
    k_ = min(2, int(t * 3))
    p0, p1 = Vector(trunk[k_]), Vector(trunk[k_ + 1])
    at = p0.lerp(p1, t * 3 - k_)
    a = i * 2.39996 + rr.uniform(0, 0.4)
    stem = Vector((math.cos(a) * 0.06, 0.03, math.sin(a) * 0.06))
    lf = bm_leaf(0.3 * (0.75 + t * 0.45), 0.17 * (0.8 + t * 0.4), fold=0.3, droop=0.2, seg=9)
    q = Vector((0, 1, 0)).rotation_difference(Vector((math.cos(a), 0.9 - t * 0.4, math.sin(a))).normalized())
    lf.transform(Matrix.Translation(at + stem) @ q.to_matrix().to_4x4() @ Matrix.Rotation(rr.uniform(-0.4, 0.4), 4, "Y"))
    tmp = bpy.data.meshes.new("tmp")
    lf.to_mesh(tmp)
    for p in tmp.polygons:
        p.material_index = i % 3 == 0
    fig.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    lf.free()
place(mesh_obj("fig_leaves", fig, [M["leaf"], M["leafB"]], smooth=True), (FX_, 0, FZ_))

# ================================================================ prateleira flutuante, miniaturas, bonsai
SY = 2.26
box("float_shelf", 1.8, 0.035, 0.24, M["matte"], (0, SY, BACK + 0.12), bev=0.004)
place(mesh_obj("shelf_glow", bm_plane(1.74, 0.01), M["glowBar"], kind="dynamic"), (0, SY - 0.0181, BACK + 0.03), (math.pi / 2, 0, 0))
STOP = SY + 0.0175


def race_car(name, liv, acc, pos, ry):
    root = empty(name, None, pos, (0, ry, 0))
    Lc = 0.5
    prof = [(-Lc / 2, 0.035), (-Lc / 2 + 0.12, 0.04), (-0.04, 0.06), (0.0, 0.075), (0.06, 0.085), (0.12, 0.096), (0.17, 0.08), (Lc / 2 - 0.04, 0.06), (Lc / 2 - 0.04, 0.03), (-Lc / 2 + 0.02, 0.025)]
    bm = bmesh.new()
    fr = [bm.verts.new((x, y, 0.035)) for x, y in prof]
    bk = [bm.verts.new((x, y, -0.035)) for x, y in prof]
    bm.faces.new(fr)
    bm.faces.new(list(reversed(bk)))
    for i_ in range(len(prof)):
        j_ = (i_ + 1) % len(prof)
        bm.faces.new((fr[i_], bk[i_], bk[j_], fr[j_]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    # bico afina
    for v in bm.verts:
        k_ = max(0, min(1, (v.co.x + Lc / 2) / (Lc / 2 - 0.02)))
        v.co.z *= 0.35 + 0.65 * (k_ * k_ * (3 - 2 * k_))
    o = mesh_obj(f"{name}_body", bm, liv)
    bevel(o, 0.008, 3, 0.5)
    subsurf(o, 1)
    place(o, parent=root)
    for sz in (-1, 1):
        box(f"{name}_pod", 0.16, 0.035, 0.04, liv, (0.07, 0.05, sz * 0.06), bev=0.012, parent=root)
        box(f"{name}_ep", 0.07, 0.06, 0.004, liv, (Lc / 2 - 0.035, 0.09, sz * 0.08), bev=0.0015, parent=root)
        box(f"{name}_fe", 0.07, 0.025, 0.004, liv, (-Lc / 2 + 0.025, 0.028, sz * 0.1), bev=0.0015, parent=root)
    box(f"{name}_fw", 0.06, 0.006, 0.2, acc, (-Lc / 2 + 0.02, 0.02, 0), bev=0.002, parent=root)
    box(f"{name}_rw", 0.05, 0.008, 0.16, acc, (Lc / 2 - 0.03, 0.11, 0), bev=0.002, parent=root)
    box(f"{name}_rw2", 0.04, 0.008, 0.16, acc, (Lc / 2 - 0.045, 0.098, 0), bev=0.002, parent=root)
    tube(f"{name}_halo", [(0.075, 0.075, -0.03), (0.06, 0.105, -0.025), (0.035, 0.11, 0), (0.06, 0.105, 0.025), (0.075, 0.075, 0.03)], 0.004, M["black"], 8, parent=root)
    for x, z, s_ in [(-Lc / 2 + 0.09, 0.105, 0.9), (-Lc / 2 + 0.09, -0.105, 0.9), (Lc / 2 - 0.1, 0.11, 1.1), (Lc / 2 - 0.1, -0.11, 1.1)]:
        cyl(f"{name}_tire", 0.038 * s_, 0.038 * s_, 0.044 * s_, M["rubber"], (x, 0.038 * s_, z), (math.pi / 2, 0, 0), seg=28, bev=0.008, parent=root)
        cyl(f"{name}_rim", 0.022 * s_, 0.022 * s_, 0.046 * s_, acc, (x, 0.038 * s_, z), (math.pi / 2, 0, 0), seg=20, parent=root)


race_car("car_a", M["livA"], M["purple"], (-0.52, STOP, BACK + 0.12), 0.25)
race_car("car_b", M["livB"], M["cyan"], (0.55, STOP, BACK + 0.12), math.pi - 0.25)
# bonsai
bz = empty("bonsai", None, (0.02, STOP, BACK + 0.12))
box("bonsai_pot", 0.2, 0.045, 0.13, M["ceramic"], (0, 0.0225, 0), bev=0.008, parent=bz)
box("bonsai_soil", 0.185, 0.004, 0.115, M["soil"], (0, 0.044, 0), bev=0.001, parent=bz)
tube("bonsai_trunk", [(0, 0.04, 0), (0.03, 0.09, 0.01), (-0.02, 0.15, 0), (0.02, 0.21, -0.01)], 0.012, M["bark"], parent=bz)
tube("bonsai_branch", [(-0.01, 0.13, 0), (-0.07, 0.15, 0.01), (-0.1, 0.17, 0)], 0.006, M["bark"], parent=bz)
foliage("bonsai_leaves", [(0.02, 0.25, -0.01, 0.06, 110), (-0.1, 0.19, 0, 0.045, 70), (0.08, 0.18, 0.01, 0.04, 60)], 0.03, 0.016, [M["leaf"], M["leafB"]], 21, (0, 0, 0), parent=bz)
# fita de luz na parede (só para o bake: área fraca embaixo da prateleira)

# ================================================================ estante com livros (canto direito)
bs = empty("bookshelf", None, (2.55, 0, BACK + 0.14))
rb = random.Random(11)
for li, y in enumerate([0.95, 1.38, 1.81]):
    slab("shelf", 1.1, 0.26, 0.03, 0.01, M["oak"], (0, y, 0), parent=bs)
    x = -0.5
    end = -0.02 if li == 1 else 0.25
    while x < end:
        bw, bh, bd = 0.022 + rb.random() * 0.02, 0.2 + rb.random() * 0.07, 0.15 + rb.random() * 0.05
        lean = -0.18 if x > end - 0.05 else 0
        box("book", bw, bh, bd, M["books"][rb.randrange(8)], (x + bw / 2, y + 0.015 + bh / 2, -0.01 + (rb.random() - 0.5) * 0.02), (0, 0, lean), bev=0.002, seg=2, parent=bs)
        x += bw + 0.003
lathe("vase", [(0, 0), (0.04, 0), (0.055, 0.06), (0.03, 0.15), (0.022, 0.2), (0.026, 0.205), (0, 0.205)], M["ceramic"], (0.35, 0.965, 0), parent=bs)
box("speaker", 0.13, 0.2, 0.14, M["gloss"], (0.33, 1.38 + 0.115, 0), bev=0.02, seg=4, parent=bs)
cyl("speaker_cone", 0.04, 0.04, 0.004, M["black"], (0.33, 1.38 + 0.09, 0.071), (math.pi / 2, 0, 0), parent=bs)
for i in range(4):
    box("book_flat", 0.24 - i * 0.015, 0.03, 0.17, M["books"][(i * 3) % 8], (0.1, 1.81 + 0.03 + i * 0.03, 0), (0, (rb.random() - 0.5) * 0.15, 0), bev=0.002, seg=2, parent=bs)

# ================================================================ quadro de serviços (parede direita)
bw_, bh_ = 2.0, 1.125
brd = empty("board", None, (W / 2 - 0.035, 1.5, -0.25), (0, -math.pi / 2, 0))
box("board_glass", bw_ + 0.04, bh_ + 0.04, 0.012, M["gloss"], (0, 0, 0), bev=0.008, parent=brd)
for sx in (-1, 1):
    for sy in (-1, 1):
        cyl("board_stud", 0.012, 0.012, 0.03, M["chrome"], (sx * (bw_ - 0.06) / 2, sy * (bh_ - 0.06) / 2, 0.01), (math.pi / 2, 0, 0), parent=brd)
place(mesh_obj("board_face", bm_plane(bw_, bh_), M["board"], kind="dynamic"), (0, 0, 0.0065), parent=brd)
box("board_tray", 0.5, 0.015, 0.05, M["gloss"], (0.6, -bh_ / 2 - 0.035, 0.025), bev=0.004, parent=brd)

# ================================================================ tapete
r_ = slab("rug", 2.8, 1.9, 0.012, 0.05, M["rug"], (0.2, 0.006, DZ + 1.15), bev=0.004)

# ================================================================ cadeira ergonômica (animada)
chair = empty("chair", None, (0.45, 0, DZ + 0.8), (0, -0.15, 0))
CH = []


def ch(o):
    CH.append(o)
    return o


# base de cinco pés
leg = bmesh.new()
for i in range(5):
    a = i / 5 * math.tau
    lb_ = bm_box(0.31, 0.03, 0.045)
    lb_.transform(Matrix.Translation((0.165, 0.085, 0)))
    for v in lb_.verts:
        t_ = (v.co.x - 0.01) / 0.31
        v.co.z *= 1 - 0.45 * t_
        v.co.y -= 0.02 * t_ * (v.co.y > 0.085)
    lb_.transform(Matrix.Rotation(a, 4, "Y"))
    tmp = bpy.data.meshes.new("tmp")
    lb_.to_mesh(tmp)
    leg.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    lb_.free()
o = mesh_obj("chair_legs", leg, M["frame"], kind="dynamic")
bevel(o, 0.008, 3, 0.5)
ch(place(o, parent=chair))
# rodízios
for i in range(5):
    a = i / 5 * math.tau
    for sd in (-1, 1):
        c_ = cyl("caster", 0.025, 0.025, 0.014, M["rubber"], (math.cos(a) * 0.31 + sd * 0.011 * math.sin(a), 0.025, -math.sin(a) * 0.31 + sd * 0.011 * math.cos(a)), (0, a + 0.6, math.pi / 2), seg=20, kind="dynamic", parent=chair)
        ch(c_)
    ch(cyl("caster_hood", 0.02, 0.02, 0.02, M["frame"], (math.cos(a) * 0.31, 0.045, -math.sin(a) * 0.31), seg=16, kind="dynamic", parent=chair))
ch(cyl("chair_hub", 0.045, 0.055, 0.05, M["frame"], (0, 0.1, 0), kind="dynamic", parent=chair))
ch(cyl("chair_gas", 0.022, 0.022, 0.18, M["chrome"], (0, 0.22, 0), seg=20, kind="dynamic", parent=chair))
ch(cyl("chair_sleeve", 0.03, 0.034, 0.12, M["frame"], (0, 0.17, 0), kind="dynamic", parent=chair))
ch(box("chair_mech", 0.2, 0.04, 0.24, M["frame"], (0, 0.33, 0), bev=0.01, kind="dynamic", parent=chair))
seat = mesh_obj("chair_seat", bm_rounded_slab(0.5, 0.48, 0.07, 0.09, 6), M["fabric"], kind="dynamic")
bevel(seat, 0.025, 4, 0.5)
ch(place(seat, (0, 0.39, 0), parent=chair))
ch(slab("chair_shell", 0.48, 0.46, 0.02, 0.085, M["frame"], (0, 0.35, 0), kind="dynamic", parent=chair))
# encosto de tela curvo com aro, apoio lombar e encosto de cabeça
R_, TH, BH = 0.55, 0.85, 0.56
backG = empty("chair_back", chair, (0, 0.83, 0.55 + 0.23), (-0.12, 0, 0))


def curved_net(name, th, hh, m):
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    nx, ny = 24, 6
    grid = [[bm.verts.new((math.sin(math.pi + (i / nx - 0.5) * th) * R_, (j / ny - 0.5) * hh, math.cos(math.pi + (i / nx - 0.5) * th) * R_)) for i in range(nx + 1)] for j in range(ny + 1)]
    for j in range(ny):
        for i in range(nx):
            f = bm.faces.new((grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]))
            for lp, (a, b) in zip(f.loops, [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]):
                lp[uvl].uv = (a / nx * 6, b / ny * 4)
    return mesh_obj(name, bm, m, kind="dynamic", smooth=True)


def rim(name, th, hh, rad):
    pts = []
    for k in range(20):
        t = k / 20 * math.tau
        ax_, ay_ = math.cos(t), math.sin(t)
        kx = abs(ax_) ** 0.25 * (1 if ax_ >= 0 else -1)
        ky = abs(ay_) ** 0.25 * (1 if ay_ >= 0 else -1)
        ang = math.pi + kx * th / 2 * 0.98
        pts.append((math.sin(ang) * R_, ky * hh / 2 * 0.98, math.cos(ang) * R_))
    return mesh_obj(name, bm_tube(pts, rad, 8, True), M["frame"], kind="dynamic", smooth=True)


ch(place(curved_net("chair_net", TH, BH, M["net"]), parent=backG))
ch(place(rim("chair_rim", TH, BH, 0.014), parent=backG))
lum = bm_box(0.36, 0.07, 0.03, segx=12)
bend(lum, -R_ + 0.02)
ch(place(mesh_obj("chair_lumbar", lum, M["frame"], kind="dynamic", smooth=True), (0, -BH * 0.22, -R_ + 0.035), parent=backG))
hr = empty("chair_head", backG, (0, BH / 2 + 0.11, 0))
ch(place(curved_net("chair_head_net", 0.56, 0.13, M["net"]), parent=hr))
ch(place(rim("chair_head_rim", 0.56, 0.13, 0.016), parent=hr))
ch(box("chair_head_stem", 0.05, 0.14, 0.02, M["frame"], (0, BH / 2 + 0.03, -R_ + 0.012), bev=0.008, kind="dynamic", parent=backG))
# haste que liga encosto e assento
ch(tube("chair_spine", [(0, 0.35, 0.05), (0, 0.4, 0.18), (0, 0.55, 0.24), (0, 0.72, 0.24)], 0.022, M["frame"], 10, kind="dynamic", parent=chair))
for sx in (-1, 1):
    ch(box("chair_post", 0.03, 0.22, 0.05, M["frame"], (sx * 0.27, 0.48, 0.05), bev=0.008, kind="dynamic", parent=chair))
    ch(box("chair_pad", 0.07, 0.025, 0.24, M["fabric"], (sx * 0.27, 0.6, 0.02), bev=0.012, seg=4, kind="dynamic", parent=chair))
    ch(box("chair_brace", 0.03, 0.02, 0.14, M["frame"], (sx * 0.2, 0.36, 0.05), (0, 0, sx * 0.6), bev=0.006, kind="dynamic", parent=chair))

# ================================================================ aplica modificadores e junta o que é fixo
bpy.context.view_layer.update()


def apply_mods(objs):
    for o in objs:
        if o.type != "MESH" or not o.modifiers:
            continue
        dg = bpy.context.evaluated_depsgraph_get()
        ev = o.evaluated_get(dg)
        me = bpy.data.meshes.new_from_object(ev, preserve_all_data_layers=True, depsgraph=dg)
        o.modifiers.clear()
        old = o.data
        o.data = me
        bpy.data.meshes.remove(old)


all_mesh = [o for o in scene.objects if o.type == "MESH"]
apply_mods(all_mesh)


def join(objs, name):
    """Junta mantendo a posição no mundo (desfaz parentesco antes)."""
    for o in objs:
        mw = o.matrix_world.copy()
        o.parent = None
        o.matrix_world = mw
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    j = bpy.context.view_layer.objects.active
    j.name = name
    j.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return j


static = join(STATIC, "static")

# faces do lado de fora da sala não aparecem e só gastariam lightmap
bm_ = bmesh.new()
bm_.from_mesh(static.data)
cut = []
for f in bm_.faces:
    c = C3.transposed() @ f.calc_center_median()
    n_ = C3.transposed() @ f.normal
    out = (
        (n_.x < -0.9 and c.x < L - REV + 0.005)
        or (n_.x > 0.9 and c.x > W / 2 + 0.01)
        or (abs(n_.x) > 0.9 and abs(c.x) > W / 2 + 0.15)
        or (n_.z < -0.9 and c.z < BACK - 0.01)
        or (n_.z > 0.9 and c.z > FRONT - 0.01)
        or (abs(n_.z) > 0.9 and (c.z < BACK - 0.15 or c.z > FRONT + 0.05))
        or (n_.y < -0.9 and c.y < -0.01)
        or (n_.y > 0.9 and c.y > H + 0.01)
    )
    if out:
        cut.append(f)
bmesh.ops.delete(bm_, geom=cut, context="FACES")
bm_.to_mesh(static.data)
bm_.free()
print("faces cortadas", len(cut))
# a cadeira vira um objeto só, com origem no centro do pé
chair_mesh = [o for o in scene.objects if o.type == "MESH" and (o in CH or (o.parent and o.parent.name.startswith("chair")))]
cm = chair.matrix_world.copy()
for o in chair_mesh:
    mw = o.matrix_world.copy()
    o.parent = None
    o.matrix_world = mw
bpy.ops.object.select_all(action="DESELECT")
for o in chair_mesh:
    o.select_set(True)
bpy.context.view_layer.objects.active = chair_mesh[0]
bpy.ops.object.join()
cj = bpy.context.view_layer.objects.active
cj.name = "chair_mesh"
cj.data.transform(cm.inverted() @ cj.matrix_world)
cj.matrix_world = Matrix.Identity(4)
cj.parent = chair
for e in [o for o in scene.objects if o.type == "EMPTY" and o.name.startswith("chair_") and not o.children]:
    bpy.data.objects.remove(e)

# UV de lightmap: segunda camada, ilhas empacotadas por área
me = static.data
me.uv_layers.new(name="Lightmap")
me.uv_layers.active = me.uv_layers["Lightmap"]
bpy.ops.object.select_all(action="DESELECT")
static.select_set(True)
bpy.context.view_layer.objects.active = static
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.0, area_weight=0.0, scale_to_bounds=False)
bpy.ops.uv.pack_islands(margin=0.0015, rotate=True)
bpy.ops.object.mode_set(mode="OBJECT")
me.uv_layers.active = me.uv_layers["UVMap"]
print("static tris", sum(len(p.vertices) - 2 for p in me.polygons))

# ================================================================ luz e bake
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = SAMPLES
scene.cycles.max_bounces = 6
scene.cycles.diffuse_bounces = 4
scene.cycles.glossy_bounces = 1
world = bpy.data.worlds.new("sky")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]

sun_data = bpy.data.lights.new("sun", "SUN")
sun_data.angle = math.radians(1.2)
sun = link(bpy.data.objects.new("sun", sun_data))
portal_d = bpy.data.lights.new("portal", "AREA")
portal_d.shape = "RECTANGLE"
portal_d.size = z1 - z0
portal_d.size_y = y1 - y0
try:
    portal_d.cycles.is_portal = True
except Exception:
    pass
portal = link(bpy.data.objects.new("portal", portal_d))
place(portal, (L - REV + 0.01, (y0 + y1) / 2, (z0 + z1) / 2), (0, -math.pi / 2, 0))
# área virada para dentro da sala: luz de área aponta para -z local (three) → gira para +x
shelf_l = bpy.data.lights.new("shelf_strip", "AREA")
shelf_l.shape = "RECTANGLE"
shelf_l.size, shelf_l.size_y = 1.7, 0.04
shelf_l.energy = 1.2
shelf_l.color = lin("#FFE6C8")
shelf_lo = link(bpy.data.objects.new("shelf_strip", shelf_l))
place(shelf_lo, (0, SY - 0.02, BACK + 0.04), (math.pi / 2, 0, 0))

# objetos animados não entram no bake (a não ser os que só fazem sombra)
for o in scene.objects:
    if o.type == "MESH" and o is not static and o not in OCCLUDERS:
        o.hide_render = True

DAY = {
    "manha": dict(dir=(0.82, -0.32, -0.42), color="#FFE2C2", k=7.0, sky=("#D6E4F5", 2.4)),
    "tarde": dict(dir=(0.86, -0.26, 0.38), color="#FFC48F", k=6.2, sky=("#F3DCC6", 1.8)),
}


def set_day(d):
    v = Vector(d["dir"]).normalized()
    vb = C3 @ v
    sun.rotation_euler = Vector((0, 0, -1)).rotation_difference(vb).to_euler()
    sun_data.energy = d["k"]
    sun_data.color = lin(d["color"])
    bg.inputs["Color"].default_value = (*lin(d["sky"][0]), 1)
    bg.inputs["Strength"].default_value = d["sky"][1]


def bake(tag):
    img = bpy.data.images.new(f"lm_{tag}", LM_SIZE, LM_SIZE, float_buffer=True, alpha=False)
    for m_ in static.data.materials:
        nt = m_.node_tree
        node = nt.nodes.get("LM") or nt.nodes.new("ShaderNodeTexImage")
        node.name = "LM"
        node.image = img
        nt.nodes.active = node
    bpy.ops.object.select_all(action="DESELECT")
    static.select_set(True)
    bpy.context.view_layer.objects.active = static
    me.uv_layers.active = me.uv_layers["Lightmap"]
    scene.render.bake.margin = 6
    scene.render.bake.use_clear = True
    bpy.ops.object.bake(type="DIFFUSE", pass_filter={"DIRECT", "INDIRECT"}, uv_layer="Lightmap", margin=6)
    img.filepath_raw = os.path.join(OUT, f"luz-{tag}.exr")
    img.file_format = "OPEN_EXR"
    img.save()
    me.uv_layers.active = me.uv_layers["UVMap"]
    print("baked", tag)


PREVIEW = os.environ.get("PREVIEW")
if PREVIEW:
    # vistas rápidas para conferir a modelagem: "cx,cy,cz>lx,ly,lz;..." em coordenadas three
    for o in scene.objects:
        o.hide_render = False
    set_day(DAY[os.environ.get("DAYTAG", "manha")])
    cam_d = bpy.data.cameras.new("cam")
    cam_d.lens_unit = "FOV"
    cam_d.angle_y = math.radians(float(os.environ.get("FOV", "38")))
    cam_d.sensor_fit = "VERTICAL"
    cam = link(bpy.data.objects.new("cam", cam_d))
    scene.camera = cam
    scene.render.resolution_x, scene.render.resolution_y = 960, 600
    scene.cycles.samples = int(os.environ.get("PS", "24"))
    scene.cycles.use_denoising = True
    scene.view_settings.view_transform = "AgX"
    for k, spec in enumerate(PREVIEW.split(";")):
        c_, l_ = [Vector(C3 @ Vector([float(x) for x in part.split(",")])) for part in spec.split(">")]
        cam.location = c_
        cam.rotation_euler = (l_ - c_).to_track_quat("-Z", "Y").to_euler()
        scene.render.filepath = os.path.join(OUT, f"preview-{k}.png")
        bpy.ops.render.render(write_still=True)
    sys.exit(0)

if not ONLY_EXPORT:
    import time

    for tag, d in DAY.items():
        t0 = time.time()
        set_day(d)
        bake(tag)
        print(tag, "s", round(time.time() - t0))
for m_ in static.data.materials:
    n_ = m_.node_tree.nodes.get("LM")
    if n_:
        m_.node_tree.nodes.remove(n_)

# ================================================================ exportação
for o in scene.objects:
    o.hide_render = False
for o in list(scene.objects):
    if o.type == "LIGHT" or o.name.startswith("occ_"):
        bpy.data.objects.remove(o)
bpy.ops.export_scene.gltf(
    filepath=os.path.join(OUT, "estudio-raw.glb"),
    export_format="GLB",
    export_apply=True,
    export_texcoords=True,
    export_normals=True,
    export_materials="EXPORT",
    export_extras=False,
    export_cameras=False,
    export_lights=False,
    export_yup=True,
)
print("ok")
