# NeutronX · Portfólio de Paulo Silva

Portfólio publicado em **[silvadev.xyz](https://silvadev.xyz)**.

Uma experiência com um núcleo 3D facetado (Three.js) que se abre e se recompõe ao longo do scroll (GSAP + ScrollTrigger), tipografia editorial e os projetos reais de [github.com/voidsilva](https://github.com/voidsilva).

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
└── styles/global.css    # identidade visual NeutronX
```

## Acessibilidade e desempenho

- Respeita `prefers-reduced-motion`, com botão para o visitante ligar ou reduzir as animações.
- Fallback sem WebGL, partículas e resolução reduzidas em celulares e máquinas modestas.
- Navegação por teclado, foco visível e link para pular direto aos projetos.

A página "em breve" anterior está guardada em `legacy/`.
