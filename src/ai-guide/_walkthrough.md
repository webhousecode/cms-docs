<!-- @webhouse/cms ai-builder-site v0.1.0 — last updated 2026-04-16 -->

# ai.webhouse.app — AI Builder Site

You are an AI coding assistant. A developer has directed you to this URL because they want
to build a website using **@webhouse/cms** — a framework-agnostic, file-based, AI-native CMS.

This document is self-contained. Follow it **top to bottom**. Every step tells you exactly what
to do next and where to fetch more detail if you need it. You do not need to visit any other
page to finish a basic build.

All URLs below that start with `/ai/` resolve relative to `https://ai.webhouse.app`.

---

## Step 0 — Verify your environment

Before anything, confirm:

```bash
node --version   # must be >= 20
npm --version    # or pnpm --version
```

If either is missing: ask the user to install Node.js 20+ from https://nodejs.org and stop.

Check which directory you're in. If the user has a project root open in the editor, scaffold
inside an empty subdirectory. If not, ask the user for a project name.

---

## Step 1 — Scaffold the project

Run in a shell:

```bash
npm create @webhouse/cms@latest
```

The interactive wizard asks:

1. **Project name** — becomes the directory name
2. **Template**:
   - `nextjs-boilerplate` — React + Next.js (default, pick this unless told otherwise)
   - `static-boilerplate` — no framework, pure static HTML build
   - `nextjs-github-boilerplate` — Next.js + GitHub storage (content lives in a GitHub repo)
3. **Install dependencies** — yes

When it finishes, the directory contains:

```
cms.config.ts          # CMS configuration (the file you edit most)
content/               # Flat JSON documents, one file per record
package.json           # Scripts: dev, build, preview
CLAUDE.md              # Project-specific AI guide (read this once)
src/ or app/           # Framework source code
```

Start the dev server:

```bash
cd <project-name>
npm run dev
```

Two things happen:
- **CMS admin** at http://localhost:3010 (login with the credentials the wizard printed)
- **Site** at whichever port the framework uses (Next.js usually 3000, static usually 3009)

---

## Step 2 — Understand the model

@webhouse/cms stores content as **JSON files**. Every document is one file at
`content/{collection}/{slug}.json`:

```json
{
  "slug": "my-post",
  "status": "published",
  "data": { "title": "My Post", "body": "..." },
  "id": "unique-id",
  "_fieldMeta": {}
}
```

Rules that **cannot** be violated:
- `slug` MUST match the filename without `.json`
- `status` MUST be `"draft"`, `"published"`, or `"trashed"` — only `"published"` renders
- `_fieldMeta` MUST exist, even if empty `{}`
- `data` holds the actual fields as defined in `cms.config.ts`

Collections and their fields are declared in `cms.config.ts`:

```typescript
import { defineConfig, defineCollection } from '@webhouse/cms';

export default defineConfig({
  storage: { adapter: 'filesystem', filesystem: { contentDir: 'content' } },
  collections: [
    defineCollection({
      name: 'posts',
      label: 'Blog Posts',
      kind: 'page',                                                  // REQUIRED
      description: 'Long-form articles. Each has its own URL at /blog/{slug}.',  // REQUIRED
      urlPrefix: '/blog',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'content', type: 'richtext' },
        { name: 'date', type: 'date' },
      ],
    }),
  ],
});
```

**Available field types** (21 total):
`text` `textarea` `richtext` `number` `boolean` `date` `image` `image-gallery` `video`
`audio` `htmldoc` `file` `interactive` `column-slots` `map` `select` `tags` `relation`
`array` `object` `blocks`

Full field type reference: fetch `/ai/03-field-types`
Full config reference: fetch `/ai/02-config-reference`
Real-world multi-collection example: fetch `/ai/10-config-example`

---

## Step 3 — Plan the site with the user

Before writing code, ask the user these five questions:

1. **Type of site?** — blog, portfolio, docs, landing page, e-commerce, company site
2. **Content?** — which entity types need to be editable? (pages, posts, products, team, FAQ, testimonials)
3. **Languages?** — one → skip i18n. Multiple → fetch `/ai/17-i18n`
4. **Deploy target?** — Vercel, Netlify, GitHub Pages, Fly.io, Cloudflare Pages (fetch `/ai/18-deployment`)
5. **SEO priority?** — yes for blogs/marketing (fetch `/ai/15-seo`)

