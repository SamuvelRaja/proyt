import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: './src/background.ts',
        content: './src/content.ts',
        home: './src/home.ts',
        search: './src/search.ts',
        watch: './src/watch.ts',
        sidebar: './src/sidebar.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});
