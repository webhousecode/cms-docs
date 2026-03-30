# AI Agents

*Updated: 2026-03-29*
*Language: en*

Built-in AI agents for content generation, SEO optimization, GEO optimization, and translation.

## What are AI agents?

AI agents generate and optimize content based on your brand voice and configuration. Each agent has a specific role:

| Agent | Role |
|-------|------|
| **Content Writer** | Creates new blog posts, pages, descriptions |
| **SEO Optimizer** | Improves meta fields, keywords, heading structure |
| **GEO Optimizer** | Restructures content for AI citation (answer-first, statistics, sources) |
| **Translator** | Translates content to configured locales |
| **Content Refresher** | Updates stale content with current information |

## How agents work

1. You configure agents in the admin UI (Settings → Agents)
2. Each agent has a system prompt that defines its behavior
3. Agents produce **drafts** that land in the **Curation Queue**
4. You review, approve, or reject each draft
5. Approved content is published automatically

## AI Lock

Fields you've edited by hand are **locked** — agents won't overwrite them. This ensures human edits are preserved even when agents run bulk operations.

The lock state is tracked in `_fieldMeta`:

```json
{
  "_fieldMeta": {
    "title": { "lockedBy": "user", "lockedAt": "2026-03-29T10:00:00Z" }
  }
}
```

## Brand voice

Configure a brand voice in Settings to ensure all AI-generated content matches your tone:

- **Tone** — professional, casual, friendly, authoritative
- **Audience** — developers, marketers, general public
- **Guidelines** — specific instructions like "Always use active voice" or "Include code examples"

## Programmatic usage

```typescript
import { createAi } from '@webhouse/cms-ai';

const ai = await createAi();

// Generate content
const result = await ai.content.generate('posts', {
  prompt: 'Write a guide to TypeScript generics',
});

// Translate
const translated = await ai.content.translate(
  sourceDoc.data,
  'da',
  { collection: collectionConfig },
);
```