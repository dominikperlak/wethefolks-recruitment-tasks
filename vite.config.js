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
        "fireplace-top": resolve(root, "variant-b-fireplace/top.html"),
        "fireplace-left": resolve(root, "variant-b-fireplace/left.html"),
        "fireplace-right": resolve(root, "variant-b-fireplace/right.html"),
        "fireplace-preview": resolve(root, "variant-b-fireplace/preview.html"),
      },
    },
  },
});
