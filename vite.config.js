import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/', // Base URL for GitHub Pages (sh4lu-z.github.io)
  publicDir: 'public', // Explicitly set public static folder
  build: {
    outDir: 'dist', // Standard output folder for Vercel / GitHub Actions
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html' // VERY IMPORTANT: Ensure admin panel is built too
      }
    }
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
