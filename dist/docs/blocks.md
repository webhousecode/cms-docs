# Blocks

*Updated: 2026-03-29*
*Language: en*

Build content-rich pages with reusable block components — hero, features, CTA, and custom blocks.

## What are blocks?

Blocks are reusable content sections that editors can add, remove, and reorder. Each block type has its own fields and renders differently on the frontend.

## Defining blocks

```typescript
import { defineConfig, defineBlock, defineCollection } from '@webhouse/cms';

export default defineConfig({
  blocks: [
    defineBlock({
      name: 'hero',
      label: 'Hero Section',
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
    defineBlock({
      name: 'features',
      label: 'Features Grid',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'items', type: 'array', fields: [
          { name: 'icon', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
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

## How blocks are stored

Each block is an object with a `_block` discriminator field:

```json
{
  "sections": [
    {
      "_block": "hero",
      "tagline": "Build faster with AI",
      "description": "The CMS that writes content for you."
    },
    {
      "_block": "features",
      "title": "Why choose us",
      "items": [
        { "icon": "⚡", "title": "Fast", "description": "Sub-second builds" }
      ]
    }
  ]
}
```

## Rendering blocks in Next.js

```typescript
function BlockRenderer({ block }: { block: any }) {
  switch (block._block) {
    case 'hero':
      return (
        
          {block.tagline}
          {block.description}
        
      );
    case 'features':
      return (
        
          {block.title}
          
            {block.items?.map((item: any, i: number) => (
              
                {item.icon}
                {item.title}
                {item.description}
              
            ))}
          
        
      );
    default:
      return null;
  }
}
```