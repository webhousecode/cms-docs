# Content API

*Updated: 2026-03-29*
*Language: en*

Programmatic API for reading and writing content — ContentService methods and REST endpoints.

## ContentService

The core CMS engine exposes a `ContentService` for programmatic content access:

```typescript
import { createCms } from '@webhouse/cms';
import config from './cms.config';

const cms = await createCms(config);

// Create
const doc = await cms.content.create('posts', {
  slug: 'new-post',
  status: 'draft',
  data: { title: 'New Post', content: '...' },
});

// Read
const post = await cms.content.findBySlug('posts', 'new-post');
const all = await cms.content.findMany('posts', { status: 'published' });

// Update
await cms.content.update('posts', doc.id, {
  data: { title: 'Updated Title' },
});

// Delete
await cms.content.delete('posts', doc.id);
```

## REST API

The CMS exposes a Hono-based REST API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cms/{collection}` | List documents |
| GET | `/api/cms/{collection}/{slug}` | Get document by slug |
| POST | `/api/cms/{collection}` | Create document |
| PUT | `/api/cms/{collection}/{id}` | Update document |
| DELETE | `/api/cms/{collection}/{id}` | Delete document |

### Query parameters

| Param | Description |
|-------|-------------|
| `status` | Filter by status: `published`, `draft`, `all` |
| `locale` | Filter by locale |
| `limit` | Maximum results |
| `offset` | Pagination offset |
| `tags` | Filter by tags (comma-separated) |

### Example

```bash
# List published posts
curl http://localhost:3000/api/cms/posts?status=published

# Get a specific post
curl http://localhost:3000/api/cms/posts/hello-world

# Create a new post
curl -X POST http://localhost:3000/api/cms/posts \
  -H "Content-Type: application/json" \
  -d '{"slug":"new-post","status":"draft","data":{"title":"New"}}'
```

## MCP (Model Context Protocol)

The CMS also exposes content via MCP for AI platform access:

```bash
# Generate an API key
npx cms mcp keygen --label "My App" --scopes "read"

# Test the endpoint
npx cms mcp test
```

MCP allows AI platforms like Claude and ChatGPT to read your content directly, enabling them to cite your documentation and articles.