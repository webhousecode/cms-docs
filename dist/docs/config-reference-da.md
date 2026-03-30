# Konfigurationsreference

*Updated: 2026-03-30*
*Language: da*

Komplet reference for cms.config.ts — collections, felter, lagring, build og API-indstillinger.

## cms.config.ts

Konfigurationsfilen bruger hjælpefunktioner for typesikkerhed:

```typescript
import { defineConfig, defineCollection, defineBlock, defineField } from '@webhouse/cms';

export default defineConfig({
  collections: [ /* ... */ ],
  blocks: [ /* ... */ ],
  defaultLocale: 'en',
  locales: ['en', 'da'],
  autolinks: [ /* ... */ ],
  storage: { /* ... */ },       // PÅKRÆVET
  build: { outDir: 'dist', baseUrl: '/' },
  api: { port: 3000 },
});
```

> **Vigtigt:** Du SKAL altid angive `storage`-adapteren. Hvis den udelades, bruges SQLite som standard — ikke filsystemet. Dette er den mest almindelige konfigurationsfejl.

## Collection-konfiguration

```typescript
defineCollection({
  name: 'posts',                 // Påkrævet: unik identifikator
  label: 'Blogindlæg',          // Valgfri: visningsnavn i admin
  slug: 'posts',                 // Valgfri: URL-slug override
  urlPrefix: '/blog',            // Valgfri: URL-præfiks for sider
  sourceLocale: 'en',            // Valgfri: primært forfattersprog
  locales: ['en', 'da'],         // Valgfri: oversættelige sprog
  translatable: true,            // Valgfri: aktivér oversættelsesstøtte
  fields: [ /* ... */ ],         // Påkrævet: array af FieldConfig
  hooks: {                       // Valgfri: livscyklus-hooks
    beforeCreate: 'sti/til/hook.js',
    afterCreate: 'sti/til/hook.js',
  },
})
```

## Build-konfiguration

```typescript
build: {
  outDir: 'dist',               // Output-mappe
  baseUrl: 'https://eksempel.dk', // Site-URL til absolutte links
  siteTitle: 'Mit Site',
  siteDescription: 'Et fantastisk site',
  robots: {
    strategy: 'maximum',         // 'maximum' | 'balanced' | 'restrictive' | 'custom'
  },
  rss: {
    title: 'Mit Site RSS',
    collections: ['posts'],      // Filtrer til specifikke collections
    maxItems: 50,
  },
}
```

## Lagringskonfiguration

{{snippet:storage-filesystem}}