# Field Types

*Updated: 2026-03-29*
*Language: en*

Complete reference for all 22 field types — text, richtext, image, blocks, relation, and more.

## Common field properties

Every field supports these properties:

```typescript
{
  name: string;          // Required: field key in document data
  type: FieldType;       // Required: one of the types below
  label?: string;        // Display label in admin UI
  required?: boolean;    // Must have a value
  defaultValue?: unknown;
  ai?: {                 // AI generation hints
    hint?: string;       // e.g. "Write in a friendly tone"
    maxLength?: number;
    tone?: string;       // e.g. "professional", "casual"
  };
  aiLock?: {             // AI lock behavior
    autoLockOnEdit?: boolean;  // Lock when user edits (default: true)
    lockable?: boolean;
    requireApproval?: boolean;
  };
}
```

## Basic types

### text
Single-line text input.
```typescript
{ name: 'title', type: 'text', required: true, maxLength: 120 }
```

### textarea
Multi-line plain text.
```typescript
{ name: 'excerpt', type: 'textarea', maxLength: 300 }
```

### number
```typescript
{ name: 'price', type: 'number' }
```

### boolean
```typescript
{ name: 'featured', type: 'boolean' }
```

### date
ISO date string.
```typescript
{ name: 'publishDate', type: 'date' }
```

## Content types

### richtext
Rich text / Markdown content with a block editor in admin UI. Optional `features` array controls toolbar.
```typescript
{ name: 'content', type: 'richtext' }

// Restricted features
{ name: 'content', type: 'richtext', features: ['bold', 'italic', 'heading', 'link', 'image'] }
```

### htmldoc
Full HTML document editor (visual WYSIWYG).
```typescript
{ name: 'template', type: 'htmldoc' }
```

## Media types

### image
Single image reference.
```typescript
{ name: 'heroImage', type: 'image' }
```

### image-gallery
Multiple images. **Values must be `{ url, alt }[]` objects, not plain strings.**
```typescript
{ name: 'photos', type: 'image-gallery' }
```

### video
```typescript
{ name: 'intro', type: 'video' }
```

### audio
```typescript
{ name: 'podcast', type: 'audio' }
```

### file
```typescript
{ name: 'download', type: 'file' }
```

## Structure types

### select
```typescript
{
  name: 'category', type: 'select',
  options: [
    { label: 'Web', value: 'web' },
    { label: 'Mobile', value: 'mobile' },
  ],
}
```

### tags
Free-form tags stored as `string[]`.
```typescript
{ name: 'tags', type: 'tags' }
```

### relation
Reference to documents in another collection.
```typescript
{ name: 'author', type: 'relation', collection: 'team' }
{ name: 'related', type: 'relation', collection: 'posts', multiple: true }
```

### array
Repeatable items. Without `fields` it stores `string[]`.
```typescript
{ name: 'bullets', type: 'array' }
{ name: 'stats', type: 'array', fields: [
  { name: 'value', type: 'text' },
  { name: 'label', type: 'text' },
]}
```

### object
Nested field group.
```typescript
{ name: 'address', type: 'object', fields: [
  { name: 'street', type: 'text' },
  { name: 'city', type: 'text' },
]}
```

### blocks
Dynamic content sections using the block system.
```typescript
{ name: 'sections', type: 'blocks', blocks: ['hero', 'features', 'cta'] }
```

## Special types

### map
OpenStreetMap with draggable pin. Stores `{ lat, lng, address, zoom }`.
```typescript
{ name: 'location', type: 'map' }
```

### interactive
Reference to an Interactive component from the library.
```typescript
{ name: 'chart', type: 'interactive' }
```

### column-slots
Multi-column layout with nested fields.
```typescript
{ name: 'layout', type: 'column-slots' }
```