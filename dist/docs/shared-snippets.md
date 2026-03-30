# Shared Snippets — Reusable Code Blocks

*Updated: 2026-03-30*
*Language: en*

How we built a shared snippets system for docs.webhouse.app using our own CMS — and how you can do the same.

## The problem

Documentation sites repeat the same code examples across multiple pages. The "Quick Start" page shows the install command. The "Templates" page shows it too. The "CLI Reference" shows it again. When the command changes, you update it in one place and forget the other two.

## The solution: a snippets collection

We added a `snippets` collection to our CMS config:

```typescript
defineCollection({
  name: "snippets",
  label: "Shared Snippets",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "code", type: "textarea", required: true },
    { name: "lang", type: "text" },
  ],
})
```

Each snippet is a JSON file in `content/snippets/`:

```json
{
  "slug": "create-project",
  "status": "published",
  "data": {
    "title": "Create a new project",
    "code": "npm create @webhouse/cms my-site",
    "lang": "bash"
  }
}
```

## Using snippets in markdown

In any doc page's content field, reference a snippet with:

```
{{snippet:create-project}}
```

At render time, the token is resolved to the actual code block from the snippets collection. The snippet's `lang` field determines syntax highlighting.

## Implementation in build.ts (static sites)

For static HTML sites using a custom `build.ts`, add a snippet resolver before markdown rendering:

```typescript
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SNIPPETS_DIR = join(process.cwd(), 'content', 'snippets');

function resolveSnippets(markdown: string): string {
  return markdown.replace(
    /\{\{snippet:([a-z0-9-]+)\}\}/g,
    (_match, slug) => {
      const file = join(SNIPPETS_DIR, slug + '.json');
      if (!existsSync(file)) return '';
      const snippet = JSON.parse(readFileSync(file, 'utf-8'));
      const lang = snippet.data.lang || 'text';
      const code = snippet.data.code || '';
      return '\x60\x60\x60' + lang + '\n' + code + '\n\x60\x60\x60';
    }
  );
}

// In your build pipeline:
const rawContent = doc.data.content;
const withSnippets = resolveSnippets(rawContent);
const html = marked.parse(withSnippets);
```

## Implementation in Next.js (server components)

For Next.js sites, resolve snippets in your content renderer:

```typescript
// components/doc-content.tsx
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SNIPPETS_DIR = join(process.cwd(), 'content', 'snippets');

function resolveSnippets(content: string): string {
  return content.replace(
    /\{\{snippet:([a-z0-9-]+)\}\}/g,
    (_match, slug) => {
      const file = join(SNIPPETS_DIR, slug + '.json');
      if (!existsSync(file)) return '';
      const snippet = JSON.parse(readFileSync(file, 'utf-8'));
      return '\x60\x60\x60' + (snippet.data.lang || 'text') +
        '\n' + snippet.data.code + '\n\x60\x60\x60';
    }
  );
}

// Use before rendering markdown
export function DocContent({ content }) {
  const resolved = resolveSnippets(content);
  // ... render resolved markdown
}
```

## Beyond code: other use cases

Snippets don't have to be code. You could use them for:

- **Disclaimers** — legal text that appears on multiple pages
- **Version badges** — current version number updated in one place
- **Feature matrices** — comparison tables shared across product pages
- **Contact info** — address, phone, email used in footer and contact page
- **Pricing** — price points referenced in features, pricing, and FAQ pages

## Why this matters

This is dogfooding at its best. We built docs.webhouse.app with @webhouse/cms, and when we needed reusable content blocks, we used the CMS's own collection system. No plugins, no custom infrastructure — just another collection.

The same pattern works for any CMS-powered site. If you find yourself copy-pasting content between pages, create a snippets collection and reference it.