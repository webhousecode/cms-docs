/**
 * Pair EN and DA docs with shared translationGroup IDs.
 * EN doc "foo" + DA doc "foo-da" → same translationGroup UUID.
 * Run: npx tsx scripts/pair-translations.ts
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");
const files = readdirSync(DIR).filter(f => f.endsWith(".json"));

// Build map of EN docs (no -da suffix)
const enDocs = new Map<string, string>(); // slug → file path
const daDocs = new Map<string, string>(); // base slug (without -da) → file path

for (const f of files) {
  const slug = f.replace(".json", "");
  if (slug.endsWith("-da")) {
    daDocs.set(slug.replace(/-da$/, ""), join(DIR, f));
  } else {
    enDocs.set(slug, join(DIR, f));
  }
}

let paired = 0;
let fixed = 0;

for (const [slug, enPath] of enDocs) {
  const daPath = daDocs.get(slug);
  if (!daPath) continue; // No DA counterpart

  const enDoc = JSON.parse(readFileSync(enPath, "utf-8"));
  const daDoc = JSON.parse(readFileSync(daPath, "utf-8"));

  // Ensure EN has locale set
  if (!enDoc.locale) {
    enDoc.locale = "en";
    fixed++;
  }

  // Ensure DA has locale set
  if (!daDoc.locale || daDoc.locale !== "da") {
    daDoc.locale = "da";
    fixed++;
  }

  // Share translationGroup
  const tg = enDoc.translationGroup || randomUUID();
  enDoc.translationGroup = tg;
  daDoc.translationGroup = tg;

  writeFileSync(enPath, JSON.stringify(enDoc, null, 2));
  writeFileSync(daPath, JSON.stringify(daDoc, null, 2));

  console.log(`  ✓ ${slug} ↔ ${slug}-da (${tg.slice(0, 8)}...)`);
  paired++;
}

// Also check for unpaired EN docs
for (const [slug] of enDocs) {
  if (!daDocs.has(slug)) {
    const enPath = enDocs.get(slug)!;
    const enDoc = JSON.parse(readFileSync(enPath, "utf-8"));
    if (!enDoc.locale) {
      enDoc.locale = "en";
      writeFileSync(enPath, JSON.stringify(enDoc, null, 2));
      fixed++;
    }
  }
}

console.log(`\n✓ ${paired} pairs linked, ${fixed} locale fields fixed`);
