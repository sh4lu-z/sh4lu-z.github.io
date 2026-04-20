import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/', // Base URL for GitHub Pages (sh4lu-z.github.io)
  publicDir: 'public', // Explicitly set public static folder
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin.html',
        style: './style.css',
        app: './app.js',
        adminjs: './admin.js'
      }
    }
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
