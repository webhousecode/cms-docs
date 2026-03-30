/**
 * Update templates docs with screenshots, npx shorthand, and snippets collection.
 * Run: npx tsx scripts/update-templates-docs.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DIR = join(__dirname, "..", "content", "docs");

// ── Update EN templates ──
const enFile = join(DIR, "templates.json");
const enDoc = JSON.parse(readFileSync(enFile, "utf-8"));

enDoc.data.content = `## Quick Start

The fastest way to create a new @webhouse/cms project:

\`\`\`bash
# Default (minimal project)
npm create @webhouse/cms my-site

# With a template
npm create @webhouse/cms my-site -- --template nextjs

# npx shorthand
npx create-@webhouse/cms my-site --template nextjs

# Or via CLI
npx @webhouse/cms-cli init my-site --template portfolio
\`\`\`

## Boilerplates

Three production-ready starting points. Each includes a working site, example content, and configured \`cms.config.ts\`.

![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)

### Static Boilerplate

**Zero framework. Pure HTML output.**

A custom \`build.ts\` reads JSON content and generates static HTML with Marked. No React, no bundler, no runtime JS.

\`\`\`bash
npm create @webhouse/cms my-site -- --template static
\`\`\`

- 3 collections: \`global\`, \`pages\`, \`posts\`
- 3 block types: hero, features, CTA
- Markdown rendering with Marked
- Dark theme with CSS variables
- Map field support

**Best for:** Landing pages, blogs, brochure sites — zero client-side JavaScript.

---

### Next.js Boilerplate

**Full-stack React with App Router.** The recommended starting point.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

- Next.js 16+ with App Router and Server Components
- Tailwind CSS v4 with dark mode toggle
- \`react-markdown\` with \`remark-gfm\` for richtext
- \`generateStaticParams\` + \`generateMetadata\` for SEO
- Blog listing + detail pages
- Block-based pages (hero, features, CTA)

**Key files:**
\`\`\`
src/
  lib/content.ts         → getCollection(), getDocument()
  app/layout.tsx          → Root layout, navbar, footer
  app/page.tsx            → Homepage (reads pages/home.json)
  app/blog/[slug]/page.tsx → Blog post with SEO
  components/
    block-renderer.tsx    → Hero, Features, CTA blocks
    article-body.tsx      → react-markdown + remark-gfm
\`\`\`

---

### Next.js GitHub Boilerplate

**Next.js + GitHub-backed content with live updates.**

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs-github
\`\`\`

Everything from the Next.js boilerplate, plus:
- GitHub storage adapter (each edit = a commit)
- LiveRefresh SSE webhooks (instant browser updates)
- HMAC-signed revalidation endpoint
- PR-based content review workflow

**Best for:** Teams, PR-based workflows, GitHub Pages hosting.

---

## Example Sites

Production-quality sites demonstrating advanced patterns. Use as templates or inspiration.

\`\`\`bash
# Clone any example as a starting point
npm create @webhouse/cms my-site -- --template agency
npm create @webhouse/cms my-site -- --template freelancer
npm create @webhouse/cms my-site -- --template landing
\`\`\`

### Simple Blog

Minimal blog using CMS CLI. Two collections, no framework.

### webhouse.app Landing Page

The actual [webhouse.app](https://webhouse.app) marketing site with 6 block types: hero with terminal, stats, features grid, architecture diagram, MCP cards, and CTA.

### Static Templates (8 variants)

| Template | Command | Description |
|----------|---------|-------------|
| **blog** | \`--template blog\` | Posts, pages, tags, cover images |
| **agency** | \`--template agency\` | Cases, team, services |
| **boutique** | \`--template boutique\` | Product showcase |
| **freelancer** | \`--template freelancer\` | Portfolio with services |
| **portfolio** | \`--template portfolio\` | Creative project gallery |
| **portfolio-squared** | \`--template portfolio-squared\` | Alternative layout |
| **studio** | \`--template studio\` | Creative studio |
| **landing** | \`--template landing\` | webhouse.app style |

### Interactives

Standalone HTML components (charts, calculators) that embed in richtext via \`!!INTERACTIVE\` syntax.

---

## Choosing a Template

| Need | Command |
|------|---------|
| Simplest setup | \`npm create @webhouse/cms my-site\` |
| React / Next.js | \`-- --template nextjs\` |
| GitHub collaboration | \`-- --template nextjs-github\` |
| Pure HTML / no framework | \`-- --template static\` |
| Portfolio / agency | \`-- --template agency\` |
| Blog | \`-- --template blog\` |`;

enDoc.updatedAt = new Date().toISOString();
writeFileSync(enFile, JSON.stringify(enDoc, null, 2));
console.log("  ✓ templates (EN)");

// ── Update DA templates ──
const daFile = join(DIR, "templates-da.json");
const daDoc = JSON.parse(readFileSync(daFile, "utf-8"));

daDoc.data.content = `## Hurtig start

Den hurtigste måde at oprette et nyt @webhouse/cms-projekt:

\`\`\`bash
# Standard (minimalt projekt)
npm create @webhouse/cms my-site

# Med en skabelon
npm create @webhouse/cms my-site -- --template nextjs

# npx genvej
npx create-@webhouse/cms my-site --template nextjs

# Eller via CLI
npx @webhouse/cms-cli init my-site --template portfolio
\`\`\`

## Boilerplates

Tre produktionsklare udgangspunkter. Hver inkluderer et fungerende site, eksempelindhold og konfigureret \`cms.config.ts\`.

![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)

### Static Boilerplate

**Intet framework. Ren HTML-output.**

\`\`\`bash
npm create @webhouse/cms my-site -- --template static
\`\`\`

- 3 collections: \`global\`, \`pages\`, \`posts\`
- 3 bloktyper: hero, features, CTA
- Markdown-rendering med Marked
- Mørkt tema med CSS-variabler

**Bedst til:** Landingssider, blogs — nul klient-side JavaScript.

---

### Next.js Boilerplate

**Full-stack React med App Router.** Det anbefalede udgangspunkt.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

- Next.js 16+ med App Router og Server Components
- Tailwind CSS v4 med dark mode-toggle
- \`react-markdown\` med \`remark-gfm\` til richtext
- \`generateStaticParams\` + \`generateMetadata\` til SEO
- Blog-liste + detaljesider
- Blokbaserede sider (hero, features, CTA)

---

### Next.js GitHub Boilerplate

**Next.js + GitHub-backed indhold med live-opdateringer.**

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs-github
\`\`\`

Alt fra Next.js-boilerplaten, plus:
- GitHub storage-adapter (hver redigering = et commit)
- LiveRefresh SSE-webhooks (øjeblikkelige browserupdates)
- HMAC-signeret revaliderings-endpoint

**Bedst til:** Teams, PR-baserede workflows, GitHub Pages-hosting.

---

## Eksempelsites

Produktionskvalitets-sites der demonstrerer avancerede mønstre.

\`\`\`bash
# Klon et eksempel som udgangspunkt
npm create @webhouse/cms my-site -- --template agency
npm create @webhouse/cms my-site -- --template freelancer
\`\`\`

### Statiske skabeloner

| Skabelon | Kommando | Beskrivelse |
|----------|----------|-------------|
| **blog** | \`--template blog\` | Indlæg, sider, tags, forsidebilleder |
| **agency** | \`--template agency\` | Cases, team, services |
| **boutique** | \`--template boutique\` | Produktshowcase |
| **freelancer** | \`--template freelancer\` | Portfolio med services |
| **portfolio** | \`--template portfolio\` | Kreativt projektgalleri |
| **studio** | \`--template studio\` | Kreativt studie |
| **landing** | \`--template landing\` | webhouse.app-stil |

---

## Vælg en skabelon

| Behov | Kommando |
|-------|----------|
| Simplest setup | \`npm create @webhouse/cms my-site\` |
| React / Next.js | \`-- --template nextjs\` |
| GitHub-samarbejde | \`-- --template nextjs-github\` |
| Ren HTML | \`-- --template static\` |
| Portfolio / bureau | \`-- --template agency\` |
| Blog | \`-- --template blog\` |`;

daDoc.updatedAt = new Date().toISOString();
writeFileSync(daFile, JSON.stringify(daDoc, null, 2));
console.log("  ✓ templates-da (DA)");

console.log("\n✓ Templates docs updated with screenshots, npx, and template commands");
