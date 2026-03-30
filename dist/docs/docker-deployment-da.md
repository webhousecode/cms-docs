# Docker-udrulning

*Updated: 2026-03-30*
*Language: da*

Deploy @webhouse/cms med Docker — kombineret eller opdelt arkitektur, Docker Hub, GitHub Container Registry og Fly.io.

## To udrulningsmodeller

@webhouse/cms understøtter to Docker-udrulningsarkitekturer:

### Model 1: Kombineret (alt-i-én)

CMS admin + dit site i én container. Simpleste setup — ét deploy, én URL, én server.

```
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
```

**Bedst til:** Solo-projekter, prototyping, små sites.

### Model 2: Opdelt (to containere)

CMS admin på én server, dit site på en anden. Sitet modtager indholdsopdateringer via signerede webhooks.

```
┌─────────────┐    webhook     ┌─────────────┐
│  CMS Admin  │ ──────────────→│  Dit Site    │
│  :3010      │   content push │  :3000       │
│  fly.io/a   │                │  fly.io/b    │
└─────────────┘                └─────────────┘
```

**Bedst til:** Produktionssites, teams, uafhængig skalering.

---

## Container images

```bash
# Hent fra GitHub Container Registry
docker pull ghcr.io/webhousecode/cms-admin:latest

# Kør med dit sites content-mappe mounted
docker run -p 3010:3010 \
  -v $(pwd)/cms.config.ts:/app/cms.config.ts \
  -v $(pwd)/content:/app/content \
  ghcr.io/webhousecode/cms-admin:latest
```

---

## Deploy til Fly.io

### Kombineret (én app)

```bash
fly apps create my-site
fly deploy --now
```

### Opdelt (to apps)

```bash
# Deploy CMS admin
cd admin/ && fly apps create my-site-admin && fly deploy --now

# Deploy site
cd site/ && fly apps create my-site && fly deploy --now

# Konfigurér webhook: CMS admin → site
# I CMS admin → Site Settings → Revalidation
```

---

## Første opstart: auto-oprettet admin-konto

Ved første start opretter CMS admin automatisk en standard admin-konto. Sæt det initiale password via miljøvariabel:

```bash
fly secrets set ADMIN_PASSWORD=$(openssl rand -hex 16)
```

---

## Miljøvariabler

| Variabel | Påkrævet | Beskrivelse |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Første start | Initialt admin-password |
| `ANTHROPIC_API_KEY` | AI-funktioner | Claude API-nøgle |
| `REVALIDATE_SECRET` | Opdelt mode | Webhook HMAC-secret |
| `GITHUB_TOKEN` | GitHub-adapter | Fine-grained PAT |

---

## Hurtigreference

| Opgave | Kommando |
|--------|----------|
| Hent seneste image | `docker pull ghcr.io/webhousecode/cms-admin:latest` |
| Kør lokalt | `docker run -p 3010:3010 -v $(pwd):/app ghcr.io/webhousecode/cms-admin` |
| Deploy til Fly.io | `fly deploy --now` |
| Sæt secrets | `fly secrets set KEY=value` |
| Se logs | `fly logs` |