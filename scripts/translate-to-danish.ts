/**
 * Translate all DA docs content to proper Danish.
 * Run: npx tsx scripts/translate-to-danish.ts
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const DIR = join(__dirname, "..", "content", "docs");

const TRANSLATIONS: Record<string, string> = {

"introduction-da": `## Hvad er @webhouse/cms?

\`@webhouse/cms\` er en **filbaseret, AI-native CMS-motor** til TypeScript-projekter. Du definerer collections og felter i en \`cms.config.ts\`-fil, og CMS'et gemmer indhold som flade JSON-filer i en \`content/\`-mappe — én fil pr. dokument, organiseret efter collection.

Det giver dig:

- **REST API-server** — Hono-baseret API til læsning og skrivning af indhold
- **Statisk site-builder** — 9-faset build-pipeline der genererer HTML, sitemap, RSS, robots.txt og AI-discovery-filer
- **AI-indholdsgenerering** — indbyggede agenter til skrivning, SEO-optimering, oversættelse og mere
- **Visuel admin-brugerflade** — fuld-udstyret editor på [webhouse.app](https://webhouse.app) med rich text, blokke, medier og planlægning
- **MCP-integration** — Model Context Protocol-server til AI-platformes adgang til dit indhold

## Hvem er det til?

@webhouse/cms er designet til udviklere der bygger indholdsdrevne websites med Next.js. Det fungerer særligt godt når:

- Du vil have **filbaseret indhold** der lever i dit Git-repository
- Du har brug for **AI-drevne indholdsworkflows** (generering, oversættelse, SEO-optimering)
- Du foretrækker **TypeScript-first** konfiguration frem for YAML eller markdown frontmatter
- Du vil have en **visuel admin-brugerflade** uden kompleksiteten af et headless CMS

## Arkitektur

\`\`\`
cms.config.ts          → Collection- og feltdefinitioner
content/               → JSON-dokumenter (én pr. fil)
packages/cms           → Kernemotor (@webhouse/cms)
packages/cms-admin     → Next.js admin-brugerflade (@webhouse/cms-admin)
packages/cms-ai        → AI-agenter (@webhouse/cms-ai)
packages/cms-cli       → CLI-værktøjer (@webhouse/cms-cli)
packages/cms-mcp-*     → MCP-servere til AI-platformsadgang
\`\`\`

Kernepakken (\`@webhouse/cms\`) er framework-agnostisk — den læser og skriver JSON-filer. Admin-brugerfladen (\`@webhouse/cms-admin\`) er en selvstændig Next.js-applikation der forbinder til kernemotor.

## Næste skridt

- [Hurtig start](/docs/quick-start-da) — opret og kør dit første projekt på under 5 minutter
- [Konfigurationsreference](/docs/config-reference-da) — lær hvordan du definerer collections og felter
- [Felttyper](/docs/field-types-da) — udforsk alle 22 felttyper`,

"quick-start-da": `## Opret et nyt projekt

\`\`\`bash
# Opret et nyt projekt
npm create @webhouse/cms my-site

# Eller direkte med CLI'en
npx @webhouse/cms-cli init my-site
\`\`\`

Dette genererer:

\`\`\`
my-site/
  cms.config.ts          # Collection- og feltdefinitioner
  package.json           # Afhængigheder
  .env                   # AI-udbyders nøgler
  content/
    posts/
      hello-world.json   # Eksempeldokument
\`\`\`

## Installér og kør

\`\`\`bash
cd my-site
npm install
npx cms dev       # Start udviklingsserver + admin-brugerflade
\`\`\`

Udviklingsserveren starter på \`http://localhost:3000\` og admin-brugerfladen åbner automatisk.

## Opret indhold

Åbn admin-brugerfladen og opret dit første dokument. Det gemmes som en JSON-fil i \`content/posts/\`.

Hvert dokument følger denne struktur:

\`\`\`json
{
  "slug": "mit-forste-indlaeg",
  "status": "published",
  "data": {
    "title": "Mit første indlæg",
    "content": "Hej, verden!"
  },
  "id": "unikt-id",
  "_fieldMeta": {}
}
\`\`\`

## Byg til produktion

\`\`\`bash
npx cms build     # Byg statisk site
npx cms serve     # Forhåndsvis bygget lokalt
\`\`\`

Build-pipelinen genererer:
- HTML-sider for alle publicerede dokumenter
- \`sitemap.xml\` til søgemaskiner
- \`robots.txt\` med AI-crawler-regler
- \`llms.txt\` og \`llms-full.txt\` til AI-discovery
- \`feed.xml\` RSS-feed
- Per-side \`.md\`-filer til AI-forbrug

## Næste skridt

- [Konfigurationsreference](/docs/config-reference-da) — definér dine egne collections
- [Felttyper](/docs/field-types-da) — udforsk alle tilgængelige felttyper
- [Lagringsadaptere](/docs/storage-adapters-da) — vælg hvor indhold gemmes
- [Udrulning](/docs/deployment-da) — deploy til Vercel, Fly.io eller Netlify`,

"config-reference-da": `## cms.config.ts

Konfigurationsfilen bruger hjælpefunktioner for typesikkerhed:

\`\`\`typescript
import { defineConfig, defineCollection, defineBlock, defineField } from '@webhouse/cms';

export default defineConfig({
  collections: [ /* ... */ ],
  blocks: [ /* ... */ ],
  defaultLocale: 'en',
  locales: ['en', 'da'],
  autolinks: [ /* ... */ ],
  storage: { /* ... */ },       // PÅKRÆVET
  build: { outDir: 'dist', baseUrl: '/' },
  api: { port: 3000 },
});
\`\`\`

> **Vigtigt:** Du SKAL altid angive \`storage\`-adapteren. Hvis den udelades, bruges SQLite som standard — ikke filsystemet. Dette er den mest almindelige konfigurationsfejl.

## Collection-konfiguration

\`\`\`typescript
defineCollection({
  name: 'posts',                 // Påkrævet: unik identifikator
  label: 'Blogindlæg',          // Valgfri: visningsnavn i admin
  slug: 'posts',                 // Valgfri: URL-slug override
  urlPrefix: '/blog',            // Valgfri: URL-præfiks for sider
  sourceLocale: 'en',            // Valgfri: primært forfattersprog
  locales: ['en', 'da'],         // Valgfri: oversættelige sprog
  translatable: true,            // Valgfri: aktivér oversættelsesstøtte
  fields: [ /* ... */ ],         // Påkrævet: array af FieldConfig
  hooks: {                       // Valgfri: livscyklus-hooks
    beforeCreate: 'sti/til/hook.js',
    afterCreate: 'sti/til/hook.js',
  },
})
\`\`\`

## Build-konfiguration

\`\`\`typescript
build: {
  outDir: 'dist',               // Output-mappe
  baseUrl: 'https://eksempel.dk', // Site-URL til absolutte links
  siteTitle: 'Mit Site',
  siteDescription: 'Et fantastisk site',
  robots: {
    strategy: 'maximum',         // 'maximum' | 'balanced' | 'restrictive' | 'custom'
  },
  rss: {
    title: 'Mit Site RSS',
    collections: ['posts'],      // Filtrer til specifikke collections
    maxItems: 50,
  },
}
\`\`\`

## Lagringskonfiguration

\`\`\`typescript
// Filsystem (anbefalet til statiske sites)
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}

// GitHub (API-baseret, hver redigering er et commit)
storage: {
  adapter: 'github',
  github: {
    owner: 'din-org',
    repo: 'dit-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}

// SQLite (lokal database)
storage: {
  adapter: 'sqlite',
  sqlite: { path: './data/cms.db' },
}
\`\`\``,

