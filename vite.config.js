import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          // Keep BeKindLogo.png in the root of dist folder
          if (assetInfo.name === 'BeKindLogo.png') {
            return '[name].[ext]'
          }
          return 'assets/[name].[ext]'
        }
      }
    }
  },
  define: {
    global: 'globalThis',
  }
})
