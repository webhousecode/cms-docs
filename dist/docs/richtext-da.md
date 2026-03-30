# Richtext-editor

*Updated: 2026-03-29*
*Language: da*

TipTap-baseret richtext-editor med indlejret medier, callouts, tabeller, kodeblokke og AI-funktioner.

## Oversigt

Alle `richtext`-felter bruger en indbygget TipTap v3-editor med fuld medieindlejring, strukturerede indholdsnoder og AI-assistance.

## Indlejrede medietyper

| Node | Beskrivelse |
|------|-------------|
| **Billede** | Upload eller indsæt. Understøtter størrelseshåndtag og justering. |
| **Video** | YouTube eller Vimeo URL → responsiv iframe. |
| **Lyd** | Upload mp3/wav/ogg → inline ``-afspiller. |
| **Fil** | Upload enhver fil → download-linkkort. |
| **Callout** | Stylet info/advarsel/tip/fare-boks med redigerbar tekst. |
| **Tabel** | Struktureret datatabel med overskriftsrække. |
| **Kodeblok** | Fenced kodeblok med syntaksfremhævning. |

## Styring af tilgængelige funktioner

Brug `features`-arrayet til at styre hvilke værktøjslinjeelementer der vises:

```typescript
// Fuld-udstyret (standard — alle værktøjer)
{ name: 'content', type: 'richtext' }

// Begrænset — kun grundlæggende formatering + billeder
{ name: 'content', type: 'richtext',
  features: ['bold', 'italic', 'heading', 'link', 'image'] }
```

## Markdown-lagring

Richtext-felter gemmer **markdown**. Funktioner som markdown ikke understøtter bruger inline HTML (``, ``, `` osv.).

## Rendering i Next.js

Brug `react-markdown` med `remark-gfm`:

```typescript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArtikelIndhold({ content }: { content: string }) {
  return {content};
}
```

> **Brug aldrig `dangerouslySetInnerHTML`** — det ødelægger billeder, tabeller og indlejrede medier.

## AI-funktioner

- **AI Korrektur** — auto-detekterer sprog, tjekker stavning/grammatik/stil
- **AI Boblemenu** — markér tekst for omskrivningsmuligheder (kortere, længere, formel, afslappet, oversæt)