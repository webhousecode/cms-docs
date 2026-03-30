/**
 * Seed Side-by-Side Translation Editing docs (EN + DA).
 * Run: npx tsx scripts/seed-side-by-side.ts
 */
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");

const tg = randomUUID();

function writeDoc(slug: string, locale: string, data: Record<string, unknown>) {
  const json = {
    id: randomUUID(), slug, status: "published", locale, translationGroup: tg,
    data: { ...data, _seo: { metaTitle: `${data.title} — webhouse.app Docs`, metaDescription: data.description } },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(DIR, `${slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ ${slug}`);
}

writeDoc("side-by-side-editing", "en", {
  title: "Side-by-Side Translation Editing",
  description: "Edit source and translation simultaneously in a split-screen editor — the killer feature for multilingual content.",
  category: "guides",
  order: 12,
  content: `## The problem with traditional translation workflows

Most CMS platforms treat translation as an afterthought. You write content in one language, export it, send it to a translator (or an AI), import the result, and hope nothing breaks. You can't see source and translation together. You can't compare paragraph by paragraph. And when you update the source, you have no idea which translations are stale.

## Side-by-side editing

![Side-by-side translation editing](/screenshots/side-by-side-full.png)

@webhouse/cms solves this with a built-in split-screen editor. Open any document that has translations, click **Side-by-side**, and you see source and translation side by side — field by field, paragraph by paragraph.

### What you see

The editor splits into two panels:

- **Left panel** — the translation you're editing (e.g. Danish)
- **Right panel** — the source document (e.g. English), read-only for reference

Both panels show the same fields in the same order: title, description, content, and all custom fields. You scroll them together. You compare them line by line.

### How to use it

1. Open any document in the editor
2. If translations exist, you'll see a **TRANSLATIONS** bar at the top showing linked locale versions
3. Click **Side-by-side** to enter split-screen mode
4. The source language appears on the right, your translation on the left
5. Edit the translation while reading the source — no tab switching, no copy-pasting

### Translation groups make it work

The magic behind side-by-side editing is the \`translationGroup\` field. Every document that is a translation of another shares the same UUID:

\`\`\`json
// English source
{
  "slug": "getting-started",
  "locale": "en",
  "translationGroup": "a1b2c3d4-..."
}

// Danish translation
{
  "slug": "getting-started-da",
  "locale": "da",
  "translationGroup": "a1b2c3d4-..."
}
\`\`\`

CMS admin reads the \`translationGroup\` and finds all documents that share it. That's how it knows which documents are translations of each other — and how it can show them side by side.

## Creating translations

### From the editor

1. Open a document
2. Click **+ Add translation** in the translations bar
3. Choose the target locale (e.g. Danish)
4. The CMS creates a new document with:
   - A slug based on the source (e.g. \`getting-started-da\`)
   - The same \`translationGroup\` UUID
   - AI-translated content (if an AI provider is configured)
5. The new translation opens in the editor, ready for review

### From a script

\`\`\`typescript
import { randomUUID } from 'crypto';

// Create the source document
const sourceDoc = {
  slug: "my-page",
  locale: "en",
  translationGroup: randomUUID(),
  status: "published",
  data: { title: "My Page", content: "Hello world" },
};

// Create the translation with the SAME translationGroup
const translationDoc = {
  slug: "my-page-da",
  locale: "da",
  translationGroup: sourceDoc.translationGroup, // ← same UUID!
  status: "published",
  data: { title: "Min side", content: "Hej verden" },
};
\`\`\`

### Via AI

\`\`\`bash
# The CMS AI agent can translate documents automatically
npx cms ai rewrite posts/hello-world "Translate to Danish"
\`\`\`

Or use the built-in translation agent from the admin UI — it respects field types, preserves markdown formatting, and links the new document with the correct \`translationGroup\`.

## Locale strategy

How locales appear in URLs depends on your site's \`localeStrategy\` setting:

| Strategy | English URL | Danish URL | Best for |
|----------|-------------|------------|----------|
| \`prefix-other\` | \`/blog/my-post\` | \`/da/blog/my-post\` | Most sites |
| \`prefix-all\` | \`/en/blog/my-post\` | \`/da/blog/my-post\` | Explicit locale |
| \`none\` | \`/blog/my-post\` | \`/blog/my-post-da\` | Locale in slug |

Configure in CMS admin → Site Settings → Language.

## Why this matters

### For content teams
- No context switching between tabs or windows
- See exactly what the source says while you translate
- Catch mismatches instantly (missing paragraphs, wrong tone, outdated sections)

### For developers
- \`translationGroup\` is a simple UUID — no complex relational schema
- Documents are independent files — no parent/child coupling
- Works with any storage adapter (filesystem, GitHub, SQLite, Supabase)
- Easy to script: just share the UUID between documents

### For AI agents
- AI translation agents create properly linked documents automatically
- The translation agent reads the source via \`translationGroup\`, translates field by field
- AI Lock ensures human-edited translations are never overwritten by AI

## Configuration

### cms.config.ts

\`\`\`typescript
defineCollection({
  name: 'posts',
  label: 'Blog Posts',
  sourceLocale: 'en',
  locales: ['en', 'da'],
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richtext' },
  ],
})
\`\`\`

### Site settings

- **Default language**: English (en)
- **Supported languages**: add Danish (da), or any BCP 47 locale
- **Locale strategy**: choose how URLs are structured

That's it. No plugins, no third-party translation management. Just \`translationGroup\` and the built-in editor.`,
});

writeDoc("side-by-side-editing-da", "da", {
  title: "Side-by-side oversættelsesredigering",
  description: "Redigér kilde og oversættelse samtidigt i en split-screen editor — killer-featuren for flersproget indhold.",
  category: "guides",
  order: 12,
  content: `## Problemet med traditionelle oversættelsesworkflows

De fleste CMS-platforme behandler oversættelse som en eftertanke. Du skriver indhold på ét sprog, eksporterer det, sender det til en oversætter (eller en AI), importerer resultatet og håber at intet går i stykker. Du kan ikke se kilde og oversættelse sammen. Du kan ikke sammenligne afsnit for afsnit.

## Side-by-side redigering

@webhouse/cms løser dette med en indbygget split-screen editor. Åbn ethvert dokument der har oversættelser, klik **Side-by-side**, og du ser kilde og oversættelse ved siden af hinanden — felt for felt, afsnit for afsnit.

### Hvad du ser

Editoren deles i to paneler:

- **Venstre panel** — oversættelsen du redigerer (f.eks. dansk)
- **Højre panel** — kildedokumentet (f.eks. engelsk), skrivebeskyttet som reference

Begge paneler viser de samme felter i samme rækkefølge. Du scroller dem sammen. Du sammenligner dem linje for linje.

### Sådan bruger du det

1. Åbn et dokument i editoren
2. Hvis oversættelser findes, ser du en **TRANSLATIONS** bar øverst
3. Klik **Side-by-side** for at starte split-screen
4. Kildesprog vises til højre, din oversættelse til venstre
5. Redigér oversættelsen mens du læser kilden

### Oversættelsesgrupper gør det muligt

Magien bag side-by-side er \`translationGroup\`-feltet. Hvert dokument der er en oversættelse af et andet deler det samme UUID:

\`\`\`json
// Engelsk kilde
{
  "slug": "getting-started",
  "locale": "en",
  "translationGroup": "a1b2c3d4-..."
}

// Dansk oversættelse
{
  "slug": "getting-started-da",
  "locale": "da",
  "translationGroup": "a1b2c3d4-..."
}
\`\`\`

## Oprettelse af oversættelser

### Fra editoren

1. Åbn et dokument
2. Klik **+ Tilføj oversættelse**
3. Vælg målsprog (f.eks. dansk)
4. CMS'et opretter et nyt dokument med AI-oversat indhold
5. Gennemgå og redigér oversættelsen

### Fra et script

\`\`\`typescript
const sourceDoc = {
  slug: "my-page",
  locale: "en",
  translationGroup: randomUUID(),
  data: { title: "My Page" },
};

const translationDoc = {
  slug: "my-page-da",
  locale: "da",
  translationGroup: sourceDoc.translationGroup, // ← samme UUID!
  data: { title: "Min side" },
};
\`\`\`

## Lokaliseringsstrategi

| Strategi | Engelsk URL | Dansk URL | Bedst til |
|----------|-------------|-----------|-----------|
| \`prefix-other\` | \`/blog/my-post\` | \`/da/blog/my-post\` | De fleste sites |
| \`prefix-all\` | \`/en/blog/my-post\` | \`/da/blog/my-post\` | Eksplicit locale |
| \`none\` | \`/blog/my-post\` | \`/blog/my-post-da\` | Locale i slug |

## Hvorfor dette er vigtigt

### For indholdsteams
- Ingen kontekstskift mellem faner eller vinduer
- Se præcis hvad kilden siger mens du oversætter
- Fang uoverensstemmelser øjeblikkeligt

### For udviklere
- \`translationGroup\` er et simpelt UUID — intet komplekst relationelt skema
- Dokumenter er uafhængige filer — ingen forælder/barn-kobling
- Virker med enhver storage-adapter

### For AI-agenter
- AI-oversættelsesagenter opretter korrekt linkede dokumenter automatisk
- AI Lock sikrer at menneskelige oversættelser aldrig overskrives

## Konfiguration

\`\`\`typescript
defineCollection({
  name: 'posts',
  sourceLocale: 'en',
  locales: ['en', 'da'],
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richtext' },
  ],
})
\`\`\`

Ingen plugins, ingen tredjeparts oversættelsesstyring. Bare \`translationGroup\` og den indbyggede editor.`,
});

console.log("\n✓ Side-by-side editing docs created (EN + DA)");
