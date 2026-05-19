import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.env.VERCEL_OUT_DIR === "package" ? "package" : "root";
const outDir =
  mode === "package"
    ? path.join(root, "artifacts", "soohow", "dist")
    : path.join(root, "dist");

console.log(`[vercel] Building frontend (VERCEL_OUT_DIR=${mode})...`);

const build = spawnSync("pnpm", ["--filter", "@workspace/soohow", "run", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const indexHtml = path.join(outDir, "index.html");

try {
  await access(indexHtml);
} catch {
  console.error(`[vercel] ERROR: missing ${path.relative(root, indexHtml)}`);
  process.exit(1);
}

console.log(`[vercel] OK: ${path.relative(root, indexHtml)}`);
