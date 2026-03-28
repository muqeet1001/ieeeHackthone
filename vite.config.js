import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Force Vite to pre-bundle framer-motion so it resolves correctly in dev
  optimizeDeps: {
    include: ['framer-motion'],
  },
})
