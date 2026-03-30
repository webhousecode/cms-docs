/**
 * Seed MCP guides (EN + DA).
 * Run: npx tsx scripts/seed-mcp-guide.ts
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");
const tg1 = randomUUID();
const tg2 = randomUUID();

function writeDoc(slug: string, locale: string, tg: string, data: Record<string, unknown>) {
  const json = {
    id: randomUUID(), slug, status: "published", locale, translationGroup: tg,
    data: { ...data, _seo: { metaTitle: `${data.title} — webhouse.app Docs`, metaDescription: data.description } },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(DIR, `${slug}.json`), JSON.stringify(json, null, 2));
  console.log(`  ✓ ${slug}`);
}

// ═══════════════════════════════════════════════════
// MCP CLIENT (public, read-only)
// ═══════════════════════════════════════════════════

writeDoc("mcp-client", "en", tg1, {
  title: "MCP Client — Public Read-Only Access",
  description: "Every site gets a public MCP server that AI platforms can query — no API keys, no configuration needed.",
  category: "api-reference",
  order: 2,
  content: `## What is the MCP Client?

\`@webhouse/cms-mcp-client\` is a **public, read-only MCP server** bundled with every @webhouse/cms site. Any AI platform — Claude, ChatGPT, Cursor, Copilot — can discover and query your published content without API keys.

When someone asks an AI "What does webhouse.app do?", the AI can connect to your MCP endpoint and read your actual content to formulate an accurate answer.

## 6 Tools

| Tool | Description |
|------|-------------|
| \`get_site_summary\` | Site overview: name, description, language, collections, document count |
| \`list_collection\` | List published documents in a collection (limit, offset, sort) |
| \`search_content\` | Full-text search across all published content |
| \`get_page\` | Get full content of a page as markdown + metadata |
| \`get_schema\` | Field schema for a collection (field names, types) |
| \`export_all\` | Export all published content as structured JSON |

## Setup

The MCP client is automatically available when your site runs. No configuration needed.

For Claude Desktop or Cursor, add to your MCP config:

\`\`\`json
{
  "mcpServers": {
    "my-site": {
      "command": "npx",
      "args": ["@webhouse/cms-cli", "mcp"]
    }
  }
}
\`\`\`

Or connect via SSE transport to a running site:

\`\`\`
https://your-site.com/api/mcp
\`\`\`

## Tool details

### get_site_summary

Returns site name, description, default locale, all collections with document counts.

\`\`\`
No parameters required.
→ { name, description, locale, collections: [{ name, count }], lastBuild }
\`\`\`

### list_collection

\`\`\`typescript
{
  collection: "posts",     // required
  limit: 20,               // optional, max 100
  offset: 0,               // optional
  sort: "date_desc"        // optional: date_desc, date_asc, title_asc
}
\`\`\`

Returns published documents with title, slug, excerpt, date. Content body excluded for performance.

### search_content

\`\`\`typescript
{
  query: "typescript generics",  // required
  collection: "posts",           // optional: scope to one collection
  limit: 10                      // optional, max 50
}
\`\`\`

Full-text search across all fields. Returns matching documents with relevance score.

### get_page

\`\`\`typescript
{
  slug: "getting-started",   // required
  collection: "docs"         // optional: scope the lookup
}
\`\`\`

Returns full markdown content + all metadata fields.

### get_schema

\`\`\`typescript
{
  collection: "posts"   // required
}
\`\`\`

Returns field definitions: name, type, required, options. Useful for AI agents that need to understand content structure.

### export_all

\`\`\`typescript
{
  include_body: true   // optional, default true. false = metadata only
}
\`\`\`

Exports everything. Use with caution on large sites.

## Rate limiting

The public MCP client includes built-in rate limiting to prevent abuse. No configuration needed.

## Why this matters

Traditional CMS platforms require API keys and documentation for AI access. @webhouse/cms makes your content **discoverable by default**. AI platforms can read your content, understand your schema, and cite your pages accurately — all without you setting anything up.`,
});

writeDoc("mcp-client-da", "da", tg1, {
  title: "MCP Client — Offentlig læseadgang",
  description: "Hvert site får en offentlig MCP-server som AI-platforme kan forespørge — ingen API-nøgler, ingen konfiguration.",
  category: "api-reference",
  order: 2,
  content: `## Hvad er MCP Client?

\`@webhouse/cms-mcp-client\` er en **offentlig, skrivebeskyttet MCP-server** der følger med hvert @webhouse/cms site. Enhver AI-platform kan forespørge dit publicerede indhold uden API-nøgler.

## 6 Værktøjer

| Værktøj | Beskrivelse |
|---------|-------------|
| \`get_site_summary\` | Siteoversigt: navn, beskrivelse, sprog, collections, antal |
| \`list_collection\` | List publicerede dokumenter i en collection |
| \`search_content\` | Fuldtekstsøgning på tværs af alt indhold |
| \`get_page\` | Hent fuld sideindhold som markdown |
| \`get_schema\` | Feltskema for en collection |
| \`export_all\` | Eksportér alt publiceret indhold som JSON |

## Opsætning

MCP-clienten er automatisk tilgængelig. For Claude Desktop:

\`\`\`json
{
  "mcpServers": {
    "my-site": {
      "command": "npx",
      "args": ["@webhouse/cms-cli", "mcp"]
    }
  }
}
\`\`\`

## Hvorfor dette er vigtigt

Traditionelle CMS-platforme kræver API-nøgler for AI-adgang. @webhouse/cms gør dit indhold **opdageligt som standard**. AI-platforme kan læse, forstå og citere dine sider — uden at du sætter noget op.`,
});

// ═══════════════════════════════════════════════════
// MCP SERVER (authenticated, full access)
// ═══════════════════════════════════════════════════

writeDoc("mcp-server", "en", tg2, {
  title: "MCP Server — Authenticated Content Production",
  description: "Full read+write CMS access from Claude, Cursor, or any MCP client — 43 tools with scope-based access control.",
  category: "api-reference",
  order: 3,
  content: `## What is the MCP Server?

\`@webhouse/cms-mcp-server\` is an **authenticated MCP server** for content production. It gives AI tools like Claude Desktop, Cursor, and Claude Code full read+write access to your CMS — with scope-based access control.

Unlike the public MCP client (6 read-only tools), the server exposes **43 tools** covering every CMS operation: create, edit, publish, deploy, translate, generate with AI, manage agents, and more.

## 43 Tools by category

### Read (6 tools)
All public tools: \`get_site_summary\`, \`list_collection\`, \`search_content\`, \`get_page\`, \`get_schema\`, \`export_all\`

### Content CRUD (8 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`create_document\` | write | Create new document |
| \`update_document\` | write | Update fields (respects AI Lock) |
| \`trash_document\` | write | Move to trash |
| \`clone_document\` | write | Duplicate as draft |
| \`restore_from_trash\` | write | Restore trashed document |
| \`empty_trash\` | write | Permanently delete all trash |
| \`publish_document\` | publish | Set status to published |
| \`unpublish_document\` | publish | Revert to draft |

### AI Generation (4 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`generate_with_ai\` | write+ai | Generate document from intent |
| \`rewrite_field\` | write+ai | AI-rewrite a field (respects AI Lock) |
| \`generate_content\` | write+ai | Generate content for specific field |
| \`generate_interactive\` | write+ai | Create HTML interactive component |

### Translation (2 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`translate_document\` | write+ai | Translate one document to target locale |
| \`translate_site\` | write+ai | Translate ALL untranslated documents |

### Build & Deploy (3 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`trigger_build\` | deploy | Run static site build |
| \`trigger_deploy\` | deploy | Deploy to provider |
| \`list_deploy_history\` | deploy | Recent deployments |

### Bulk Operations (2 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`bulk_publish\` | write | Publish all drafts |
| \`bulk_update\` | write | Update field across multiple docs |

### Scheduling (2 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`schedule_publish\` | publish | Schedule future publish/unpublish |
| \`list_scheduled\` | read | List scheduled content |

### Agents & Curation (6 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`list_agents\` | read | List configured AI agents |
| \`create_agent\` | write+ai | Create new agent |
| \`run_agent\` | write+ai | Execute agent → curation queue |
| \`list_curation_queue\` | read | Items awaiting review |
| \`approve_queue_item\` | write | Approve for publishing |
| \`reject_queue_item\` | write | Reject with feedback |

### Media (2 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`list_media\` | read | Browse media with AI analysis |
| \`search_media\` | read | Search by caption, tags, filename |

### Other (6 tools)
| Tool | Scope | Description |
|------|-------|-------------|
| \`list_drafts\` | read | All unpublished drafts |
| \`content_stats\` | read | Word counts, doc counts |
| \`get_site_config\` | read | Site settings |
| \`update_site_settings\` | write | Change settings |
| \`list_revisions\` | read | Document edit history |
| \`list_trash\` | read | Trashed items |
| \`run_link_check\` | read | Check for broken links |
| \`create_backup\` | write | Backup all content |

## Scope-based access control

Each API key has specific scopes:

| Scope | Allows |
|-------|--------|
| \`read\` | View content, search, list, export |
| \`write\` | Create, update, delete, backup |
| \`publish\` | Publish, unpublish, schedule |
| \`deploy\` | Build, deploy |
| \`ai\` | AI generation, translation, agents |

Generate keys with scopes:

\`\`\`bash
npx cms mcp keygen --label "My App" --scopes "read,write,publish"
\`\`\`

## Setup

### Claude Desktop / Cursor

\`\`\`json
{
  "mcpServers": {
    "my-site-admin": {
      "command": "npx",
      "args": ["@webhouse/cms-cli", "mcp", "--admin", "--key", "your-api-key"]
    }
  }
}
\`\`\`

### Claude Code

The scaffolder auto-generates \`.mcp.json\`:

\`\`\`json
{
  "mcpServers": {
    "cms": {
      "command": "npx",
      "args": ["@webhouse/cms-cli", "mcp"]
    }
  }
}
\`\`\`

## Audit logging

Every operation through the MCP server is logged with timestamp, actor, tool, and parameters. View logs in CMS admin → AI Analytics.

## Client vs Server comparison

| | MCP Client | MCP Server |
|-|-----------|------------|
| **Auth** | None (public) | API key + scopes |
| **Tools** | 6 read-only | 43 read+write+AI |
| **Use case** | AI platforms citing your content | Content production from AI tools |
| **Package** | @webhouse/cms-mcp-client | @webhouse/cms-mcp-server |
| **Audit** | No | Yes |`,
});

writeDoc("mcp-server-da", "da", tg2, {
  title: "MCP Server — Autentificeret indholdsproduktion",
  description: "Fuld læse+skrive CMS-adgang fra Claude, Cursor eller enhver MCP-klient — 43 værktøjer med scope-baseret adgangskontrol.",
  category: "api-reference",
  order: 3,
  content: `## Hvad er MCP Server?

\`@webhouse/cms-mcp-server\` er en **autentificeret MCP-server** til indholdsproduktion. Den giver AI-værktøjer som Claude Desktop, Cursor og Claude Code fuld læse+skrive-adgang til dit CMS — med scope-baseret adgangskontrol.

I modsætning til den offentlige MCP-klient (6 læse-værktøjer) eksponerer serveren **43 værktøjer** der dækker enhver CMS-operation.

## 43 Værktøjer efter kategori

### Læsning (6) — \`read\` scope
Alle offentlige værktøjer: \`get_site_summary\`, \`list_collection\`, \`search_content\`, \`get_page\`, \`get_schema\`, \`export_all\`

### Indhold CRUD (8) — \`write\` scope
\`create_document\`, \`update_document\`, \`trash_document\`, \`clone_document\`, \`restore_from_trash\`, \`empty_trash\`, \`publish_document\`, \`unpublish_document\`

### AI-generering (4) — \`write\`+\`ai\` scopes
\`generate_with_ai\`, \`rewrite_field\`, \`generate_content\`, \`generate_interactive\`

### Oversættelse (2) — \`write\`+\`ai\` scopes
\`translate_document\`, \`translate_site\`

### Build & Deploy (3) — \`deploy\` scope
\`trigger_build\`, \`trigger_deploy\`, \`list_deploy_history\`

### Masseoperationer (2) — \`write\` scope
\`bulk_publish\`, \`bulk_update\`

### Agenter & kuratering (6) — \`read\`/\`write\`+\`ai\` scopes
\`list_agents\`, \`create_agent\`, \`run_agent\`, \`list_curation_queue\`, \`approve_queue_item\`, \`reject_queue_item\`

## Scope-baseret adgangskontrol

| Scope | Tillader |
|-------|----------|
| \`read\` | Vis indhold, søg, list, eksportér |
| \`write\` | Opret, opdatér, slet, backup |
| \`publish\` | Publicér, afpublicér, planlæg |
| \`deploy\` | Byg, deploy |
| \`ai\` | AI-generering, oversættelse, agenter |

Generér nøgler:

\`\`\`bash
npx cms mcp keygen --label "Min App" --scopes "read,write,publish"
\`\`\`

## Opsætning for Claude Desktop

\`\`\`json
{
  "mcpServers": {
    "my-site-admin": {
      "command": "npx",
      "args": ["@webhouse/cms-cli", "mcp", "--admin", "--key", "din-api-nøgle"]
    }
  }
}
\`\`\`

## Klient vs server

| | MCP Client | MCP Server |
|-|-----------|------------|
| **Auth** | Ingen (offentlig) | API-nøgle + scopes |
| **Værktøjer** | 6 læse-kun | 43 læse+skrive+AI |
| **Brug** | AI-platforme citerer dit indhold | Indholdsproduktion fra AI-værktøjer |
| **Audit** | Nej | Ja |`,
});

console.log("\n✓ MCP guides created (client EN/DA + server EN/DA)");
