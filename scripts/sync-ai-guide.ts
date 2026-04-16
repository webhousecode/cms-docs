#!/usr/bin/env tsx
/**
 * Sync the AI Builder Site module sources from the canonical location in the
 * cms monorepo (../cms/docs/ai-guide) into src/ai-guide/.
 *
 * Run manually when the upstream docs change:
 *   cd /Users/cb/Apps/webhouse/cms-docs && npx tsx scripts/sync-ai-guide.ts
 *
 * The _walkthrough.md file is owned by this repo and is NOT overwritten.
 */

import { readdirSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";

const SRC = resolve(__dirname, "../../cms/docs/ai-guide");
const DST = resolve(__dirname, "../src/ai-guide");

if (!existsSync(SRC)) {
  console.error(`Source not found: ${SRC}`);
  console.error(
    "This script expects the cms monorepo to be a sibling directory.",
  );
  process.exit(1);
}

if (!existsSync(DST)) {
  mkdirSync(DST, { recursive: true });
}

const files = readdirSync(SRC).filter((f) => f.endsWith(".md"));
let copied = 0;

for (const filename of files) {
  // Never overwrite files owned by this repo (prefixed with _)
  if (filename.startsWith("_")) continue;

  copyFileSync(join(SRC, filename), join(DST, filename));
  copied++;
}

console.log(`Synced ${copied} module(s) from ${SRC} → ${DST}`);
console.log("_walkthrough.md preserved (owned by cms-docs).");
