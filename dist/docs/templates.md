# Templates & Boilerplates

*Updated: 2026-03-30*
*Language: en*

Three ready-to-use boilerplates and eight example sites to jump-start your project.

## Quick Start

The fastest way to create a new @webhouse/cms project:

```bash
# Default (minimal project)
npm create @webhouse/cms my-site

# With a template
npm create @webhouse/cms my-site -- --template nextjs

# npx shorthand
npx create-@webhouse/cms my-site --template nextjs
```

## Boilerplates

Three production-ready starting points with a working site, example content, and configured `cms.config.ts`.

### Next.js Boilerplate — the recommended starting point

![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)

[Live demo →](https://nextjs-boilerplate-1x3txthik-webhhouse.vercel.app/)

Full-stack React with App Router, Tailwind CSS v4, dark mode, `react-markdown`, SEO metadata, blog and block-based pages.

```bash
npm create @webhouse/cms my-site -- --template nextjs
```

### Static Boilerplate — zero framework

Pure HTML output. Custom `build.ts` with Marked. No React, no bundler, no runtime JS.

```bash
npm create @webhouse/cms my-site -- --template static
```

### Next.js GitHub Boilerplate — live updates

Everything from the Next.js boilerplate + GitHub storage adapter, LiveRefresh SSE webhooks, HMAC-signed revalidation.

```bash
npm create @webhouse/cms my-site -- --template nextjs-github
```

---

## Example Sites

Production-quality sites built with @webhouse/cms. Use as templates or inspiration.

### Thinking in Pixels — Blog

![Thinking in Pixels](/screenshots/example-blog.png)

[Live demo →](https://thinking-in-pixels.fly.dev/)

Clean blog with posts, tags, cover images, and about page. Built with CMS CLI.

```bash
npm create @webhouse/cms my-site -- --template blog
```

### Sarah Mitchell — Freelancer

![Freelancer](/screenshots/example-freelancer-ghpages.png)

[Live demo →](https://cbroberg.github.io/freelancer-site/)

Freelancer portfolio with services, pricing packages, testimonials, blog, and contact section.

```bash
npm create @webhouse/cms my-site -- --template freelancer
```

### Meridian Studio

![Studio](/screenshots/example-studio.png)

[Live demo →](https://cbroberg.github.io/meridian-studio-site/)

Creative studio with services, featured work, team, and CTA section.

```bash
npm create @webhouse/cms my-site -- --template studio
```

### AURA — Boutique

![Boutique](/screenshots/example-boutique.png)

[Live demo →](https://boutique.webhouse.app/)

Product/shop showcase with collections, editorial content, and newsletter.

```bash
npm create @webhouse/cms my-site -- --template boutique
```

### Elena Vasquez — Portfolio

![Portfolio](/screenshots/example-portfolio.png)

Visual portfolio with fullscreen image grid, about, and contact.

```bash
npm create @webhouse/cms my-site -- --template portfolio
```

### Elina Voss — Portfolio Squared

![Portfolio Squared](/screenshots/example-freelancer.png)

Alternative portfolio layout with 2x2 image grid.

---

## Choosing a Template

| Need | Command |
|------|---------|
| Simplest setup | `npm create @webhouse/cms my-site` |
| React / Next.js | `-- --template nextjs` |
| GitHub collaboration | `-- --template nextjs-github` |
| Pure HTML | `-- --template static` |
| Blog | `-- --template blog` |
| Freelancer | `-- --template freelancer` |
| Studio / agency | `-- --template studio` |
| Shop / boutique | `-- --template boutique` |
| Portfolio | `-- --template portfolio` |