"storage-adapters-da": `## Valg af lagringsadapter

@webhouse/cms understøtter fire lagringsbackends. Hver har forskellige afvejninger mht. ydeevne, samarbejde og udrulning.

> **Kritisk:** Du SKAL altid angive \`storage\` i \`cms.config.ts\`. Hvis den udelades, bruges SQLite som standard — ikke filsystemet.

## Filsystem (anbefalet)

Gemmer dokumenter som JSON-filer i \`content/<collection>/<slug>.json\`. Bedst til:
- Statiske sites med \`build.ts\`
- Git-baseret versionskontrol
- Lokal udvikling

\`\`\`typescript
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}
\`\`\`

## GitHub

Læser og skriver filer via GitHub API. Hver oprettelse/opdatering/sletning er et Git-commit. Bedst til:
- Samarbejdsredigering uden lokal Git
- PR-baserede indholdsgennemgangsworkflows
- Sites hostet på GitHub Pages

\`\`\`typescript
storage: {
  adapter: 'github',
  github: {
    owner: 'din-org',
    repo: 'dit-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}
\`\`\`

## SQLite

Lokal SQLite-database. Bedst til:
- API-tunge use cases
- Når du ikke har brug for filbaseret indhold
- Prototyping

## Supabase

Cloud-hostet PostgreSQL med Row Level Security. Bedst til:
- Flerbruger-miljøer
- Cloud-native udrulninger
- Når du har brug for realtids-abonnementer`,

