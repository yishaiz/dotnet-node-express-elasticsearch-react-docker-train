import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api/orders': {
        target: 'http://backend-orders:3000',
        changeOrigin: true,
      },
      '/api/categories': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
      '/api/products': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
    },
  },
});
