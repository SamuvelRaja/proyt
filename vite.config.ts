import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background.ts'),
        home: resolve(__dirname, 'src/home.ts'),
        watch: resolve(__dirname, 'src/watch.ts'),
        sidebar: resolve(__dirname, 'src/sidebar.ts'),
        search: resolve(__dirname, 'src/search.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      }
    },
    target: 'esnext',
    minify: false, // Keep unminified for debugging purposes
    emptyOutDir: true // Cleans output directory before building
  }
});
