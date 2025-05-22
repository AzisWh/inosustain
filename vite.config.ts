import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from 'flowbite-react/plugin/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.entry': resolve(
        __dirname,
        'node_modules/pdfjs-dist/build/pdf.worker.min.js'
      ),
    },
  },
});
