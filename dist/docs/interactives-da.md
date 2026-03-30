# Interaktive elementer

*Updated: 2026-03-29*
*Language: da*

Datadrevet interaktivt indhold — diagrammer, beregnere, demoer med CMS-styret data.

## Separationsprincippet

Når du bygger interaktivt indhold (diagrammer, animationer, beregnere), **skal al tekst og data gemmes i CMS-collections — aldrig hardkodes.**

| Hvad | Hvor | Redigerbar af |
|------|------|---------------|
| Tekstlabels, overskrifter | CMS-tekstfelter | Redaktør i admin |
| Datapunkter, tal | CMS array/object-felter | Redaktør i admin |
| Visualisering, animation | Interaktiv komponent | Udvikler |

## Mønster: CMS → Side → Interaktiv

**1. Definér en datacollektion:**
```typescript
defineCollection({
  name: "chart-data",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dataPoints", type: "array", fields: [
      { name: "label", type: "text" },
      { name: "value", type: "number" },
    ]},
  ],
})
```

**2. Opret komponenten (klient-side):**
Brug Chart.js, D3 eller ethvert visualiseringsbibliotek.

**3. Brug på en side (server læser CMS, sender props):**
```typescript
import { getDocument } from "@/lib/content";
import { Chart } from "@/components/chart";

export default function Page() {
  const data = getDocument("chart-data", "monthly-sales");
  if (!data) return null;
  return ;
}
```

## Selvstændige HTML-interaktive

CMS'et understøtter også selvstændige HTML-interaktive via Interaktive-manageren. Brug til hurtig prototyping med "Opret med AI" i admin.

## Richtext-indlejring

Interaktive kan indlejres i richtext-felter:
```
!!INTERACTIVE[chart-id|Diagram Titel|align:center]
```