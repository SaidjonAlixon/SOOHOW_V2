import { access, cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "artifacts", "soohow", "vercel-out");
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
  const legacy = path.join(root, "artifacts", "soohow", "dist", "index.html");
  if (await exists(legacy)) {
    console.log("[vercel] Found legacy dist/, copying to vercel-out/");
    await rm(out, { recursive: true, force: true });
    await cp(path.join(root, "artifacts", "soohow", "dist"), out, { recursive: true });
  }
}

if (!(await exists(index))) {
  console.error(`[vercel] ERROR: missing ${path.relative(root, index)}`);
  const parent = path.join(root, "artifacts", "soohow");
  try {
    const entries = await readdir(parent, { withFileTypes: true });
    console.error(
      "[vercel] artifacts/soohow contains:",
      entries.map((e) => (e.isDirectory() ? `${e.name}/` : e.name)).join(", "),
    );
  } catch {
    /* ignore */
  }
  process.exit(1);
}

const rootOut = path.join(root, "vercel-out");
await rm(rootOut, { recursive: true, force: true });
await cp(out, rootOut, { recursive: true });
console.log(`[vercel] OK: ${path.relative(root, index)}`);
console.log(`[vercel] Synced → ${path.relative(root, rootOut)}/`);
