# Blokke

*Updated: 2026-03-29*
*Language: da*

Byg indholdsrige sider med genanvendelige blokkomponenter — hero, features, CTA og brugerdefinerede blokke.

## Hvad er blokke?

Blokke er genanvendelige indholdssektioner som redaktører kan tilføje, fjerne og omorganisere. Hver bloktype har sine egne felter og renderes forskelligt på frontend.

## Definition af blokke

```typescript
import { defineConfig, defineBlock, defineCollection } from '@webhouse/cms';

export default defineConfig({
  blocks: [
    defineBlock({
      name: 'hero',
      label: 'Hero-sektion',
      fields: [
        { name: 'tagline', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'image' },
        { name: 'ctas', type: 'array', fields: [
          { name: 'label', type: 'text' },
          { name: 'href', type: 'text' },
        ]},
      ],
    }),
  ],
  collections: [
    defineCollection({
      name: 'pages',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'sections', type: 'blocks', blocks: ['hero', 'features'] },
      ],
    }),
  ],
});
```

## Sådan gemmes blokke

Hver blok er et objekt med et `_block`-diskriminatorfelt:

```json
{
  "sections": [
    {
      "_block": "hero",
      "tagline": "Byg hurtigere med AI",
      "description": "CMS'et der skriver indhold for dig."
    }
  ]
}
```

## Rendering af blokke i Next.js

```typescript
function BlockRenderer({ block }: { block: any }) {
  switch (block._block) {
    case 'hero':
      return (
        
          {block.tagline}
          {block.description}
        
      );
    default:
      return null;
  }
}
```