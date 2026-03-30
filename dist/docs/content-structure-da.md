# Indholdsstruktur

*Updated: 2026-03-29*
*Language: da*

Hvordan dokumenter gemmes som JSON-filer — dokumentformat, mappestruktur og konventioner.

## Dokumentformat

Hvert dokument er en JSON-fil i `content/{collection}/{slug}.json`:

```json
{
  "id": "unikt-uuid",
  "slug": "mit-dokument",
  "status": "published",
  "locale": "da",
  "translationGroup": "fælles-uuid",
  "data": {
    "title": "Mit dokument",
    "content": "Markdown-indhold her..."
  },
  "_fieldMeta": {},
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-03-29T14:00:00Z"
}
```

## Vigtige regler

1. **Slug skal matche filnavn** — `hej-verden.json` skal have `"slug": "hej-verden"`
2. **`_fieldMeta` er påkrævet** — kan være tomt `{}`, sporer AI-låsestatus
3. **Filtrer altid på status** — spring kladder over med `status === "published"`
4. **`data` indeholder alle indholdsfelter** — alt defineret i din collections `fields`-array
5. **`_seo` er et reserveret felt** — bruges til SEO-metadata

## Mappestruktur

```
content/
  posts/
    hello-world.json
    hello-world-da.json    # Dansk oversættelse
    typescript-guide.json
  pages/
    home.json
    about.json
  global/
    global.json            # Singleton til siteindstillinger
```

## Status-livscyklus

| Status | Betydning |
|--------|-----------|
| `draft` | Under udarbejdelse, ikke synlig på sitet |
| `published` | Live på sitet |
| `archived` | Fjernet fra sitet men gemt til reference |
| `expired` | Auto-sat når `unpublishAt`-datoen passeres |

## Planlagt publicering

Dokumenter understøtter automatisk publicering/afpublicering via datofelter:

```json
{
  "status": "draft",
  "publishAt": "2026-04-01T09:00:00Z",
  "unpublishAt": "2026-04-30T23:59:59Z"
}
```