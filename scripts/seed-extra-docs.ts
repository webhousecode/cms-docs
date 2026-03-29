/**
 * Seed additional docs: Richtext, Relationships, Troubleshooting, Interactives.
 * Run: npx tsx scripts/seed-extra-docs.ts
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
}

function writeDoc(doc: DocSeed) {
  const json = {
    id: randomUUID(),
    slug: doc.slug,
    status: "published",
    locale: "en",
    translationGroup: randomUUID(),
    data: {
      title: doc.title,
      description: doc.description,
      content: doc.content,
      category: doc.category,
      order: doc.order,
      _seo: {
        metaTitle: `${doc.title} — webhouse.app Docs`,
        metaDescription: doc.description,
        keywords: ["webhouse", "cms", doc.category],
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(CONTENT_DIR, `${doc.slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ ${doc.slug}`);
}

const docs: DocSeed[] = [
  {
    slug: "richtext",
    title: "Richtext Editor",
    description: "TipTap-based rich text editor with embedded media, callouts, tables, code blocks, and AI features.",
    category: "guides",
    order: 5,
    content: `## Overview

Every \`richtext\` field uses a built-in TipTap v3 editor with full media embedding, structured content nodes, and AI assistance.

## Embedded media types

| Node | Description |
|------|-------------|
| **Image** | Upload or paste. Supports resize handles and alignment. |
| **Video embed** | YouTube or Vimeo URL → responsive iframe. |
| **Audio embed** | Upload mp3/wav/ogg → inline \`<audio>\` player. |
| **File attachment** | Upload any file → download-link card. |
| **Callout** | Styled info/warning/tip/danger box with editable text. |
| **Table** | Structured data table with header row, context toolbar. |
| **Code block** | Fenced code block with syntax highlighting. |
| **Interactive embed** | Embed an Interactive from the Interactives manager. |

## Controlling available features

Use the \`features\` array to control which toolbar items are shown:

\`\`\`typescript
// Full-featured (default — all tools available)
{ name: 'content', type: 'richtext' }

// Restricted — only basic formatting + images
{
  name: 'content',
  type: 'richtext',
  features: ['bold', 'italic', 'heading', 'link', 'image', 'bulletList', 'orderedList']
}

// Minimal — text only, no media
{
  name: 'bio',
  type: 'richtext',
  features: ['bold', 'italic', 'link']
}
\`\`\`

## All available features

| Feature | Toolbar item | Shortcut |
|---------|-------------|----------|
| \`bold\` | Bold text | Cmd+B |
| \`italic\` | Italic text | Cmd+I |
| \`underline\` | Underline | Cmd+U |
| \`strike\` | Strikethrough | Cmd+Shift+S |
| \`code\` | Inline code | |
| \`superscript\` | Superscript (x²) | Cmd+. |
| \`subscript\` | Subscript (x₂) | Cmd+, |
| \`heading\` | Heading selector (H1-H3) | |
| \`bulletList\` | Bullet list | |
| \`orderedList\` | Numbered list | |
| \`blockquote\` | Blockquote | |
| \`horizontalRule\` | Horizontal line | |
| \`textAlign\` | Text alignment | |
| \`highlight\` | Highlight with color picker | |
| \`link\` | Hyperlink | Cmd+K |
| \`table\` | Data table | |
| \`image\` | Image upload/embed | |
| \`video\` | Video embed | |
| \`audio\` | Audio file upload | |
| \`file\` | File attachment | |
| \`callout\` | Info/warning/tip callout | |
| \`interactive\` | Interactive embed | |

## Markdown storage

Richtext fields store **markdown**. Standard formatting uses native markdown syntax. Features that markdown doesn't support use inline HTML:

| Feature | Stored as |
|---------|-----------|
| Underline | \`<u>text</u>\` |
| Superscript | \`<sup>text</sup>\` |
| Subscript | \`<sub>text</sub>\` |
| Highlight | \`<mark style="background-color:#fde68a">text</mark>\` |
| Text alignment | \`<p style="text-align:center">text</p>\` |
| Interactive embed | \`!!INTERACTIVE[id|title|align:left]\` |

## Rendering in Next.js

Use \`react-markdown\` with \`remark-gfm\`:

\`\`\`typescript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArticleBody({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
\`\`\`

> **Never use \`dangerouslySetInnerHTML\`** with a regex-based parser — it breaks images with sizing, tables, and embedded media.

## AI features

- **AI Proofread** — auto-detects language, checks spelling/grammar/style
- **AI Bubble Menu** — select text for rewrite options (shorter, longer, formal, casual, translate)
- **Zoom** — scale editor content 50%-200%`,
  },

  {
    slug: "relationships",
    title: "Content Relationships",
    description: "Connect documents across collections with relation fields — single, multi, and reverse lookups.",
    category: "guides",
    order: 6,
    content: `## How relations work

Relations connect documents across collections. A relation field stores a **slug string** (single) or **slug array** (multiple) — never embedded data.

\`\`\`typescript
// Single relation — stores one slug, e.g. "john-doe"
{ name: 'author', type: 'relation', collection: 'team' }

// Multi relation — stores slug array, e.g. ["guide-1", "guide-2"]
{ name: 'relatedPosts', type: 'relation', collection: 'posts', multiple: true }
\`\`\`

## Resolving relations

Since relations store slugs, resolve them with \`getDocument()\`:

\`\`\`typescript
function resolveRelation(collection: string, slug: string | null) {
  if (!slug) return null;
  return getDocument(collection, slug);
}

function resolveRelations(collection: string, slugs: string[] | null) {
  if (!slugs?.length) return [];
  return slugs
    .map(slug => getDocument(collection, slug))
    .filter(Boolean);
}
\`\`\`

## Pattern: Blog post with author

\`\`\`typescript
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getDocument('posts', slug);
  if (!post) notFound();

  // Resolve author
  const author = post.data.author
    ? getDocument('team', post.data.author)
    : null;

  // Resolve related posts
  const related = (post.data.relatedPosts ?? [])
    .map(s => getDocument('posts', s))
    .filter(Boolean);

  return (
    <article>
      <h1>{post.data.title}</h1>
      {author && (
        <div>
          <img src={author.data.photo} alt={author.data.name} />
          <p>{author.data.name}</p>
        </div>
      )}
    </article>
  );
}
\`\`\`

## Reverse lookup

Find all documents that reference a given slug:

\`\`\`typescript
// All posts by a specific author
const posts = getCollection('posts')
  .filter(post => post.data.author === authorSlug);
\`\`\`

## When to use relations vs. embedded data

**Use relations** when:
- Data is shared across multiple documents (e.g., author on many posts)
- Related data changes independently
- You need a canonical source of truth

**Use embedded data** (object/array fields) when:
- Data is unique to this document
- Data doesn't need independent querying
- Simpler structure without cross-collection lookups`,
  },

  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and fixes — GitHub adapter, content not showing, port conflicts, images, and more.",
    category: "guides",
    order: 7,
    content: `## GitHub adapter: "Bad Token"

**Cause:** OAuth token expired or revoked.

**Fix:**
1. Go to Sites → Settings → reconnect GitHub
2. Use a fine-grained PAT with \`contents: read/write\` for long-term stability
3. For automation: use a GitHub App installation token

## "Collection Not Found"

**Cause:** Collection name in \`cms.config.ts\` doesn't match content directory.

**Fix:** Names must be identical:
\`\`\`
cms.config.ts: defineCollection({ name: 'posts' })
Directory:     content/posts/
\`\`\`

## Content not showing after save

**Cause:** Next.js static cache — pages built at deploy time aren't regenerated until next build.

**Fix options:**
1. **On-demand revalidation** (recommended) — configure webhook in Site Settings → Revalidation
2. **Time-based revalidation** — add \`export const revalidate = 60;\` to pages
3. **Rebuild on content change** — Git webhook triggers deployment

## Port already in use

\`\`\`bash
# Find what's using the port
lsof -ti:3000

# Use a different port
npx cms dev --port 3001
\`\`\`

## Images not loading in production

**Cause:** Missing \`remotePatterns\` in \`next.config.ts\`.

**Fix:**
\`\`\`typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'your-domain.com', pathname: '/uploads/**' },
  ],
}
\`\`\`

## Supabase: "Could Not Find Table"

**Cause:** PostgREST hasn't refreshed its schema cache.

**Fix:**
1. Restart the Supabase project
2. Verify table exists: \`SELECT * FROM information_schema.tables WHERE table_name = 'documents';\`
3. Check that the \`anon\` key has \`SELECT\` permission

## Storage adapter defaults to SQLite

If you forget to specify \`storage\` in \`cms.config.ts\`, it defaults to SQLite. This means:
- Admin UI writes to a SQLite database
- \`build.ts\` reads from \`content/\` JSON files
- The two systems are disconnected

**Fix:** Always specify the adapter explicitly:
\`\`\`typescript
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}
\`\`\``,
  },

  {
    slug: "interactives",
    title: "Interactives",
    description: "Data-driven interactive content — charts, calculators, demos with CMS-managed data.",
    category: "guides",
    order: 8,
    content: `## The separation principle

When building interactive content (charts, animations, calculators), **all text and data must be stored in CMS collections — never hardcoded.**

| What | Where | Editable by |
|------|-------|-------------|
| Text labels, headings | CMS text fields | Editor in admin |
| Data points, numbers | CMS array/object fields | Editor in admin |
| Visualization, animation | Interactive component | Developer |
| Styling, colors | Interactive CSS | Developer |

## Pattern: CMS → Page → Interactive

**1. Define a data collection:**
\`\`\`typescript
defineCollection({
  name: "chart-data",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "chartType", type: "select", options: [
      { label: "Line", value: "line" },
      { label: "Bar", value: "bar" },
    ]},
    { name: "dataPoints", type: "array", fields: [
      { name: "label", type: "text" },
      { name: "value", type: "number" },
    ]},
  ],
})
\`\`\`

**2. Create the component (client):**
\`\`\`typescript
"use client";
export function Chart({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  // Use Chart.js, D3, or any visualization library
  return <div><h3>{title}</h3>{/* render chart */}</div>;
}
\`\`\`

**3. Use in a page (server reads CMS, passes props):**
\`\`\`typescript
import { getDocument } from "@/lib/content";
import { Chart } from "@/components/chart";

export default function Page() {
  const data = getDocument("chart-data", "monthly-sales");
  if (!data) return null;
  return <Chart title={data.data.title} data={data.data.dataPoints} />;
}
\`\`\`

## Standalone HTML interactives

The CMS also supports standalone HTML interactives managed via the Interactives Manager. These are complete HTML files that render in iframes. Use for:
- Self-contained interactives without CMS data
- Quick prototyping with "Create with AI" in admin
- One-off visualizations

## Richtext embedding

Interactives can be embedded in richtext fields:
\`\`\`
!!INTERACTIVE[chart-id|Chart Title|align:center]
\`\`\`

Your renderer must convert these tokens to iframes:
\`\`\`typescript
html = html.replace(
  /!!INTERACTIVE\\[([^\\]]+)\\]/g,
  (_match, inner) => {
    const [id, title = id] = inner.split("|");
    return \`<iframe src="/uploads/interactives/\${id}.html" title="\${title}"
      style="width:100%; border:none; border-radius:0.5rem;"
      loading="lazy" sandbox="allow-scripts allow-same-origin"></iframe>\`;
  },
);
\`\`\`

## Scaled rendering

Render full-size interactives as miniatures using CSS transform:
\`\`\`typescript
<div style={{ width: 500, height: 400, overflow: "hidden" }}>
  <iframe
    src="/interactives/chart.html"
    style={{ width: 1000, height: 800, transform: "scale(0.5)", transformOrigin: "top left" }}
  />
</div>
\`\`\``,
  },
];

console.log("Seeding additional docs...\n");
for (const doc of docs) {
  writeDoc(doc);
}
console.log(`\n✓ ${docs.length} additional documents created`);
