# SilvaDev · Portfólio de Paulo Silva

Portfólio publicado em **[silvadev.xyz](https://silvadev.xyz)**.

Uma noite à beira de um lago, navegada pelo scroll: o notebook na pedra, as lanternas subindo, as placas dos projetos flutuando sobre a água e as partículas que formam a marca no final. Tudo modelado no código, sem arquivos 3D externos.

## Stack

- React 18 + TypeScript + Vite
- Three.js (cena carregada sob demanda, qualidade adaptativa)
- GSAP + ScrollTrigger + Lenis
- Web Audio para a trilha lo-fi gerada em tempo real
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
├── App.tsx                 # carregamento, portal, scroll e câmera por seção
├── experience/World.ts     # cena 3D: lago, céu, lua, pedra, notebook, lanternas, placas e partículas
├── experience/Ambient.ts   # trilha lo-fi generativa
├── ui/                     # portal, capítulos, menu, cursor e painel de projeto
├── data/content.ts         # projetos, trabalhos e ferramentas
└── styles/global.css       # identidade visual SilvaDev
```

## Desempenho e acessibilidade

- Versão leve sem 3D (landing page com animações suaves), oferecida na entrada.
- Resolução adaptativa pelo FPS; objetos fora da névoa não são desenhados.
- Respeita `prefers-reduced-motion`, navegação por teclado e link para pular aos projetos.
