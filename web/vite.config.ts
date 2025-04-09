import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // fivem nui needs to have local dir reference
    server: {
        port: 3003,
        hmr: {
            host: 'localhost',
        },
    },
    build: {
      emptyOutDir: true,
      outDir: '../build',
      assetsDir: './',
      sourcemap: false,
      rollupOptions: {
        output: {
          // By not having hashes in the name, you don't have to update the manifest, yay!
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    }
    
  })
  