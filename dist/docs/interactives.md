# Interactives

*Updated: 2026-03-29*
*Language: en*

Data-driven interactive content — charts, calculators, demos with CMS-managed data.

## The separation principle

When building interactive content (charts, animations, calculators), **all text and data must be stored in CMS collections — never hardcoded.**

| What | Where | Editable by |
|------|-------|-------------|
| Text labels, headings | CMS text fields | Editor in admin |
| Data points, numbers | CMS array/object fields | Editor in admin |
| Visualization, animation | Interactive component | Developer |
| Styling, colors | Interactive CSS | Developer |

## Pattern: CMS → Page → Interactive

**1. Define a data collection:**
```typescript
defineCollection({
  name: "chart-data",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "chartType", type: "select", options: [
      { label: "Line", value: "line" },
      { label: "Bar", value: "bar" },
    ]},
    { name: "dataPoints", type: "array", fields: [
      { name: "label", type: "text" },
      { name: "value", type: "number" },
    ]},
  ],
})
```

**2. Create the component (client):**
```typescript
"use client";
export function Chart({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  // Use Chart.js, D3, or any visualization library
  return {title}{/* render chart */};
}
```

**3. Use in a page (server reads CMS, passes props):**
```typescript
import { getDocument } from "@/lib/content";
import { Chart } from "@/components/chart";

export default function Page() {
  const data = getDocument("chart-data", "monthly-sales");
  if (!data) return null;
  return ;
}
```

## Standalone HTML interactives

The CMS also supports standalone HTML interactives managed via the Interactives Manager. These are complete HTML files that render in iframes. Use for:
- Self-contained interactives without CMS data
- Quick prototyping with "Create with AI" in admin
- One-off visualizations

## Richtext embedding

Interactives can be embedded in richtext fields:
```
!!INTERACTIVE[chart-id|Chart Title|align:center]
```

Your renderer must convert these tokens to iframes:
```typescript
html = html.replace(
  /!!INTERACTIVE\[([^\]]+)\]/g,
  (_match, inner) => {
    const [id, title = id] = inner.split("|");
    return ``;
  },
);
```

## Scaled rendering

Render full-size interactives as miniatures using CSS transform:
```typescript

  

```