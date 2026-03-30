# Media Management

*Updated: 2026-03-29*
*Language: en*

Image processing, AI analysis, galleries, and media library features.

## Media library

The CMS admin includes a full media library with:
- **Upload** — drag & drop or file picker
- **Organization** — folders, tags, search
- **Processing** — automatic WebP conversion, responsive variants
- **AI analysis** — auto-generated captions, alt text, and tags

## Image processing

Uploaded images are automatically:
1. Converted to WebP for optimal file size
2. Resized to responsive variants (e.g., 400w, 800w, 1200w)
3. EXIF data extracted (camera, lens, GPS, etc.)
4. AI-analyzed for captions and alt text

## AI image analysis

When you upload an image, the AI analyzes it to generate:
- **Caption** — descriptive text for context
- **Alt text** — accessibility description for screen readers and SEO
- **Tags** — auto-generated tags for organization

You can also batch-analyze existing images from the media library.

## Using images in content

### Image field
```typescript
{ name: 'heroImage', type: 'image' }
```

### Image gallery
```typescript
{ name: 'photos', type: 'image-gallery' }
```

Gallery values must be `{ url, alt }[]` objects:
```json
"photos": [
  { "url": "/uploads/photo-1.webp", "alt": "Description" },
  { "url": "/uploads/photo-2.webp", "alt": "Another photo" }
]
```

## Rendering images in Next.js

```typescript
import Image from 'next/image';

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    
  );
}
```