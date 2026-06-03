import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "artifacts", "soohow", "src", "components", "ui");

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".tsx")) continue;
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.startsWith('"use client"')) continue;
  fs.writeFileSync(filePath, content.replace(/^"use client"\s*\r?\n+/, ""));
  console.log(`removed "use client" from ${file}`);
}
