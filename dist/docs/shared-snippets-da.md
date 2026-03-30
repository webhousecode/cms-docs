# Delte Snippets — Genbrugelige kodeblokke

*Updated: 2026-03-30*
*Language: da*

Sådan byggede vi et delt snippet-system til docs.webhouse.app med vores eget CMS — og hvordan du kan gøre det samme.

## Problemet

Dokumentationssites gentager de samme kodeeksempler på tværs af flere sider. "Hurtig start" viser installationskommandoen. "Skabeloner" viser den også. "CLI-reference" viser den igen. Når kommandoen ændres, opdaterer du ét sted og glemmer de andre to.

## Løsningen: en snippets-collection

Vi tilføjede en `snippets`-collection til vores CMS-konfiguration:

```typescript
defineCollection({
  name: "snippets",
  label: "Delte Snippets",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "code", type: "textarea", required: true },
    { name: "lang", type: "text" },
  ],
})
```

## Brug af snippets i markdown

I enhver doc-sides indholdsfeld, referér en snippet med:

```
{{snippet:create-project}}
```

Ved render-tid opløses tokenet til den faktiske kodeblok fra snippets-collectionen.

## Implementering i build.ts (statiske sites)

Tilføj en snippet-resolver før markdown-rendering:

```typescript
function resolveSnippets(markdown: string): string {
  return markdown.replace(
    /\{\{snippet:([a-z0-9-]+)\}\}/g,
    (_match, slug) => {
      const file = join(SNIPPETS_DIR, slug + '.json');
      if (!existsSync(file)) return '';
      const snippet = JSON.parse(readFileSync(file, 'utf-8'));
      return '\x60\x60\x60' + snippet.data.lang + '\n' +
        snippet.data.code + '\n\x60\x60\x60';
    }
  );
}
```

## Ud over kode: andre brugsmuligheder

Snippets behøver ikke være kode:

- **Ansvarsfraskrivelser** — juridisk tekst der vises på flere sider
- **Versionsbadges** — aktuelt versionsnummer opdateret ét sted
- **Funktionsmatricer** — sammenligningstabeller delt på tværs af produktsider
- **Kontaktinfo** — adresse, telefon, email brugt i footer og kontaktside
- **Priser** — prispoints refereret i features, prissætning og FAQ-sider

## Hvorfor dette er vigtigt

Dette er dogfooding i sin bedste form. Vi byggede docs.webhouse.app med @webhouse/cms, og når vi havde brug for genbrugelige indholdsblokke, brugte vi CMS'ets eget collection-system. Ingen plugins, ingen custom infrastruktur — bare endnu en collection.