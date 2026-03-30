/**
 * Update templates docs with all screenshots.
 * Run: npx tsx scripts/update-templates-screenshots.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DIR = join(__dirname, "..", "content", "docs");

function updateDoc(slug: string, locale: "en" | "da") {
  const file = join(DIR, `${slug}.json`);
  const doc = JSON.parse(readFileSync(file, "utf-8"));

  const isDA = locale === "da";

  doc.data.content = isDA
    ? `## Hurtig start

Den hurtigste måde at oprette et nyt @webhouse/cms-projekt:

\`\`\`bash
# Standard (minimalt projekt)
npm create @webhouse/cms my-site

# Med en skabelon
npm create @webhouse/cms my-site -- --template nextjs

# npx genvej
npx create-@webhouse/cms my-site --template nextjs
\`\`\`

## Boilerplates

Tre produktionsklare udgangspunkter med fungerende site, eksempelindhold og konfigureret \`cms.config.ts\`.

### Next.js Boilerplate — det anbefalede udgangspunkt

![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)

Full-stack React med App Router, Tailwind CSS v4, dark mode, \`react-markdown\`, SEO metadata, blog og blokbaserede sider.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

### Static Boilerplate — nul framework

Ren HTML-output. Custom \`build.ts\` med Marked. Intet React, ingen bundler, intet runtime-JS.

\`\`\`bash
npm create @webhouse/cms my-site -- --template static
\`\`\`

### Next.js GitHub Boilerplate — live-opdateringer

Alt fra Next.js-boilerplaten + GitHub storage-adapter, LiveRefresh SSE-webhooks, HMAC-signeret revalidering.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs-github
\`\`\`

---

## Eksempelsites

Produktionskvalitets-sites bygget med @webhouse/cms. Brug som skabeloner eller inspiration.

### Thinking in Pixels — Blog

![Thinking in Pixels](/screenshots/example-blog.png)

Ren blog med indlæg, tags, forsidebilleder og about-side. Bygget med CMS CLI.

\`\`\`bash
npm create @webhouse/cms my-site -- --template blog
\`\`\`

### Sarah Mitchell — Freelancer

![Freelancer](/screenshots/example-freelancer-ghpages.png)

Freelancer-portfolio med services, prispakker, testimonials, blog og kontaktsektion.

\`\`\`bash
npm create @webhouse/cms my-site -- --template freelancer
\`\`\`

### Meridian Studio

![Studio](/screenshots/example-studio.png)

Kreativt studie med services, featured work, team og CTA-sektion.

\`\`\`bash
npm create @webhouse/cms my-site -- --template studio
\`\`\`

### AURA — Boutique

![Boutique](/screenshots/example-boutique.png)

Produkt/shop-showcase med kollektioner, editorial indhold og nyhedsbrev.

\`\`\`bash
npm create @webhouse/cms my-site -- --template boutique
\`\`\`

### Elena Vasquez — Portfolio

![Portfolio](/screenshots/example-portfolio.png)

Visuelt portfolio med fuldskærms billedgrid, about og kontakt.

\`\`\`bash
npm create @webhouse/cms my-site -- --template portfolio
\`\`\`

### Elina Voss — Portfolio Squared

![Portfolio Squared](/screenshots/example-freelancer.png)

Alternativt portfolio-layout med 2x2 billedgrid.

---

## Vælg en skabelon

| Behov | Kommando |
|-------|----------|
| Simplest setup | \`npm create @webhouse/cms my-site\` |
| React / Next.js | \`-- --template nextjs\` |
| GitHub-samarbejde | \`-- --template nextjs-github\` |
| Ren HTML | \`-- --template static\` |
| Blog | \`-- --template blog\` |
| Freelancer | \`-- --template freelancer\` |
| Studie / bureau | \`-- --template studio\` |
| Shop / boutique | \`-- --template boutique\` |
| Portfolio | \`-- --template portfolio\` |`

    : `## Quick Start

The fastest way to create a new @webhouse/cms project:

\`\`\`bash
# Default (minimal project)
npm create @webhouse/cms my-site

# With a template
npm create @webhouse/cms my-site -- --template nextjs

# npx shorthand
npx create-@webhouse/cms my-site --template nextjs
\`\`\`

## Boilerplates

Three production-ready starting points with a working site, example content, and configured \`cms.config.ts\`.

### Next.js Boilerplate — the recommended starting point

![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)

Full-stack React with App Router, Tailwind CSS v4, dark mode, \`react-markdown\`, SEO metadata, blog and block-based pages.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs
\`\`\`

### Static Boilerplate — zero framework

Pure HTML output. Custom \`build.ts\` with Marked. No React, no bundler, no runtime JS.

\`\`\`bash
npm create @webhouse/cms my-site -- --template static
\`\`\`

### Next.js GitHub Boilerplate — live updates

Everything from the Next.js boilerplate + GitHub storage adapter, LiveRefresh SSE webhooks, HMAC-signed revalidation.

\`\`\`bash
npm create @webhouse/cms my-site -- --template nextjs-github
\`\`\`

---

## Example Sites

Production-quality sites built with @webhouse/cms. Use as templates or inspiration.

### Thinking in Pixels — Blog

![Thinking in Pixels](/screenshots/example-blog.png)

Clean blog with posts, tags, cover images, and about page. Built with CMS CLI.

\`\`\`bash
npm create @webhouse/cms my-site -- --template blog
\`\`\`

### Sarah Mitchell — Freelancer

![Freelancer](/screenshots/example-freelancer-ghpages.png)

Freelancer portfolio with services, pricing packages, testimonials, blog, and contact section.

\`\`\`bash
npm create @webhouse/cms my-site -- --template freelancer
\`\`\`

### Meridian Studio

![Studio](/screenshots/example-studio.png)

Creative studio with services, featured work, team, and CTA section.

\`\`\`bash
npm create @webhouse/cms my-site -- --template studio
\`\`\`

### AURA — Boutique

![Boutique](/screenshots/example-boutique.png)

Product/shop showcase with collections, editorial content, and newsletter.

\`\`\`bash
npm create @webhouse/cms my-site -- --template boutique
\`\`\`

### Elena Vasquez — Portfolio

![Portfolio](/screenshots/example-portfolio.png)

Visual portfolio with fullscreen image grid, about, and contact.

\`\`\`bash
npm create @webhouse/cms my-site -- --template portfolio
\`\`\`

### Elina Voss — Portfolio Squared

![Portfolio Squared](/screenshots/example-freelancer.png)

Alternative portfolio layout with 2x2 image grid.

---

## Choosing a Template

| Need | Command |
|------|---------|
| Simplest setup | \`npm create @webhouse/cms my-site\` |
| React / Next.js | \`-- --template nextjs\` |
| GitHub collaboration | \`-- --template nextjs-github\` |
| Pure HTML | \`-- --template static\` |
| Blog | \`-- --template blog\` |
| Freelancer | \`-- --template freelancer\` |
| Studio / agency | \`-- --template studio\` |
| Shop / boutique | \`-- --template boutique\` |
| Portfolio | \`-- --template portfolio\` |`;

  doc.updatedAt = new Date().toISOString();
  writeFileSync(file, JSON.stringify(doc, null, 2));
  console.log(`  ✓ ${slug}`);
}

updateDoc("templates", "en");
updateDoc("templates-da", "da");
console.log("\n✓ Templates docs updated with all screenshots");
