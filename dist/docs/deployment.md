# Deployment

*Updated: 2026-03-29*
*Language: en*

Deploy your CMS-powered site to Vercel, Fly.io, Netlify, or Docker.

## Pre-deployment checklist

- All documents intended to be live have `status: "published"`
- No published pages reference draft-only documents
- All relation fields point to existing, published documents
- OG images exist for key pages
- Environment variables are configured
- `next build` succeeds locally

## Vercel

```bash
npx vercel
```

Configure image domains in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'your-domain.com', pathname: '/uploads/**' },
  ],
}
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

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
CMD ["node", "server.js"]
```

## Netlify

```bash
npx netlify-cli deploy --build
```

## Docker (self-hosted)

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

## Post-deployment verification

- Visit `/sitemap.xml` and confirm all pages are listed
- Check page source for OpenGraph and JSON-LD tags
- Test social sharing preview
- Confirm images load correctly
- If using revalidation, test the webhook endpoint