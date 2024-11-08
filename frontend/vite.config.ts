import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-dropzone'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/main";`,
      },
    },
  },
});
