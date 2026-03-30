/**
 * Seed shared code snippets and update docs to reference them.
 * Run: npx tsx scripts/seed-snippets.ts
 */
import { writeFileSync, readFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const SNIPPETS_DIR = join(__dirname, "..", "content", "snippets");
const DOCS_DIR = join(__dirname, "..", "content", "docs");
mkdirSync(SNIPPETS_DIR, { recursive: true });

interface Snippet {
  slug: string;
  title: string;
  description: string;
  code: string;
  lang: string;
}

function writeSnippet(s: Snippet) {
  const json = {
    id: randomUUID(),
    slug: s.slug,
    status: "published",
    data: {
      title: s.title,
      description: s.description,
      code: s.code,
      lang: s.lang,
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(SNIPPETS_DIR, `${s.slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ snippet: ${s.slug}`);
}

// ═══════════════════════════════════════════════════
// Define all shared snippets
// ═══════════════════════════════════════════════════

const snippets: Snippet[] = [
  {
    slug: "create-project",
    title: "Create a new project",
    description: "Scaffold a new @webhouse/cms project",
    lang: "bash",
    code: `# Scaffold a new project
npm create @webhouse/cms my-site

# Or with npx
npx create-@webhouse/cms my-site

# With a specific template
npm create @webhouse/cms my-site -- --template nextjs`,
  },
  {
    slug: "dev-and-build",
    title: "Dev server and build",
    description: "Start dev server and build for production",
    lang: "bash",
    code: `cd my-site
npm install
npx cms dev       # Start dev server + admin UI
npx cms build     # Build static site
npx cms serve     # Preview the build`,
  },
  {
    slug: "storage-filesystem",
    title: "Filesystem storage config",
    description: "Configure filesystem storage adapter",
    lang: "typescript",
    code: `// ALWAYS specify storage — defaults to SQLite if omitted!
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}`,
  },
  {
    slug: "storage-github",
    title: "GitHub storage config",
    description: "Configure GitHub storage adapter",
    lang: "typescript",
    code: `storage: {
  adapter: 'github',
  github: {
    owner: 'your-org',
    repo: 'your-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}`,
  },
  {
    slug: "content-loader",
    title: "Content loader functions",
    description: "Read CMS content in Next.js with fs",
    lang: "typescript",
    code: `import { readFileSync, readdirSync, existsSync } from 'fs';
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
}`,
  },
  {
    slug: "document-json",
    title: "Document JSON format",
    description: "Standard document structure in content/",
    lang: "json",
    code: `{
  "id": "unique-uuid",
  "slug": "my-document",
  "status": "published",
  "locale": "en",
  "translationGroup": "shared-uuid",
  "data": {
    "title": "My Document",
    "content": "Markdown content...",
    "_seo": {
      "metaTitle": "SEO Title (30-60 chars)",
      "metaDescription": "Description (120-160 chars)"
    }
  },
  "_fieldMeta": {},
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-03-29T14:00:00Z"
}`,
  },
  {
    slug: "define-collection",
    title: "Define a collection",
    description: "Basic collection definition in cms.config.ts",
    lang: "typescript",
    code: `import { defineConfig, defineCollection } from '@webhouse/cms';

export default defineConfig({
  collections: [
    defineCollection({
      name: 'posts',
      label: 'Blog Posts',
      urlPrefix: '/blog',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'content', type: 'richtext' },
        { name: 'date', type: 'date' },
        { name: 'tags', type: 'tags' },
      ],
    }),
  ],
  storage: {
    adapter: 'filesystem',
    filesystem: { contentDir: 'content' },
  },
});`,
  },
  {
    slug: "nextjs-blog-page",
    title: "Next.js blog listing page",
    description: "Blog listing with generateStaticParams",
    lang: "typescript",
    code: `// app/blog/page.tsx
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
}`,
  },
  {
    slug: "nextjs-post-page",
    title: "Next.js blog post page",
    description: "Dynamic post page with SEO metadata",
    lang: "typescript",
    code: `// app/blog/[slug]/page.tsx
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
}`,
  },
  {
    slug: "richtext-renderer",
    title: "Richtext renderer",
    description: "Render CMS richtext with react-markdown",
    lang: "typescript",
    code: `import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArticleBody({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}`,
  },
  {
    slug: "block-renderer",
    title: "Block renderer",
    description: "Render CMS blocks in Next.js",
    lang: "typescript",
    code: `function BlockRenderer({ block }: { block: any }) {
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
}`,
  },
  {
    slug: "i18n-config",
    title: "i18n configuration",
    description: "Multi-language collection config",
    lang: "typescript",
    code: `export default defineConfig({
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
});`,
  },
  {
    slug: "deploy-fly",
    title: "Fly.io deployment",
    description: "Dockerfile and fly.toml for Fly.io",
    lang: "dockerfile",
    code: `FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
CMD ["node", "server.js"]`,
  },
  {
    slug: "ai-generate",
    title: "AI content generation",
    description: "Generate and translate content with AI CLI",
    lang: "bash",
    code: `# Generate a blog post
npx cms ai generate posts "Write a guide to TypeScript generics"

# Rewrite with instructions
npx cms ai rewrite posts/hello-world "Make it more concise"

# SEO optimization across all content
npx cms ai seo`,
  },
  {
    slug: "seo-metadata",
    title: "SEO metadata in Next.js",
    description: "Generate SEO metadata from CMS _seo fields",
    lang: "typescript",
    code: `export async function generateMetadata({ params }) {
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
}`,
  },
];

// Write all snippets
console.log("Seeding snippets...\n");
for (const s of snippets) {
  writeSnippet(s);
}

// ═══════════════════════════════════════════════════
// Now update docs to use {{snippet:slug}} tokens
// ═══════════════════════════════════════════════════

console.log("\nUpdating docs to reference snippets...\n");

// Map of doc slug → replacements (old code block → snippet reference)
const REPLACEMENTS: Record<string, { find: string; snippet: string }[]> = {};

// For quick-start (EN + DA), replace the install/build code blocks
for (const slug of ["quick-start", "quick-start-da"]) {
  const file = join(DOCS_DIR, `${slug}.json`);
  if (!require("fs").existsSync(file)) continue;
  const doc = JSON.parse(readFileSync(file, "utf-8"));
  let c = doc.data.content as string;

  // Replace the first bash block (scaffold) with snippet reference
  c = c.replace(
    /```bash\n# (?:Scaffold|Opret) (?:a new project|et nyt projekt)\n.*?\n.*?\n```/s,
    "{{snippet:create-project}}"
  );

  // Replace install+run block
  c = c.replace(
    /```bash\ncd my-site\nnpm install\nnpx cms dev.*?\n```/s,
    "{{snippet:dev-and-build}}"
  );

  doc.data.content = c;
  doc.updatedAt = new Date().toISOString();
  writeFileSync(file, JSON.stringify(doc, null, 2));
  console.log(`  ✓ ${slug} — using snippets`);
}

// For nextjs-patterns (EN + DA), replace content loader
for (const slug of ["nextjs-patterns", "nextjs-patterns-da"]) {
  const file = join(DOCS_DIR, `${slug}.json`);
  if (!require("fs").existsSync(file)) continue;
  const doc = JSON.parse(readFileSync(file, "utf-8"));
  let c = doc.data.content as string;

  // Replace content loader
  c = c.replace(
    /```typescript\n\/\/ lib\/content\.ts\nimport \{ readFileSync.*?```/s,
    "{{snippet:content-loader}}"
  );

  // Replace blog listing
  c = c.replace(
    /```typescript\n\/\/ app\/blog\/page\.tsx.*?```/s,
    "{{snippet:nextjs-blog-page}}"
  );

  doc.data.content = c;
  doc.updatedAt = new Date().toISOString();
  writeFileSync(file, JSON.stringify(doc, null, 2));
  console.log(`  ✓ ${slug} — using snippets`);
}

// For config-reference (EN + DA), replace storage configs
for (const slug of ["config-reference", "config-reference-da"]) {
  const file = join(DOCS_DIR, `${slug}.json`);
  if (!require("fs").existsSync(file)) continue;
  const doc = JSON.parse(readFileSync(file, "utf-8"));
  let c = doc.data.content as string;

  c = c.replace(
    /```typescript\n\/\/ (?:Filesystem|Filsystem) \((?:recommended|anbefalet).*?\n.*?adapter: 'filesystem'.*?```/s,
    "{{snippet:storage-filesystem}}"
  );

  c = c.replace(
    /```typescript\n\/\/ GitHub \(API-based.*?\n.*?adapter: 'github'.*?```/s,
    "{{snippet:storage-github}}"
  );

  doc.data.content = c;
  doc.updatedAt = new Date().toISOString();
  writeFileSync(file, JSON.stringify(doc, null, 2));
  console.log(`  ✓ ${slug} — using snippets`);
}

console.log(`\n✓ ${snippets.length} snippets created, docs updated with references`);
