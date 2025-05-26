import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/resume-builder/', // Set base path for deployment and dev server
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
