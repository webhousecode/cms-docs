/**
 * Seed Templates + AI Guide docs (EN + DA).
 * Run: npx tsx scripts/seed-templates-and-guides.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");
mkdirSync(DIR, { recursive: true });

interface Doc {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  content: string;
  locale?: string;
}

function writeDoc(doc: Doc) {
  const tg = randomUUID();
  const json = {
    id: randomUUID(),
    slug: doc.slug,
    status: "published",
    locale: doc.locale ?? "en",
    translationGroup: tg,
    data: {
      title: doc.title,
      description: doc.description,
      content: doc.content,
      category: doc.category,
      order: doc.order,
      _seo: {
        metaTitle: `${doc.title} — webhouse.app Docs`,
        metaDescription: doc.description,
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(DIR, `${doc.slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ ${doc.slug}`);
}

// ═══════════════════════════════════════════════════════════════
// TEMPLATES (EN)
// ═══════════════════════════════════════════════════════════════

writeDoc({
  slug: "templates",
  title: "Templates & Boilerplates",
  description: "Three ready-to-use boilerplates and eight example sites to jump-start your project.",
  category: "getting-started",
  order: 2,
  content: `## Boilerplates

When you scaffold a new project with \`npm create @webhouse/cms\`, you choose one of three boilerplates. Each comes with a working site, example content, and a configured \`cms.config.ts\`.

### Static Boilerplate

**Zero framework. Pure HTML output.**

The simplest way to use @webhouse/cms. A custom \`build.ts\` reads JSON content and generates static HTML with Marked for markdown rendering. No React, no bundler, no runtime JS.

\`\`\`bash
npm create @webhouse/cms my-site -- --template static
\`\`\`

**Includes:**
- 3 collections: \`global\`, \`pages\`, \`posts\`
- 3 block types: hero, features, CTA
- Markdown rendering with Marked
- Dark theme with CSS variables
- Map field support

**Best for:** Landing pages, blogs, brochure sites where you want zero client-side JavaScript and full control over the HTML output.

---

### Next.js Boilerplate

**Full-stack React with App Router.**

A complete Next.js site with server components, static generation, Tailwind CSS v4, dark mode, and \`react-markdown\` for richtext. The recommended starting point for most projects.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

**Includes:**
- 3 collections: \`global\`, \`pages\`, \`posts\`
- 3 block types: hero, features, CTA
- \`generateStaticParams\` for all pages
- \`generateMetadata\` with SEO from \`_seo\` fields
- Tailwind v4 with \`@theme\` CSS variables
- Responsive navbar with dark mode toggle
- Blog listing + detail pages
- Dynamic pages (\`/about\`, \`/contact\`, etc.)

**Key files:**
\`\`\`
src/
  lib/content.ts         → getCollection(), getDocument()
  app/layout.tsx          → Root layout, navbar, footer
  app/page.tsx            → Homepage (reads pages/home.json)
  app/blog/page.tsx       → Blog listing
  app/blog/[slug]/page.tsx → Blog post
  app/[slug]/page.tsx     → Dynamic pages
  components/
    block-renderer.tsx    → Hero, Features, CTA blocks
    article-body.tsx      → react-markdown with remark-gfm
    navbar.tsx            → Responsive nav + theme toggle
\`\`\`

**Best for:** Content-driven websites, blogs, marketing sites, documentation — anything where you want React and the Next.js ecosystem.

---

### Next.js GitHub Boilerplate

**Next.js + GitHub-backed content with live updates.**

Same as the Next.js boilerplate but configured for GitHub storage. Content lives in a GitHub repository, each edit is a commit, and the site receives real-time updates via signed webhooks.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs-github
\`\`\`

**Additional features:**
- GitHub storage adapter (content via GitHub API)
- LiveRefresh SSE webhooks for real-time content updates
- PR-based content review workflow
- \`.env.example\` with GitHub token setup

**Best for:** Team collaboration, PR-based content workflows, sites deployed on GitHub Pages, or when you want content version-controlled in a separate repo.

---

## Example Sites

Beyond boilerplates, the monorepo includes production-quality example sites that demonstrate advanced patterns.

### Simple Blog

A minimal blog using the CMS CLI directly. Two collections (posts + pages), no framework — just \`npx cms build\`.

\`\`\`bash
cd examples/blog
npm install && npm run build
\`\`\`

### webhouse.app Landing Page

The actual [webhouse.app](https://webhouse.app) marketing site. Advanced custom build.ts with 6 block types: hero (with terminal animation), stats bar, features grid, architecture diagram, MCP cards, and CTA.

### Static Templates (8 variants)

Eight themed static sites ready to customize:

| Template | Description |
|----------|-------------|
| **blog** | Clean blog with posts, pages, tags, cover images |
| **agency** | Agency portfolio with case studies, team, services |
| **boutique** | Product/shop showcase |
| **bridgeberg** | Corporate template |
| **freelancer** | Single-person portfolio with services and work samples |
| **portfolio** | Creative portfolio with project gallery |
| **portfolio-squared** | Alternative portfolio layout |
| **studio** | Creative studio template |

Each has its own \`cms.config.ts\`, content, and build output. Use them as inspiration or starting points.

### Interactives

Standalone HTML interactive components (charts, calculators, demos) that embed in richtext via the \`!!INTERACTIVE\` syntax. Includes a pricing calculator with Chart.js visualization.

---

## Choosing a Template

| Need | Template |
|------|----------|
| Simplest possible setup | Static Boilerplate |
| React / Next.js ecosystem | Next.js Boilerplate |
| Team collaboration via GitHub | Next.js GitHub Boilerplate |
| Advanced landing page | Fork the Landing example |
| E-commerce / product showcase | Fork the Boutique example |
| Portfolio / agency | Fork Agency, Freelancer, or Studio |`,
});

// ═══════════════════════════════════════════════════════════════
// TEMPLATES (DA)
// ═══════════════════════════════════════════════════════════════

writeDoc({
  slug: "templates-da",
  title: "Skabeloner & Boilerplates",
  description: "Tre klar-til-brug boilerplates og otte eksempelsites til at komme hurtigt i gang.",
  category: "getting-started",
  order: 2,
  locale: "da",
  content: `## Boilerplates

Når du opretter et nyt projekt med \`npm create @webhouse/cms\`, vælger du én af tre boilerplates. Hver kommer med et fungerende site, eksempelindhold og en konfigureret \`cms.config.ts\`.

### Static Boilerplate

**Intet framework. Ren HTML-output.**

Den simpleste måde at bruge @webhouse/cms. En custom \`build.ts\` læser JSON-indhold og genererer statisk HTML med Marked til markdown-rendering. Ingen React, ingen bundler, intet runtime-JavaScript.

\`\`\`bash
npm create @webhouse/cms my-site -- --template static
\`\`\`

**Inkluderer:**
- 3 collections: \`global\`, \`pages\`, \`posts\`
- 3 bloktyper: hero, features, CTA
- Markdown-rendering med Marked
- Mørkt tema med CSS-variabler
- Kortfelt-support

**Bedst til:** Landingssider, blogs, brocuresites hvor du vil have nul klient-side JavaScript og fuld kontrol over HTML-output.

---

### Next.js Boilerplate

**Full-stack React med App Router.**

Et komplet Next.js-site med serverkomponenter, statisk generering, Tailwind CSS v4, mørk tilstand og \`react-markdown\` til richtext. Det anbefalede udgangspunkt for de fleste projekter.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

**Inkluderer:**
- 3 collections: \`global\`, \`pages\`, \`posts\`
- 3 bloktyper: hero, features, CTA
- \`generateStaticParams\` for alle sider
- \`generateMetadata\` med SEO fra \`_seo\`-felter
- Tailwind v4 med \`@theme\` CSS-variabler
- Responsiv navbar med dark mode-toggle
- Blog-liste + detaljesider
- Dynamiske sider (\`/about\`, \`/contact\` osv.)

**Bedst til:** Indholdsdrevne websites, blogs, marketing-sites, dokumentation — alt hvor du vil have React og Next.js-økosystemet.

---

### Next.js GitHub Boilerplate

**Next.js + GitHub-backed indhold med live-opdateringer.**

Samme som Next.js-boilerplaten men konfigureret til GitHub-lagring. Indhold lever i et GitHub-repository, hver redigering er et commit, og sitet modtager realtidsopdateringer via signerede webhooks.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs-github
\`\`\`

**Yderligere funktioner:**
- GitHub storage-adapter (indhold via GitHub API)
- LiveRefresh SSE-webhooks til realtids-indholdsopdateringer
- PR-baseret indholdsgennemgangs-workflow

**Bedst til:** Teamsamarbejde, PR-baserede indholdsworkflows, sites deployet på GitHub Pages.

---

## Eksempelsites

Ud over boilerplates inkluderer monorepo'et produktionskvalitets-eksempelsites der demonstrerer avancerede mønstre.

### Simple Blog

En minimal blog der bruger CMS CLI direkte. To collections (posts + pages), intet framework.

### webhouse.app Landingsside

Det faktiske [webhouse.app](https://webhouse.app) marketing-site. Avanceret custom build.ts med 6 bloktyper.

### Statiske skabeloner (8 varianter)

| Skabelon | Beskrivelse |
|----------|-------------|
| **blog** | Ren blog med indlæg, sider, tags, forsidebilleder |
| **agency** | Bureau-portfolio med cases, team, services |
| **boutique** | Produkt/shop-showcase |
| **bridgeberg** | Virksomhedsskabelon |
| **freelancer** | Enkeltpersons-portfolio med services og arbejdsprøver |
| **portfolio** | Kreativ portfolio med projektgalleri |
| **portfolio-squared** | Alternativt portfolio-layout |
| **studio** | Kreativt studie-skabelon |

### Interaktive

Selvstændige HTML-interaktive komponenter (diagrammer, beregnere, demoer) der indlejres i richtext.

---

## Vælg en skabelon

| Behov | Skabelon |
|-------|----------|
| Simplest mulige setup | Static Boilerplate |
| React / Next.js-økosystem | Next.js Boilerplate |
| Teamsamarbejde via GitHub | Next.js GitHub Boilerplate |
| Avanceret landingsside | Fork Landing-eksemplet |
| Portfolio / bureau | Fork Agency, Freelancer eller Studio |`,
});

// ═══════════════════════════════════════════════════════════════
// AI BUILDER GUIDE (EN)
// ═══════════════════════════════════════════════════════════════

writeDoc({
  slug: "ai-builder-guide",
  title: "AI Builder Guide",
  description: "20 modular documentation modules that ship with the npm package — designed for AI agents building sites.",
  category: "concepts",
  order: 3,
  content: `## What is the AI Builder Guide?

Every \`@webhouse/cms\` npm package ships with a comprehensive AI builder guide at \`packages/cms/CLAUDE.md\`. This is a modular documentation system designed specifically for AI coding assistants (Claude Code, Cursor, GitHub Copilot) to read when building sites.

When you scaffold a new project, the guide is referenced in your project's \`CLAUDE.md\` file, giving AI assistants immediate context about how to work with the CMS.

## How it works

The guide is split into **20 focused modules**, each covering one topic. AI assistants load modules on-demand rather than reading everything at once. This keeps context windows efficient.

\`\`\`
docs/ai-guide/
  index.md              → Navigation + quick decision matrix
  01-getting-started.md → Scaffolding + first run
  02-config-reference.md → cms.config.ts reference
  03-field-types.md     → All 22 field types
  04-blocks.md          → Block system
  05-richtext.md        → TipTap editor, features, markdown storage
  06-storage-adapters.md → Filesystem, GitHub, SQLite, Supabase
  07-content-structure.md → Document JSON format
  08-nextjs-patterns.md → Loader functions, pages, ISR
  09-cli-reference.md   → All CLI commands
  10-config-example.md  → Complete real-world config
  11-api-reference.md   → ContentService API
  12-admin-ui.md        → Admin architecture
  13-site-building.md   → Critical patterns + common mistakes
  14-relationships.md   → Relations, resolving, reverse lookups
  15-seo.md             → Meta, JSON-LD, sitemap, robots.txt
  16-images.md          → WebP, responsive, next/image
  17-i18n.md            → Locales, translation, hreflang
  18-deployment.md      → Vercel, Fly.io, Docker
  19-troubleshooting.md → Common errors + fixes
  20-interactives.md    → Data-driven embeds
\`\`\`

## The Quick Reference

The index module includes a **quick reference card** that AI assistants can read in seconds:

- **Document JSON format** — slug, status, data, id, _fieldMeta
- **All field types** — one-line summary of each
- **Collection definition template** — copy-paste starter
- **5 critical rules:**
  1. Always specify storage adapter (defaults to SQLite, not filesystem)
  2. image-gallery values must be \`{ url, alt }[]\` objects
  3. Always filter by \`status === "published"\`
  4. Use \`BASE\` variable for all internal links
  5. Slug in JSON must match filename

## Fetching modules

Modules can be fetched from GitHub at build time or runtime:

\`\`\`typescript
const MODULE_BASE = "https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide";

async function loadGuide(module: string) {
  const res = await fetch(\`\${MODULE_BASE}/\${module}\`);
  return res.text();
}

// Load specific modules
const config = await loadGuide("02-config-reference.md");
const fields = await loadGuide("03-field-types.md");
\`\`\`

## Module overview

### Core Setup (Modules 1-2)
How to scaffold, install, and configure. The \`cms.config.ts\` file is the single source of truth for your content schema.

### Content Modeling (Modules 3-7)
Field types, blocks, richtext editor capabilities, storage backends, and the JSON document format. Everything about how content is structured and stored.

### Framework Integration (Modules 8-11)
Next.js patterns (loader functions, \`generateStaticParams\`, \`generateMetadata\`), CLI commands, a complete real-world config example, and the programmatic ContentService API.

### Admin & Building (Modules 12-13)
Admin UI architecture and the critical site-building patterns that prevent common mistakes (wrong storage adapter, missing status filter, broken image paths).

### Advanced Topics (Modules 14-20)
Relations between documents, SEO optimization, image processing, internationalization, deployment to various platforms, troubleshooting, and interactive embeds.

## Using the guide in your project

When you create a new site, the scaffolder generates a \`CLAUDE.md\` that references the guide:

\`\`\`markdown
# My Site — AI Builder Instructions

This is a Next.js site built with webhouse.app CMS.
Content is stored as JSON files.

Read the full AI builder guide:
https://raw.githubusercontent.com/webhousecode/cms/main/packages/cms/CLAUDE.md
\`\`\`

AI assistants that read this file get immediate context about your CMS setup, field types, and patterns — no manual onboarding needed.

## Why this matters

Traditional CMS documentation is written for humans. The AI builder guide is written for **AI agents that generate code**:

- **Structured for machine parsing** — consistent markdown, code blocks with language tags
- **Copy-paste ready** — every pattern includes runnable code
- **Error-prevention focused** — critical rules highlighted, common mistakes documented
- **Modular loading** — agents read only what they need, saving context window space`,
});

// ═══════════════════════════════════════════════════════════════
// AI BUILDER GUIDE (DA)
// ═══════════════════════════════════════════════════════════════

writeDoc({
  slug: "ai-builder-guide-da",
  title: "AI Builder Guide",
  description: "20 modulære dokumentationsmoduler der følger med npm-pakken — designet til AI-agenter der bygger sites.",
  category: "concepts",
  order: 3,
  locale: "da",
  content: `## Hvad er AI Builder Guide?

Hver \`@webhouse/cms\` npm-pakke leveres med en omfattende AI builder guide i \`packages/cms/CLAUDE.md\`. Det er et modulært dokumentationssystem designet specifikt til AI-kodningsassistenter (Claude Code, Cursor, GitHub Copilot) der skal læse det når de bygger sites.

Når du opretter et nyt projekt, refereres guiden i dit projekts \`CLAUDE.md\`-fil, hvilket giver AI-assistenter øjeblikkelig kontekst om hvordan de arbejder med CMS'et.

## Sådan fungerer det

Guiden er opdelt i **20 fokuserede moduler**, der hver dækker ét emne. AI-assistenter indlæser moduler on-demand i stedet for at læse alt på én gang.

\`\`\`
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
\`\`\`

## Hurtigreferencen

Indeksmodulet inkluderer et **hurtigreferencekort** som AI-assistenter kan læse på sekunder:

- **Dokument-JSON-format** — slug, status, data, id, _fieldMeta
- **Alle felttyper** — en-linjes sammenfatning af hver
- **Collection-definitionsskabelon** — klar til at kopiere
- **5 kritiske regler:**
  1. Angiv altid storage-adapter (standard er SQLite, ikke filsystem)
  2. image-gallery-værdier skal være \`{ url, alt }[]\`-objekter
  3. Filtrer altid på \`status === "published"\`
  4. Brug \`BASE\`-variabel til alle interne links
  5. Slug i JSON skal matche filnavn

## Hentning af moduler

Moduler kan hentes fra GitHub ved build-tid eller runtime:

\`\`\`typescript
const MODULE_BASE = "https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide";

async function loadGuide(module: string) {
  const res = await fetch(\`\${MODULE_BASE}/\${module}\`);
  return res.text();
}
\`\`\`

## Moduloversigt

### Kernekonfiguration (Modul 1-2)
Scaffold, installér og konfigurér. \`cms.config.ts\` er den eneste kilde til sandhed for dit indholdsschema.

### Indholdsmodellering (Modul 3-7)
Felttyper, blokke, richtext-editor, lagringsbackends og JSON-dokumentformatet.

### Framework-integration (Modul 8-11)
Next.js-mønstre, CLI-kommandoer, et komplet real-world konfigurationseksempel og den programmatiske ContentService API.

### Admin & Building (Modul 12-13)
Admin-UI-arkitektur og de kritiske site-building-mønstre der forhindrer almindelige fejl.

### Avancerede emner (Modul 14-20)
Relationer, SEO, billedbehandling, internationalisering, udrulning, fejlfinding og interaktive embeds.

## Brug af guiden i dit projekt

Når du opretter et nyt site, genererer scaffolderen en \`CLAUDE.md\` der refererer guiden. AI-assistenter der læser denne fil får øjeblikkelig kontekst om dit CMS-setup.

## Hvorfor dette er vigtigt

Traditionel CMS-dokumentation er skrevet til mennesker. AI builder guiden er skrevet til **AI-agenter der genererer kode**:

- **Struktureret til maskinlæsning** — konsistent markdown, kodeblokke med sprogtags
- **Klar til copy-paste** — hvert mønster inkluderer kørbar kode
- **Fejlforebyggelsesfokuseret** — kritiske regler fremhævet, almindelige fejl dokumenteret
- **Modulær indlæsning** — agenter læser kun hvad de har brug for`,
});

console.log("\n✓ 4 documents created (templates EN/DA + AI guide EN/DA)");
