import { access, cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(packageRoot, "../..");
const out = path.join(packageRoot, "vercel-out");
const index = path.join(out, "index.html");

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(index))) {
  const legacy = path.join(packageRoot, "dist", "index.html");
  if (await exists(legacy)) {
    console.log("[vercel] Found dist/, copying to vercel-out/");
    await rm(out, { recursive: true, force: true });
    await cp(path.join(packageRoot, "dist"), out, { recursive: true });
  }
}

if (!(await exists(index))) {
  console.error(`[vercel] ERROR: missing ${path.relative(repoRoot, index)}`);
  try {
    const entries = await readdir(packageRoot, { withFileTypes: true });
    console.error(
      "[vercel] package dir contains:",
      entries.map((e) => (e.isDirectory() ? `${e.name}/` : e.name)).join(", "),
    );
  } catch {
    /* ignore */
  }
  process.exit(1);
}

const rootOut = path.join(repoRoot, "vercel-out");
await rm(rootOut, { recursive: true, force: true });
await cp(out, rootOut, { recursive: true });
console.log(`[vercel] OK: artifacts/soohow/vercel-out/index.html`);
console.log(`[vercel] Synced → vercel-out/ (repo root)`);
