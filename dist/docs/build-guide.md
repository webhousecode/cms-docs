# Guide to build.ts — Static Site Generation

*Updated: 2026-03-30*
*Language: en*

Step-by-step guide to building the perfect build.ts for a static HTML site powered by @webhouse/cms.

## What is build.ts?

`build.ts` is a custom static site generator that reads your CMS content (JSON files) and outputs plain HTML. No framework, no runtime JavaScript — just HTML + CSS that works everywhere.

```bash
npx tsx build.ts    # Generate dist/
```

## Lesson 1: Load content

The foundation — read JSON files from `content/`:

```typescript
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
```

## Lesson 2: Render markdown

Convert richtext content to HTML:

```typescript
import { marked } from 'marked';

function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}
```

## Lesson 3: HTML template

Wrap content in a complete HTML document:

```typescript
function htmlPage(title: string, body: string, css: string): string {
  return `

  
  
  ${title}
  ${css}

  ${body}

`;
}
```

## Lesson 4: Build a page

Combine content loading, markdown rendering, and HTML template:

```typescript
function buildPage(doc: any, css: string): string {
  const title = doc.data.title;
  const content = renderMarkdown(doc.data.content || '');
  const body = `
    
      ${title}
      ${content}
    
  `;
  return htmlPage(title, body, css);
}
```

## Lesson 5: Render blocks

If your pages use blocks (hero, features, CTA), render each block type:

```typescript
interface Block { _block: string; [key: string]: unknown; }

function renderBlock(block: Block): string {
  switch (block._block) {
    case 'hero':
      return `
        ${block.tagline}
        ${block.description}
      `;
    case 'features':
      const items = (block.items as any[]) || [];
      return `
        ${block.title}
        
          ${items.map(i => `${i.title}${i.description}`).join('')}
        
      `;
    case 'cta':
      return `
        ${block.title}
        ${block.buttonText}
      `;
    default:
      return '';
  }
}

function renderBlocks(blocks: Block[]): string {
  return blocks.map(renderBlock).join('\n');
}
```

## Lesson 6: SEO metadata

Extract SEO fields and generate meta tags:

```typescript
function seoTags(doc: any): string {
  const seo = doc.data._seo || {};
  const title = seo.metaTitle || doc.data.title;
  const desc = seo.metaDescription || doc.data.excerpt || '';
  return `
    ${title}
    
    
    
    ${seo.ogImage ? `` : ''}
  `;
}
```

## Lesson 7: Write output

Generate files to `dist/`:

```typescript
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
  writePage(`/blog/${post.slug}`, html);
}
```

## Lesson 8: Sitemap

Generate `sitemap.xml` for search engines:

```typescript
function generateSitemap(baseUrl: string, pages: string[]): string {
  const urls = pages.map(p =>
    `  ${baseUrl}${p}`
  ).join('\n');
  return `

${urls}
`;
}
```

## Lesson 9: Resolve snippets

Add snippet support to your build:

```typescript
function resolveSnippets(markdown: string): string {
  return markdown.replace(
    /\{\{snippet:([a-z0-9-]+)\}\}/g,
    (_match, slug) => {
      const snippet = getDocument('snippets', slug);
      if (!snippet) return '';
      return '\x60\x60\x60' + (snippet.data.lang || 'text') +
        '\n' + snippet.data.code + '\n\x60\x60\x60';
    }
  );
}

// Use in your build pipeline:
const content = resolveSnippets(doc.data.content);
const html = renderMarkdown(content);
```

## Lesson 10: Copy static assets

Copy uploads and public files:

```typescript
import { cpSync } from 'node:fs';

// Copy uploads
cpSync(join(import.meta.dirname, 'public', 'uploads'),
       join(DIST, 'uploads'), { recursive: true });

// Copy favicon
cpSync(join(import.meta.dirname, 'public', 'favicon.svg'),
       join(DIST, 'favicon.svg'));
```

## The complete build pipeline

Putting it all together:

```typescript
// 1. Load CSS (inline in HTML)
const css = readFileSync('styles.css', 'utf-8');

// 2. Build collection index pages
const posts = getCollection('posts');
writePage('/blog', buildListPage('Blog', posts, css));

// 3. Build individual pages
for (const post of posts) {
  writePage(`/blog/${post.slug}`, buildPage(post, css));
}

// 4. Build homepage
const home = getDocument('pages', 'home');
if (home) writePage('/', buildPage(home, css));

// 5. Generate sitemap
const allPaths = ['/'].concat(posts.map(p => `/blog/${p.slug}`));
writeFileSync(join(DIST, 'sitemap.xml'), generateSitemap(BASE_URL, allPaths));

// 6. Copy assets
cpSync('public/uploads', join(DIST, 'uploads'), { recursive: true });

console.log('Built ' + allPaths.length + ' pages');
```

## Next steps

- [Templates](/docs/templates) — start from a working boilerplate instead of scratch
- [Next.js Patterns](/docs/nextjs-patterns) — if you want React instead of static HTML
- [Shared Snippets](/docs/shared-snippets) — reusable code blocks across pages