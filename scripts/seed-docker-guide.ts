/**
 * Seed Docker deployment guide (EN + DA).
 * Run: npx tsx scripts/seed-docker-guide.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");

function writeDoc(slug: string, locale: string, data: Record<string, unknown>) {
  const json = {
    id: randomUUID(), slug, status: "published", locale,
    translationGroup: randomUUID(),
    data: { ...data, _seo: { metaTitle: `${data.title} — webhouse.app Docs`, metaDescription: data.description } },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(DIR, `${slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ ${slug}`);
}

// ═══════════════════════════════════════════════════
// DOCKER GUIDE (EN)
// ═══════════════════════════════════════════════════

writeDoc("docker-deployment", "en", {
  title: "Docker Deployment",
  description: "Deploy @webhouse/cms with Docker — combined or split architecture, Docker Hub, GitHub Container Registry, and Fly.io.",
  category: "deployment",
  order: 1,
  content: `## Two deployment models

@webhouse/cms supports two Docker deployment architectures depending on your needs:

### Model 1: Combined (all-in-one)

CMS admin + your site in a single container. Simplest setup — one deploy, one URL, one server.

\`\`\`
┌─────────────────────────────────┐
│         Docker Container         │
│                                  │
│  ┌──────────┐  ┌──────────────┐ │
│  │ CMS Admin│  │  Your Site   │ │
│  │ :3010    │  │  :3000       │ │
│  └──────────┘  └──────────────┘ │
│         │              │         │
│         └──── /content ──────┘  │
│         (shared filesystem)     │
└─────────────────────────────────┘
\`\`\`

**Best for:** Solo projects, prototyping, small sites, agencies managing client sites.

### Model 2: Split (two containers)

CMS admin on one server, your site on another. The site receives content updates via signed webhooks.

\`\`\`
┌─────────────┐    webhook     ┌─────────────┐
│  CMS Admin  │ ──────────────→│  Your Site   │
│  :3010      │   content push │  :3000       │
│  fly.io/a   │                │  fly.io/b    │
└─────────────┘                └─────────────┘
\`\`\`

**Best for:** Production sites, teams, when you want independent scaling and deploys.

---

## Container images

### Docker Hub

\`\`\`bash
# CMS Admin
docker pull ghcr.io/webhousecode/cms-admin:latest

# Run with your site's content directory mounted
docker run -p 3010:3010 \\
  -v $(pwd)/cms.config.ts:/app/cms.config.ts \\
  -v $(pwd)/content:/app/content \\
  ghcr.io/webhousecode/cms-admin:latest
\`\`\`

### GitHub Container Registry

\`\`\`bash
docker pull ghcr.io/webhousecode/cms-admin:latest
docker pull ghcr.io/webhousecode/cms-admin:0.2.13
\`\`\`

---

## Model 1: Combined Dockerfile

A single Dockerfile that runs both CMS admin and your site:

\`\`\`dockerfile
# Combined: CMS Admin + Next.js site
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# ── Build CMS packages ──
FROM base AS cms-builder
WORKDIR /app/cms
COPY cms/package.json cms/pnpm-lock.yaml cms/pnpm-workspace.yaml ./
COPY cms/packages/cms/package.json ./packages/cms/
COPY cms/packages/cms-admin/package.json ./packages/cms-admin/
COPY cms/packages/cms-ai/package.json ./packages/cms-ai/
COPY cms/packages/cms-cli/package.json ./packages/cms-cli/
RUN pnpm install --frozen-lockfile
COPY cms/ .
RUN pnpm --filter @webhouse/cms build
RUN pnpm --filter @webhouse/cms-admin build

# ── Build your site ──
FROM base AS site-builder
WORKDIR /app/site
COPY site/package.json site/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY site/ .
RUN pnpm build

# ── Runner ──
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# CMS Admin
COPY --from=cms-builder /app/cms/packages/cms-admin/.next ./cms-admin/.next
COPY --from=cms-builder /app/cms/packages/cms-admin/package.json ./cms-admin/
COPY --from=cms-builder /app/cms/node_modules ./cms/node_modules

# Your site
COPY --from=site-builder /app/site/.next ./site/.next
COPY --from=site-builder /app/site/node_modules ./site/node_modules
COPY --from=site-builder /app/site/package.json ./site/

# Shared content
COPY site/content ./content
COPY site/cms.config.ts ./cms.config.ts

# Start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 3000 3010
CMD ["/start.sh"]
\`\`\`

The start script runs both processes:

\`\`\`bash
#!/bin/sh
# start.sh — run CMS admin + site in parallel
cd /app/cms-admin && node .next/standalone/server.js &
cd /app/site && node .next/standalone/server.js &
wait
\`\`\`

---

## Model 2: Split Dockerfiles

### CMS Admin container

\`\`\`dockerfile
# Dockerfile.admin
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY content ./content
COPY cms.config.ts ./
ENV PORT=3010
CMD ["node", "server.js"]
\`\`\`

### Site container

\`\`\`dockerfile
# Dockerfile.site
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
ENV PORT=3000
CMD ["node", "server.js"]
\`\`\`

The site includes a revalidation endpoint that receives content pushes from CMS admin:

\`\`\`typescript
// app/api/revalidate/route.ts
// Receives signed webhook with full document JSON
// Writes document to disk, calls revalidatePath()
// See the Next.js GitHub Boilerplate for the complete implementation
\`\`\`

---

## Deploy to Fly.io

### Combined (one app)

\`\`\`toml
# fly.toml
app = "my-site"
primary_region = "arn"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true

[[vm]]
  memory = "512mb"
  cpu_kind = "shared"
  cpus = 1
\`\`\`

\`\`\`bash
fly apps create my-site
fly deploy --now
\`\`\`

### Split (two apps)

\`\`\`bash
# Deploy CMS admin
cd admin/
fly apps create my-site-admin
fly deploy --now

# Deploy site
cd site/
fly apps create my-site
fly deploy --now

# Configure webhook: CMS admin → site
# In CMS admin → Site Settings → Revalidation:
#   URL: https://my-site.fly.dev/api/revalidate
#   Secret: (generate with openssl rand -hex 32)
\`\`\`

---

## First boot: auto-created admin account

On first launch, CMS admin auto-creates a default admin account:

\`\`\`
Email: admin@webhouse.app
Password: (set via ADMIN_PASSWORD env var, or generated and printed to logs)
\`\`\`

Set the initial password via environment variable:

\`\`\`bash
fly secrets set ADMIN_PASSWORD=$(openssl rand -hex 16)
\`\`\`

After first login, change the password in Settings → Profile. When RBAC ships, you can add team members with different roles.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| \`ADMIN_PASSWORD\` | First boot | Initial admin password |
| \`ANTHROPIC_API_KEY\` | For AI features | Claude API key |
| \`REVALIDATE_SECRET\` | Split mode | Webhook HMAC secret |
| \`GITHUB_TOKEN\` | GitHub adapter | Fine-grained PAT |
| \`UPLOAD_BASE\` | CDN uploads | Upload URL prefix |

\`\`\`bash
# Set secrets on Fly.io
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly secrets set REVALIDATE_SECRET=$(openssl rand -hex 32)
\`\`\`

---

## Quick reference

| Task | Command |
|------|---------|
| Pull latest image | \`docker pull ghcr.io/webhousecode/cms-admin:latest\` |
| Run locally | \`docker run -p 3010:3010 -v $(pwd):/app ghcr.io/webhousecode/cms-admin\` |
| Deploy combined to Fly.io | \`fly deploy --now\` |
| Deploy split (admin) | \`cd admin && fly deploy\` |
| Deploy split (site) | \`cd site && fly deploy\` |
| Set secrets | \`fly secrets set KEY=value\` |
| View logs | \`fly logs\` |
| SSH into container | \`fly ssh console\` |`,
});

// ═══════════════════════════════════════════════════
// DOCKER GUIDE (DA)
// ═══════════════════════════════════════════════════

writeDoc("docker-deployment-da", "da", {
  title: "Docker-udrulning",
  description: "Deploy @webhouse/cms med Docker — kombineret eller opdelt arkitektur, Docker Hub, GitHub Container Registry og Fly.io.",
  category: "deployment",
  order: 1,
  content: `## To udrulningsmodeller

@webhouse/cms understøtter to Docker-udrulningsarkitekturer:

### Model 1: Kombineret (alt-i-én)

CMS admin + dit site i én container. Simpleste setup — ét deploy, én URL, én server.

\`\`\`
┌─────────────────────────────────┐
│         Docker Container         │
│                                  │
│  ┌──────────┐  ┌──────────────┐ │
│  │ CMS Admin│  │  Dit Site    │ │
│  │ :3010    │  │  :3000       │ │
│  └──────────┘  └──────────────┘ │
│         │              │         │
│         └──── /content ──────┘  │
│         (delt filsystem)        │
└─────────────────────────────────┘
\`\`\`

**Bedst til:** Solo-projekter, prototyping, små sites.

### Model 2: Opdelt (to containere)

CMS admin på én server, dit site på en anden. Sitet modtager indholdsopdateringer via signerede webhooks.

\`\`\`
┌─────────────┐    webhook     ┌─────────────┐
│  CMS Admin  │ ──────────────→│  Dit Site    │
│  :3010      │   content push │  :3000       │
│  fly.io/a   │                │  fly.io/b    │
└─────────────┘                └─────────────┘
\`\`\`

**Bedst til:** Produktionssites, teams, uafhængig skalering.

---

## Container images

\`\`\`bash
# Hent fra GitHub Container Registry
docker pull ghcr.io/webhousecode/cms-admin:latest

# Kør med dit sites content-mappe mounted
docker run -p 3010:3010 \\
  -v $(pwd)/cms.config.ts:/app/cms.config.ts \\
  -v $(pwd)/content:/app/content \\
  ghcr.io/webhousecode/cms-admin:latest
\`\`\`

---

## Deploy til Fly.io

### Kombineret (én app)

\`\`\`bash
fly apps create my-site
fly deploy --now
\`\`\`

### Opdelt (to apps)

\`\`\`bash
# Deploy CMS admin
cd admin/ && fly apps create my-site-admin && fly deploy --now

# Deploy site
cd site/ && fly apps create my-site && fly deploy --now

# Konfigurér webhook: CMS admin → site
# I CMS admin → Site Settings → Revalidation
\`\`\`

---

## Første opstart: auto-oprettet admin-konto

Ved første start opretter CMS admin automatisk en standard admin-konto. Sæt det initiale password via miljøvariabel:

\`\`\`bash
fly secrets set ADMIN_PASSWORD=$(openssl rand -hex 16)
\`\`\`

---

## Miljøvariabler

| Variabel | Påkrævet | Beskrivelse |
|----------|----------|-------------|
| \`ADMIN_PASSWORD\` | Første start | Initialt admin-password |
| \`ANTHROPIC_API_KEY\` | AI-funktioner | Claude API-nøgle |
| \`REVALIDATE_SECRET\` | Opdelt mode | Webhook HMAC-secret |
| \`GITHUB_TOKEN\` | GitHub-adapter | Fine-grained PAT |

---

## Hurtigreference

| Opgave | Kommando |
|--------|----------|
| Hent seneste image | \`docker pull ghcr.io/webhousecode/cms-admin:latest\` |
| Kør lokalt | \`docker run -p 3010:3010 -v $(pwd):/app ghcr.io/webhousecode/cms-admin\` |
| Deploy til Fly.io | \`fly deploy --now\` |
| Sæt secrets | \`fly secrets set KEY=value\` |
| Se logs | \`fly logs\` |`,
});

console.log("\n✓ Docker deployment guide created (EN + DA)");
