# Introduction

*Updated: 2026-03-29*
*Language: en*

What is @webhouse/cms and why it exists — a file-based, AI-native CMS for TypeScript projects.

## What is @webhouse/cms?

`@webhouse/cms` is a **file-based, AI-native CMS engine** for TypeScript projects. You define collections and fields in a `cms.config.ts` file, and the CMS stores content as flat JSON files in a `content/` directory — one file per document, organized by collection.

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

```
cms.config.ts          → Collection + field definitions
content/               → JSON documents (one per file)
packages/cms           → Core engine (@webhouse/cms)
packages/cms-admin     → Next.js admin UI (@webhouse/cms-admin)
packages/cms-ai        → AI agents (@webhouse/cms-ai)
packages/cms-cli       → CLI tools (@webhouse/cms-cli)
packages/cms-mcp-*     → MCP servers for AI platform access
```

The core package (`@webhouse/cms`) is framework-agnostic — it reads and writes JSON files. The admin UI (`@webhouse/cms-admin`) is a standalone Next.js application that connects to the core engine.

## Next steps

- [Quick Start](/docs/quick-start) — scaffold and run your first project in under 5 minutes
- [Configuration Reference](/docs/config-reference) — learn how to define collections and fields
- [Field Types](/docs/field-types) — explore all 22 field types