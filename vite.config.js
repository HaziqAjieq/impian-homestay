import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,          // ✅ allow external access
    port: 5173,
    allowedHosts: [
          'unplunged-dina-winningly.ngrok-free.dev'
          // Add any other hosts you need to allow here
        ],
    proxy: {
      '/api/ical': {
        target: 'https://api.icalmerge.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ical/, '')
      }
    }
  },
  plugins: [react(), tailwindcss()],
})
