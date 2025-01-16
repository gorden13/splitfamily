import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      app: `${path.resolve(__dirname, './src/app/')}`,
      entities: `${path.resolve(__dirname, './src/entities/')}`,
      features: path.resolve(__dirname, './src/features/'),
      widgets: `${path.resolve(__dirname, './src/widgets/')}`,
      pages: `${path.resolve(__dirname, './src/pages')}`,
      shared: `${path.resolve(__dirname, './src/shared')}`,
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