"blocks-da": `## Hvad er blokke?

Blokke er genanvendelige indholdssektioner som redaktører kan tilføje, fjerne og omorganisere. Hver bloktype har sine egne felter og renderes forskelligt på frontend.

## Definition af blokke

\`\`\`typescript
import { defineConfig, defineBlock, defineCollection } from '@webhouse/cms';

export default defineConfig({
  blocks: [
    defineBlock({
      name: 'hero',
      label: 'Hero-sektion',
      fields: [
        { name: 'tagline', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'image' },
        { name: 'ctas', type: 'array', fields: [
          { name: 'label', type: 'text' },
          { name: 'href', type: 'text' },
        ]},
      ],
    }),
  ],
  collections: [
    defineCollection({
      name: 'pages',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'sections', type: 'blocks', blocks: ['hero', 'features'] },
      ],
    }),
  ],
});
\`\`\`

## Sådan gemmes blokke

Hver blok er et objekt med et \`_block\`-diskriminatorfelt:

\`\`\`json
{
  "sections": [
    {
      "_block": "hero",
      "tagline": "Byg hurtigere med AI",
      "description": "CMS'et der skriver indhold for dig."
    }
  ]
}
\`\`\`

## Rendering af blokke i Next.js

\`\`\`typescript
function BlockRenderer({ block }: { block: any }) {
  switch (block._block) {
    case 'hero':
      return (
        <section>
          <h1>{block.tagline}</h1>
          <p>{block.description}</p>
        </section>
      );
    default:
      return null;
  }
}
\`\`\``,

"nextjs-patterns-da": `## Læsning af indhold

Alt indhold læses server-side med \`fs\`:

\`\`\`typescript
// lib/content.ts
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT = join(process.cwd(), 'content');

export function getCollection(name: string) {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(readFileSync(join(dir, f), 'utf-8')))
    .filter(d => d.status === 'published');
}

export function getDocument(collection: string, slug: string) {
  const file = join(CONTENT, collection, \`\${slug}.json\`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf-8'));
}
\`\`\`

## Blog-listeside

\`\`\`typescript
// app/blog/page.tsx
export default function BlogPage() {
  const posts = getCollection('posts')
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));

  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <a key={post.slug} href={\`/blog/\${post.slug}\`}>
          <h2>{post.data.title}</h2>
          <p>{post.data.excerpt}</p>
        </a>
      ))}
    </div>
  );
}
\`\`\`

## Vigtige mønstre

1. **Kun Server Components** — indhold læses ved build/request-tid
2. **\`generateStaticParams\`** — prægenerer alle sider ved build-tid
3. **\`generateMetadata\`** — SEO-metadata fra CMS \`_seo\`-felter
4. **Filtrer altid på published** — \`status === 'published'\` for at skippe kladder
5. **Hardkod aldrig indhold** — alt fra CMS JSON-filer`,

