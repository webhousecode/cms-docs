# Configuration Reference

*Updated: 2026-03-30*
*Language: en*

Complete reference for cms.config.ts — collections, fields, storage, build, and API settings.

## cms.config.ts

The configuration file uses helper functions for type safety:

```typescript
import { defineConfig, defineCollection, defineBlock, defineField } from '@webhouse/cms';

export default defineConfig({
  collections: [ /* ... */ ],
  blocks: [ /* ... */ ],
  defaultLocale: 'en',
  locales: ['en', 'da'],
  autolinks: [ /* ... */ ],
  storage: { /* ... */ },       // REQUIRED
  build: { outDir: 'dist', baseUrl: '/' },
  api: { port: 3000 },
});
```

> **Important:** You MUST always specify the `storage` adapter. If omitted, it defaults to SQLite — not filesystem. This is the most common configuration mistake.

## Collection config

```typescript
defineCollection({
  name: 'posts',                 // Required: unique identifier
  label: 'Blog Posts',           // Optional: display name in admin UI
  slug: 'posts',                 // Optional: URL slug override
  urlPrefix: '/blog',            // Optional: URL prefix for pages
  sourceLocale: 'en',            // Optional: primary authoring locale
  locales: ['en', 'da'],         // Optional: translatable locales
  translatable: true,            // Optional: enable translation support
  fields: [ /* ... */ ],         // Required: array of FieldConfig
  hooks: {                       // Optional: lifecycle hooks
    beforeCreate: 'path/to/hook.js',
    afterCreate: 'path/to/hook.js',
    beforeUpdate: 'path/to/hook.js',
    afterUpdate: 'path/to/hook.js',
    beforeDelete: 'path/to/hook.js',
    afterDelete: 'path/to/hook.js',
  },
})
```

## Build config

```typescript
build: {
  outDir: 'dist',               // Output directory
  baseUrl: 'https://example.com', // Site URL for absolute links
  siteTitle: 'My Site',
  siteDescription: 'A great site',
  robots: {
    strategy: 'maximum',         // 'maximum' | 'balanced' | 'restrictive' | 'custom'
  },
  rss: {
    title: 'My Site RSS',
    description: 'Latest updates',
    language: 'en',
    collections: ['posts'],      // Filter to specific collections
    maxItems: 50,
  },
}
```

## Storage config

{{snippet:storage-filesystem}}

## API config

```typescript
api: {
  port: 3000,                    // Dev server port
}
```