# Next.js integrationsguide

*Updated: 2026-03-30*
*Language: da*

Komplet guide til at bygge en Next.js App Router-site med @webhouse/cms — fra indholdsindlæsning til deployment.

## Oversigt

Denne guide gennemgår opbygningen af et komplet Next.js-site med @webhouse/cms. CMS'et håndterer indholdslagring og redigering. Next.js håndterer rendering og routing.

## Trin 1: Projektopsætning

{{snippet:create-project}}

Eller start fra Next.js-boilerplaten:

```bash
npm create @webhouse/cms my-site -- --template nextjs
```

## Trin 2: Indholdslag

Indholdslaget læser JSON-filer ved build/request-tid:

{{snippet:content-loader}}

## Trin 3: Root layout

Root layout læser globale indstillinger og renderer navbar + footer.

## Trin 4: Forside med blokke

Forsiden læser `content/pages/home.json` og renderer blokke.

## Trin 5: Blog med statisk generering

{{snippet:nextjs-blog-page}}

Individuelle indlæg med SEO:

{{snippet:nextjs-post-page}}

## Trin 6: Richtext-rendering

{{snippet:richtext-renderer}}

> **Brug aldrig `dangerouslySetInnerHTML`** med regex-baserede parsere.

## Trin 7: Blok-rendering

{{snippet:block-renderer}}

## Trin 8: SEO-metadata

{{snippet:seo-metadata}}

## Trin 9: i18n (valgfrit)

{{snippet:i18n-config}}

## Trin 10: Deployment

{{snippet:deploy-fly}}

## Vigtige mønstre

1. **Server Components som standard** — al indholdsindlæsning sker server-side
2. **`"use client"` kun hvor nødvendigt** — tema-toggle, søgning, markdown
3. **`generateStaticParams`** — prægenerér alle sider ved build-tid
4. **`generateMetadata`** — SEO fra CMS `_seo`-felter med fallbacks
5. **Hardkod aldrig indhold** — alt fra CMS JSON-filer
6. **Filtrér på published** — tjek altid `status === "published"`