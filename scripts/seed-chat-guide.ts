/**
 * Seed Chat with Your Site guide (EN + DA).
 * Run: npx tsx scripts/seed-chat-guide.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const DIR = join(__dirname, "..", "content", "docs");
const tg = randomUUID();

function writeDoc(slug: string, locale: string, data: Record<string, unknown>) {
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

writeDoc("chat", "en", {
  title: "Chat with Your Site",
  description: "Manage your entire CMS through natural language — create content, edit pages, run agents, deploy, and more by just talking to it.",
  category: "guides",
  order: 13,
  content: `## What is Chat?

@webhouse/cms has a built-in conversational interface that lets you manage your entire site through natural language. Instead of clicking through menus and forms, you describe what you want and the CMS does it.

Click **Chat** in the admin header to switch from the traditional panel to the chat interface. Click **Admin** to switch back. Your chat history is preserved.

This isn't a chatbot bolted onto a CMS. The chat has **direct access to 47 tools** that cover every CMS operation — the same APIs that power the traditional admin UI. It can read your schema, understand your collections, and execute operations with full context.

## What you can do

### Content management

\`\`\`
"Create a new blog post about TypeScript generics"
"Update the about page title to 'About Us'"
"Publish all drafts"
"Show me what changed this week"
"Translate the getting-started page to Danish"
"List all posts tagged 'tutorial'"
\`\`\`

### Site operations

\`\`\`
"Run a full site build"
"Deploy to production"
"Check all links on the site"
"Create a backup"
"Show me the SEO score for all posts"
\`\`\`

### AI content

\`\`\`
"Generate a blog post about our new feature"
"Rewrite the intro to be more concise"
"Run the SEO optimizer on all published posts"
"Create an interactive pricing calculator"
\`\`\`

### Media & assets

\`\`\`
"Show me all images without alt text"
"List media uploaded this week"
\`\`\`

### Translation

\`\`\`
"Translate this post to Danish"
"Translate the entire site to Danish"
"Show me which translations are missing"
\`\`\`

## The 47 tools

Chat has access to these tool categories:

### Read operations
| Tool | What it does |
|------|-------------|
| \`site_summary\` | Overview: collections, document counts, adapter, config |
| \`list_documents\` | List documents in a collection with filtering |
| \`get_document\` | Read a specific document by slug |
| \`search_content\` | Full-text search across all collections |
| \`get_schema\` | Get collection fields and block definitions |
| \`list_drafts\` | Show all unpublished drafts |
| \`get_site_config\` | Read site settings |
| \`list_media\` | Browse media library |
| \`search_media\` | Search images, videos, files |
| \`list_scheduled\` | Show scheduled publishes/unpublishes |
| \`list_agents\` | Show configured AI agents |
| \`list_curation_queue\` | Show AI-generated content awaiting review |
| \`list_revisions\` | Show edit history for a document |
| \`list_trash\` | Show trashed documents |
| \`content_stats\` | Content statistics and counts |
| \`list_deploy_history\` | Recent deployments |

### Write operations
| Tool | What it does |
|------|-------------|
| \`create_document\` | Create a new document |
| \`update_document\` | Edit fields on an existing document |
| \`publish_document\` | Set status to published |
| \`unpublish_document\` | Revert to draft |
| \`trash_document\` | Move to trash |
| \`clone_document\` | Duplicate a document |
| \`restore_from_trash\` | Recover a trashed document |
| \`empty_trash\` | Permanently delete all trashed items |
| \`bulk_publish\` | Publish multiple documents at once |
| \`bulk_update\` | Update a field across multiple documents |
| \`schedule_publish\` | Set a future publish date |
| \`update_site_settings\` | Change site configuration |
| \`show_edit_form\` | Render an inline edit form in chat |

### AI operations
| Tool | What it does |
|------|-------------|
| \`generate_content\` | AI-generate a new document |
| \`rewrite_field\` | AI-rewrite a specific field |
| \`generate_interactive\` | Create an HTML interactive component |
| \`create_agent\` | Configure a new AI agent |
| \`run_agent\` | Execute an agent on content |
| \`translate_document\` | AI-translate a single document |
| \`translate_site\` | AI-translate all documents to a locale |

### Operations
| Tool | What it does |
|------|-------------|
| \`trigger_build\` | Run the static site build pipeline |
| \`trigger_deploy\` | Deploy to configured provider |
| \`run_link_check\` | Scan for broken links |
| \`create_backup\` | Snapshot all content |
| \`approve_queue_item\` | Approve AI-generated content |
| \`reject_queue_item\` | Reject AI-generated content |

### Memory
| Tool | What it does |
|------|-------------|
| \`search_memories\` | Search conversation memory |
| \`add_memory\` | Save information for future conversations |
| \`forget_memory\` | Remove a memory |

## Chat memory

The chat remembers context across conversations. It stores:
- Your preferences ("I prefer formal tone", "Always use Danish for blog posts")
- Project context ("We're launching v2 next week", "The pricing page needs updating")
- Decisions ("We decided to use the blue theme", "SEO keywords: typescript, cms, headless")

Memory is stored locally per site and can be exported/imported.

## How it works under the hood

1. You type a message
2. Chat sends it to Claude with your site's schema, collections, and recent context
3. Claude decides which tools to call (e.g. \`list_documents\` → \`update_document\` → \`publish_document\`)
4. Each tool calls the same internal API routes as the traditional admin UI
5. Results are streamed back with markdown formatting
6. Destructive actions (delete, publish, deploy) ask for confirmation first

## Configuration

Chat uses the AI model configured in Site Settings → AI:

- **Chat model**: Claude Sonnet 4.6 (default) — fast, capable
- **Max tokens**: 16,384 (configurable)
- **Max tool iterations**: 25 (how many tools per conversation turn)

No additional setup needed. If you have an Anthropic API key configured, Chat works.

## Tips

- **Be specific**: "Create a blog post titled 'Getting Started with TypeScript' with 3 sections" works better than "write something about TypeScript"
- **Use it for bulk operations**: "Publish all drafts in the blog collection" saves clicking through each one
- **Ask it to explain**: "What collections do I have?" or "How is the SEO score calculated?"
- **Chain operations**: "Create a new post, optimize it for SEO, then translate it to Danish" — Chat handles multi-step workflows
- **Leverage memory**: "Remember that our brand voice is professional but friendly" — it'll apply this to future content generation`,
});

writeDoc("chat-da", "da", {
  title: "Chat med dit site",
  description: "Administrér hele dit CMS via naturligt sprog — opret indhold, redigér sider, kør agenter, deploy og mere ved bare at tale til det.",
  category: "guides",
  order: 13,
  content: `## Hvad er Chat?

@webhouse/cms har et indbygget samtaleinterface der lader dig administrere hele dit site via naturligt sprog. I stedet for at klikke igennem menuer og formularer, beskriver du hvad du vil have, og CMS'et gør det.

Klik **Chat** i admin-headeren for at skifte fra det traditionelle panel til chat-interfacet. Klik **Admin** for at skifte tilbage. Din chathistorik bevares.

Dette er ikke en chatbot boltet på et CMS. Chatten har **direkte adgang til 47 værktøjer** der dækker enhver CMS-operation — de samme API'er der driver den traditionelle admin-brugerflade.

## Hvad du kan gøre

### Indholdsstyring

\`\`\`
"Opret et nyt blogindlæg om TypeScript generics"
"Opdatér about-sidens titel til 'Om os'"
"Publicér alle kladder"
"Vis mig hvad der er ændret i denne uge"
"Oversæt getting-started siden til dansk"
\`\`\`

### Site-operationer

\`\`\`
"Kør et fuldt site-build"
"Deploy til produktion"
"Tjek alle links på sitet"
"Opret en backup"
\`\`\`

### AI-indhold

\`\`\`
"Generér et blogindlæg om vores nye feature"
"Omskriv introen til at være mere kortfattet"
"Kør SEO-optimering på alle publicerede indlæg"
\`\`\`

### Oversættelse

\`\`\`
"Oversæt dette indlæg til dansk"
"Oversæt hele sitet til dansk"
"Vis mig hvilke oversættelser der mangler"
\`\`\`

## De 47 værktøjer

### Læse-operationer
| Værktøj | Hvad det gør |
|---------|-------------|
| \`site_summary\` | Oversigt: collections, antal dokumenter, adapter, config |
| \`list_documents\` | List dokumenter med filtrering |
| \`get_document\` | Læs et specifikt dokument |
| \`search_content\` | Fuldtekstsøgning på tværs af alle collections |
| \`get_schema\` | Hent feltdefinitioner og blokke |
| \`list_drafts\` | Vis alle upublicerede kladder |

### Skrive-operationer
| Værktøj | Hvad det gør |
|---------|-------------|
| \`create_document\` | Opret nyt dokument |
| \`update_document\` | Redigér felter |
| \`publish_document\` | Sæt status til published |
| \`trash_document\` | Flyt til papirkurv |
| \`bulk_publish\` | Publicér flere dokumenter på én gang |
| \`translate_document\` | AI-oversæt et dokument |
| \`translate_site\` | AI-oversæt alle dokumenter |

### AI-operationer
| Værktøj | Hvad det gør |
|---------|-------------|
| \`generate_content\` | AI-generér nyt dokument |
| \`rewrite_field\` | AI-omskriv et specifikt felt |
| \`generate_interactive\` | Opret interaktiv HTML-komponent |
| \`run_agent\` | Kør en AI-agent |

### Operationer
| Værktøj | Hvad det gør |
|---------|-------------|
| \`trigger_build\` | Kør build-pipeline |
| \`trigger_deploy\` | Deploy til udbyder |
| \`run_link_check\` | Scan for brudte links |
| \`create_backup\` | Snapshot alt indhold |

### Hukommelse
| Værktøj | Hvad det gør |
|---------|-------------|
| \`search_memories\` | Søg i samtalehukommelse |
| \`add_memory\` | Gem information til fremtidige samtaler |
| \`forget_memory\` | Fjern en hukommelse |

## Chat-hukommelse

Chatten husker kontekst på tværs af samtaler:
- Dine præferencer ("Brug altid formel tone")
- Projektkontekst ("Vi launcher v2 næste uge")
- Beslutninger ("Vi valgte det blå tema")

## Konfiguration

Chat bruger AI-modellen konfigureret i Site Settings → AI:

- **Chat-model**: Claude Sonnet 4.6 (standard)
- **Max tokens**: 16.384 (konfigurerbar)
- **Max tool-iterationer**: 25

Ingen ekstra opsætning nødvendig. Hvis du har en Anthropic API-nøgle, virker Chat.

## Tips

- **Vær specifik**: "Opret et blogindlæg med titlen 'Kom i gang med TypeScript' med 3 sektioner"
- **Brug det til masseoperationer**: "Publicér alle kladder i blog-collectionen"
- **Bed den forklare**: "Hvilke collections har jeg?" eller "Hvordan beregnes SEO-scoren?"
- **Kæd operationer**: "Opret et indlæg, optimér til SEO, oversæt til dansk"
- **Brug hukommelse**: "Husk at vores brandvoice er professionel men venlig"`,
});

console.log("\n✓ Chat guide created (EN + DA)");
