# Next.js Patterns

*Updated: 2026-03-30*
*Language: en*

How to read CMS content in Next.js — loader functions, pages, static generation, and metadata.

## Reading content

All content is read server-side using `fs`:

{{snippet:content-loader}}

## Blog listing page

{{snippet:nextjs-blog-page}}

## Dynamic page with static generation

```typescript
// app/blog/[slug]/page.tsx
import { getCollection, getDocument } from '@/lib/content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getCollection('posts').map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise }) {
  const { slug } = await params;
  const doc = getDocument('posts', slug);
  if (!doc) return {};
  return {
    title: doc.data._seo?.metaTitle ?? doc.data.title,
    description: doc.data._seo?.metaDescription ?? doc.data.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise }) {
  const { slug } = await params;
  const doc = getDocument('posts', slug);
  if (!doc) notFound();

  return (
    
      {doc.data.title}
      {/* Render doc.data.content with react-markdown */}
    
  );
}
```

## Key patterns

1. **Server Components only** — content reads happen at build/request time
2. **`generateStaticParams`** — pre-generate all pages at build time
3. **`generateMetadata`** — SEO metadata from CMS `_seo` fields
4. **Always filter published** — `status === 'published'` to skip drafts
5. **Never hardcode content** — everything from CMS JSON files