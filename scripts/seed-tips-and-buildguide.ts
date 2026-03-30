/**
 * Seed Tips & Tricks + Build.ts Guide + Next.js Guide docs.
 * Run: npx tsx scripts/seed-tips-and-buildguide.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");
mkdirSync(DIR, { recursive: true });

function writeDoc(slug: string, locale: string, data: Record<string, unknown>) {
  const json = {
    id: randomUUID(),
    slug,
    status: "published",
    locale,
    translationGroup: randomUUID(),
    data: {
      ...data,
      _seo: {
        metaTitle: `${data.title} — webhouse.app Docs`,
        metaDescription: data.description,
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(DIR, `${slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ ${slug}`);
}

// ═══════════════════════════════════════════════════════════════
// 1. SHARED SNIPPETS — DOGFOODING ARTICLE (EN + DA)
// ═══════════════════════════════════════════════════════════════

writeDoc("shared-snippets", "en", {
  title: "Shared Snippets — Reusable Code Blocks",
  description: "How we built a shared snippets system for docs.webhouse.app using our own CMS — and how you can do the same.",
  category: "tips",
  order: 0,
  content: `## The problem

Documentation sites repeat the same code examples across multiple pages. The "Quick Start" page shows the install command. The "Templates" page shows it too. The "CLI Reference" shows it again. When the command changes, you update it in one place and forget the other two.

## The solution: a snippets collection

We added a \`snippets\` collection to our CMS config:

\`\`\`typescript
defineCollection({
  name: "snippets",
  label: "Shared Snippets",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "code", type: "textarea", required: true },
    { name: "lang", type: "text" },
  ],
})
\`\`\`

Each snippet is a JSON file in \`content/snippets/\`:

\`\`\`json
{
  "slug": "create-project",
  "status": "published",
  "data": {
    "title": "Create a new project",
    "code": "npm create @webhouse/cms my-site",
    "lang": "bash"
  }
}
\`\`\`

## Using snippets in markdown

In any doc page's content field, reference a snippet with:

\`\`\`
{{snippet:create-project}}
\`\`\`

At render time, the token is resolved to the actual code block from the snippets collection. The snippet's \`lang\` field determines syntax highlighting.

## Implementation in build.ts (static sites)

For static HTML sites using a custom \`build.ts\`, add a snippet resolver before markdown rendering:

\`\`\`typescript
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SNIPPETS_DIR = join(process.cwd(), 'content', 'snippets');

function resolveSnippets(markdown: string): string {
  return markdown.replace(
    /\\{\\{snippet:([a-z0-9-]+)\\}\\}/g,
    (_match, slug) => {
      const file = join(SNIPPETS_DIR, slug + '.json');
      if (!existsSync(file)) return '<!-- snippet not found -->';
      const snippet = JSON.parse(readFileSync(file, 'utf-8'));
      const lang = snippet.data.lang || 'text';
      const code = snippet.data.code || '';
      return '\\x60\\x60\\x60' + lang + '\\n' + code + '\\n\\x60\\x60\\x60';
    }
  );
}

// In your build pipeline:
const rawContent = doc.data.content;
const withSnippets = resolveSnippets(rawContent);
const html = marked.parse(withSnippets);
\`\`\`

## Implementation in Next.js (server components)

For Next.js sites, resolve snippets in your content renderer:

\`\`\`typescript
// components/doc-content.tsx
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SNIPPETS_DIR = join(process.cwd(), 'content', 'snippets');

function resolveSnippets(content: string): string {
  return content.replace(
    /\\{\\{snippet:([a-z0-9-]+)\\}\\}/g,
    (_match, slug) => {
      const file = join(SNIPPETS_DIR, slug + '.json');
      if (!existsSync(file)) return '';
      const snippet = JSON.parse(readFileSync(file, 'utf-8'));
      return '\\x60\\x60\\x60' + (snippet.data.lang || 'text') +
        '\\n' + snippet.data.code + '\\n\\x60\\x60\\x60';
    }
  );
}

// Use before rendering markdown
export function DocContent({ content }) {
  const resolved = resolveSnippets(content);
  // ... render resolved markdown
}
\`\`\`

## Beyond code: other use cases

Snippets don't have to be code. You could use them for:

- **Disclaimers** — legal text that appears on multiple pages
- **Version badges** — current version number updated in one place
- **Feature matrices** — comparison tables shared across product pages
- **Contact info** — address, phone, email used in footer and contact page
- **Pricing** — price points referenced in features, pricing, and FAQ pages

## Why this matters

This is dogfooding at its best. We built docs.webhouse.app with @webhouse/cms, and when we needed reusable content blocks, we used the CMS's own collection system. No plugins, no custom infrastructure — just another collection.

The same pattern works for any CMS-powered site. If you find yourself copy-pasting content between pages, create a snippets collection and reference it.`,
});

writeDoc("shared-snippets-da", "da", {
  title: "Delte Snippets — Genbrugelige kodeblokke",
  description: "Sådan byggede vi et delt snippet-system til docs.webhouse.app med vores eget CMS — og hvordan du kan gøre det samme.",
  category: "tips",
  order: 0,
  content: `## Problemet

Dokumentationssites gentager de samme kodeeksempler på tværs af flere sider. "Hurtig start" viser installationskommandoen. "Skabeloner" viser den også. "CLI-reference" viser den igen. Når kommandoen ændres, opdaterer du ét sted og glemmer de andre to.

## Løsningen: en snippets-collection

Vi tilføjede en \`snippets\`-collection til vores CMS-konfiguration:

\`\`\`typescript
defineCollection({
  name: "snippets",
  label: "Delte Snippets",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "code", type: "textarea", required: true },
    { name: "lang", type: "text" },
  ],
})
\`\`\`

## Brug af snippets i markdown

I enhver doc-sides indholdsfeld, referér en snippet med:

\`\`\`
{{snippet:create-project}}
\`\`\`

Ved render-tid opløses tokenet til den faktiske kodeblok fra snippets-collectionen.

## Implementering i build.ts (statiske sites)

Tilføj en snippet-resolver før markdown-rendering:

\`\`\`typescript
function resolveSnippets(markdown: string): string {
  return markdown.replace(
    /\\{\\{snippet:([a-z0-9-]+)\\}\\}/g,
    (_match, slug) => {
      const file = join(SNIPPETS_DIR, slug + '.json');
      if (!existsSync(file)) return '';
      const snippet = JSON.parse(readFileSync(file, 'utf-8'));
      return '\\x60\\x60\\x60' + snippet.data.lang + '\\n' +
        snippet.data.code + '\\n\\x60\\x60\\x60';
    }
  );
}
\`\`\`

## Ud over kode: andre brugsmuligheder

Snippets behøver ikke være kode:

- **Ansvarsfraskrivelser** — juridisk tekst der vises på flere sider
- **Versionsbadges** — aktuelt versionsnummer opdateret ét sted
- **Funktionsmatricer** — sammenligningstabeller delt på tværs af produktsider
- **Kontaktinfo** — adresse, telefon, email brugt i footer og kontaktside
- **Priser** — prispoints refereret i features, prissætning og FAQ-sider

## Hvorfor dette er vigtigt

Dette er dogfooding i sin bedste form. Vi byggede docs.webhouse.app med @webhouse/cms, og når vi havde brug for genbrugelige indholdsblokke, brugte vi CMS'ets eget collection-system. Ingen plugins, ingen custom infrastruktur — bare endnu en collection.`,
});

// ═══════════════════════════════════════════════════════════════
// 2. BUILD.TS GUIDE (EN + DA)
// ═══════════════════════════════════════════════════════════════

writeDoc("build-guide", "en", {
  title: "Guide to build.ts — Static Site Generation",
  description: "Step-by-step guide to building the perfect build.ts for a static HTML site powered by @webhouse/cms.",
  category: "guides",
  order: 10,
  content: `## What is build.ts?

\`build.ts\` is a custom static site generator that reads your CMS content (JSON files) and outputs plain HTML. No framework, no runtime JavaScript — just HTML + CSS that works everywhere.

\`\`\`bash
npx tsx build.ts    # Generate dist/
\`\`\`

## Lesson 1: Load content

The foundation — read JSON files from \`content/\`:

\`\`\`typescript
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT = join(import.meta.dirname, 'content');

function getCollection(name: string) {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(readFileSync(join(dir, f), 'utf-8')))
    .filter(d => d.status === 'published');
}

function getDocument(collection: string, slug: string) {
  const file = join(CONTENT, collection, slug + '.json');
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf-8'));
}
\`\`\`

## Lesson 2: Render markdown

Convert richtext content to HTML:

\`\`\`typescript
import { marked } from 'marked';

function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}
\`\`\`

## Lesson 3: HTML template

Wrap content in a complete HTML document:

\`\`\`typescript
function htmlPage(title: string, body: string, css: string): string {
  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${title}</title>
  <style>\${css}</style>
</head>
<body>
  \${body}
</body>
</html>\`;
}
\`\`\`

## Lesson 4: Build a page

Combine content loading, markdown rendering, and HTML template:

\`\`\`typescript
function buildPage(doc: any, css: string): string {
  const title = doc.data.title;
  const content = renderMarkdown(doc.data.content || '');
  const body = \`
    <article>
      <h1>\${title}</h1>
      \${content}
    </article>
  \`;
  return htmlPage(title, body, css);
}
\`\`\`

## Lesson 5: Render blocks

If your pages use blocks (hero, features, CTA), render each block type:

\`\`\`typescript
interface Block { _block: string; [key: string]: unknown; }

function renderBlock(block: Block): string {
  switch (block._block) {
    case 'hero':
      return \`<section class="hero">
        <h1>\${block.tagline}</h1>
        <p>\${block.description}</p>
      </section>\`;
    case 'features':
      const items = (block.items as any[]) || [];
      return \`<section class="features">
        <h2>\${block.title}</h2>
        <div class="grid">
          \${items.map(i => \`<div><h3>\${i.title}</h3><p>\${i.description}</p></div>\`).join('')}
        </div>
      </section>\`;
    case 'cta':
      return \`<section class="cta">
        <h2>\${block.title}</h2>
        <a href="\${block.buttonUrl}">\${block.buttonText}</a>
      </section>\`;
    default:
      return '';
  }
}

function renderBlocks(blocks: Block[]): string {
  return blocks.map(renderBlock).join('\\n');
}
\`\`\`

## Lesson 6: SEO metadata

Extract SEO fields and generate meta tags:

\`\`\`typescript
function seoTags(doc: any): string {
  const seo = doc.data._seo || {};
  const title = seo.metaTitle || doc.data.title;
  const desc = seo.metaDescription || doc.data.excerpt || '';
  return \`
    <title>\${title}</title>
    <meta name="description" content="\${desc}">
    <meta property="og:title" content="\${title}">
    <meta property="og:description" content="\${desc}">
    \${seo.ogImage ? \`<meta property="og:image" content="\${seo.ogImage}">\` : ''}
  \`;
}
\`\`\`

## Lesson 7: Write output

Generate files to \`dist/\`:

\`\`\`typescript
import { writeFileSync, mkdirSync } from 'node:fs';

const DIST = join(import.meta.dirname, 'dist');

function writePage(urlPath: string, html: string) {
  const dir = join(DIST, urlPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

// Build all pages
const posts = getCollection('posts');
for (const post of posts) {
  const html = buildPage(post, css);
  writePage(\`/blog/\${post.slug}\`, html);
}
\`\`\`

## Lesson 8: Sitemap

Generate \`sitemap.xml\` for search engines:

\`\`\`typescript
function generateSitemap(baseUrl: string, pages: string[]): string {
  const urls = pages.map(p =>
    \`  <url><loc>\${baseUrl}\${p}</loc></url>\`
  ).join('\\n');
  return \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${urls}
</urlset>\`;
}
\`\`\`

## Lesson 9: Resolve snippets

Add snippet support to your build:

\`\`\`typescript
function resolveSnippets(markdown: string): string {
  return markdown.replace(
    /\\{\\{snippet:([a-z0-9-]+)\\}\\}/g,
    (_match, slug) => {
      const snippet = getDocument('snippets', slug);
      if (!snippet) return '';
      return '\\x60\\x60\\x60' + (snippet.data.lang || 'text') +
        '\\n' + snippet.data.code + '\\n\\x60\\x60\\x60';
    }
  );
}

// Use in your build pipeline:
const content = resolveSnippets(doc.data.content);
const html = renderMarkdown(content);
\`\`\`

## Lesson 10: Copy static assets

Copy uploads and public files:

\`\`\`typescript
import { cpSync } from 'node:fs';

// Copy uploads
cpSync(join(import.meta.dirname, 'public', 'uploads'),
       join(DIST, 'uploads'), { recursive: true });

// Copy favicon
cpSync(join(import.meta.dirname, 'public', 'favicon.svg'),
       join(DIST, 'favicon.svg'));
\`\`\`

## The complete build pipeline

Putting it all together:

\`\`\`typescript
// 1. Load CSS (inline in HTML)
const css = readFileSync('styles.css', 'utf-8');

// 2. Build collection index pages
const posts = getCollection('posts');
writePage('/blog', buildListPage('Blog', posts, css));

// 3. Build individual pages
for (const post of posts) {
  writePage(\`/blog/\${post.slug}\`, buildPage(post, css));
}

// 4. Build homepage
const home = getDocument('pages', 'home');
if (home) writePage('/', buildPage(home, css));

// 5. Generate sitemap
const allPaths = ['/'].concat(posts.map(p => \`/blog/\${p.slug}\`));
writeFileSync(join(DIST, 'sitemap.xml'), generateSitemap(BASE_URL, allPaths));

// 6. Copy assets
cpSync('public/uploads', join(DIST, 'uploads'), { recursive: true });

console.log('Built ' + allPaths.length + ' pages');
\`\`\`

## Next steps

- [Templates](/docs/templates) — start from a working boilerplate instead of scratch
- [Next.js Patterns](/docs/nextjs-patterns) — if you want React instead of static HTML
- [Shared Snippets](/docs/shared-snippets) — reusable code blocks across pages`,
});

writeDoc("build-guide-da", "da", {
  title: "Guide til build.ts — Statisk site-generering",
  description: "Trin-for-trin guide til at bygge den perfekte build.ts til et statisk HTML-site drevet af @webhouse/cms.",
  category: "guides",
  order: 10,
  content: `## Hvad er build.ts?

\`build.ts\` er en custom statisk site-generator der læser dit CMS-indhold (JSON-filer) og outputter ren HTML. Intet framework, intet runtime-JavaScript — bare HTML + CSS der virker overalt.

\`\`\`bash
npx tsx build.ts    # Generér dist/
\`\`\`

## Lektion 1: Indlæs indhold

Fundamentet — læs JSON-filer fra \`content/\`:

{{snippet:content-loader}}

## Lektion 2: Rendér markdown

Konvertér richtext-indhold til HTML:

\`\`\`typescript
import { marked } from 'marked';

function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}
\`\`\`

## Lektion 3: HTML-skabelon

Wrap indhold i et komplet HTML-dokument:

\`\`\`typescript
function htmlPage(title: string, body: string, css: string): string {
  return \`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${title}</title>
  <style>\${css}</style>
</head>
<body>\${body}</body>
</html>\`;
}
\`\`\`

## Lektion 4: Byg en side

Kombinér indholdsindlæsning, markdown-rendering og HTML-skabelon.

## Lektion 5: Rendér blokke

Hvis dine sider bruger blokke (hero, features, CTA), rendér hver bloktype:

{{snippet:block-renderer}}

## Lektion 6: SEO-metadata

Udtrk SEO-felter og generér meta-tags fra \`_seo\`-feltet.

## Lektion 7: Skriv output

Generér filer til \`dist/\` med \`writeFileSync\` og \`mkdirSync\`.

## Lektion 8: Sitemap

Generér \`sitemap.xml\` til søgemaskiner.

## Lektion 9: Resolve snippets

Tilføj snippet-support til dit build — se [Delte Snippets](/docs/shared-snippets-da).

## Lektion 10: Kopiér statiske assets

Kopiér uploads og public-filer til dist/.

## Næste skridt

- [Skabeloner](/docs/templates-da) — start fra en fungerende boilerplate
- [Next.js-mønstre](/docs/nextjs-patterns-da) — hvis du vil have React
- [Delte Snippets](/docs/shared-snippets-da) — genbrugelige kodeblokke`,
});

// ═══════════════════════════════════════════════════════════════
// 3. NEXT.JS INTEGRATION GUIDE (EN + DA)
// ═══════════════════════════════════════════════════════════════

writeDoc("nextjs-guide", "en", {
  title: "Next.js Integration Guide",
  description: "Complete guide to building a Next.js App Router site with @webhouse/cms — from content reading to deployment.",
  category: "guides",
  order: 11,
  content: `## Overview

This guide walks you through building a complete Next.js site with @webhouse/cms. The CMS handles content storage and editing. Next.js handles rendering and routing.

## Step 1: Project setup

{{snippet:create-project}}

Or start from the Next.js boilerplate:

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

## Step 2: Content layer

The content layer reads JSON files at build/request time:

{{snippet:content-loader}}

## Step 3: Root layout

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  const global = getDocument('global', 'global');
  return (
    <html lang="en">
      <body>
        <nav>{/* render global.data.navLinks */}</nav>
        <main>{children}</main>
        <footer>{global?.data.footerText}</footer>
      </body>
    </html>
  );
}
\`\`\`

## Step 4: Homepage with blocks

\`\`\`typescript
// app/page.tsx
import { getDocument } from '@/lib/content';

export default function Home() {
  const page = getDocument('pages', 'home');
  if (!page) return <p>Create content/pages/home.json</p>;

  return (
    <div>
      {page.data.sections?.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}
\`\`\`

## Step 5: Blog with static generation

{{snippet:nextjs-blog-page}}

Individual posts with SEO:

{{snippet:nextjs-post-page}}

## Step 6: Richtext rendering

{{snippet:richtext-renderer}}

> **Never use \`dangerouslySetInnerHTML\`** with regex-based markdown parsers. Use \`react-markdown\` with \`remark-gfm\`.

## Step 7: Block rendering

{{snippet:block-renderer}}

## Step 8: SEO metadata

{{snippet:seo-metadata}}

## Step 9: i18n (optional)

{{snippet:i18n-config}}

## Step 10: Deployment

{{snippet:deploy-fly}}

## The build pipeline integration

When you run \`next build\`, Next.js:
1. Reads all content from \`content/\` via your loader functions
2. Pre-renders all pages via \`generateStaticParams\`
3. Generates SEO metadata via \`generateMetadata\`
4. Outputs to \`.next/\` (or \`.next/standalone\` for Docker)

The CMS build pipeline (\`npx cms build\`) generates additional files:
- \`sitemap.xml\`, \`robots.txt\`, \`feed.xml\`
- \`llms.txt\`, \`llms-full.txt\` for AI discovery
- Per-page \`.md\` files

For a Next.js site, you typically use Next.js's own \`app/sitemap.ts\` and \`app/robots.ts\` instead of the CMS build pipeline.

## Key patterns

1. **Server Components by default** — all content reads happen server-side
2. **\`"use client"\` only where needed** — theme toggle, search, markdown renderer
3. **\`generateStaticParams\`** — pre-generate all pages at build time
4. **\`generateMetadata\`** — SEO from CMS \`_seo\` fields with fallbacks
5. **Never hardcode content** — everything from CMS JSON files
6. **Filter by published** — always check \`status === "published"\``,
});