"i18n-da": `## Konfigurér sprog

\`\`\`typescript
export default defineConfig({
  defaultLocale: 'en',
  locales: ['en', 'da'],
  collections: [
    defineCollection({
      name: 'posts',
      sourceLocale: 'en',
      locales: ['en', 'da'],
      translatable: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richtext' },
      ],
    }),
  ],
});
\`\`\`

## Sådan fungerer oversættelser

Hver oversættelse er et **separat dokument** forbundet via \`translationGroup\` — et fælles UUID der forbinder alle sprogversioner:

\`\`\`json
// content/posts/hello-world.json (engelsk)
{
  "slug": "hello-world",
  "locale": "en",
  "translationGroup": "abc-123",
  "data": { "title": "Hello, World!" }
}

// content/posts/hello-world-da.json (dansk)
{
  "slug": "hello-world-da",
  "locale": "da",
  "translationGroup": "abc-123",
  "data": { "title": "Hej, Verden!" }
}
\`\`\`

## Oversættelsesworkflow i admin

I admin-brugerfladen:
1. Åbn et dokument — se sprogbadget der viser det aktuelle sprog
2. Klik **"+ Tilføj oversættelse"** for at oprette en ny sprogversion
3. AI-oversætteren oversætter automatisk alle felter
4. Gennemgå og publicér oversættelsen

## AI-oversættelse

\`\`\`typescript
import { createAi } from '@webhouse/cms-ai';

const ai = await createAi();
const result = await ai.content.translate(
  sourceDoc.data,
  'da',
  { collection: collectionConfig },
);
\`\`\`

## Sprogrutning i Next.js

Brug et \`[locale]\`-rutesegment med middleware til sprogdetektering.`,

"seo-da": `## SEO-felter

Hvert dokument kan have et \`_seo\`-felt i sine data:

\`\`\`json
{
  "data": {
    "title": "Mit indlæg",
    "_seo": {
      "metaTitle": "Mit indlæg — Bedste guide (30-60 tegn)",
      "metaDescription": "En omfattende guide til... (120-160 tegn)",
      "keywords": ["nøgleord1", "nøgleord2"],
      "ogImage": "/uploads/og-billede.jpg"
    }
  }
}
\`\`\`

## Synlighedsscoring

CMS-admin inkluderer et Synlighedsdashboard der scorer hvert dokument på to akser:

**SEO-score** (13 regler) — metatitel-længde, metabeskrivelse, nøgleord, overskriftsstruktur, indholdslængde, interne links, billed-alt-tekst og mere.

**GEO-score** (8 regler) — optimerer indhold til AI-platformcitering:
1. Svar-først-struktur
2. Spørgsmålsformat-overskrifter
3. Statistik og datapunkter
4. Eksterne citationer
5. Indholdsfriskhed (opdateret inden for 90 dage)
6. JSON-LD strukturerede data
7. Navngiven forfatter
8. Indholdsdybde (800+ ord)

## Build-output

CMS build-pipelinen genererer automatisk:
- \`sitemap.xml\` — alle publicerede sider med hreflang
- \`robots.txt\` — AI-bevidste crawler-regler (4 strategier)
- \`llms.txt\` — AI-venligt siteindeks
- \`llms-full.txt\` — komplet markdown-eksport
- \`feed.xml\` — RSS 2.0-feed
- Per-side \`.md\`-filer til AI-forbrug`,

"deployment-da": `## Checkliste før udrulning

- Alle dokumenter beregnet til at være live har \`status: "published"\`
- Ingen publicerede sider refererer til kladde-dokumenter
- Alle relationsfelter peger på eksisterende, publicerede dokumenter
- OG-billeder findes for nøglesider
- Miljøvariabler er konfigureret
- \`next build\` lykkes lokalt

## Vercel

\`\`\`bash
npx vercel
\`\`\`

## Fly.io

\`\`\`toml
# fly.toml
primary_region = "arn"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
\`\`\`

## Netlify

\`\`\`bash
npx netlify-cli deploy --build
\`\`\`

## Docker (selvhostet)

\`\`\`dockerfile
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
\`\`\`

## Verifikation efter udrulning

- Besøg \`/sitemap.xml\` og bekræft at alle sider er oplistet
- Tjek sidekilde for OpenGraph- og JSON-LD-tags
- Test social deling-forhåndsvisning
- Bekræft at billeder indlæses korrekt`,

