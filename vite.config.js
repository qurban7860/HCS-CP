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
      config: path.resolve(__dirname, 'src', 'config'),
      global: path.resolve(__dirname, 'src', 'config', 'global.js'),
      constant: path.resolve(__dirname, 'src', 'constant'),
      component: path.resolve(__dirname, 'src', 'component'),
      section: path.resolve(__dirname, 'src', 'section'),
      page: path.resolve(__dirname, 'src', 'page'),
      auth: path.resolve(__dirname, 'src', 'auth'),
      hook: path.resolve(__dirname, 'src', 'hook'),
      locale: path.resolve(__dirname, 'src', 'locale'),
      layout: path.resolve(__dirname, 'src', 'layout'),
      _mock: path.resolve(__dirname, 'src', '_mock'),
      route: path.resolve(__dirname, 'src', 'route'),
      schema: path.resolve(__dirname, 'src', 'schema'),
      store: path.resolve(__dirname, 'src', 'store'),
      slice: path.resolve(__dirname, 'src', 'store', 'slice'),
      theme: path.resolve(__dirname, 'src', 'theme'),
      util: path.resolve(__dirname, 'src', 'util'),
      root: path.resolve(__dirname, 'src', 'App.jsx'),
      // @page
      dashboard: path.resolve(__dirname, 'src', 'page', 'dashboard'),
      customer: path.resolve(__dirname, 'src', 'page', 'customer'),
      machine: path.resolve(__dirname, 'src', 'page', 'machine'),
      document: path.resolve(__dirname, 'src', 'page', 'document')
    }
  }
})
