import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api/ai': {
        target: 'https://api.aiaiai001.com',
        changeOrigin: true,
        timeout: 180000,
        proxyTimeout: 180000,
        rewrite: (path) => path.replace(/^\/api\/ai/, '')
      },
      '/v1': {
        target: 'https://api.aiaiai001.com',
        changeOrigin: true,
        timeout: 180000,
        proxyTimeout: 180000
      }
    }
  }
})
