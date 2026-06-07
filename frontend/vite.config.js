import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBase = env.VITE_API_BASE_URL || 'https://trifinitytutors-backend.onrender.com'

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiBase,
          changeOrigin: true,
        }
      }
    }
  })
}