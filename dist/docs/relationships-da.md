# Indholdsrelationer

*Updated: 2026-03-29*
*Language: da*

Forbind dokumenter på tværs af collections med relationsfelter — single, multi og reverse lookups.

## Sådan fungerer relationer

Relationer forbinder dokumenter på tværs af collections. Et relationsfelt gemmer en **slug-streng** (enkelt) eller **slug-array** (flere) — aldrig indlejret data.

```typescript
// Enkelt relation — gemmer én slug, f.eks. "john-doe"
{ name: 'author', type: 'relation', collection: 'team' }

// Multi-relation — gemmer slug-array, f.eks. ["guide-1", "guide-2"]
{ name: 'relatedPosts', type: 'relation', collection: 'posts', multiple: true }
```

## Opløsning af relationer

Da relationer gemmer slugs, opløser du dem med `getDocument()`:

```typescript
const author = post.data.author
  ? getDocument('team', post.data.author)
  : null;
```

## Omvendt opslag

Find alle dokumenter der refererer til en given slug:

```typescript
const posts = getCollection('posts')
  .filter(post => post.data.author === authorSlug);
```

## Hvornår bruges relationer vs. indlejret data?

**Brug relationer** når data deles på tværs af flere dokumenter.
**Brug indlejret data** (object/array-felter) når data er unik for dokumentet.