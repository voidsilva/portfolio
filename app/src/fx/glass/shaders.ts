/*
 * Shaders do vidro (WebGL2). Duas passadas de tela cheia:
 *  1. CENA: a parede viva (aurora + tipografia em movimento) iluminada pelo cursor, e as palavras
 *     de vidro grosso em cima dela: refração espectral (6 comprimentos de onda), absorção,
 *     reflexo de estúdio, brilho especular, luz interna, sombra e cáustica projetadas na parede.
 *  2. INTERFACE: as folhas, o topo e os prints dos projetos como lâminas de vidro sobre a cena
 *     (fosco por mipmap, borda chanfrada com dispersão), lupa de vidro sobre os prints.
 * Coordenadas: px CSS, origem no canto superior esquerdo, y para baixo, z na direção de quem olha.
 */

export const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * .5 + .5;
  gl_Position = vec4(aPos, 0., 1.);
}`;

const COMMON = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uView;
uniform vec2 uRes;
uniform float uTime;
uniform float uDark;
uniform vec3 uLight;
uniform float uLightOn;
uniform float uVel;
uniform vec4 uRip[8];

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
// ondas do clique: inclinação radial que soma na normal do vidro
vec2 ripG(vec2 p) {
  vec2 g = vec2(0.);
  for (int i = 0; i < 8; i++) {
    vec4 r = uRip[i];
    float age = uTime - r.z;
    if (r.w <= 0. || age < 0. || age > 3.2) continue;
    vec2 dv = p - r.xy;
    float dist = length(dv) + .001;
    float w = dist - age * 460.;
    float e = exp(-w * w * .00005) * exp(-age * 1.25) * r.w;
    g += dv / dist * cos(w * .05) * e;
  }
  return g;
}
float box2(vec2 q, vec2 h, float s) {
  vec2 d = abs(q) - h;
  float m = length(max(d, 0.)) + min(max(d.x, d.y), 0.);
  return 1. - smoothstep(-s, s, m);
}
// estúdio fotográfico procedural: céu, duas softboxes que seguem a luz e um rebatedor colorido
vec3 env(vec3 r) {
  float up = -r.y;
  vec3 top = mix(vec3(1., .99, 1.04), vec3(.27, .24, .40), uDark);
  vec3 bot = mix(vec3(.72, .68, .86), vec3(.03, .03, .06), uDark);
  vec3 c = mix(bot, top, smoothstep(-.6, .9, up));
  vec2 a = vec2(atan(r.x, r.z), asin(clamp(up, -1., 1.)));
  vec2 lo = (uLight.xy / uView - .5) * vec2(1.1, -.8);
  vec3 sb = mix(vec3(2.3, 2.25, 2.4), vec3(1.8, 1.7, 2.1), uDark);
  c += sb * box2(a - vec2(-.62, .5) - lo, vec2(.34, .16), .08);
  c += sb * .75 * box2(a - vec2(.95, .08) - lo * .5, vec2(.06, .5), .035);
  c += mix(vec3(.55, .36, .97), vec3(.33, .84, 1.), .45) * .65 * box2(a - vec2(.05, -.82), vec2(.7, .09), .14);
  return c;
}
`;

