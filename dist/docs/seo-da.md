# SEO & Synlighed

*Updated: 2026-03-29*
*Language: da*

Meta-felter, JSON-LD strukturerede data, sitemap, robots.txt og AI-synlighedsoptimering.

## SEO-felter

Hvert dokument kan have et `_seo`-felt i sine data:

```json
{
  "data": {
    "title": "Mit indlæg",
    "_seo": {
      "metaTitle": "Mit indlæg — Bedste guide (30-60 tegn)",
      "metaDescription": "En omfattende guide til... (120-160 tegn)",
      "keywords": ["nøgleord1", "nøgleord2"],
      "ogImage": "/uploads/og-billede.jpg"
    }
  }
}
```

## Synlighedsscoring

CMS-admin inkluderer et Synlighedsdashboard der scorer hvert dokument på to akser:

**SEO-score** (13 regler) — metatitel-længde, metabeskrivelse, nøgleord, overskriftsstruktur, indholdslængde, interne links, billed-alt-tekst og mere.

**GEO-score** (8 regler) — optimerer indhold til AI-platformcitering:
1. Svar-først-struktur
2. Spørgsmålsformat-overskrifter
3. Statistik og datapunkter
4. Eksterne citationer
5. Indholdsfriskhed (opdateret inden for 90 dage)
6. JSON-LD strukturerede data
7. Navngiven forfatter
8. Indholdsdybde (800+ ord)

## Build-output

CMS build-pipelinen genererer automatisk:
- `sitemap.xml` — alle publicerede sider med hreflang
- `robots.txt` — AI-bevidste crawler-regler (4 strategier)
- `llms.txt` — AI-venligt siteindeks
- `llms-full.txt` — komplet markdown-eksport
- `feed.xml` — RSS 2.0-feed
- Per-side `.md`-filer til AI-forbrug