# Udrulning

*Updated: 2026-03-29*
*Language: da*

Deploy din CMS-drevne side til Vercel, Fly.io, Netlify eller Docker.

## Checkliste før udrulning

- Alle dokumenter beregnet til at være live har `status: "published"`
- Ingen publicerede sider refererer til kladde-dokumenter
- Alle relationsfelter peger på eksisterende, publicerede dokumenter
- OG-billeder findes for nøglesider
- Miljøvariabler er konfigureret
- `next build` lykkes lokalt

## Vercel

```bash
npx vercel
```

## Fly.io

```toml
# fly.toml
primary_region = "arn"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
```

## Netlify

```bash
npx netlify-cli deploy --build
```

## Docker (selvhostet)

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/package.json ./
RUN npm ci --omit=dev
CMD ["npm", "start"]
```

## Verifikation efter udrulning

- Besøg `/sitemap.xml` og bekræft at alle sider er oplistet
- Tjek sidekilde for OpenGraph- og JSON-LD-tags
- Test social deling-forhåndsvisning
- Bekræft at billeder indlæses korrekt