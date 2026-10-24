import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O build vai para /docs, que é a pasta publicada pelo GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsDir: '',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'], gsap: ['gsap'] },
      },
    },
  },
});
