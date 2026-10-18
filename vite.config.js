import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração base para desenvolvimento e produção. O servidor
// de API REST estará disponível em http://localhost:4000.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