writeDoc("nextjs-guide-da", "da", {
  title: "Next.js integrationsguide",
  description: "Komplet guide til at bygge en Next.js App Router-site med @webhouse/cms — fra indholdsindlæsning til deployment.",
  category: "guides",
  order: 11,
  content: `## Oversigt

Denne guide gennemgår opbygningen af et komplet Next.js-site med @webhouse/cms. CMS'et håndterer indholdslagring og redigering. Next.js håndterer rendering og routing.

## Trin 1: Projektopsætning

{{snippet:create-project}}

Eller start fra Next.js-boilerplaten:

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

## Trin 2: Indholdslag

Indholdslaget læser JSON-filer ved build/request-tid:

{{snippet:content-loader}}

## Trin 3: Root layout

Root layout læser globale indstillinger og renderer navbar + footer.

## Trin 4: Forside med blokke

Forsiden læser \`content/pages/home.json\` og renderer blokke.

## Trin 5: Blog med statisk generering

{{snippet:nextjs-blog-page}}

Individuelle indlæg med SEO:

{{snippet:nextjs-post-page}}

## Trin 6: Richtext-rendering

{{snippet:richtext-renderer}}

> **Brug aldrig \`dangerouslySetInnerHTML\`** med regex-baserede parsere.

## Trin 7: Blok-rendering

{{snippet:block-renderer}}

## Trin 8: SEO-metadata

{{snippet:seo-metadata}}

## Trin 9: i18n (valgfrit)

{{snippet:i18n-config}}

## Trin 10: Deployment

{{snippet:deploy-fly}}

## Vigtige mønstre

1. **Server Components som standard** — al indholdsindlæsning sker server-side
2. **\`"use client"\` kun hvor nødvendigt** — tema-toggle, søgning, markdown
3. **\`generateStaticParams\`** — prægenerér alle sider ved build-tid
4. **\`generateMetadata\`** — SEO fra CMS \`_seo\`-felter med fallbacks
5. **Hardkod aldrig indhold** — alt fra CMS JSON-filer
6. **Filtrér på published** — tjek altid \`status === "published"\``,
});

console.log("\n✓ 6 documents created (snippets tip EN/DA + build guide EN/DA + nextjs guide EN/DA)");
