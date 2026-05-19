import { access, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.env.VERCEL_OUT_DIR === "package" ? "package" : "root";
const viteOut = path.join(root, "artifacts", "soohow", "dist");
const repoOut = path.join(root, "dist");

console.log(`[vercel] Building frontend (mode=${mode})...`);

const build = spawnSync("pnpm", ["--filter", "@workspace/soohow", "run", "build"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

async function findIndexHtml(dir) {
  const direct = path.join(dir, "index.html");
  try {
    await access(direct);
    return direct;
  } catch {
    const nested = path.join(dir, "public", "index.html");
    await access(nested);
    return nested;
  }
}

let builtDir = viteOut;
try {
  await findIndexHtml(viteOut);
} catch {
  console.error(`[vercel] ERROR: no index.html under ${path.relative(root, viteOut)}`);
  process.exit(1);
}

if (mode === "root") {
  await rm(repoOut, { recursive: true, force: true });
  await cp(viteOut, repoOut, { recursive: true });
  builtDir = repoOut;
  console.log(`[vercel] Copied ${path.relative(root, viteOut)} → dist/`);
}

const indexHtml = await findIndexHtml(builtDir);
console.log(`[vercel] OK: ${path.relative(root, indexHtml)}`);
