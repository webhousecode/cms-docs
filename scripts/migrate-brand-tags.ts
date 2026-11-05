/**
 * F212 — one-off: replace the product's name and addresses in the content
 * with brand name tags (see scripts/brand-tags.ts). Prints what it changed.
 * Run: npx tsx scripts/migrate-brand-tags.ts
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { tagBrand, tagBrandJson } from "./brand-tags";

const ROOT = join(__dirname, "..");
const TARGETS = ["content", "src/ai-guide"];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(json|md|ya?ml)$/.test(name) ? [p] : [];
  });
}

let changed = 0;
let tags = 0;
for (const target of TARGETS) {
  for (const file of files(join(ROOT, target))) {
    const before = readFileSync(file, "utf-8");
    const after = file.endsWith(".json") ? tagBrandJson(before) : tagBrand(before);
    if (after === before) continue;
    if (file.endsWith(".json")) JSON.parse(after); // must stay valid JSON
    writeFileSync(file, after);
    changed++;
    tags += (after.match(/\{\{brand[^}]*\}\}/g) ?? []).length - (before.match(/\{\{brand[^}]*\}\}/g) ?? []).length;
  }
}
console.log(`${changed} files, ${tags} tags`);