"cli-reference-da": `## Kommandoer

Alle kommandoer køres via \`npx cms <kommando>\` (leveret af \`@webhouse/cms-cli\`).

| Kommando | Beskrivelse |
|----------|-------------|
| \`cms init [navn]\` | Opret et nyt CMS-projekt |
| \`cms dev [--port 3000]\` | Start udviklingsserver med hot reload |
| \`cms build [--outDir dist]\` | Byg statisk site |
| \`cms serve [--port 5000] [--dir dist]\` | Servér det byggede statiske site |
| \`cms ai generate <collection> "<prompt>"\` | Generér et nyt dokument med AI |
| \`cms ai rewrite <collection>/<slug> "<instruktion>"\` | Omskriv eksisterende dokument |
| \`cms ai seo [--status published]\` | Kør SEO-optimering på alle dokumenter |
| \`cms mcp keygen [--label "nøgle"] [--scopes "read,write"]\` | Generér MCP API-nøgle |

## AI-kommandoer

AI-kommandoer kræver \`@webhouse/cms-ai\` og en \`ANTHROPIC_API_KEY\` eller \`OPENAI_API_KEY\` i \`.env\`.

\`\`\`bash
# Generér et blogindlæg
npx cms ai generate posts "Skriv en guide til TypeScript generics"

# Omskriv med instruktioner
npx cms ai rewrite posts/hello-world "Gør det mere kortfattet og tilføj kodeeksempler"

# SEO-optimering på tværs af alt publiceret indhold
npx cms ai seo
\`\`\``,

"content-structure-da": `## Dokumentformat

Hvert dokument er en JSON-fil i \`content/{collection}/{slug}.json\`:

\`\`\`json
{
  "id": "unikt-uuid",
  "slug": "mit-dokument",
  "status": "published",
  "locale": "da",
  "translationGroup": "fælles-uuid",
  "data": {
    "title": "Mit dokument",
    "content": "Markdown-indhold her..."
  },
  "_fieldMeta": {},
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-03-29T14:00:00Z"
}
\`\`\`

## Vigtige regler

1. **Slug skal matche filnavn** — \`hej-verden.json\` skal have \`"slug": "hej-verden"\`
2. **\`_fieldMeta\` er påkrævet** — kan være tomt \`{}\`, sporer AI-låsestatus
3. **Filtrer altid på status** — spring kladder over med \`status === "published"\`
4. **\`data\` indeholder alle indholdsfelter** — alt defineret i din collections \`fields\`-array
5. **\`_seo\` er et reserveret felt** — bruges til SEO-metadata

## Mappestruktur

\`\`\`
content/
  posts/
    hello-world.json
    hello-world-da.json    # Dansk oversættelse
    typescript-guide.json
  pages/
    home.json
    about.json
  global/
    global.json            # Singleton til siteindstillinger
\`\`\`

## Status-livscyklus

| Status | Betydning |
|--------|-----------|
| \`draft\` | Under udarbejdelse, ikke synlig på sitet |
| \`published\` | Live på sitet |
| \`archived\` | Fjernet fra sitet men gemt til reference |
| \`expired\` | Auto-sat når \`unpublishAt\`-datoen passeres |

## Planlagt publicering

Dokumenter understøtter automatisk publicering/afpublicering via datofelter:

\`\`\`json
{
  "status": "draft",
  "publishAt": "2026-04-01T09:00:00Z",
  "unpublishAt": "2026-04-30T23:59:59Z"
}
\`\`\``,

"ai-agents-da": `## Hvad er AI-agenter?

AI-agenter genererer og optimerer indhold baseret på din brandvoice og konfiguration. Hver agent har en specifik rolle:

| Agent | Rolle |
|-------|-------|
| **Content Writer** | Opretter nye blogindlæg, sider, beskrivelser |
| **SEO Optimizer** | Forbedrer metafelter, nøgleord, overskriftsstruktur |
| **GEO Optimizer** | Omstrukturerer indhold til AI-citering (svar-først, statistik, kilder) |
| **Translator** | Oversætter indhold til konfigurerede sprog |
| **Content Refresher** | Opdaterer forældet indhold med aktuel information |

## Sådan fungerer agenter

1. Du konfigurerer agenter i admin (Indstillinger → Agenter)
2. Hver agent har en systemprompt der definerer dens adfærd
3. Agenter producerer **kladder** der lander i **Kurateringskøen**
4. Du gennemgår, godkender eller afviser hver kladde
5. Godkendt indhold publiceres automatisk

## AI-lås

Felter du har redigeret i hånden er **låst** — agenter overskriver dem ikke. Dette sikrer at menneskelige redigeringer bevares selv når agenter kører masseoperationer.

## Brandvoice

Konfigurér en brandvoice i Indstillinger for at sikre at alt AI-genereret indhold matcher din tone:

- **Tone** — professionel, afslappet, venlig, autoritativ
- **Målgruppe** — udviklere, marketingfolk, almen offentlighed
- **Retningslinjer** — specifikke instruktioner som "Brug altid aktiv stemme"`,

