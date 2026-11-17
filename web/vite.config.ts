import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // Относительные пути: сайт одинаково работает из корня домена,
  // из подпапки /YawaChat-web/ на GitHub Pages и со своего домена.
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Весь сайт собирается в один самодостаточный dist/index.html
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
});
