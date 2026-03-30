# Indholds-API

*Updated: 2026-03-29*
*Language: da*

Programmatisk API til læsning og skrivning af indhold — ContentService-metoder og REST-endpoints.

## ContentService

CMS-kernemotor eksponerer en `ContentService` til programmatisk indholdsadgang:

```typescript
import { createCms } from '@webhouse/cms';
import config from './cms.config';

const cms = await createCms(config);

// Opret
const doc = await cms.content.create('posts', {
  slug: 'nyt-indlaeg',
  status: 'draft',
  data: { title: 'Nyt indlæg', content: '...' },
});

// Læs
const post = await cms.content.findBySlug('posts', 'nyt-indlaeg');
const alle = await cms.content.findMany('posts', { status: 'published' });

// Opdatér
await cms.content.update('posts', doc.id, {
  data: { title: 'Opdateret titel' },
});

// Slet
await cms.content.delete('posts', doc.id);
```

## REST API

| Metode | Endpoint | Beskrivelse |
|--------|----------|-------------|
| GET | `/api/cms/{collection}` | List dokumenter |
| GET | `/api/cms/{collection}/{slug}` | Hent dokument efter slug |
| POST | `/api/cms/{collection}` | Opret dokument |
| PUT | `/api/cms/{collection}/{id}` | Opdatér dokument |
| DELETE | `/api/cms/{collection}/{id}` | Slet dokument |

## MCP (Model Context Protocol)

CMS'et eksponerer også indhold via MCP til AI-platformsadgang:

```bash
# Generér en API-nøgle
npx cms mcp keygen --label "Min App" --scopes "read"
```

MCP giver AI-platforme som Claude og ChatGPT mulighed for at læse dit indhold direkte.