"media-da": `## Mediebibliotek

CMS-admin inkluderer et fuldt mediebibliotek med:
- **Upload** — træk og slip eller filvælger
- **Organisering** — mapper, tags, søgning
- **Behandling** — automatisk WebP-konvertering, responsive varianter
- **AI-analyse** — auto-genererede billedtekster, alt-tekst og tags

## Billedbehandling

Uploadede billeder bliver automatisk:
1. Konverteret til WebP for optimal filstørrelse
2. Skaleret til responsive varianter (f.eks. 400w, 800w, 1200w)
3. EXIF-data ekstraheret (kamera, objektiv, GPS osv.)
4. AI-analyseret for billedtekster og alt-tekst

## AI-billedanalyse

Når du uploader et billede, analyserer AI det og genererer:
- **Billedtekst** — beskrivende tekst til kontekst
- **Alt-tekst** — tilgænglighed for skærmlæsere og SEO
- **Tags** — auto-genererede tags til organisering

## Brug af billeder i indhold

### Billedfelt
\`\`\`typescript
{ name: 'heroImage', type: 'image' }
\`\`\`

### Billedgalleri
\`\`\`typescript
{ name: 'photos', type: 'image-gallery' }
\`\`\`

Gallerværdier skal være \`{ url, alt }[]\`-objekter:
\`\`\`json
"photos": [
  { "url": "/uploads/foto-1.webp", "alt": "Beskrivelse" },
  { "url": "/uploads/foto-2.webp", "alt": "Et andet foto" }
]
\`\`\``,

"api-reference-da": `## ContentService

CMS-kernemotor eksponerer en \`ContentService\` til programmatisk indholdsadgang:

\`\`\`typescript
import { createCms } from '@webhouse/cms';
import config from './cms.config';

const cms = await createCms(config);

// Opret
const doc = await cms.content.create('posts', {
  slug: 'nyt-indlaeg',
  status: 'draft',
  data: { title: 'Nyt indlæg', content: '...' },
});

// Læs
const post = await cms.content.findBySlug('posts', 'nyt-indlaeg');
const alle = await cms.content.findMany('posts', { status: 'published' });

// Opdatér
await cms.content.update('posts', doc.id, {
  data: { title: 'Opdateret titel' },
});

// Slet
await cms.content.delete('posts', doc.id);
\`\`\`

## REST API

| Metode | Endpoint | Beskrivelse |
|--------|----------|-------------|
| GET | \`/api/cms/{collection}\` | List dokumenter |
| GET | \`/api/cms/{collection}/{slug}\` | Hent dokument efter slug |
| POST | \`/api/cms/{collection}\` | Opret dokument |
| PUT | \`/api/cms/{collection}/{id}\` | Opdatér dokument |
| DELETE | \`/api/cms/{collection}/{id}\` | Slet dokument |

## MCP (Model Context Protocol)

CMS'et eksponerer også indhold via MCP til AI-platformsadgang:

\`\`\`bash
# Generér en API-nøgle
npx cms mcp keygen --label "Min App" --scopes "read"
\`\`\`

MCP giver AI-platforme som Claude og ChatGPT mulighed for at læse dit indhold direkte.`,

