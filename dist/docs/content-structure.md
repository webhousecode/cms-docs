# Content Structure

*Updated: 2026-03-29*
*Language: en*

How documents are stored as JSON files — the document format, directory layout, and conventions.

## Document format

Every document is a JSON file in `content/{collection}/{slug}.json`:

```json
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
```

## Key rules

1. **Slug must match filename** — `hello-world.json` must have `"slug": "hello-world"`
2. **`_fieldMeta` is required** — can be empty `{}`, tracks AI lock state
3. **Always filter by status** — skip drafts with `status === "published"`
4. **`data` contains all content fields** — everything defined in your collection's `fields` array
5. **`_seo` is a reserved field** — used for SEO metadata

## Directory layout

```
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
```

## Status lifecycle

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress, not visible on site |
| `published` | Live on site |
| `archived` | Removed from site but kept for reference |
| `expired` | Auto-set when `unpublishAt` date passes |

## Scheduled publishing

Documents support automatic publish/unpublish via date fields:

```json
{
  "status": "draft",
  "publishAt": "2026-04-01T09:00:00Z",
  "unpublishAt": "2026-04-30T23:59:59Z"
}
```

The scheduler automatically changes status when the date arrives.