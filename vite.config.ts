import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O código-fonte fica em app/. O build vai para a raiz do repositório,
// que é a pasta publicada pelo GitHub Pages (com o CNAME do silvadev.xyz).
export default defineConfig({
  root: 'app',
  publicDir: '../public',
  plugins: [react()],
  base: '/',
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'assets',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'], gsap: ['gsap'] },
      },
    },
  },
});