"field-types-da": `## Fælles feltegenskaber

Alle felter understøtter disse egenskaber:

\`\`\`typescript
{
  name: string;          // Påkrævet: feltnøgle i dokumentdata
  type: FieldType;       // Påkrævet: en af typerne nedenfor
  label?: string;        // Visningslabel i admin
  required?: boolean;    // Skal have en værdi
  defaultValue?: unknown;
  ai?: {                 // AI-genereringshints
    hint?: string;       // f.eks. "Skriv i en venlig tone"
    maxLength?: number;
    tone?: string;
  };
}
\`\`\`

## Grundlæggende typer

### text
Enkeltlinje tekstinput.
\`\`\`typescript
{ name: 'title', type: 'text', required: true, maxLength: 120 }
\`\`\`

### textarea
Flerlinjet ren tekst.

### number, boolean, date
Standardtyper for tal, sand/falsk og datoer.

## Indholdstyper

### richtext
Rich text / Markdown-indhold med blokeditor i admin. Valgfri \`features\`-array styrer værktøjslinjen.

### htmldoc
Fuld HTML-dokumenteditor (visuel WYSIWYG).

## Medietyper

**image**, **image-gallery**, **video**, **audio**, **file** — til alle medietyper.

> **Vigtigt:** Billedgalleriværdier skal være \`{ url, alt }[]\`-objekter, ikke plain strings.

## Strukturtyper

**select** — dropdown fra foruddefinerede valgmuligheder.
**tags** — frie tags gemt som \`string[]\`.
**relation** — reference til dokumenter i en anden collection.
**array** — gentagelige elementer med underfelter.
**object** — indlejret feltgruppe.
**blocks** — dynamiske indholdssektioner via bloksystemet.

## Specialtyper

**map** — OpenStreetMap med trækbar pin.
**interactive** — reference til en Interaktiv komponent.
**column-slots** — flerkolonne-layout med indlejrede felter.`,

"richtext-da": `## Oversigt

Alle \`richtext\`-felter bruger en indbygget TipTap v3-editor med fuld medieindlejring, strukturerede indholdsnoder og AI-assistance.

## Indlejrede medietyper

| Node | Beskrivelse |
|------|-------------|
| **Billede** | Upload eller indsæt. Understøtter størrelseshåndtag og justering. |
| **Video** | YouTube eller Vimeo URL → responsiv iframe. |
| **Lyd** | Upload mp3/wav/ogg → inline \`<audio>\`-afspiller. |
| **Fil** | Upload enhver fil → download-linkkort. |
| **Callout** | Stylet info/advarsel/tip/fare-boks med redigerbar tekst. |
| **Tabel** | Struktureret datatabel med overskriftsrække. |
| **Kodeblok** | Fenced kodeblok med syntaksfremhævning. |

## Styring af tilgængelige funktioner

Brug \`features\`-arrayet til at styre hvilke værktøjslinjeelementer der vises:

\`\`\`typescript
// Fuld-udstyret (standard — alle værktøjer)
{ name: 'content', type: 'richtext' }

// Begrænset — kun grundlæggende formatering + billeder
{ name: 'content', type: 'richtext',
  features: ['bold', 'italic', 'heading', 'link', 'image'] }
\`\`\`

## Markdown-lagring

Richtext-felter gemmer **markdown**. Funktioner som markdown ikke understøtter bruger inline HTML (\`<u>\`, \`<sup>\`, \`<mark>\` osv.).

## Rendering i Next.js

Brug \`react-markdown\` med \`remark-gfm\`:

\`\`\`typescript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArtikelIndhold({ content }: { content: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
}
\`\`\`

> **Brug aldrig \`dangerouslySetInnerHTML\`** — det ødelægger billeder, tabeller og indlejrede medier.

## AI-funktioner

- **AI Korrektur** — auto-detekterer sprog, tjekker stavning/grammatik/stil
- **AI Boblemenu** — markér tekst for omskrivningsmuligheder (kortere, længere, formel, afslappet, oversæt)`,

"relationships-da": `## Sådan fungerer relationer

Relationer forbinder dokumenter på tværs af collections. Et relationsfelt gemmer en **slug-streng** (enkelt) eller **slug-array** (flere) — aldrig indlejret data.

\`\`\`typescript
// Enkelt relation — gemmer én slug, f.eks. "john-doe"
{ name: 'author', type: 'relation', collection: 'team' }

// Multi-relation — gemmer slug-array, f.eks. ["guide-1", "guide-2"]
{ name: 'relatedPosts', type: 'relation', collection: 'posts', multiple: true }
\`\`\`

## Opløsning af relationer

Da relationer gemmer slugs, opløser du dem med \`getDocument()\`:

\`\`\`typescript
const author = post.data.author
  ? getDocument('team', post.data.author)
  : null;
\`\`\`

## Omvendt opslag

Find alle dokumenter der refererer til en given slug:

\`\`\`typescript
const posts = getCollection('posts')
  .filter(post => post.data.author === authorSlug);
\`\`\`

## Hvornår bruges relationer vs. indlejret data?

**Brug relationer** når data deles på tværs af flere dokumenter.
**Brug indlejret data** (object/array-felter) når data er unik for dokumentet.`,