export const SCENE =
  COMMON +
  `
uniform sampler2D uSdf;
uniform sampler2D uPoster;
uniform float uSlots;
uniform float uSlotA;
uniform float uSlotB;
uniform float uMorph;
uniform vec2 uBevel;
uniform vec4 uBox;     // caixa do atlas das palavras (px CSS)
uniform float uTexel;  // px CSS por texel do atlas
uniform vec2 uWordOff;
uniform vec3 uZoom;    // câmera: foco (px) e escala da palavra (mergulho através do vidro)
uniform float uWall;   // a parede, lá atrás, cresce bem menos (profundidade)
uniform float uWordOn;
uniform vec3 uDrops[5];
uniform float uDropMix;
uniform float uDropR;
uniform float uScroll;
uniform float uPanX;   // a parede desliza devagar quando a câmera anda de lado (profundidade)
uniform float uPosterLod;

const float HG = 46.;  // distância entre o vidro e a parede
const float TB = 22.;  // espessura da base do vidro

float smax(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.) / k;
  return max(a, b) + h * h * k * .25;
}
// distâncias em dois canais: x = silhueta nítida, y = versão suave (dela sai a inclinação do vidro)
vec2 wordD(vec2 p) {
  p.x += sin(p.y * .017 + uTime * 5.) * uVel * 14.;
  p.y += sin(p.x * .011 + uTime * 3.7) * uVel * 8.;
  p = uZoom.xy + (p - uZoom.xy) / uZoom.z;
  vec2 s = (p - uBox.xy - uWordOff) / uBox.zw;
  if (s.x < 0. || s.x > 1. || s.y < 0. || s.y > 1.) return vec2(-500.);
  vec2 d = textureLod(uSdf, vec2(s.x, (s.y + uSlotA) / uSlots), 0.).rg;
  if (uMorph > .001) {
    vec2 b = textureLod(uSdf, vec2(s.x, (s.y + uSlotB) / uSlots), 0.).rg;
    d = mix(d, b, uMorph);
    // derretendo: as letras incham e se fundem numa massa líquida antes de virar a palavra nova
    d += sin(3.14159 * uMorph) * (18. + (vnoise(p * .009 + vec2(0., uTime * .6)) - .5) * 24.);
  }
  return (d - (1. - uWordOn) * 140.) * uZoom.z;
}
vec2 dropsD(vec2 p) {
  float d = -500.;
  for (int i = 0; i < 5; i++) {
    vec3 c = uDrops[i];
    if (c.z < .5) continue;
    d = smax(d, c.z - length(p - c.xy), 48.);
  }
  return vec2(d);
}
vec2 glassD(vec2 p) {
  if (uDropMix > .999) return dropsD(p);
  if (uDropMix < .001) return wordD(p);
  return mix(wordD(p), dropsD(p), uDropMix);
}
float blob(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (r * r));
}
// a parede: aurora em movimento + linhas de tipografia gigante (parallax com a rolagem)
vec3 albedo(vec2 p) {
  float asp = uView.x / uView.y;
  p = uZoom.xy + (p - uZoom.xy) / uWall;
  vec2 u = p / uView.y;
  float t = uTime * .045;
  vec2 w = u + .1 * vec2(vnoise(u * 1.3 + t), vnoise(u * 1.3 - t + 9.)) - .05;
  vec3 col = mix(vec3(.86, .85, .925), vec3(.035, .038, .056), uDark);
  vec3 c1 = vec3(.545, .361, .965);
  vec3 c2 = vec3(.333, .839, 1.);
  vec3 c3 = mix(vec3(.96, .66, .96), vec3(.40, .15, .75), uDark);
  col = mix(col, c1, blob(w, vec2(asp * (.2 + .08 * sin(t * 1.7)), .24 + .1 * cos(t * 1.3)), .6) * mix(.5, .62, uDark));
  col = mix(col, c2, blob(w, vec2(asp * (.84 + .06 * cos(t * 1.2)), .74 + .1 * sin(t)), .5) * mix(.42, .5, uDark));
  col = mix(col, c3, blob(w, vec2(asp * (.55 + .14 * sin(t * .8)), 1.08), .55) * mix(.34, .45, uDark));
  float tileH = uView.y * 1.4;
  float v = (p.y + uScroll * .2) / tileH;
  float row = floor(fract(v) * 4.);
  float dir = mod(row, 2.) < .5 ? 1. : -1.;
  float uu = (p.x + uPanX) / (tileH * 2.) + dir * uTime * (.010 + row * .0025);
  float txt = textureLod(uPoster, vec2(uu, v), uPosterLod).r;
  col = mix(col, mix(vec3(.2, .16, .36), vec3(.9, .88, 1.), uDark), txt * mix(.066, .062, uDark));
  return col;
}
float spotOf(vec2 p) {
  vec2 d = p - uLight.xy;
  return exp(-dot(d, d) / (uView.y * uView.y * mix(.5, .34, uDark)));
}
float lightI(float spot) { return mix(.4 + .6 * spot, .16 + .84 * spot, uDark) * uLightOn * mix(.5, 1.1, uDark); }
float ambI() { return mix(.62, .2, uDark) + (1. - uLightOn) * mix(.3, .1, uDark); }
vec3 lighting(float spot) { return vec3(ambI()) + vec3(1., .98, .96) * lightI(spot); }
vec3 spectrum(float t) {
  return clamp(vec3(1. - smoothstep(0., .55, t), 1. - abs(t - .5) * 2.4, smoothstep(.45, 1., t)), 0., 1.);
}

void main() {
  vec2 p = vec2(vUv.x, 1. - vUv.y) * uView;
  float px = uView.x / uRes.x;
  float R = mix(mix(uBevel.x, uBevel.y, uMorph) * uZoom.z, uDropR, uDropMix);
  float d = glassD(p).x;
  float spot = spotOf(p);

  // ---- parede, com a sombra e a cáustica do vidro na direção oposta à luz ----
  vec3 alb = albedo(p);
  // a palavra encolhida (câmera recuando) fica mais perto da parede: sombra e cáustica encolhem junto
  float hg = HG * min(uZoom.z, 1.);
  vec2 q = mix(p, uLight.xy, hg / uLight.z);
  float dq = glassD(q).x;
  float pen = 3. + length(p - uLight.xy) * .025;
  float foot = smoothstep(-pen, pen, dq);
  float sq = 1. - clamp(dq / R, 0., 1.);
  float lost = foot * (.16 + .5 * smoothstep(.15, .95, sq));
  float cw = R * .3 + pen * .5;
  vec3 caus = vec3(
    exp(-pow((dq - R * .95) / cw, 2.)),
    exp(-pow((dq - R * 1.05) / cw, 2.)),
    exp(-pow((dq - R * 1.15) / cw, 2.))) * foot * vec3(1., .96, 1.04);
  float li = lightI(spot);
  float dk = glassD(p - vec2(0., 28.)).x;
  float key = smoothstep(-30., 12., dk) * mix(.16, .3, uDark);
  vec3 col = alb * (vec3(ambI()) * (1. - key) + li * (1. - lost) + li * caus * 1.25);
  col += vec3(1., .97, .94) * spot * spot * uLightOn * mix(.05, .16, uDark);

  // ---- vidro ----
  if (d > -2. * px) {
    float e = mix(max(1., uTexel * uZoom.z), 1., uDropMix);
    float dx = glassD(p + vec2(e, 0.)).y - glassD(p - vec2(e, 0.)).y;
    float dy = glassD(p + vec2(0., e)).y - glassD(p - vec2(0., e)).y;
    vec2 g = normalize(vec2(dx, dy) + 1e-5);
    float s = min(1. - clamp(d / R, 0., 1.), .965);
    vec3 n = vec3(-g * s, sqrt(1. - s * s));
    n.xy += ripG(p) * .3 + vec2(sin(p.y * .02 + uTime * 6.), cos(p.x * .017 + uTime * 5.)) * uVel * .06;
    n = normalize(n);
    float thick = TB + min(R, 110.) * sqrt(max(1. - s * s, 0.));
    vec3 I = vec3(0., 0., -1.);
    vec3 acc = vec3(0.);
    vec3 ws = vec3(0.);
    for (int i = 0; i < SPEC; i++) {
      float f = float(i) / float(SPEC - 1);
      float ior = mix(1.44, 1.6, f);
      vec3 t1 = refract(I, n, 1. / ior);
      vec2 off = t1.xy / max(-t1.z, .2) * thick;
      vec3 t2 = refract(t1, vec3(0., 0., 1.), ior);
      if (dot(t2, t2) < .01) t2 = vec3(t1.xy, -abs(t1.z));
      off += t2.xy / max(-t2.z, .2) * hg;
      vec2 sp = p + off;
      vec3 w = spectrum(f);
      acc += albedo(sp) * lighting(spotOf(sp)) * w;
      ws += w;
    }
    vec3 trans = acc / max(ws, vec3(.001));
    trans *= exp(-thick * mix(vec3(.0016, .0024, .0008), vec3(.0012, .0018, .0006), uDark));
    float F = .04 + .96 * pow(1. - n.z, 5.);
    vec3 refl = env(reflect(I, n));
    vec3 Ld = normalize(vec3(uLight.xy - p, uLight.z - HG - thick));
    float nh = max(dot(n, normalize(Ld + vec3(0., 0., 1.))), 0.);
    // brilho: reflexo nítido da lâmpada (fio de luz que corre pela borda) + um brilho largo e suave
    float spec = (pow(nh, 1400.) * 6. + pow(nh, 90.) * .35 + pow(nh, 12.) * .05) * uLightOn;
    vec2 tl = normalize(uLight.xy - p + .001);
    float inner = pow(max(-dot(n.xy, tl), 0.), 1.4) * .8 * uLightOn;
    vec3 gc = trans * (1. - F) + refl * F + spec * vec3(1., .98, .95) + inner * mix(vec3(.82, .72, 1.), vec3(.62, .5, 1.), uDark);
    col = mix(col, gc, clamp(d / px + .5, 0., 1.));
  }
  outColor = vec4(col, 1.);
}`;

