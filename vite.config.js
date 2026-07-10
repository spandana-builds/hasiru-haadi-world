import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 75, mozjpeg: true },
      jpeg: { quality: 75, mozjpeg: true },
      png: { quality: 75 },
      webp: { quality: 75 },
    }),
  ],
})