"troubleshooting-da": `## GitHub-adapter: "Bad Token"

**Årsag:** OAuth-token er udløbet eller tilbagekaldt.

**Løsning:** Gå til Sites → Indstillinger → genforbind GitHub. Brug en finkornet PAT med \`contents: read/write\`.

## "Collection Not Found"

**Årsag:** Collection-navn i \`cms.config.ts\` matcher ikke indholdsmappe.

**Løsning:** Navne skal være identiske:
\`\`\`
cms.config.ts: defineCollection({ name: 'posts' })
Mappe:         content/posts/
\`\`\`

## Indhold vises ikke efter gem

**Årsag:** Next.js statisk cache — sider bygget ved deploy-tid genopbygges ikke.

**Løsninger:**
1. **On-demand revalidering** (anbefalet) — konfigurér webhook
2. **Tidsbaseret revalidering** — \`export const revalidate = 60;\`
3. **Genbyg ved indholdsændring** — Git webhook trigger

## Port allerede i brug

\`\`\`bash
lsof -ti:3000          # Find hvad der bruger porten
npx cms dev --port 3001 # Brug en anden port
\`\`\`

## Billeder indlæses ikke i produktion

**Løsning:** Tilføj billeddomænet til \`next.config.ts\`:
\`\`\`typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'dit-domæne.dk', pathname: '/uploads/**' },
  ],
}
\`\`\`

## Lagringsadapter default til SQLite

Hvis du glemmer at angive \`storage\`, bruges SQLite. Admin-UI skriver til database, \`build.ts\` læser fra JSON-filer — de to systemer er afkoblet.`,

"interactives-da": `## Separationsprincippet

Når du bygger interaktivt indhold (diagrammer, animationer, beregnere), **skal al tekst og data gemmes i CMS-collections — aldrig hardkodes.**

| Hvad | Hvor | Redigerbar af |
|------|------|---------------|
| Tekstlabels, overskrifter | CMS-tekstfelter | Redaktør i admin |
| Datapunkter, tal | CMS array/object-felter | Redaktør i admin |
| Visualisering, animation | Interaktiv komponent | Udvikler |

## Mønster: CMS → Side → Interaktiv

**1. Definér en datacollektion:**
\`\`\`typescript
defineCollection({
  name: "chart-data",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dataPoints", type: "array", fields: [
      { name: "label", type: "text" },
      { name: "value", type: "number" },
    ]},
  ],
})
\`\`\`

**2. Opret komponenten (klient-side):**
Brug Chart.js, D3 eller ethvert visualiseringsbibliotek.

**3. Brug på en side (server læser CMS, sender props):**
\`\`\`typescript
import { getDocument } from "@/lib/content";
import { Chart } from "@/components/chart";

export default function Page() {
  const data = getDocument("chart-data", "monthly-sales");
  if (!data) return null;
  return <Chart title={data.data.title} data={data.data.dataPoints} />;
}
\`\`\`

## Selvstændige HTML-interaktive

CMS'et understøtter også selvstændige HTML-interaktive via Interaktive-manageren. Brug til hurtig prototyping med "Opret med AI" i admin.

## Richtext-indlejring

Interaktive kan indlejres i richtext-felter:
\`\`\`
!!INTERACTIVE[chart-id|Diagram Titel|align:center]
\`\`\``,

};

let count = 0;
for (const [slug, content] of Object.entries(TRANSLATIONS)) {
  const file = join(DIR, `${slug}.json`);
  try {
    const doc = JSON.parse(readFileSync(file, "utf-8"));
    doc.data.content = content;
    doc.updatedAt = new Date().toISOString();
    writeFileSync(file, JSON.stringify(doc, null, 2));
    console.log(`  ✓ ${slug}`);
    count++;
  } catch (e) {
    console.log(`  ✗ ${slug} — fil ikke fundet`);
  }
}

console.log(`\n✓ ${count} dokumenter oversat til dansk`);
