# Skabeloner & Boilerplates

*Updated: 2026-03-30*
*Language: da*

Tre klar-til-brug boilerplates og otte eksempelsites til at komme hurtigt i gang.

## Hurtig start

Den hurtigste måde at oprette et nyt @webhouse/cms-projekt:

```bash
# Standard (minimalt projekt)
npm create @webhouse/cms my-site

# Med en skabelon
npm create @webhouse/cms my-site -- --template nextjs

# npx genvej
npx create-@webhouse/cms my-site --template nextjs
```

## Boilerplates

Tre produktionsklare udgangspunkter med fungerende site, eksempelindhold og konfigureret `cms.config.ts`.

### Next.js Boilerplate — det anbefalede udgangspunkt

![Next.js Boilerplate](/screenshots/boilerplate-nextjs-dark.png)

[Live demo →](https://nextjs-boilerplate-1x3txthik-webhhouse.vercel.app/)

Full-stack React med App Router, Tailwind CSS v4, dark mode, `react-markdown`, SEO metadata, blog og blokbaserede sider.

```bash
npm create @webhouse/cms my-site -- --template nextjs
```

### Static Boilerplate — nul framework

Ren HTML-output. Custom `build.ts` med Marked. Intet React, ingen bundler, intet runtime-JS.

```bash
npm create @webhouse/cms my-site -- --template static
```

### Next.js GitHub Boilerplate — live-opdateringer

Alt fra Next.js-boilerplaten + GitHub storage-adapter, LiveRefresh SSE-webhooks, HMAC-signeret revalidering.

```bash
npm create @webhouse/cms my-site -- --template nextjs-github
```

---

## Eksempelsites

Produktionskvalitets-sites bygget med @webhouse/cms. Brug som skabeloner eller inspiration.

### Thinking in Pixels — Blog

![Thinking in Pixels](/screenshots/example-blog.png)

[Live demo →](https://thinking-in-pixels.fly.dev/)

Ren blog med indlæg, tags, forsidebilleder og about-side. Bygget med CMS CLI.

```bash
npm create @webhouse/cms my-site -- --template blog
```

### Sarah Mitchell — Freelancer

![Freelancer](/screenshots/example-freelancer-ghpages.png)

[Live demo →](https://cbroberg.github.io/freelancer-site/)

Freelancer-portfolio med services, prispakker, testimonials, blog og kontaktsektion.

```bash
npm create @webhouse/cms my-site -- --template freelancer
```

### Meridian Studio

![Studio](/screenshots/example-studio.png)

[Live demo →](https://cbroberg.github.io/meridian-studio-site/)

Kreativt studie med services, featured work, team og CTA-sektion.

```bash
npm create @webhouse/cms my-site -- --template studio
```

### AURA — Boutique

![Boutique](/screenshots/example-boutique.png)

[Live demo →](https://boutique.webhouse.app/)

Produkt/shop-showcase med kollektioner, editorial indhold og nyhedsbrev.

```bash
npm create @webhouse/cms my-site -- --template boutique
```

### Elena Vasquez — Portfolio

![Portfolio](/screenshots/example-portfolio.png)

Visuelt portfolio med fuldskærms billedgrid, about og kontakt.

```bash
npm create @webhouse/cms my-site -- --template portfolio
```

### Elina Voss — Portfolio Squared

![Portfolio Squared](/screenshots/example-freelancer.png)

Alternativt portfolio-layout med 2x2 billedgrid.

---

## Vælg en skabelon

| Behov | Kommando |
|-------|----------|
| Simplest setup | `npm create @webhouse/cms my-site` |
| React / Next.js | `-- --template nextjs` |
| GitHub-samarbejde | `-- --template nextjs-github` |
| Ren HTML | `-- --template static` |
| Blog | `-- --template blog` |
| Freelancer | `-- --template freelancer` |
| Studie / bureau | `-- --template studio` |
| Shop / boutique | `-- --template boutique` |
| Portfolio | `-- --template portfolio` |