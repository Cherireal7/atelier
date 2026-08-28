import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/**
 * Runs the cart MFE at http://localhost:4402/cart/.
 *
 * - `base: '/cart/'` prefixes every asset URL so the shell's proxy
 *   (`/cart/*` → `localhost:4402/cart/*`) works without path munging.
 * - Explicit HMR host/port so the websocket connects direct to Vite,
 *   bypassing the shell's HTTP-only rewrite.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/cart/',
  server: {
    port: 4402,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 4402,
      protocol: 'ws',
    },
  },
});
