import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          const normalized = id.replaceAll('\\', '/');
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(normalized)) return 'react';
          if (normalized.includes('/node_modules/three/')) return 'three-engine';
          if (normalized.includes('/node_modules/gsap/')) return 'animation';
        },
      },
    },
  },
});
