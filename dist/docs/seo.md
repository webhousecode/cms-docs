# SEO & Visibility

*Updated: 2026-03-29*
*Language: en*

Meta fields, JSON-LD structured data, sitemap, robots.txt, and AI visibility optimization.

## SEO fields

Every document can have an `_seo` field in its data:

```json
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
```

## Generating metadata in Next.js

```typescript
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
```

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
- `sitemap.xml` — all published pages with hreflang
- `robots.txt` — AI-aware crawler rules (4 strategies)
- `llms.txt` — AI-friendly site index
- `llms-full.txt` — complete markdown export
- `feed.xml` — RSS 2.0 feed
- Per-page `.md` files for AI consumption