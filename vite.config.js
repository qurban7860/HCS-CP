import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      root: './app.jsx',
      config: './config',
      global: path.resolve(__dirname, 'src', 'config', 'global.js'),
      component: path.resolve(__dirname, 'src', 'component'),
      page: path.resolve(__dirname, 'src', 'page'),
      auth: path.resolve(__dirname, 'src', 'auth'),
      locale: path.resolve(__dirname, 'src', 'locale'),
      route: path.resolve(__dirname, 'src', 'route'),
      theme: path.resolve(__dirname, 'src', 'theme'),
      util: path.resolve(__dirname, 'src', 'util'),
      // @pages
      dashboard: path.resolve(__dirname, 'src', 'pages', 'dashboard'),
      customer: path.resolve(__dirname, 'src', 'pages', 'customer'),
      machine: path.resolve(__dirname, 'src', 'pages', 'machine'),
      document: path.resolve(__dirname, 'src', 'pages', 'document'),
    },
  },
})
