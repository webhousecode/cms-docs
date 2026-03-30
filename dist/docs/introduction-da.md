# Introduktion

*Updated: 2026-03-29*
*Language: da*

Hvad er @webhouse/cms og hvorfor det eksisterer — et filbaseret, AI-native CMS til TypeScript-projekter.

## Hvad er @webhouse/cms?

`@webhouse/cms` er en **filbaseret, AI-native CMS-motor** til TypeScript-projekter. Du definerer collections og felter i en `cms.config.ts`-fil, og CMS'et gemmer indhold som flade JSON-filer i en `content/`-mappe — én fil pr. dokument, organiseret efter collection.

Det giver dig:

- **REST API-server** — Hono-baseret API til læsning og skrivning af indhold
- **Statisk site-builder** — 9-faset build-pipeline der genererer HTML, sitemap, RSS, robots.txt og AI-discovery-filer
- **AI-indholdsgenerering** — indbyggede agenter til skrivning, SEO-optimering, oversættelse og mere
- **Visuel admin-brugerflade** — fuld-udstyret editor på [webhouse.app](https://webhouse.app) med rich text, blokke, medier og planlægning
- **MCP-integration** — Model Context Protocol-server til AI-platformes adgang til dit indhold

## Hvem er det til?

@webhouse/cms er designet til udviklere der bygger indholdsdrevne websites med Next.js. Det fungerer særligt godt når:

- Du vil have **filbaseret indhold** der lever i dit Git-repository
- Du har brug for **AI-drevne indholdsworkflows** (generering, oversættelse, SEO-optimering)
- Du foretrækker **TypeScript-first** konfiguration frem for YAML eller markdown frontmatter
- Du vil have en **visuel admin-brugerflade** uden kompleksiteten af et headless CMS

## Arkitektur

```
cms.config.ts          → Collection- og feltdefinitioner
content/               → JSON-dokumenter (én pr. fil)
packages/cms           → Kernemotor (@webhouse/cms)
packages/cms-admin     → Next.js admin-brugerflade (@webhouse/cms-admin)
packages/cms-ai        → AI-agenter (@webhouse/cms-ai)
packages/cms-cli       → CLI-værktøjer (@webhouse/cms-cli)
packages/cms-mcp-*     → MCP-servere til AI-platformsadgang
```

Kernepakken (`@webhouse/cms`) er framework-agnostisk — den læser og skriver JSON-filer. Admin-brugerfladen (`@webhouse/cms-admin`) er en selvstændig Next.js-applikation der forbinder til kernemotor.

## Næste skridt

- [Hurtig start](/docs/quick-start-da) — opret og kør dit første projekt på under 5 minutter
- [Konfigurationsreference](/docs/config-reference-da) — lær hvordan du definerer collections og felter
- [Felttyper](/docs/field-types-da) — udforsk alle 22 felttyper