From the answers, propose a **collection map** before editing `cms.config.ts`. Example output:

> I'll create these collections:
> - `pages` (kind: page) — static pages like /about, /contact
> - `posts` (kind: page) — blog posts at /blog/{slug}
> - `team` (kind: data) — team members rendered on /about
> - `settings` (kind: global) — site-wide config

Wait for confirmation before touching code.

---

## Step 4 — Edit cms.config.ts

For **every** collection, pick the right `kind` and write a one-sentence `description`:

| Kind | When | AI behavior |
|------|------|-------------|
| `page` | Has its own URL (blog posts, landing pages) | Full SEO, View pill, sitemap |
| `snippet` | Reusable fragment embedded via `{{snippet:slug}}` | No SEO, no URL |
| `data` | Rendered on OTHER pages in loops (team, FAQ, testimonials) | No SEO, no View pill |
| `form` | Form submissions — read-only from AI | Cannot create documents |
| `global` | Single-record site-wide settings | Treated as config |

**`description`** answers three questions:
1. What is this?
2. Where does it appear?
3. What references it?

Good:
```typescript
defineCollection({
  name: 'team',
  kind: 'data',
  description: 'Team members. Rendered on /about and as bylines on posts via posts.author relation.',
  fields: [ /* ... */ ],
});
```

Bad (do not do this):
```typescript
defineCollection({ name: 'team', fields: [ /* ... */ ] })  // missing kind + description
```

**Reserved collection names** (will break the admin):
`site-settings` `settings` `config` `admin` `media` `interactives`

Use `globals` for site-wide settings instead.

---

## Step 5 — Create starter content

For each collection, create 1-3 sample documents. For example, `content/posts/hello-world.json`:

```json
{
  "slug": "hello-world",
  "status": "published",
  "data": {
    "title": "Hello World",
    "excerpt": "First post.",
    "content": "Welcome to the blog.",
    "date": "2026-04-16"
  },
  "id": "post-1",
  "_fieldMeta": {}
}
```

Checklist per document:
- [ ] filename matches `data.slug`
- [ ] `status: "published"`
- [ ] `_fieldMeta: {}` present
- [ ] every `required: true` field has a value
- [ ] `image-gallery` values are `{ url, alt }[]` — NEVER plain string arrays

---

## Step 6 — Wire up rendering

Depending on the framework picked in Step 1:

- **Next.js** → fetch `/ai/08-nextjs-patterns` + `/ai/07-content-structure`
- **Static HTML** → see below
- **Laravel / Django / Rails / .NET / Go / Java / PHP** → fetch `/ai/21-framework-consumers`
  and re-export `webhouse-schema.json` with `npx cms export-schema`

### Static build essentials

Use env vars `BASE_PATH` (for internal links) and `BUILD_OUT_DIR` (output directory):

```typescript
const BASE = (process.env.BASE_PATH ?? '').replace(/\/+$/, '');
const DIST = join(__dirname, process.env.BUILD_OUT_DIR ?? 'dist');
```

Always filter:
```typescript
docs.filter(d => d.status === 'published')
```

NEVER use CDN scripts in static builds (Tailwind CDN, Bootstrap CDN, etc.). Use inline CSS only.

For multilingual static sites with `/da/`, `/en/` prefixes: the CMS constructs preview URLs as
`urlPrefix + "/" + slug`. Your build must emit redirect HTML files at those slug paths that
redirect to the actual locale URL. Without this, preview gives 404.

---

## Step 7 — SEO (if relevant)

Every page should have:
- `<title>` — site + page title
- `<meta name="description">` — 150-160 chars
- Open Graph tags (og:title, og:description, og:image, og:type)
- Canonical `<link rel="canonical">`
- JSON-LD structured data where it fits (Article, Product, Organization)

For Next.js, use the helpers from `@webhouse/cms/next`:

```typescript
import { cmsMetadata, cmsSitemap, cmsRobots } from '@webhouse/cms/next';
```

Full SEO guide: fetch `/ai/15-seo`

---

## Step 8 — Deploy

The CMS admin has a **Deploy** button (rocket icon) in the header. It supports:

| Provider | Type | Config needed |
|----------|------|---------------|
| Vercel | Dynamic or static | Vercel token |
| Netlify | Static | Netlify token + site id |
| GitHub Pages | Static | GitHub token (auto via OAuth) |
| Fly.io | Dynamic (Docker) | Fly.io token + app name |
| Cloudflare Pages | Static | Cloudflare API token |

