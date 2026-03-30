/**
 * Seed AI Lock guide (EN + DA).
 * Run: npx tsx scripts/seed-ai-lock.ts
 */
import { writeFileSync } from "fs";
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

writeDoc("ai-lock", "en", {
  title: "AI Lock — Field-Level Content Protection",
  description: "How AI Lock prevents AI agents from overwriting human edits — field-level protection enforced at the engine level.",
  category: "concepts",
  order: 4,
  content: `## The problem

You carefully edit a blog post title. An AI agent runs overnight and overwrites it with a generated version. Your work is gone.

This happens in every CMS that bolts AI onto existing content workflows. AI and humans fight over the same fields with no rules about who wins.

## How AI Lock works

@webhouse/cms tracks **who last edited each field** — human or AI. When a human edits a field, it becomes **locked**. AI agents can never overwrite a locked field. Only a human can unlock it.

This isn't a setting you toggle. It's enforced at the engine level, in every write operation, through the \`WriteContext\` actor system.

### The _fieldMeta system

Every document has a \`_fieldMeta\` object that tracks the lock state per field:

\`\`\`json
{
  "slug": "my-post",
  "data": {
    "title": "My Carefully Written Title",
    "content": "AI-generated content here..."
  },
  "_fieldMeta": {
    "title": {
      "lockedBy": "user",
      "lockedAt": "2026-03-30T10:00:00Z",
      "lastEditedBy": "cb@webhouse.dk"
    },
    "content": {
      "lockedBy": null,
      "lastEditedBy": "ai:content-writer"
    }
  }
}
\`\`\`

In this example:
- **title** is locked — a human edited it. No AI agent can touch it.
- **content** is unlocked — AI generated it. AI agents can update it freely.

### Write context actors

Every write operation carries a \`WriteContext\` that identifies who's making the change:

\`\`\`typescript
interface WriteContext {
  actor: "user" | "ai" | "system" | "import";
  userId?: string;
  agentId?: string;
  source?: string;
}
\`\`\`

When \`actor: "user"\`, the CMS auto-locks edited fields. When \`actor: "ai"\`, the CMS checks locks and skips locked fields.

### What happens when AI tries to write a locked field

1. AI agent calls \`update_document\` with new data for all fields
2. CMS engine reads \`_fieldMeta\` for each field
3. Locked fields are **silently skipped** — AI data is ignored for those fields
4. Unlocked fields are updated normally
5. No error thrown — the agent doesn't need to know about locks

This means AI agents can run bulk operations across the entire site without any risk of overwriting human work.

## Configuration

### Per-field AI lock behavior

\`\`\`typescript
{
  name: 'title',
  type: 'text',
  aiLock: {
    autoLockOnEdit: true,    // Lock when human edits (default: true)
    lockable: true,          // Whether field can be locked at all (default: true)
    requireApproval: false,  // Require human approval before AI writes
  }
}
\`\`\`

### Unlocking a field

In the editor, each field shows a lock icon when locked:
- 🔒 **Locked** — human-edited, AI cannot change
- 🔓 **Unlocked** — AI can update freely

Click the lock icon to toggle. Only humans can unlock fields.

## Use cases

### Content Writer agent
- AI generates blog posts → all fields unlocked
- Human edits the title → title locks
- AI runs SEO optimization → updates description, keywords, but **skips title**

### Translator agent
- AI translates all fields to Danish
- Human corrects a specific phrase → that field locks
- AI re-translates the page → skips the corrected field

### Bulk SEO optimization
- AI runs \`bulk_update\` on 100 documents
- Documents with human-edited meta titles → titles preserved
- Documents with AI-generated titles → titles updated

## For AI builders

When building sites or scripts that write content:

\`\`\`typescript
// Creating content as AI (fields stay unlocked)
await cms.content.create('posts', {
  slug: 'new-post',
  data: { title: 'AI Title', content: '...' },
}, { actor: 'ai', agentId: 'content-writer' });

// Creating content as user (fields auto-lock)
await cms.content.create('posts', {
  slug: 'new-post',
  data: { title: 'My Title', content: '...' },
}, { actor: 'user', userId: 'cb@webhouse.dk' });
\`\`\`

## Why this is different

Other CMS platforms with AI features either:
- Let AI overwrite everything (dangerous)
- Require manual "approve each change" workflows (slow)
- Have no concept of field-level ownership (crude)

@webhouse/cms AI Lock is:
- **Automatic** — locks on human edit, no manual step
- **Granular** — per-field, not per-document
- **Non-blocking** — AI agents run freely, locked fields are silently skipped
- **Transparent** — lock state visible in editor and \`_fieldMeta\`
- **Engine-level** — enforced in every write path, not just the UI`,
});

