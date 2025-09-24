import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/ical': {
        target: 'https://api.icalmerge.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ical/, '')
      }
    }
  },
  
  plugins: [react() , tailwindcss()],
})
