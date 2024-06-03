import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, 
    hot: true, 
    open: true, 
  },

  build: {
    outDir: 'dist', 
    sourcemap: true, 
  },

  base: '/', 

  optimizeDeps: {
    include: ['react', 'react-dom'], 
  },

  resolve: {
    alias: {
      '@src': '/src', 
      '@components': '/src/components', 
      '@pages': '/src/pages', 
      '@utils': '/src/utils', 
      '@assets': '/src/assets', 
    },
  },
});
