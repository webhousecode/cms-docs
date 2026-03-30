# Next.js Integration Guide

*Updated: 2026-03-30*
*Language: en*

Complete guide to building a Next.js App Router site with @webhouse/cms — from content reading to deployment.

## Overview

This guide walks you through building a complete Next.js site with @webhouse/cms. The CMS handles content storage and editing. Next.js handles rendering and routing.

## Step 1: Project setup

{{snippet:create-project}}

Or start from the Next.js boilerplate:

```bash
npm create @webhouse/cms my-site -- --template nextjs
```

## Step 2: Content layer

The content layer reads JSON files at build/request time:

{{snippet:content-loader}}

## Step 3: Root layout

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  const global = getDocument('global', 'global');
  return (
    
      
        {/* render global.data.navLinks */}
        {children}
        {global?.data.footerText}
      
    
  );
}
```

## Step 4: Homepage with blocks

```typescript
// app/page.tsx
import { getDocument } from '@/lib/content';

export default function Home() {
  const page = getDocument('pages', 'home');
  if (!page) return Create content/pages/home.json;

  return (
    
      {page.data.sections?.map((block, i) => (
        
      ))}
    
  );
}
```

## Step 5: Blog with static generation

{{snippet:nextjs-blog-page}}

Individual posts with SEO:

{{snippet:nextjs-post-page}}

## Step 6: Richtext rendering

{{snippet:richtext-renderer}}

> **Never use `dangerouslySetInnerHTML`** with regex-based markdown parsers. Use `react-markdown` with `remark-gfm`.

## Step 7: Block rendering

{{snippet:block-renderer}}

## Step 8: SEO metadata

{{snippet:seo-metadata}}

## Step 9: i18n (optional)

{{snippet:i18n-config}}

## Step 10: Deployment

{{snippet:deploy-fly}}

## The build pipeline integration

When you run `next build`, Next.js:
1. Reads all content from `content/` via your loader functions
2. Pre-renders all pages via `generateStaticParams`
3. Generates SEO metadata via `generateMetadata`
4. Outputs to `.next/` (or `.next/standalone` for Docker)

The CMS build pipeline (`npx cms build`) generates additional files:
- `sitemap.xml`, `robots.txt`, `feed.xml`
- `llms.txt`, `llms-full.txt` for AI discovery
- Per-page `.md` files

For a Next.js site, you typically use Next.js's own `app/sitemap.ts` and `app/robots.ts` instead of the CMS build pipeline.

## Key patterns

1. **Server Components by default** — all content reads happen server-side
2. **`"use client"` only where needed** — theme toggle, search, markdown renderer
3. **`generateStaticParams`** — pre-generate all pages at build time
4. **`generateMetadata`** — SEO from CMS `_seo` fields with fallbacks
5. **Never hardcode content** — everything from CMS JSON files
6. **Filter by published** — always check `status === "published"`