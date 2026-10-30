# SilvaDev · Portfólio de Paulo Silva

Portfólio publicado em **[silvadev.xyz](https://silvadev.xyz)**.

Um estúdio de verdade, navegado pela rolagem: a cadeira sai da frente, a papelada da empresa sobe da mesa e entra nos três monitores curvos, que ligam mostrando os sistemas. Depois o quadro de serviços é escrito, o processo é pregado na parede e o notebook abre no contato, já no fim da tarde.

## Stack

- TypeScript + Vite, sem framework de UI
- Three.js com o modelo em GLB (Meshopt) e luz assada em dois horários
- Lenis para a rolagem
- Blender 5 por script (bpy/bmesh) para modelar e assar a luz no Cycles

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera index.html e assets/ na raiz, publicados pelo GitHub Pages
```

## O modelo 3D

Tudo nasce de `blender/estudio.py`, sem arquivo 3D feito à mão:

```bash
pip install bpy pillow                                   # Blender como módulo Python
python blender/estudio.py saida/                         # modela, assa a luz (manhã e tarde) e exporta
python blender/luz.py saida/ public/models 2048,1024     # EXR → WebP com escala em luz.json
node blender/otimizar.mjs saida/estudio-raw.glb public/models/estudio.glb
```

Variáveis úteis: `LM` (tamanho do lightmap), `SAMPLES` (amostras do Cycles), `NOBAKE=1` (só exporta) e `PREVIEW="cx,cy,cz>lx,ly,lz"` (renderiza vistas para conferir a modelagem).

O que fica parado é juntado num objeto só com uma segunda UV para o lightmap. Nesses materiais o sol em tempo real fica desligado (já está no mapa) e sobram as luzes da história: a luminária que segue o cursor e o brilho das telas.

## Estrutura

```
blender/                    # modelagem, bake e otimização do GLB
app/src/
├── main.ts                 # rolagem, textos, cursor, menu, modo leve e carga do 3D
├── cases.ts                # folha de cada projeto
└── world/
    ├── World.ts            # cena: câmera, animações e o dia passando
    ├── baked.ts            # lightmaps misturados, papel que enrola, poeira no feixe
    ├── fx.ts               # telas que ligam, quadro escrito à mão, feixe de sol
    ├── paper.ts            # o que aparece nas telas e nos papéis (canvas)
    └── tex.ts              # texturas procedurais de piso e parede
```

## Desempenho e acessibilidade

- 3D carregado só depois da primeira interação, com imagem fixa no lugar até lá.
- Qualidade adaptativa: lightmaps de 1024 no celular, sombras e luzes das telas só onde cabe, e a cena se alivia sozinha se o quadro cair.
- Modo leve sem 3D, `prefers-reduced-motion`, navegação por teclado e imagem fixa quando não há WebGL.
