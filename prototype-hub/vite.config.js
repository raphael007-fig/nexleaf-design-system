import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// The hub lives inside the design-system repo and imports the DS directly.
// `@ds` → the barrel export at ../src/index.js. React is aliased to the parent's
// single install so we never get two React copies (which breaks hooks).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ds': resolve(__dirname, '../src'),
      react: resolve(__dirname, '../node_modules/react'),
      'react-dom': resolve(__dirname, '../node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: { fs: { allow: ['..'] } },
});
