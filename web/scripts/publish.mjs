// Копирует собранный сайт (web/dist/index.html) в корень репозитория.
// Именно файл из корня GitHub Pages отдаёт по адресу https://yawaside.github.io/YawaChat-web/
import { copyFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(webRoot, "..");

const built = path.join(webRoot, "dist", "index.html");
const target = path.join(repoRoot, "index.html");

if (!existsSync(built)) {
  console.error("Не найден web/dist/index.html — сначала выполните vite build.");
  process.exit(1);
}

copyFileSync(built, target);
const kb = Math.round(statSync(target).size / 1024);
console.log(`✓ Готово: index.html в корне репозитория обновлён (${kb} КБ).`);
