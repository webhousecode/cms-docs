# cms-docs — AI Builder Instructions

This is the documentation site for webhouse.app, built with @webhouse/cms (dogfooding).

## Hard Rules

### ALWAYS create EN + DA twins with shared translationGroup

**Every new docs page MUST be created as a bilingual pair** — one English (`{slug}.json`) and one Danish (`{slug}-da.json`), both sharing the same `translationGroup` UUID. No exceptions unless explicitly requested otherwise.

Required fields on every doc:
- `locale: "en"` or `locale: "da"`
- `translationGroup: "<same-uuid-for-both>"`
- Danish slug MUST end with `-da` suffix
- All `data.*` fields must be translated (title, description, content, _seo.metaTitle, _seo.metaDescription, _seo.keywords)

When writing a new doc, generate ONE UUID with `crypto.randomUUID()` and use it in both files. This is how side-by-side editing, locale badges, and hreflang work.

### Preview MUST always work

**EVERY site built with @webhouse/cms MUST have working preview — both locally and on the deployed URL. No exceptions.**

- Preview URL in Site Settings + document slug = a working page. Always.
- CMS admin constructs preview URLs as: `previewSiteUrl + urlPrefix + "/" + slug`
- If a collection uses category-based URLs (e.g. `/blog/field-notes/my-post`), it MUST set `urlPattern: "/:category/:slug"` in cms.config.ts
- Default (no urlPattern): `urlPrefix + "/" + slug` — this is what 99% of sites use
- NEVER inject category or other fields into preview URLs automatically — it breaks sites that use flat routing
- Test preview for EVERY site after any change to URL construction logic

### Sites we monitor

These sites MUST have working preview after any CMS admin change:

| Site | Config | Preview URL | URL structure |
|------|--------|-------------|---------------|
| cms-docs | cms-docs/cms.config.ts | http://localhost:3036 | /docs/{slug} |
| webhouse-site | webhouse-site/cms.config.ts | http://localhost:3009 | /blog/{category}/{slug} (urlPattern) |
| maurseth | maurseth/cms.config.ts | — | /{collection}/{slug} |
| SproutLake | cbroberg/sproutlake-site/cms.config.ts | — | /{collection}/{slug} |
| blog example | cms/examples/blog/cms.config.ts | — | /posts/{slug} |
| landing example | cms/examples/landing/cms.config.ts | — | single page |
| 8 static examples | cms/examples/static/*/cms.config.ts | — | /{collection}/{slug} |

## Project Structure

```
cms-docs/
  cms.config.ts       → 3 collections: docs, changelog, snippets
  content/
    docs/*.json        → Documentation pages (EN + DA)
    changelog/*.json   → Release notes from git tags
    snippets/*.json    → Reusable code blocks ({{snippet:slug}})
  src/
    app/               → Next.js App Router
    components/        → Sidebar, TOC, search, code blocks
    lib/               → Content loader, markdown helpers
  scripts/             → Seed scripts for content generation
  public/screenshots/  → Template screenshots
```

## Snippets

Reusable code blocks stored in `content/snippets/`. Referenced in docs with `{{snippet:slug-name}}`. Resolved at render time by `doc-content.tsx`.

## Deployment

- **Local dev**: `npx next dev -p 3036`
- **Deploy**: `fly deploy --now` from cms-docs/
- **Live**: https://docs.webhouse.app (Fly.io, arn)
- **Repo**: https://github.com/webhousecode/cms-docs
