# SilvaDev · Portfólio de Paulo Silva

Portfólio publicado em **[silvadev.xyz](https://silvadev.xyz)**.

Um mundo 3D navegável pelo scroll (Three.js + GSAP + Lenis): o monólito SD, um corredor de luz, a galeria de projetos e um núcleo de partículas, com os projetos reais de [github.com/voidsilva](https://github.com/voidsilva).

## Stack

- React 18 + TypeScript + Vite
- Three.js (cena carregada sob demanda, qualidade adaptativa)
- GSAP + ScrollTrigger
- CSS próprio, sem framework de UI

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera index.html e assets/ na raiz, publicados pelo GitHub Pages
```

## Estrutura

```
app/src/
├── data/content.ts      # projetos, stack e textos (tudo verificado nos repositórios)
├── three/CoreScene.ts   # núcleo 3D, partículas, luzes e câmera
├── components/          # Hero, Manifesto, Projects, About, Stack, Outro, Nav, Cursor
├── lib/motion.ts        # GSAP, magnetismo, tilt e preferência de movimento
└── styles/global.css    # identidade visual SilvaDev
```

## Acessibilidade e desempenho

- Respeita `prefers-reduced-motion`, com botão para o visitante ligar ou reduzir as animações.
- Fallback sem WebGL, partículas e resolução reduzidas em celulares e máquinas modestas.
- Navegação por teclado, foco visível e link para pular direto aos projetos.

A página "em breve" anterior está guardada em `legacy/`.

## Créditos dos assets

Modelos e céu da cena de abertura vêm do [Poly Haven](https://polyhaven.com), com licença CC0:
- Classic Laptop e Lantern 01 (modelos)
- Lakeside Night, por Greg Zaal e Jarod Guest (HDRI)
