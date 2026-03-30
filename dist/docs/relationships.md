# Content Relationships

*Updated: 2026-03-29*
*Language: en*

Connect documents across collections with relation fields — single, multi, and reverse lookups.

## How relations work

Relations connect documents across collections. A relation field stores a **slug string** (single) or **slug array** (multiple) — never embedded data.

```typescript
// Single relation — stores one slug, e.g. "john-doe"
{ name: 'author', type: 'relation', collection: 'team' }

// Multi relation — stores slug array, e.g. ["guide-1", "guide-2"]
{ name: 'relatedPosts', type: 'relation', collection: 'posts', multiple: true }
```

## Resolving relations

Since relations store slugs, resolve them with `getDocument()`:

```typescript
function resolveRelation(collection: string, slug: string | null) {
  if (!slug) return null;
  return getDocument(collection, slug);
}

function resolveRelations(collection: string, slugs: string[] | null) {
  if (!slugs?.length) return [];
  return slugs
    .map(slug => getDocument(collection, slug))
    .filter(Boolean);
}
```

## Pattern: Blog post with author

```typescript
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getDocument('posts', slug);
  if (!post) notFound();

  // Resolve author
  const author = post.data.author
    ? getDocument('team', post.data.author)
    : null;

  // Resolve related posts
  const related = (post.data.relatedPosts ?? [])
    .map(s => getDocument('posts', s))
    .filter(Boolean);

  return (
    
      {post.data.title}
      {author && (
        
          
          {author.data.name}
        
      )}
    
  );
}
```

## Reverse lookup

Find all documents that reference a given slug:

```typescript
// All posts by a specific author
const posts = getCollection('posts')
  .filter(post => post.data.author === authorSlug);
```

## When to use relations vs. embedded data

**Use relations** when:
- Data is shared across multiple documents (e.g., author on many posts)
- Related data changes independently
- You need a canonical source of truth

**Use embedded data** (object/array fields) when:
- Data is unique to this document
- Data doesn't need independent querying
- Simpler structure without cross-collection lookups