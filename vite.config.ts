import {defineConfig, optimizeDeps} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  cacheDir: ".vite",
  base: './'
})
