# Internationalisering (i18n)

*Updated: 2026-03-29*
*Language: da*

Flersproget indhold med automatisk AI-oversættelse, locale-routing og hreflang.

## Konfigurér sprog

```typescript
export default defineConfig({
  defaultLocale: 'en',
  locales: ['en', 'da'],
  collections: [
    defineCollection({
      name: 'posts',
      sourceLocale: 'en',
      locales: ['en', 'da'],
      translatable: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richtext' },
      ],
    }),
  ],
});
```

## Sådan fungerer oversættelser

Hver oversættelse er et **separat dokument** forbundet via `translationGroup` — et fælles UUID der forbinder alle sprogversioner:

```json
// content/posts/hello-world.json (engelsk)
{
  "slug": "hello-world",
  "locale": "en",
  "translationGroup": "abc-123",
  "data": { "title": "Hello, World!" }
}

// content/posts/hello-world-da.json (dansk)
{
  "slug": "hello-world-da",
  "locale": "da",
  "translationGroup": "abc-123",
  "data": { "title": "Hej, Verden!" }
}
```

## Oversættelsesworkflow i admin

I admin-brugerfladen:
1. Åbn et dokument — se sprogbadget der viser det aktuelle sprog
2. Klik **"+ Tilføj oversættelse"** for at oprette en ny sprogversion
3. AI-oversætteren oversætter automatisk alle felter
4. Gennemgå og publicér oversættelsen

## AI-oversættelse

```typescript
import { createAi } from '@webhouse/cms-ai';

const ai = await createAi();
const result = await ai.content.translate(
  sourceDoc.data,
  'da',
  { collection: collectionConfig },
);
```

## Sprogrutning i Next.js

Brug et `[locale]`-rutesegment med middleware til sprogdetektering.