# Mediehåndtering

*Updated: 2026-03-29*
*Language: da*

Billedbehandling, AI-analyse, gallerier og mediebibliotekets funktioner.

## Mediebibliotek

CMS-admin inkluderer et fuldt mediebibliotek med:
- **Upload** — træk og slip eller filvælger
- **Organisering** — mapper, tags, søgning
- **Behandling** — automatisk WebP-konvertering, responsive varianter
- **AI-analyse** — auto-genererede billedtekster, alt-tekst og tags

## Billedbehandling

Uploadede billeder bliver automatisk:
1. Konverteret til WebP for optimal filstørrelse
2. Skaleret til responsive varianter (f.eks. 400w, 800w, 1200w)
3. EXIF-data ekstraheret (kamera, objektiv, GPS osv.)
4. AI-analyseret for billedtekster og alt-tekst

## AI-billedanalyse

Når du uploader et billede, analyserer AI det og genererer:
- **Billedtekst** — beskrivende tekst til kontekst
- **Alt-tekst** — tilgænglighed for skærmlæsere og SEO
- **Tags** — auto-genererede tags til organisering

## Brug af billeder i indhold

### Billedfelt
```typescript
{ name: 'heroImage', type: 'image' }
```

### Billedgalleri
```typescript
{ name: 'photos', type: 'image-gallery' }
```

Gallerværdier skal være `{ url, alt }[]`-objekter:
```json
"photos": [
  { "url": "/uploads/foto-1.webp", "alt": "Beskrivelse" },
  { "url": "/uploads/foto-2.webp", "alt": "Et andet foto" }
]
```