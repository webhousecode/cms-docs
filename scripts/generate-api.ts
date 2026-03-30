/**
 * Generate static JSON API files from docs content.
 * Run: npx tsx scripts/generate-api.ts
 *
 * Output:
 *   public/api/docs.json          → list of all docs (EN + DA)
 *   public/api/docs/[slug].json   → individual doc with full content
 *   public/api/changelog.json     → all changelog entries
 *   public/api/snippets.json      → all shared snippets
 *   public/api/search.json        → lightweight search index
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const CONTENT = join(__dirname, "..", "content");
const OUT = join(__dirname, "..", "public", "api");

// Ensure output dirs
mkdirSync(join(OUT, "docs"), { recursive: true });
mkdirSync(join(OUT, "changelog"), { recursive: true });
mkdirSync(join(OUT, "snippets"), { recursive: true });

function readCollection(name: string) {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(readFileSync(join(dir, f), "utf-8")))
    .filter(d => d.status === "published");
}

// ── Docs ──────────────────────────────────────────

const docs = readCollection("docs");

// Index: lightweight list (no full content)
const docsIndex = docs.map(d => ({
  slug: d.slug,
  title: d.data.title,
  description: d.data.description ?? "",
  category: d.data.category ?? "",
  order: d.data.order ?? 99,
  locale: d.locale ?? "en",
  translationGroup: d.translationGroup ?? null,
  helpCardId: d.data.helpCardId ?? null,
  updatedAt: d.updatedAt,
}));

writeFileSync(join(OUT, "docs.json"), JSON.stringify({
  count: docsIndex.length,
  docs: docsIndex,
}, null, 2));
console.log(`  ✓ api/docs.json (${docsIndex.length} docs)`);

// Individual docs: full content as markdown
for (const doc of docs) {
  const content = doc.data.content ?? "";
  // Strip HTML for plain text excerpt
  const plainText = content.replace(/<[^>]+>/g, "").replace(/[#*_~`>]/g, "").trim();
  const excerpt = plainText.slice(0, 300);

  writeFileSync(join(OUT, "docs", `${doc.slug}.json`), JSON.stringify({
    slug: doc.slug,
    title: doc.data.title,
    description: doc.data.description ?? "",
    category: doc.data.category ?? "",
    order: doc.data.order ?? 99,
    locale: doc.locale ?? "en",
    translationGroup: doc.translationGroup ?? null,
    helpCardId: doc.data.helpCardId ?? null,
    content,
    excerpt,
    seo: doc.data._seo ?? {},
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }, null, 2));
}
console.log(`  ✓ api/docs/[slug].json (${docs.length} files)`);

// ── Changelog ─────────────────────────────────────

const changelog = readCollection("changelog").sort((a, b) => {
  const da = a.data.date ?? a.updatedAt ?? "";
  const db = b.data.date ?? b.updatedAt ?? "";
  return db.localeCompare(da);
});

writeFileSync(join(OUT, "changelog.json"), JSON.stringify({
  count: changelog.length,
  entries: changelog.map(e => ({
    slug: e.slug,
    title: e.data.title,
    version: e.data.version,
    date: e.data.date,
    breaking: e.data.breaking ?? false,
    content: e.data.content ?? "",
  })),
}, null, 2));
console.log(`  ✓ api/changelog.json (${changelog.length} entries)`);

// ── Snippets ──────────────────────────────────────

const snippets = readCollection("snippets");

writeFileSync(join(OUT, "snippets.json"), JSON.stringify({
  count: snippets.length,
  snippets: snippets.map(s => ({
    slug: s.slug,
    title: s.data.title,
    description: s.data.description ?? "",
    code: s.data.code ?? "",
    lang: s.data.lang ?? "text",
  })),
}, null, 2));
console.log(`  ✓ api/snippets.json (${snippets.length} snippets)`);

// Individual snippets
for (const s of snippets) {
  writeFileSync(join(OUT, "snippets", `${s.slug}.json`), JSON.stringify({
    slug: s.slug,
    title: s.data.title,
    description: s.data.description ?? "",
    code: s.data.code ?? "",
    lang: s.data.lang ?? "text",
  }, null, 2));
}
console.log(`  ✓ api/snippets/[slug].json (${snippets.length} files)`);

// ── Search index ──────────────────────────────────

const searchIndex = docs.map(d => {
  const content = (d.data.content ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_~`>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2000);

  return {
    slug: d.slug,
    title: d.data.title,
    description: d.data.description ?? "",
    category: d.data.category ?? "",
    locale: d.locale ?? "en",
    content,
  };
});

writeFileSync(join(OUT, "search.json"), JSON.stringify({
  count: searchIndex.length,
  index: searchIndex,
}, null, 2));
console.log(`  ✓ api/search.json (${searchIndex.length} entries)`);

// ── Meta ──────────────────────────────────────────

const meta = {
  site: "docs.webhouse.app",
  generated: new Date().toISOString(),
  endpoints: {
    "GET /api/docs.json": "List all documentation pages",
    "GET /api/docs/{slug}.json": "Get a single doc page with full markdown content",
    "GET /api/changelog.json": "All changelog entries",
    "GET /api/snippets.json": "All shared code snippets",
    "GET /api/snippets/{slug}.json": "Get a single snippet",
    "GET /api/search.json": "Lightweight search index for client-side search",
  },
  stats: {
    docs: docs.length,
    changelog: changelog.length,
    snippets: snippets.length,
  },
};

writeFileSync(join(OUT, "index.json"), JSON.stringify(meta, null, 2));
console.log(`  ✓ api/index.json (meta)`);

console.log(`\n✓ Static API generated: ${docs.length} docs, ${changelog.length} changelog, ${snippets.length} snippets`);
