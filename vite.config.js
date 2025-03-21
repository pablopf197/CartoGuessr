import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()], 
    base: mode === 'production' ? '/cartoguessr/' : '/',
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'index.html',
      },
    },
  }
});