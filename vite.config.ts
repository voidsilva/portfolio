import { defineConfig, type Plugin } from 'vite';

// CSS embutido no HTML: um pedido a menos antes da primeira pintura
const inlineCss = (): Plugin => ({
  name: 'inline-css',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const html = Object.values(bundle).find((f) => f.fileName.endsWith('.html'));
    if (!html || html.type !== 'asset') return;
    let src = String(html.source);
    for (const [name, f] of Object.entries(bundle)) {
      if (!name.endsWith('.css') || f.type !== 'asset') continue;
      const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${name}"[^>]*>`);
      if (!tag.test(src)) continue;
      src = src.replace(tag, `<style>${f.source}</style>`);
      delete bundle[name];
    }
    html.source = src;
  },
});

// O código-fonte fica em app/. O build vai para a raiz do repositório,
// que é a pasta publicada pelo GitHub Pages (com o CNAME do silvadev.xyz).
export default defineConfig({
  root: 'app',
  publicDir: '../public',
  base: '/',
  plugins: [inlineCss()],
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'assets',
    target: 'es2020',
    chunkSizeWarningLimit: 900,
  },
});
