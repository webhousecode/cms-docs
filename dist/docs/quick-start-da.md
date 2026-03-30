# Hurtig start

*Updated: 2026-03-30*
*Language: da*

Opret et nyt projekt og hav en CMS-drevet side kørende på under 5 minutter.

## Opret et nyt projekt

{{snippet:create-project}}

Dette genererer:

```
my-site/
  cms.config.ts          # Collection- og feltdefinitioner
  package.json           # Afhængigheder
  .env                   # AI-udbyders nøgler
  content/
    posts/
      hello-world.json   # Eksempeldokument
```

## Installér og kør

{{snippet:dev-and-build}}

Udviklingsserveren starter på `http://localhost:3000` og admin-brugerfladen åbner automatisk.

## Opret indhold

Åbn admin-brugerfladen og opret dit første dokument. Det gemmes som en JSON-fil i `content/posts/`.

Hvert dokument følger denne struktur:

```json
{
  "slug": "mit-forste-indlaeg",
  "status": "published",
  "data": {
    "title": "Mit første indlæg",
    "content": "Hej, verden!"
  },
  "id": "unikt-id",
  "_fieldMeta": {}
}
```

## Byg til produktion

```bash
npx cms build     # Byg statisk site
npx cms serve     # Forhåndsvis bygget lokalt
```

Build-pipelinen genererer:
- HTML-sider for alle publicerede dokumenter
- `sitemap.xml` til søgemaskiner
- `robots.txt` med AI-crawler-regler
- `llms.txt` og `llms-full.txt` til AI-discovery
- `feed.xml` RSS-feed
- Per-side `.md`-filer til AI-forbrug

## Næste skridt

- [Konfigurationsreference](/docs/config-reference-da) — definér dine egne collections
- [Felttyper](/docs/field-types-da) — udforsk alle tilgængelige felttyper
- [Lagringsadaptere](/docs/storage-adapters-da) — vælg hvor indhold gemmes
- [Udrulning](/docs/deployment-da) — deploy til Vercel, Fly.io eller Netlify