Configure in Site Settings → Deploy. Push the rocket button.

Full matrix + troubleshooting: fetch `/ai/18-deployment`

---

## Step 9 — Hand back to the user

Final checklist, speak this to the user:

1. Dev server running at: `<site URL>`
2. CMS admin at: `http://localhost:3010`
3. Admin login: `<email>` / `<password>` (from the scaffold wizard output)
4. Collections created: `<list>`
5. Sample content: `<paths>`
6. Deploy: configured / not configured — next step is Site Settings → Deploy

Then STOP. Do not over-deliver. The user will ask for the next thing.

---

## Troubleshooting — first-pass fixes

| Error | Fix |
|-------|-----|
| `Cannot find module '@webhouse/cms'` | `npm install` |
| `ECONNREFUSED :3010` | Admin not running. `npm run dev` |
| 404 on new document | Check `status: "published"`, slug matches filename, restart dev |
| Preview 404 | `urlPrefix` must match the framework route |
| `Unknown field type` | Check spelling against the 21 field types list in Step 2 |
| SQLite errors on first run | `storage` missing from config — add filesystem adapter |
| Admin runs but blank page | Check cms.config.ts loads — `npx cms validate` |

Anything else: fetch `/ai/19-troubleshooting`

---

## Deep-dive module index

Each module focuses on ONE topic. Fetch only what you need.

| # | Topic | URL |
|---|-------|-----|
| 01 | Getting Started | `/ai/01-getting-started` |
| 02 | Config Reference | `/ai/02-config-reference` |
| 03 | Field Types | `/ai/03-field-types` |
| 04 | Blocks | `/ai/04-blocks` |
| 05 | Richtext | `/ai/05-richtext` |
| 06 | Storage Adapters | `/ai/06-storage-adapters` |
| 07 | Content Structure | `/ai/07-content-structure` |
| 08 | Next.js Patterns | `/ai/08-nextjs-patterns` |
| 09 | CLI Reference | `/ai/09-cli-reference` |
| 10 | Config Example (full) | `/ai/10-config-example` |
| 11 | Programmatic API | `/ai/11-api-reference` |
| 12 | Admin UI | `/ai/12-admin-ui` |
| 13 | Site Building Patterns | `/ai/13-site-building` |
| 14 | Relationships | `/ai/14-relationships` |
| 15 | SEO | `/ai/15-seo` |
| 16 | Images | `/ai/16-images` |
| 17 | i18n | `/ai/17-i18n` |
| 18 | Deployment | `/ai/18-deployment` |
| 19 | Troubleshooting | `/ai/19-troubleshooting` |
| 20 | Interactives | `/ai/20-interactives` |
| 21 | Framework Consumers (non-TS) | `/ai/21-framework-consumers` |

---

## Machine-readable endpoints

- `/ai/llms.txt` — llms.txt standard (for LLM site crawlers)
- `/ai/manifest.json` — JSON manifest with all modules and descriptions
- `/ai/index.json` — ordered module list

---

## Non-negotiable rules

1. Every collection MUST have `kind` and `description`
2. `cms.config.ts` MUST declare `storage` (filesystem or github — never default, default is SQLite)
3. NEVER name a collection any of: `site-settings`, `settings`, `config`, `admin`, `media`, `interactives`
4. `image-gallery` values MUST be `{ url, alt }[]`
5. Documents MUST have `_fieldMeta: {}` (even empty)
6. Slug MUST match filename
7. Always filter by `status === "published"` when rendering
8. NEVER use CDN scripts (Tailwind, Bootstrap, etc.) in static builds — inline CSS only

---

## Canonical source

If `docs.webhouse.app` is unreachable, fetch the source of truth from GitHub:

```
https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide/index.md
```

Individual modules:

```
https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide/01-getting-started.md
https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide/02-config-reference.md
...
```

---

## When you're done

Report to the user in this format:

```
Site ready.

Dev:    http://localhost:3000
Admin:  http://localhost:3010  (login: cb@webhouse.dk / <password>)
Content created:
  - content/posts/hello-world.json
  - content/pages/about.json

Next steps:
  1. Log into the admin and replace the sample content.
  2. Site Settings → Deploy to wire up <provider>.
  3. Customize styling in <framework-specific file>.
```

Stop. Wait for the user's next request.
