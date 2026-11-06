import { defineConfig, type Plugin } from 'vite';
import { renderApp } from './app/src/render';

// O código-fonte fica em app/. O build vai para a raiz do repositório,
// que é a pasta publicada pelo GitHub Pages (com o CNAME do silvadev.xyz).
// O HTML do site é montado aqui (render.ts) e já chega pronto no index.html.
const html = (): Plugin => ({
  name: 'silvadev-html',
  transformIndexHtml: (src) => src.replace('<!--APP-->', renderApp()),
});

export default defineConfig({
  root: 'app',
  publicDir: '../public',
  plugins: [html()],
  base: '/',
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'assets',
    target: 'es2020',
    modulePreload: { polyfill: false },
  },
});
