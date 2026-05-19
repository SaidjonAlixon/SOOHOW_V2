import { access, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteOut = path.join(root, "artifacts", "soohow", "dist");
const vercelOut = path.join(root, "dist");

try {
  await access(path.join(viteOut, "index.html"));
} catch {
  console.error(`[vercel] Missing Vite build: ${path.relative(root, viteOut)}/index.html`);
  process.exit(1);
}

await rm(vercelOut, { recursive: true, force: true });
await cp(viteOut, vercelOut, { recursive: true });

console.log(`[vercel] Copied ${path.relative(root, viteOut)} → ${path.relative(root, vercelOut)}`);
