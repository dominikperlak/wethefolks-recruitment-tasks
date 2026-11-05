import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = import.meta.dirname;

export default defineConfig({
  base: "./",
  server: {
    open: "/variant-a-game/",
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
        game: resolve(root, "variant-a-game/index.html"),
        fireplace: resolve(root, "variant-b-fireplace/index.html"),
      },
    },
  },
});
