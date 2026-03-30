# AI Builder Guide

*Updated: 2026-03-30*
*Language: en*

20 modular documentation modules that ship with the npm package — designed for AI agents building sites.

## What is the AI Builder Guide?

Every `@webhouse/cms` npm package ships with a comprehensive AI builder guide at `packages/cms/CLAUDE.md`. This is a modular documentation system designed specifically for AI coding assistants (Claude Code, Cursor, GitHub Copilot) to read when building sites.

When you scaffold a new project, the guide is referenced in your project's `CLAUDE.md` file, giving AI assistants immediate context about how to work with the CMS.

## How it works

The guide is split into **20 focused modules**, each covering one topic. AI assistants load modules on-demand rather than reading everything at once. This keeps context windows efficient.

```
docs/ai-guide/
  index.md              → Navigation + quick decision matrix
  01-getting-started.md → Scaffolding + first run
  02-config-reference.md → cms.config.ts reference
  03-field-types.md     → All 22 field types
  04-blocks.md          → Block system
  05-richtext.md        → TipTap editor, features, markdown storage
  06-storage-adapters.md → Filesystem, GitHub, SQLite, Supabase
  07-content-structure.md → Document JSON format
  08-nextjs-patterns.md → Loader functions, pages, ISR
  09-cli-reference.md   → All CLI commands
  10-config-example.md  → Complete real-world config
  11-api-reference.md   → ContentService API
  12-admin-ui.md        → Admin architecture
  13-site-building.md   → Critical patterns + common mistakes
  14-relationships.md   → Relations, resolving, reverse lookups
  15-seo.md             → Meta, JSON-LD, sitemap, robots.txt
  16-images.md          → WebP, responsive, next/image
  17-i18n.md            → Locales, translation, hreflang
  18-deployment.md      → Vercel, Fly.io, Docker
  19-troubleshooting.md → Common errors + fixes
  20-interactives.md    → Data-driven embeds
```

## The Quick Reference

The index module includes a **quick reference card** that AI assistants can read in seconds:

- **Document JSON format** — slug, status, data, id, _fieldMeta
- **All field types** — one-line summary of each
- **Collection definition template** — copy-paste starter
- **5 critical rules:**
  1. Always specify storage adapter (defaults to SQLite, not filesystem)
  2. image-gallery values must be `{ url, alt }[]` objects
  3. Always filter by `status === "published"`
  4. Use `BASE` variable for all internal links
  5. Slug in JSON must match filename

## Fetching modules

Modules can be fetched from GitHub at build time or runtime:

```typescript
const MODULE_BASE = "https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide";

async function loadGuide(module: string) {
  const res = await fetch(`${MODULE_BASE}/${module}`);
  return res.text();
}

// Load specific modules
const config = await loadGuide("02-config-reference.md");
const fields = await loadGuide("03-field-types.md");
```

## Module overview

### Core Setup (Modules 1-2)
How to scaffold, install, and configure. The `cms.config.ts` file is the single source of truth for your content schema.

### Content Modeling (Modules 3-7)
Field types, blocks, richtext editor capabilities, storage backends, and the JSON document format. Everything about how content is structured and stored.

### Framework Integration (Modules 8-11)
Next.js patterns (loader functions, `generateStaticParams`, `generateMetadata`), CLI commands, a complete real-world config example, and the programmatic ContentService API.

### Admin & Building (Modules 12-13)
Admin UI architecture and the critical site-building patterns that prevent common mistakes (wrong storage adapter, missing status filter, broken image paths).

### Advanced Topics (Modules 14-20)
Relations between documents, SEO optimization, image processing, internationalization, deployment to various platforms, troubleshooting, and interactive embeds.

## Using the guide in your project

When you create a new site, the scaffolder generates a `CLAUDE.md` that references the guide:

```markdown
# My Site — AI Builder Instructions

This is a Next.js site built with webhouse.app CMS.
Content is stored as JSON files.

Read the full AI builder guide:
https://raw.githubusercontent.com/webhousecode/cms/main/packages/cms/CLAUDE.md
```

AI assistants that read this file get immediate context about your CMS setup, field types, and patterns — no manual onboarding needed.

## Why this matters

Traditional CMS documentation is written for humans. The AI builder guide is written for **AI agents that generate code**:

- **Structured for machine parsing** — consistent markdown, code blocks with language tags
- **Copy-paste ready** — every pattern includes runnable code
- **Error-prevention focused** — critical rules highlighted, common mistakes documented
- **Modular loading** — agents read only what they need, saving context window space