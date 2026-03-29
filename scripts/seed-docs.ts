/**
 * Seed initial documentation content.
 * Run: npx tsx scripts/seed-docs.ts
 *
 * Generates JSON documents in content/docs/ based on AI guide modules
 * and help articles from the CMS monorepo.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const CONTENT_DIR = join(__dirname, "..", "content", "docs");
mkdirSync(CONTENT_DIR, { recursive: true });

interface DocSeed {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  content: string;
  helpCardId?: string;
}

function writeDoc(doc: DocSeed) {
  const translationGroup = randomUUID();
  const json = {
    id: randomUUID(),
    slug: doc.slug,
    status: "published",
    locale: "en",
    translationGroup,
    data: {
      title: doc.title,
      description: doc.description,
      content: doc.content,
      category: doc.category,
      order: doc.order,
      ...(doc.helpCardId ? { helpCardId: doc.helpCardId } : {}),
      _seo: {
        metaTitle: `${doc.title} — webhouse.app Docs`,
        metaDescription: doc.description,
        keywords: ["webhouse", "cms", "documentation", doc.category],
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(
    join(CONTENT_DIR, `${doc.slug}.json`),
    JSON.stringify(json, null, 2)
  );
  console.log(`  ✓ ${doc.slug}`);
}

// ═══════════════════════════════════════════════════
// Getting Started
// ═══════════════════════════════════════════════════

const docs: DocSeed[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description:
      "What is @webhouse/cms and why it exists — a file-based, AI-native CMS for TypeScript projects.",
    category: "getting-started",
    order: 0,
    content: `## What is @webhouse/cms?

\`@webhouse/cms\` is a **file-based, AI-native CMS engine** for TypeScript projects. You define collections and fields in a \`cms.config.ts\` file, and the CMS stores content as flat JSON files in a \`content/\` directory — one file per document, organized by collection.

It provides:

- **REST API server** — Hono-based API for reading and writing content
- **Static site builder** — 9-phase build pipeline generating HTML, sitemap, RSS, robots.txt, and AI discovery files
- **AI content generation** — built-in agents for writing, SEO optimization, translation, and more
- **Visual admin UI** — full-featured editor at [webhouse.app](https://webhouse.app) with rich text, blocks, media, and scheduling
- **MCP integration** — Model Context Protocol server for AI platform access to your content

## Who is it for?

@webhouse/cms is designed for developers building content-driven websites with Next.js. It works especially well when:

- You want **file-based content** that lives in your Git repository
- You need **AI-powered content workflows** (generation, translation, SEO optimization)
- You prefer **TypeScript-first** configuration over YAML or markdown frontmatter
- You want a **visual admin UI** without the complexity of a headless CMS

## Architecture

\`\`\`
cms.config.ts          → Collection + field definitions
content/               → JSON documents (one per file)
packages/cms           → Core engine (@webhouse/cms)
packages/cms-admin     → Next.js admin UI (@webhouse/cms-admin)
packages/cms-ai        → AI agents (@webhouse/cms-ai)
packages/cms-cli       → CLI tools (@webhouse/cms-cli)
packages/cms-mcp-*     → MCP servers for AI platform access
\`\`\`

The core package (\`@webhouse/cms\`) is framework-agnostic — it reads and writes JSON files. The admin UI (\`@webhouse/cms-admin\`) is a standalone Next.js application that connects to the core engine.

## Next steps

- [Quick Start](/docs/quick-start) — scaffold and run your first project in under 5 minutes
- [Configuration Reference](/docs/config-reference) — learn how to define collections and fields
- [Field Types](/docs/field-types) — explore all 22 field types`,
  },

  {
    slug: "quick-start",
    title: "Quick Start",
    description:
      "Scaffold a new project and have a CMS-powered site running in under 5 minutes.",
    category: "getting-started",
    order: 1,
    content: `## Create a new project

\`\`\`bash
# Scaffold a new project
npm create @webhouse/cms my-site

# Or with the CLI directly
npx @webhouse/cms-cli init my-site
\`\`\`

This generates:

\`\`\`
my-site/
  cms.config.ts          # Collection + field definitions
  package.json           # Dependencies
  .env                   # AI provider keys
  content/
    posts/
      hello-world.json   # Example document
\`\`\`

## Install and run

\`\`\`bash
cd my-site
npm install
npx cms dev       # Start dev server + admin UI
\`\`\`

The dev server starts at \`http://localhost:3000\` and the admin UI opens automatically.

## Create content

Open the admin UI and create your first document. It will be saved as a JSON file in \`content/posts/\`.

Every document follows this structure:

\`\`\`json
{
  "slug": "my-first-post",
  "status": "published",
  "data": {
    "title": "My First Post",
    "content": "Hello, world!"
  },
  "id": "unique-id",
  "_fieldMeta": {}
}
\`\`\`

## Build for production

\`\`\`bash
npx cms build     # Build static site
npx cms serve     # Preview the build locally
\`\`\`

The build pipeline generates:
- HTML pages for all published documents
- \`sitemap.xml\` for search engines
- \`robots.txt\` with AI crawler rules
- \`llms.txt\` and \`llms-full.txt\` for AI discovery
- \`feed.xml\` RSS feed
- Per-page \`.md\` files for AI consumption

## Next steps

- [Configuration Reference](/docs/config-reference) — define your own collections
- [Field Types](/docs/field-types) — explore all available field types
- [Storage Adapters](/docs/storage-adapters) — choose where content is stored
- [Deployment](/docs/deployment) — deploy to Vercel, Fly.io, or Netlify`,
  },

  // ═══════════════════════════════════════════════════
  // Configuration
  // ═══════════════════════════════════════════════════

  {
    slug: "config-reference",
    title: "Configuration Reference",
    description:
      "Complete reference for cms.config.ts — collections, fields, storage, build, and API settings.",
    category: "config",
    order: 0,
    content: `## cms.config.ts

The configuration file uses helper functions for type safety:

\`\`\`typescript
import { defineConfig, defineCollection, defineBlock, defineField } from '@webhouse/cms';

export default defineConfig({
  collections: [ /* ... */ ],
  blocks: [ /* ... */ ],
  defaultLocale: 'en',
  locales: ['en', 'da'],
  autolinks: [ /* ... */ ],
  storage: { /* ... */ },       // REQUIRED
  build: { outDir: 'dist', baseUrl: '/' },
  api: { port: 3000 },
});
\`\`\`

> **Important:** You MUST always specify the \`storage\` adapter. If omitted, it defaults to SQLite — not filesystem. This is the most common configuration mistake.

## Collection config

\`\`\`typescript
defineCollection({
  name: 'posts',                 // Required: unique identifier
  label: 'Blog Posts',           // Optional: display name in admin UI
  slug: 'posts',                 // Optional: URL slug override
  urlPrefix: '/blog',            // Optional: URL prefix for pages
  sourceLocale: 'en',            // Optional: primary authoring locale
  locales: ['en', 'da'],         // Optional: translatable locales
  translatable: true,            // Optional: enable translation support
  fields: [ /* ... */ ],         // Required: array of FieldConfig
  hooks: {                       // Optional: lifecycle hooks
    beforeCreate: 'path/to/hook.js',
    afterCreate: 'path/to/hook.js',
    beforeUpdate: 'path/to/hook.js',
    afterUpdate: 'path/to/hook.js',
    beforeDelete: 'path/to/hook.js',
    afterDelete: 'path/to/hook.js',
  },
})
\`\`\`

## Build config

\`\`\`typescript
build: {
  outDir: 'dist',               // Output directory
  baseUrl: 'https://example.com', // Site URL for absolute links
  siteTitle: 'My Site',
  siteDescription: 'A great site',
  robots: {
    strategy: 'maximum',         // 'maximum' | 'balanced' | 'restrictive' | 'custom'
  },
  rss: {
    title: 'My Site RSS',
    description: 'Latest updates',
    language: 'en',
    collections: ['posts'],      // Filter to specific collections
    maxItems: 50,
  },
}
\`\`\`

## Storage config

\`\`\`typescript
// Filesystem (recommended for static sites)
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}

// GitHub (API-based, each edit is a commit)
storage: {
  adapter: 'github',
  github: {
    owner: 'your-org',
    repo: 'your-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}

// SQLite (local database)
storage: {
  adapter: 'sqlite',
  sqlite: { path: './data/cms.db' },
}
\`\`\`

## API config

\`\`\`typescript
api: {
  port: 3000,                    // Dev server port
}
\`\`\``,
  },

  // ═══════════════════════════════════════════════════
  // Field Types
  // ═══════════════════════════════════════════════════

  {
    slug: "field-types",
    title: "Field Types",
    description:
      "Complete reference for all 22 field types — text, richtext, image, blocks, relation, and more.",
    category: "config",
    order: 1,
    content: `## Common field properties

Every field supports these properties:

\`\`\`typescript
{
  name: string;          // Required: field key in document data
  type: FieldType;       // Required: one of the types below
  label?: string;        // Display label in admin UI
  required?: boolean;    // Must have a value
  defaultValue?: unknown;
  ai?: {                 // AI generation hints
    hint?: string;       // e.g. "Write in a friendly tone"
    maxLength?: number;
    tone?: string;       // e.g. "professional", "casual"
  };
  aiLock?: {             // AI lock behavior
    autoLockOnEdit?: boolean;  // Lock when user edits (default: true)
    lockable?: boolean;
    requireApproval?: boolean;
  };
}
\`\`\`

## Basic types

### text
Single-line text input.
\`\`\`typescript
{ name: 'title', type: 'text', required: true, maxLength: 120 }
\`\`\`

### textarea
Multi-line plain text.
\`\`\`typescript
{ name: 'excerpt', type: 'textarea', maxLength: 300 }
\`\`\`

### number
\`\`\`typescript
{ name: 'price', type: 'number' }
\`\`\`

### boolean
\`\`\`typescript
{ name: 'featured', type: 'boolean' }
\`\`\`

### date
ISO date string.
\`\`\`typescript
{ name: 'publishDate', type: 'date' }
\`\`\`

## Content types

### richtext
Rich text / Markdown content with a block editor in admin UI. Optional \`features\` array controls toolbar.
\`\`\`typescript
{ name: 'content', type: 'richtext' }

// Restricted features
{ name: 'content', type: 'richtext', features: ['bold', 'italic', 'heading', 'link', 'image'] }
\`\`\`

### htmldoc
Full HTML document editor (visual WYSIWYG).
\`\`\`typescript
{ name: 'template', type: 'htmldoc' }
\`\`\`

## Media types

### image
Single image reference.
\`\`\`typescript
{ name: 'heroImage', type: 'image' }
\`\`\`

### image-gallery
Multiple images. **Values must be \`{ url, alt }[]\` objects, not plain strings.**
\`\`\`typescript
{ name: 'photos', type: 'image-gallery' }
\`\`\`

### video
\`\`\`typescript
{ name: 'intro', type: 'video' }
\`\`\`

### audio
\`\`\`typescript
{ name: 'podcast', type: 'audio' }
\`\`\`

### file
\`\`\`typescript
{ name: 'download', type: 'file' }
\`\`\`

## Structure types

### select
\`\`\`typescript
{
  name: 'category', type: 'select',
  options: [
    { label: 'Web', value: 'web' },
    { label: 'Mobile', value: 'mobile' },
  ],
}
\`\`\`

### tags
Free-form tags stored as \`string[]\`.
\`\`\`typescript
{ name: 'tags', type: 'tags' }
\`\`\`

### relation
Reference to documents in another collection.
\`\`\`typescript
{ name: 'author', type: 'relation', collection: 'team' }
{ name: 'related', type: 'relation', collection: 'posts', multiple: true }
\`\`\`

### array
Repeatable items. Without \`fields\` it stores \`string[]\`.
\`\`\`typescript
{ name: 'bullets', type: 'array' }
{ name: 'stats', type: 'array', fields: [
  { name: 'value', type: 'text' },
  { name: 'label', type: 'text' },
]}
\`\`\`

### object
Nested field group.
\`\`\`typescript
{ name: 'address', type: 'object', fields: [
  { name: 'street', type: 'text' },
  { name: 'city', type: 'text' },
]}
\`\`\`

### blocks
Dynamic content sections using the block system.
\`\`\`typescript
{ name: 'sections', type: 'blocks', blocks: ['hero', 'features', 'cta'] }
\`\`\`

## Special types

### map
OpenStreetMap with draggable pin. Stores \`{ lat, lng, address, zoom }\`.
\`\`\`typescript
{ name: 'location', type: 'map' }
\`\`\`

### interactive
Reference to an Interactive component from the library.
\`\`\`typescript
{ name: 'chart', type: 'interactive' }
\`\`\`

### column-slots
Multi-column layout with nested fields.
\`\`\`typescript
{ name: 'layout', type: 'column-slots' }
\`\`\``,
  },

  // ═══════════════════════════════════════════════════
  // Guides
  // ═══════════════════════════════════════════════════

  {
    slug: "storage-adapters",
    title: "Storage Adapters",
    description:
      "Choose where your content is stored — filesystem, GitHub, SQLite, or Supabase.",
    category: "guides",
    order: 0,
    content: `## Choosing a storage adapter

@webhouse/cms supports four storage backends. Each has different trade-offs for performance, collaboration, and deployment.

> **Critical:** You MUST always specify \`storage\` in \`cms.config.ts\`. If omitted, it defaults to SQLite — not filesystem. This is the most common configuration mistake.

## Filesystem (recommended)

Stores documents as JSON files in \`content/<collection>/<slug>.json\`. Best for:
- Static sites with \`build.ts\`
- Git-based version control
- Local development

\`\`\`typescript
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}
\`\`\`

## GitHub

Reads and writes files via the GitHub API. Each create/update/delete is a Git commit. Best for:
- Collaborative editing without local Git
- PR-based content review workflows
- Sites hosted on GitHub Pages

\`\`\`typescript
storage: {
  adapter: 'github',
  github: {
    owner: 'your-org',
    repo: 'your-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}
\`\`\`

## SQLite

Local SQLite database. Best for:
- API-heavy use cases
- When you don't need file-based content
- Prototyping

\`\`\`typescript
storage: {
  adapter: 'sqlite',
  sqlite: { path: './data/cms.db' },
}
\`\`\`

## Supabase

Cloud-hosted PostgreSQL with Row Level Security. Best for:
- Multi-user environments
- Cloud-native deployments
- When you need real-time subscriptions

\`\`\`typescript
storage: {
  adapter: 'supabase',
  supabase: {
    url: process.env.SUPABASE_URL!,
    serviceKey: process.env.SUPABASE_SERVICE_KEY!,
  },
}
\`\`\``,
  },

  {
    slug: "blocks",
    title: "Blocks",
    description:
      "Build content-rich pages with reusable block components — hero, features, CTA, and custom blocks.",
    category: "guides",
    order: 1,
    content: `## What are blocks?

Blocks are reusable content sections that editors can add, remove, and reorder. Each block type has its own fields and renders differently on the frontend.

## Defining blocks

\`\`\`typescript
import { defineConfig, defineBlock, defineCollection } from '@webhouse/cms';

export default defineConfig({
  blocks: [
    defineBlock({
      name: 'hero',
      label: 'Hero Section',
      fields: [
        { name: 'tagline', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'image' },
        { name: 'ctas', type: 'array', fields: [
          { name: 'label', type: 'text' },
          { name: 'href', type: 'text' },
        ]},
      ],
    }),
    defineBlock({
      name: 'features',
      label: 'Features Grid',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'items', type: 'array', fields: [
          { name: 'icon', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
      ],
    }),
  ],
  collections: [
    defineCollection({
      name: 'pages',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'sections', type: 'blocks', blocks: ['hero', 'features'] },
      ],
    }),
  ],
});
\`\`\`

## How blocks are stored

Each block is an object with a \`_block\` discriminator field:

\`\`\`json
{
  "sections": [
    {
      "_block": "hero",
      "tagline": "Build faster with AI",
      "description": "The CMS that writes content for you."
    },
    {
      "_block": "features",
      "title": "Why choose us",
      "items": [
        { "icon": "⚡", "title": "Fast", "description": "Sub-second builds" }
      ]
    }
  ]
}
\`\`\`

## Rendering blocks in Next.js

\`\`\`typescript
function BlockRenderer({ block }: { block: any }) {
  switch (block._block) {
    case 'hero':
      return (
        <section>
          <h1>{block.tagline}</h1>
          <p>{block.description}</p>
        </section>
      );
    case 'features':
      return (
        <section>
          <h2>{block.title}</h2>
          <div className="grid grid-cols-3 gap-4">
            {block.items?.map((item: any, i: number) => (
              <div key={i}>
                <span>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      );
    default:
      return null;
  }
}
\`\`\``,
  },

  {
    slug: "nextjs-patterns",
    title: "Next.js Patterns",
    description:
      "How to read CMS content in Next.js — loader functions, pages, static generation, and metadata.",
    category: "guides",
    order: 2,
    content: `## Reading content

All content is read server-side using \`fs\`:

\`\`\`typescript
// lib/content.ts
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT = join(process.cwd(), 'content');

export function getCollection(name: string) {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(readFileSync(join(dir, f), 'utf-8')))
    .filter(d => d.status === 'published');
}

export function getDocument(collection: string, slug: string) {
  const file = join(CONTENT, collection, \`\${slug}.json\`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf-8'));
}
\`\`\`

## Blog listing page

\`\`\`typescript
// app/blog/page.tsx
import { getCollection } from '@/lib/content';

export default function BlogPage() {
  const posts = getCollection('posts')
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));

  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <a key={post.slug} href={\`/blog/\${post.slug}\`}>
          <h2>{post.data.title}</h2>
          <p>{post.data.excerpt}</p>
        </a>
      ))}
    </div>
  );
}
\`\`\`

## Dynamic page with static generation

\`\`\`typescript
// app/blog/[slug]/page.tsx
import { getCollection, getDocument } from '@/lib/content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getCollection('posts').map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocument('posts', slug);
  if (!doc) return {};
  return {
    title: doc.data._seo?.metaTitle ?? doc.data.title,
    description: doc.data._seo?.metaDescription ?? doc.data.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocument('posts', slug);
  if (!doc) notFound();

  return (
    <article>
      <h1>{doc.data.title}</h1>
      {/* Render doc.data.content with react-markdown */}
    </article>
  );
}
\`\`\`

## Key patterns

1. **Server Components only** — content reads happen at build/request time
2. **\`generateStaticParams\`** — pre-generate all pages at build time
3. **\`generateMetadata\`** — SEO metadata from CMS \`_seo\` fields
4. **Always filter published** — \`status === 'published'\` to skip drafts
5. **Never hardcode content** — everything from CMS JSON files`,
  },

  {
    slug: "i18n",
    title: "Internationalization (i18n)",
    description:
      "Multi-language content with automatic AI translation, locale routing, and hreflang.",
    category: "guides",
    order: 3,
    content: `## Configure locales

\`\`\`typescript
export default defineConfig({
  defaultLocale: 'en',
  locales: ['en', 'da'],

  collections: [
    defineCollection({
      name: 'posts',
      sourceLocale: 'en',
      locales: ['en', 'da'],
      translatable: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richtext' },
      ],
    }),
  ],
});
\`\`\`

## How translations work

Each translation is a **separate document** linked via \`translationGroup\` — a shared UUID connecting all language versions:

\`\`\`json
// content/posts/hello-world.json (English)
{
  "slug": "hello-world",
  "locale": "en",
  "translationGroup": "abc-123",
  "data": { "title": "Hello, World!" }
}

// content/posts/hello-world-da.json (Danish)
{
  "slug": "hello-world-da",
  "locale": "da",
  "translationGroup": "abc-123",
  "data": { "title": "Hej, Verden!" }
}
\`\`\`

## Admin UI translation workflow

In the admin UI:
1. Open a document — see the locale badge showing current language
2. Click **"+ Add translation"** to create a new locale version
3. The AI translator auto-translates all fields
4. Review and publish the translation

Translations appear grouped in the document list and the editor shows a locale switcher.

## AI translation

\`\`\`typescript
import { createAi } from '@webhouse/cms-ai';

const ai = await createAi();
const result = await ai.content.translate(
  sourceDoc.data,
  'da',
  { collection: collectionConfig },
);
// result.fields contains translated data
\`\`\`

## Locale routing in Next.js

Use a \`[locale]\` route segment:

\`\`\`
app/
  [locale]/
    blog/
      [slug]/page.tsx
    page.tsx
  layout.tsx
\`\`\`

With a middleware for locale detection:

\`\`\`typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'da'];
const DEFAULT = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(l => pathname.startsWith(\`/\${l}/\`) || pathname === \`/\${l}\`);
  if (hasLocale) return;

  const preferred = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ?? DEFAULT;
  const locale = LOCALES.includes(preferred) ? preferred : DEFAULT;
  return NextResponse.redirect(new URL(\`/\${locale}\${pathname}\`, request.url));
}
\`\`\``,
  },

  {
    slug: "seo",
    title: "SEO & Visibility",
    description:
      "Meta fields, JSON-LD structured data, sitemap, robots.txt, and AI visibility optimization.",
    category: "guides",
    order: 4,
    helpCardId: "visibility-intro",
    content: `## SEO fields

Every document can have an \`_seo\` field in its data:

\`\`\`json
{
  "data": {
    "title": "My Post",
    "_seo": {
      "metaTitle": "My Post — Best Guide (30-60 chars)",
      "metaDescription": "A comprehensive guide to... (120-160 chars)",
      "keywords": ["keyword1", "keyword2"],
      "ogImage": "/uploads/og-image.jpg",
      "jsonLd": { "@type": "Article", "headline": "..." }
    }
  }
}
\`\`\`

## Generating metadata in Next.js

\`\`\`typescript
export async function generateMetadata({ params }) {
  const doc = getDocument('posts', (await params).slug);
  const seo = doc?.data._seo ?? {};
  return {
    title: seo.metaTitle ?? doc?.data.title,
    description: seo.metaDescription ?? doc?.data.excerpt,
    openGraph: {
      title: seo.metaTitle ?? doc?.data.title,
      description: seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}
\`\`\`

## Visibility scoring

The CMS admin includes a Visibility dashboard that scores every document on two axes:

**SEO Score** (13 rules) — meta title length, meta description, keywords, heading structure, content length, internal links, image alt text, and more.

**GEO Score** (8 rules) — optimizes content for AI platform citation:
1. Answer-first structure
2. Question-format headers
3. Statistics and data points
4. External citations
5. Content freshness (updated within 90 days)
6. JSON-LD structured data
7. Named author
8. Content depth (800+ words)

## Build output

The CMS build pipeline automatically generates:
- \`sitemap.xml\` — all published pages with hreflang
- \`robots.txt\` — AI-aware crawler rules (4 strategies)
- \`llms.txt\` — AI-friendly site index
- \`llms-full.txt\` — complete markdown export
- \`feed.xml\` — RSS 2.0 feed
- Per-page \`.md\` files for AI consumption`,
  },

  {
    slug: "deployment",
    title: "Deployment",
    description:
      "Deploy your CMS-powered site to Vercel, Fly.io, Netlify, or Docker.",
    category: "deployment",
    order: 0,
    content: `## Pre-deployment checklist

- All documents intended to be live have \`status: "published"\`
- No published pages reference draft-only documents
- All relation fields point to existing, published documents
- OG images exist for key pages
- Environment variables are configured
- \`next build\` succeeds locally

## Vercel

\`\`\`bash
npx vercel
\`\`\`

Configure image domains in \`next.config.ts\`:

\`\`\`typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'your-domain.com', pathname: '/uploads/**' },
  ],
}
\`\`\`

## Fly.io

\`\`\`toml
# fly.toml
primary_region = "arn"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
\`\`\`

\`\`\`dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
CMD ["node", "server.js"]
\`\`\`

## Netlify

\`\`\`bash
npx netlify-cli deploy --build
\`\`\`

## Docker (self-hosted)

\`\`\`dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/package.json ./
RUN npm ci --omit=dev
CMD ["npm", "start"]
\`\`\`

## Post-deployment verification

- Visit \`/sitemap.xml\` and confirm all pages are listed
- Check page source for OpenGraph and JSON-LD tags
- Test social sharing preview
- Confirm images load correctly
- If using revalidation, test the webhook endpoint`,
  },

  // ═══════════════════════════════════════════════════
  // CLI
  // ═══════════════════════════════════════════════════

  {
    slug: "cli-reference",
    title: "CLI Reference",
    description:
      "All CMS CLI commands — init, dev, build, serve, AI generate, AI rewrite, SEO, and MCP.",
    category: "cli",
    order: 0,
    content: `## Commands

All commands run via \`npx cms <command>\` (provided by \`@webhouse/cms-cli\`).

| Command | Description |
|---------|-------------|
| \`cms init [name]\` | Scaffold a new CMS project |
| \`cms dev [--port 3000]\` | Start dev server with hot reload |
| \`cms build [--outDir dist]\` | Build static site |
| \`cms serve [--port 5000] [--dir dist]\` | Serve the built static site |
| \`cms ai generate <collection> "<prompt>"\` | Generate a new document with AI |
| \`cms ai rewrite <collection>/<slug> "<instruction>"\` | Rewrite existing document |
| \`cms ai seo [--status published]\` | Run SEO optimization on all documents |
| \`cms mcp keygen [--label "key"] [--scopes "read,write"]\` | Generate MCP API key |
| \`cms mcp test [--endpoint url]\` | Test local MCP server |
| \`cms mcp status [--endpoint url]\` | Check MCP server status |

## AI commands

AI commands require \`@webhouse/cms-ai\` and an \`ANTHROPIC_API_KEY\` or \`OPENAI_API_KEY\` in \`.env\`.

\`\`\`bash
# Generate a blog post
npx cms ai generate posts "Write a guide to TypeScript generics"

# Rewrite with instructions
npx cms ai rewrite posts/hello-world "Make it more concise and add code examples"

# SEO optimization across all published content
npx cms ai seo
\`\`\`

## MCP commands

\`\`\`bash
# Generate an API key for MCP access
npx cms mcp keygen --label "My App" --scopes "read"

# Test the MCP endpoint
npx cms mcp test --endpoint http://localhost:3000/api/mcp

# Check MCP server status
npx cms mcp status
\`\`\``,
  },

  // ═══════════════════════════════════════════════════
  // Concepts
  // ═══════════════════════════════════════════════════

  {
    slug: "content-structure",
    title: "Content Structure",
    description:
      "How documents are stored as JSON files — the document format, directory layout, and conventions.",
    category: "concepts",
    order: 0,
    content: `## Document format

Every document is a JSON file in \`content/{collection}/{slug}.json\`:

\`\`\`json
{
  "id": "unique-uuid",
  "slug": "my-document",
  "status": "published",
  "locale": "en",
  "translationGroup": "shared-uuid",
  "data": {
    "title": "My Document",
    "content": "Markdown content here...",
    "_seo": {
      "metaTitle": "SEO Title",
      "metaDescription": "Description for search engines"
    }
  },
  "_fieldMeta": {},
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-03-29T14:00:00Z"
}
\`\`\`

## Key rules

1. **Slug must match filename** — \`hello-world.json\` must have \`"slug": "hello-world"\`
2. **\`_fieldMeta\` is required** — can be empty \`{}\`, tracks AI lock state
3. **Always filter by status** — skip drafts with \`status === "published"\`
4. **\`data\` contains all content fields** — everything defined in your collection's \`fields\` array
5. **\`_seo\` is a reserved field** — used for SEO metadata

## Directory layout

\`\`\`
content/
  posts/
    hello-world.json
    hello-world-da.json    # Danish translation
    typescript-guide.json
  pages/
    home.json
    about.json
  global/
    global.json            # Singleton for site settings
\`\`\`

## Status lifecycle

| Status | Meaning |
|--------|---------|
| \`draft\` | Work in progress, not visible on site |
| \`published\` | Live on site |
| \`archived\` | Removed from site but kept for reference |
| \`expired\` | Auto-set when \`unpublishAt\` date passes |

## Scheduled publishing

Documents support automatic publish/unpublish via date fields:

\`\`\`json
{
  "status": "draft",
  "publishAt": "2026-04-01T09:00:00Z",
  "unpublishAt": "2026-04-30T23:59:59Z"
}
\`\`\`

The scheduler automatically changes status when the date arrives.`,
  },

  {
    slug: "ai-agents",
    title: "AI Agents",
    description:
      "Built-in AI agents for content generation, SEO optimization, GEO optimization, and translation.",
    category: "concepts",
    order: 1,
    helpCardId: "agents-intro",
    content: `## What are AI agents?

AI agents generate and optimize content based on your brand voice and configuration. Each agent has a specific role:

| Agent | Role |
|-------|------|
| **Content Writer** | Creates new blog posts, pages, descriptions |
| **SEO Optimizer** | Improves meta fields, keywords, heading structure |
| **GEO Optimizer** | Restructures content for AI citation (answer-first, statistics, sources) |
| **Translator** | Translates content to configured locales |
| **Content Refresher** | Updates stale content with current information |

## How agents work

1. You configure agents in the admin UI (Settings → Agents)
2. Each agent has a system prompt that defines its behavior
3. Agents produce **drafts** that land in the **Curation Queue**
4. You review, approve, or reject each draft
5. Approved content is published automatically

## AI Lock

Fields you've edited by hand are **locked** — agents won't overwrite them. This ensures human edits are preserved even when agents run bulk operations.

The lock state is tracked in \`_fieldMeta\`:

\`\`\`json
{
  "_fieldMeta": {
    "title": { "lockedBy": "user", "lockedAt": "2026-03-29T10:00:00Z" }
  }
}
\`\`\`

## Brand voice

Configure a brand voice in Settings to ensure all AI-generated content matches your tone:

- **Tone** — professional, casual, friendly, authoritative
- **Audience** — developers, marketers, general public
- **Guidelines** — specific instructions like "Always use active voice" or "Include code examples"

## Programmatic usage

\`\`\`typescript
import { createAi } from '@webhouse/cms-ai';

const ai = await createAi();

// Generate content
const result = await ai.content.generate('posts', {
  prompt: 'Write a guide to TypeScript generics',
});

// Translate
const translated = await ai.content.translate(
  sourceDoc.data,
  'da',
  { collection: collectionConfig },
);
\`\`\``,
  },

  {
    slug: "media",
    title: "Media Management",
    description:
      "Image processing, AI analysis, galleries, and media library features.",
    category: "concepts",
    order: 2,
    helpCardId: "media-ai-analysis",
    content: `## Media library

The CMS admin includes a full media library with:
- **Upload** — drag & drop or file picker
- **Organization** — folders, tags, search
- **Processing** — automatic WebP conversion, responsive variants
- **AI analysis** — auto-generated captions, alt text, and tags

## Image processing

Uploaded images are automatically:
1. Converted to WebP for optimal file size
2. Resized to responsive variants (e.g., 400w, 800w, 1200w)
3. EXIF data extracted (camera, lens, GPS, etc.)
4. AI-analyzed for captions and alt text

## AI image analysis

When you upload an image, the AI analyzes it to generate:
- **Caption** — descriptive text for context
- **Alt text** — accessibility description for screen readers and SEO
- **Tags** — auto-generated tags for organization

You can also batch-analyze existing images from the media library.

## Using images in content

### Image field
\`\`\`typescript
{ name: 'heroImage', type: 'image' }
\`\`\`

### Image gallery
\`\`\`typescript
{ name: 'photos', type: 'image-gallery' }
\`\`\`

Gallery values must be \`{ url, alt }[]\` objects:
\`\`\`json
"photos": [
  { "url": "/uploads/photo-1.webp", "alt": "Description" },
  { "url": "/uploads/photo-2.webp", "alt": "Another photo" }
]
\`\`\`

## Rendering images in Next.js

\`\`\`typescript
import Image from 'next/image';

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      priority
    />
  );
}
\`\`\``,
  },

  // ═══════════════════════════════════════════════════
  // API Reference
  // ═══════════════════════════════════════════════════

  {
    slug: "api-reference",
    title: "Content API",
    description:
      "Programmatic API for reading and writing content — ContentService methods and REST endpoints.",
    category: "api-reference",
    order: 0,
    content: `## ContentService

The core CMS engine exposes a \`ContentService\` for programmatic content access:

\`\`\`typescript
import { createCms } from '@webhouse/cms';
import config from './cms.config';

const cms = await createCms(config);

// Create
const doc = await cms.content.create('posts', {
  slug: 'new-post',
  status: 'draft',
  data: { title: 'New Post', content: '...' },
});

// Read
const post = await cms.content.findBySlug('posts', 'new-post');
const all = await cms.content.findMany('posts', { status: 'published' });

// Update
await cms.content.update('posts', doc.id, {
  data: { title: 'Updated Title' },
});

// Delete
await cms.content.delete('posts', doc.id);
\`\`\`

## REST API

The CMS exposes a Hono-based REST API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/cms/{collection}\` | List documents |
| GET | \`/api/cms/{collection}/{slug}\` | Get document by slug |
| POST | \`/api/cms/{collection}\` | Create document |
| PUT | \`/api/cms/{collection}/{id}\` | Update document |
| DELETE | \`/api/cms/{collection}/{id}\` | Delete document |

### Query parameters

| Param | Description |
|-------|-------------|
| \`status\` | Filter by status: \`published\`, \`draft\`, \`all\` |
| \`locale\` | Filter by locale |
| \`limit\` | Maximum results |
| \`offset\` | Pagination offset |
| \`tags\` | Filter by tags (comma-separated) |

### Example

\`\`\`bash
# List published posts
curl http://localhost:3000/api/cms/posts?status=published

# Get a specific post
curl http://localhost:3000/api/cms/posts/hello-world

# Create a new post
curl -X POST http://localhost:3000/api/cms/posts \\
  -H "Content-Type: application/json" \\
  -d '{"slug":"new-post","status":"draft","data":{"title":"New"}}'
\`\`\`

## MCP (Model Context Protocol)

The CMS also exposes content via MCP for AI platform access:

\`\`\`bash
# Generate an API key
npx cms mcp keygen --label "My App" --scopes "read"

# Test the endpoint
npx cms mcp test
\`\`\`

MCP allows AI platforms like Claude and ChatGPT to read your content directly, enabling them to cite your documentation and articles.`,
  },
];

// ═══════════════════════════════════════════════════
// Write all docs
// ═══════════════════════════════════════════════════

console.log("Seeding documentation content...\n");
for (const doc of docs) {
  writeDoc(doc);
}
console.log(`\n✓ ${docs.length} documents created in content/docs/`);
