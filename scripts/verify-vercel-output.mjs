import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = path.join(root, "artifacts", "soohow", "dist", "index.html");

try {
  await access(indexHtml);
  console.log(`[vercel] OK: ${path.relative(root, indexHtml)}`);
} catch {
  console.error(`[vercel] Missing build output: ${path.relative(root, indexHtml)}`);
  console.error("[vercel] Expected vite outDir: artifacts/soohow/dist");
  process.exit(1);
}
