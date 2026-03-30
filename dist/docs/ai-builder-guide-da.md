# AI Builder Guide

*Updated: 2026-03-30*
*Language: da*

20 modulære dokumentationsmoduler der følger med npm-pakken — designet til AI-agenter der bygger sites.

## Hvad er AI Builder Guide?

Hver `@webhouse/cms` npm-pakke leveres med en omfattende AI builder guide i `packages/cms/CLAUDE.md`. Det er et modulært dokumentationssystem designet specifikt til AI-kodningsassistenter (Claude Code, Cursor, GitHub Copilot) der skal læse det når de bygger sites.

Når du opretter et nyt projekt, refereres guiden i dit projekts `CLAUDE.md`-fil, hvilket giver AI-assistenter øjeblikkelig kontekst om hvordan de arbejder med CMS'et.

## Sådan fungerer det

Guiden er opdelt i **20 fokuserede moduler**, der hver dækker ét emne. AI-assistenter indlæser moduler on-demand i stedet for at læse alt på én gang.

```
docs/ai-guide/
  index.md              → Navigation + hurtig beslutningsmatrix
  01-getting-started.md → Scaffolding + første kørsel
  02-config-reference.md → cms.config.ts reference
  03-field-types.md     → Alle 22 felttyper
  04-blocks.md          → Bloksystem
  05-richtext.md        → TipTap editor, funktioner, markdown-lagring
  06-storage-adapters.md → Filsystem, GitHub, SQLite, Supabase
  07-content-structure.md → Dokument-JSON-format
  08-nextjs-patterns.md → Loader-funktioner, sider, ISR
  09-cli-reference.md   → Alle CLI-kommandoer
  10-config-example.md  → Komplet real-world konfiguration
  11-api-reference.md   → ContentService API
  12-admin-ui.md        → Admin-arkitektur
  13-site-building.md   → Kritiske mønstre + almindelige fejl
  14-relationships.md   → Relationer, opløsning, reverse lookups
  15-seo.md             → Meta, JSON-LD, sitemap, robots.txt
  16-images.md          → WebP, responsive, next/image
  17-i18n.md            → Sprog, oversættelse, hreflang
  18-deployment.md      → Vercel, Fly.io, Docker
  19-troubleshooting.md → Almindelige fejl + løsninger
  20-interactives.md    → Datadrevne embeds
```

## Hurtigreferencen

Indeksmodulet inkluderer et **hurtigreferencekort** som AI-assistenter kan læse på sekunder:

- **Dokument-JSON-format** — slug, status, data, id, _fieldMeta
- **Alle felttyper** — en-linjes sammenfatning af hver
- **Collection-definitionsskabelon** — klar til at kopiere
- **5 kritiske regler:**
  1. Angiv altid storage-adapter (standard er SQLite, ikke filsystem)
  2. image-gallery-værdier skal være `{ url, alt }[]`-objekter
  3. Filtrer altid på `status === "published"`
  4. Brug `BASE`-variabel til alle interne links
  5. Slug i JSON skal matche filnavn

## Hentning af moduler

Moduler kan hentes fra GitHub ved build-tid eller runtime:

```typescript
const MODULE_BASE = "https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide";

async function loadGuide(module: string) {
  const res = await fetch(`${MODULE_BASE}/${module}`);
  return res.text();
}
```

## Moduloversigt

### Kernekonfiguration (Modul 1-2)
Scaffold, installér og konfigurér. `cms.config.ts` er den eneste kilde til sandhed for dit indholdsschema.

### Indholdsmodellering (Modul 3-7)
Felttyper, blokke, richtext-editor, lagringsbackends og JSON-dokumentformatet.

### Framework-integration (Modul 8-11)
Next.js-mønstre, CLI-kommandoer, et komplet real-world konfigurationseksempel og den programmatiske ContentService API.

### Admin & Building (Modul 12-13)
Admin-UI-arkitektur og de kritiske site-building-mønstre der forhindrer almindelige fejl.

### Avancerede emner (Modul 14-20)
Relationer, SEO, billedbehandling, internationalisering, udrulning, fejlfinding og interaktive embeds.

## Brug af guiden i dit projekt

Når du opretter et nyt site, genererer scaffolderen en `CLAUDE.md` der refererer guiden. AI-assistenter der læser denne fil får øjeblikkelig kontekst om dit CMS-setup.

## Hvorfor dette er vigtigt

Traditionel CMS-dokumentation er skrevet til mennesker. AI builder guiden er skrevet til **AI-agenter der genererer kode**:

- **Struktureret til maskinlæsning** — konsistent markdown, kodeblokke med sprogtags
- **Klar til copy-paste** — hvert mønster inkluderer kørbar kode
- **Fejlforebyggelsesfokuseret** — kritiske regler fremhævet, almindelige fejl dokumenteret
- **Modulær indlæsning** — agenter læser kun hvad de har brug for