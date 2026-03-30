# Guide til build.ts — Statisk site-generering

*Updated: 2026-03-30*
*Language: da*

Trin-for-trin guide til at bygge den perfekte build.ts til et statisk HTML-site drevet af @webhouse/cms.

## Hvad er build.ts?

`build.ts` er en custom statisk site-generator der læser dit CMS-indhold (JSON-filer) og outputter ren HTML. Intet framework, intet runtime-JavaScript — bare HTML + CSS der virker overalt.

```bash
npx tsx build.ts    # Generér dist/
```

## Lektion 1: Indlæs indhold

Fundamentet — læs JSON-filer fra `content/`:

{{snippet:content-loader}}

## Lektion 2: Rendér markdown

Konvertér richtext-indhold til HTML:

```typescript
import { marked } from 'marked';

function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}
```

## Lektion 3: HTML-skabelon

Wrap indhold i et komplet HTML-dokument:

```typescript
function htmlPage(title: string, body: string, css: string): string {
  return `

  
  
  ${title}
  ${css}

${body}
`;
}
```

## Lektion 4: Byg en side

Kombinér indholdsindlæsning, markdown-rendering og HTML-skabelon.

## Lektion 5: Rendér blokke

Hvis dine sider bruger blokke (hero, features, CTA), rendér hver bloktype:

{{snippet:block-renderer}}

## Lektion 6: SEO-metadata

Udtrk SEO-felter og generér meta-tags fra `_seo`-feltet.

## Lektion 7: Skriv output

Generér filer til `dist/` med `writeFileSync` og `mkdirSync`.

## Lektion 8: Sitemap

Generér `sitemap.xml` til søgemaskiner.

## Lektion 9: Resolve snippets

Tilføj snippet-support til dit build — se [Delte Snippets](/docs/shared-snippets-da).

## Lektion 10: Kopiér statiske assets

Kopiér uploads og public-filer til dist/.

## Næste skridt

- [Skabeloner](/docs/templates-da) — start fra en fungerende boilerplate
- [Next.js-mønstre](/docs/nextjs-patterns-da) — hvis du vil have React
- [Delte Snippets](/docs/shared-snippets-da) — genbrugelige kodeblokke