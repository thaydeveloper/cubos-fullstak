import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Permite acesso via túnel ngrok (sem protocolo)
    allowedHosts: ['brachydactylous-fatimah-noteless.ngrok-free.dev'],
    // Habilita binding em todas as interfaces para acesso externo
    host: true,
    // Configura HMR para funcionar atrás do ngrok (wss na porta 443)
    hmr: {
      host: 'brachydactylous-fatimah-noteless.ngrok-free.dev',
      protocol: 'wss',
      clientPort: 443,
    },
  },
});
