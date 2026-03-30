# Next.js-mønstre

*Updated: 2026-03-30*
*Language: da*

Sådan læser du CMS-indhold i Next.js — loader-funktioner, sider, statisk generering og metadata.

## Læsning af indhold

Alt indhold læses server-side med `fs`:

{{snippet:content-loader}}

## Blog-listeside

{{snippet:nextjs-blog-page}}

## Vigtige mønstre

1. **Kun Server Components** — indhold læses ved build/request-tid
2. **`generateStaticParams`** — prægenerer alle sider ved build-tid
3. **`generateMetadata`** — SEO-metadata fra CMS `_seo`-felter
4. **Filtrer altid på published** — `status === 'published'` for at skippe kladder
5. **Hardkod aldrig indhold** — alt fra CMS JSON-filer