writeDoc("ai-lock-da", "da", {
  title: "AI Lock — Feltbaseret indholdsbeskyttelse",
  description: "Hvordan AI Lock forhindrer AI-agenter i at overskrive menneskelige redigeringer — feltbaseret beskyttelse håndhævet på motorniveau.",
  category: "concepts",
  order: 4,
  content: `## Problemet

Du redigerer omhyggeligt en blogindlæg-titel. En AI-agent kører natten over og overskriver den med en genereret version. Dit arbejde er væk.

## Sådan fungerer AI Lock

@webhouse/cms sporer **hvem der sidst redigerede hvert felt** — menneske eller AI. Når et menneske redigerer et felt, bliver det **låst**. AI-agenter kan aldrig overskrive et låst felt. Kun et menneske kan låse det op.

### _fieldMeta-systemet

Hvert dokument har et \`_fieldMeta\`-objekt der sporer låsestatus pr. felt:

\`\`\`json
{
  "data": {
    "title": "Min omhyggeligt skrevne titel",
    "content": "AI-genereret indhold..."
  },
  "_fieldMeta": {
    "title": {
      "lockedBy": "user",
      "lockedAt": "2026-03-30T10:00:00Z"
    },
    "content": {
      "lockedBy": null,
      "lastEditedBy": "ai:content-writer"
    }
  }
}
\`\`\`

- **title** er låst — et menneske redigerede det. Ingen AI kan røre det.
- **content** er ulåst — AI genererede det. AI kan opdatere frit.

### Hvad sker der når AI prøver at skrive et låst felt

1. AI-agent kalder \`update_document\` med nye data
2. CMS-motoren læser \`_fieldMeta\` for hvert felt
3. Låste felter **springes stille over** — AI-data ignoreres
4. Ulåste felter opdateres normalt
5. Ingen fejl kastes — agenten behøver ikke vide om låse

## Konfiguration

\`\`\`typescript
{
  name: 'title',
  type: 'text',
  aiLock: {
    autoLockOnEdit: true,    // Lås ved menneskelig redigering
    lockable: true,          // Om feltet kan låses
    requireApproval: false,  // Kræv godkendelse før AI skriver
  }
}
\`\`\`

### Oplåsning af et felt

I editoren viser hvert felt et låseikon:
- 🔒 **Låst** — menneske-redigeret, AI kan ikke ændre
- 🔓 **Ulåst** — AI kan opdatere frit

Klik på ikonet for at skifte. Kun mennesker kan låse op.

## Brugscases

### Content Writer-agent
- AI genererer blogindlæg → alle felter ulåst
- Menneske redigerer titlen → titel låser
- AI kører SEO → opdaterer alt **undtagen titel**

### Oversætteragent
- AI oversætter alle felter
- Menneske retter en specifik sætning → det felt låser
- AI genoversætter → springer det rettede felt over

## Hvorfor dette er anderledes

Andre CMS'er med AI enten:
- Lader AI overskrive alt (farligt)
- Kræver manuel "godkend hver ændring" (langsomt)
- Har intet koncept om feltejerskab (groft)

@webhouse/cms AI Lock er:
- **Automatisk** — låser ved menneskelig redigering
- **Granulært** — pr. felt, ikke pr. dokument
- **Ikke-blokerende** — AI kører frit, låste felter springes over
- **Transparent** — låsestatus synlig i editor og \`_fieldMeta\`
- **Motorniveau** — håndhævet i enhver skrivesti`,
});

console.log("\n✓ AI Lock guide created (EN + DA)");