export const UI =
  COMMON +
  `
precision highp sampler2DArray;
uniform sampler2D uScene;
uniform sampler2DArray uImgs;
uniform vec4 uRect[16];
uniform vec4 uRectP[16];   // raio, aparecer (0..1), onda da borda (folha) ou hover (resto), tipo (0 folha, 1 pílula/cartão, 2+ imagem)
uniform int uRectN;
uniform vec4 uLens;        // x, y, raio, quanto
uniform int uLensI;
uniform float uFrost;

float rrect(vec2 p, vec4 r, float rad) {
  vec2 c = r.xy + r.zw * .5;
  vec2 q = abs(p - c) - (r.zw * .5 - rad);
  return -(length(max(q, 0.)) + min(max(q.x, q.y), 0.) - rad);
}
float panelD(vec2 p, int i) {
  vec4 r = uRect[i];
  vec4 P = uRectP[i];
  vec2 q = p;
  if (P.w < .5) {
    // a borda da folha é líquida: ondula com a rolagem (P.z > 0 só as bordas, P.z < 0 a folha inteira vira uma fita)
    float wt = P.z < 0. ? 1. : (1. - smoothstep(0., 200., p.y - r.y)) - (1. - smoothstep(0., 200., r.y + r.w - p.y));
    q.y -= (sin(p.x * .010 + uTime * 4.2) + .5 * sin(p.x * .023 - uTime * 3.1)) * (uVel * 14. + abs(P.z) * 38.) * wt;
  }
  float d = rrect(q, r, min(P.x, min(r.z, r.w) * .5));
  if (P.y < .999) {
    // aparece enchendo de baixo para cima, com menisco
    float a = P.y;
    float line = r.y + (r.w + 30.) * (1. - a) - 15. + sin(p.x * .021 + uTime * 6.) * 10. * a * (1. - a) * 4.;
    d = min(d, p.y - line);
  }
  return d;
}
vec2 suv(vec2 p) { return vec2(p.x / uView.x, 1. - p.y / uView.y); }
vec3 img(float layer, vec2 uv, float lod) { return textureLod(uImgs, vec3(clamp(uv, .001, .999), layer), lod).rgb; }
vec3 tintOf(float type) { return mix(vec3(1.), vec3(.075, .085, .115), uDark); }
float tintA(float type) { return type < .5 ? mix(.56, .6, uDark) : mix(.4, .48, uDark); }
// o que está embaixo de uma lâmina que passa por cima de outra (o topo sobre as folhas e os prints)
vec3 underC(vec2 p, int j) {
  vec4 r = uRect[j];
  float t = uRectP[j].w;
  if (t > 1.5) return img(t - 2., (p - r.xy) / r.zw, 3.);
  return mix(textureLod(uScene, suv(p), uFrost).rgb, tintOf(t), tintA(t));
}

vec3 shade(vec2 p, int i, float d, float px, int un) {
  vec4 r = uRect[i];
  vec4 P = uRectP[i];
  float R = P.w < .5 ? 28. : (P.w < 1.5 ? 16. : 12.);
  float dx = panelD(p + vec2(1., 0.), i) - d;
  float dy = panelD(p + vec2(0., 1.), i) - d;
  vec2 g = normalize(vec2(dx, dy) + 1e-5);
  float s = min(1. - clamp(d / R, 0., 1.), .96);
  vec3 n = normalize(vec3(-g * s + ripG(p) * .22, sqrt(1. - s * s)));
  float F = .04 + .96 * pow(1. - n.z, 5.);
  vec3 refl = env(reflect(vec3(0., 0., -1.), n));
  vec3 Ld = normalize(vec3(uLight.xy - p, uLight.z));
  vec3 H = normalize(Ld + vec3(0., 0., 1.));
  float nh = max(dot(n, H), 0.);
  float bev = smoothstep(.08, .6, s);
  float spec = (pow(nh, 1100.) * 4. * bev + pow(nh, 70.) * .3 * bev + pow(nh, 14.) * mix(.035, .02, uDark)) * uLightOn * (1. + (P.w > .5 ? P.z : 0.));
  float inner = pow(max(-dot(n.xy, normalize(uLight.xy - p + .001)), 0.), 1.4) * .5 * uLightOn;
  vec3 glow = mix(vec3(.85, .75, 1.), vec3(.6, .5, 1.), uDark);
  vec3 c;
  if (P.w > 1.5) {
    // print do projeto sob uma placa de vidro
    float layer = P.w - 2.;
    float lod = max(log2(IMGW / max(r.z / px, 1.)), 0.);
    // o print cobre a placa sem deformar (preso no canto de cima, como object-position: top left)
    float ra = r.z / r.w * (IMGH / IMGW);
    vec2 cv = ra > 1. ? vec2(1., 1. / ra) : vec2(ra, 1.);
    vec2 uv = (p - r.xy) / r.zw * cv;
    uv = .5 * cv + (uv - .5 * cv) * (1. - .035 * P.z);
    uv += n.xy * 12. * s * s / r.zw * cv;
    c = img(layer, uv, lod);
    c = c * (1. - F) + refl * F * .55 + spec + inner * glow * .4 + smoothstep(.86, .97, s) * .22;
    if (i == uLensI && uLens.w > .01) {
      // lupa: lente de vidro que segue o cursor, amplia o print e separa as cores na borda
      float lr = uLens.z * uLens.w;
      float ld = lr - length(p - uLens.xy);
      vec2 so = normalize(p - uLight.xy + .001) * 10. + vec2(0., 10.);
      float sh = smoothstep(-28., 4., lr - length(p - so - uLens.xy));
      c *= 1. - sh * .28 * (1. - clamp(ld / px + .5, 0., 1.));
      if (ld > -px) {
        float ls = min(1. - clamp(ld / lr, 0., 1.), .97);
        vec2 lg = normalize(uLens.xy - p + .001);
        vec3 ln = normalize(vec3(-lg * ls, sqrt(1. - ls * ls)));
        vec2 c0 = (uLens.xy - r.xy) / r.zw * cv;
        vec2 base = c0 + (uv - c0) * (1. - .5 * sqrt(1. - ls * ls));
        vec2 disp = ln.xy * 34. * ls * ls / r.zw * cv;
        float l2 = max(lod - 1., 0.);
        vec3 lc = vec3(img(layer, base + disp, l2).r, img(layer, base + disp * 1.2, l2).g, img(layer, base + disp * 1.42, l2).b);
        float lF = .04 + .96 * pow(1. - ln.z, 5.);
        lc = lc * (1. - lF) + env(reflect(vec3(0., 0., -1.), ln)) * lF;
        // brilho da lupa vem de cima, à esquerda (não tampa o centro, que é onde se olha)
        vec3 LH = normalize(normalize(vec3(-.55, -.65, 1.)) + vec3(0., 0., 1.));
        lc += pow(max(dot(ln, LH), 0.), 160.) * 1.6 * uLightOn + pow(max(dot(ln, H), 0.), 600.) * .5 * uLightOn;
        lc += smoothstep(.86, .98, ls) * .3;
        c = mix(c, lc, clamp(ld / px + .5, 0., 1.));
      }
    }
    return c;
  }
  // folha / pílula: vidro fosco com a borda chanfrada refratando a cena
  float k = 40. * pow(s, 1.5);
  vec2 o = n.xy * k;
  float lod = mix(uFrost, .5, smoothstep(.25, .9, s));
  if (un >= 0 && panelD(p + o, un) > 0.) {
    c = underC(p + o, un);
  } else if (s < .3) {
    vec2 ts = exp2(lod) * .6 / uRes;
    vec2 u0 = suv(p + o);
    c = (textureLod(uScene, u0 + ts, lod).rgb + textureLod(uScene, u0 - ts, lod).rgb +
         textureLod(uScene, u0 + vec2(ts.x, -ts.y), lod).rgb + textureLod(uScene, u0 + vec2(-ts.x, ts.y), lod).rgb) * .25;
  } else {
    c = vec3(textureLod(uScene, suv(p + o), lod).r, textureLod(uScene, suv(p + o * 1.14), lod).g, textureLod(uScene, suv(p + o * 1.3), lod).b);
  }
  c = mix(c, tintOf(P.w), tintA(P.w) * (1. - .8 * smoothstep(.3, .95, s)));
  c = c * (1. - F) + refl * F * mix(.75, .55, uDark) + spec + inner * glow + smoothstep(.86, .97, s) * mix(.22, .12, uDark);
  return c;
}

void main() {
  vec2 p = vec2(vUv.x, 1. - vUv.y) * uView;
  float px = uView.x / uRes.x;
  vec3 col = textureLod(uScene, vUv, 0.).rgb;
  int top = -1;
  int below = -1;
  float dt = -1e5;
  int nearAny = -1;
  float dnAny = -1e5;
  int nearImg = -1;
  float dnImg = -1e5;
  for (int i = 0; i < 16; i++) {
    if (i >= uRectN) break;
    vec4 r = uRect[i];
    float mg = 90. + abs(uRectP[i].z) * 70.;  // a fita ondulada (e a sombra dela) sai da caixa
    if (p.x < r.x - mg || p.x > r.x + r.z + mg || p.y < r.y - mg || p.y > r.y + r.w + mg) continue;
    float d = panelD(p, i);
    if (d > -1.5 * px) { below = top; top = i; dt = d; }
    if (d > dnAny) { dnAny = d; nearAny = i; }
    if (uRectP[i].w > 1.5 && d > dnImg) { dnImg = d; nearImg = i; }
  }
  vec2 sdir = normalize(p - uLight.xy + .001) * 12. + vec2(0., 12.);
  if (nearAny >= 0 && dnAny < 1.) col *= 1. - smoothstep(-40., 4., panelD(p - sdir, nearAny)) * mix(.12, .34, uDark);
  if (top >= 0) {
    float tt = uRectP[top].w;
    vec3 pc = shade(p, top, dt, px, tt < 1.5 ? below : -1);
    if (nearImg >= 0 && nearImg != top && dnImg < 1.) pc *= 1. - smoothstep(-34., 4., panelD(p - sdir, nearImg)) * mix(.16, .4, uDark);
    col = mix(col, pc, clamp(dt / px + .5, 0., 1.));
  }
  outColor = vec4(col, 1.);
}`;
