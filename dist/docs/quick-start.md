# Quick Start

*Updated: 2026-03-30*
*Language: en*

Scaffold a new project and have a CMS-powered site running in under 5 minutes.

## Create a new project

{{snippet:create-project}}

This generates:

```
my-site/
  cms.config.ts          # Collection + field definitions
  package.json           # Dependencies
  .env                   # AI provider keys
  content/
    posts/
      hello-world.json   # Example document
```

## Install and run

{{snippet:dev-and-build}}

The dev server starts at `http://localhost:3000` and the admin UI opens automatically.

## Create content

Open the admin UI and create your first document. It will be saved as a JSON file in `content/posts/`.

Every document follows this structure:

```json
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
```

## Build for production

```bash
npx cms build     # Build static site
npx cms serve     # Preview the build locally
```

The build pipeline generates:
- HTML pages for all published documents
- `sitemap.xml` for search engines
- `robots.txt` with AI crawler rules
- `llms.txt` and `llms-full.txt` for AI discovery
- `feed.xml` RSS feed
- Per-page `.md` files for AI consumption

## Next steps

- [Configuration Reference](/docs/config-reference) — define your own collections
- [Field Types](/docs/field-types) — explore all available field types
- [Storage Adapters](/docs/storage-adapters) — choose where content is stored
- [Deployment](/docs/deployment) — deploy to Vercel, Fly.io, or Netlify