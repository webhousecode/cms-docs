/**
 * Seed Collection Naming Best Practices (EN + DA).
 * Run: npx tsx scripts/seed-collection-naming.ts
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

writeDoc("collection-naming", "en", {
  title: "Collection Naming Best Practices",
  description: "Reserved names to avoid, recommended naming patterns, and why the validator catches conflicts.",
  category: "tips",
  order: 1,
  content: `## Reserved names — never use these

The following names conflict with CMS admin's built-in UI panels. **Never** use them as collection names or labels:

| Reserved name | Conflicts with |
|--------------|----------------|
| \`settings\` | Site Settings panel |
| \`site-settings\` | Site Settings panel |
| \`config\` | Site configuration |
| \`admin\` | Admin UI routes |
| \`media\` | Media library panel |
| \`interactives\` | Interactives panel |

### What happens if you use a reserved name

If you name a collection "Site Settings", editors see **two** "Site Settings" entries in the sidebar:

1. Your collection (content documents)
2. CMS admin's built-in settings panel

This confuses everyone. Editors click the wrong one, content gets lost, and support tickets pile up.

The same applies to "Media" — editors can't tell if they're opening the media library or your "Media" content collection.

## Recommended naming

### For site-wide settings

Use \`globals\` or \`global\` — not "settings" or "config":

\`\`\`typescript
defineCollection({
  name: 'globals',        // ✓ safe
  label: 'Global Settings', // ✓ label can say "settings"
  fields: [
    { name: 'siteTitle', type: 'text' },
    { name: 'tagline', type: 'textarea' },
    { name: 'socialLinks', type: 'array', fields: [
      { name: 'platform', type: 'text' },
      { name: 'url', type: 'text' },
    ]},
    { name: 'footerText', type: 'text' },
  ],
})
\`\`\`

> **Note:** The \`label\` can include "Settings" — it's the \`name\` (used for routes and directory names) that must avoid reserved words.

### For content collections

Use descriptive, content-focused names:

| Good | Bad |
|------|-----|
| \`posts\` | \`blog-settings\` |
| \`projects\` | \`admin-projects\` |
| \`team\` | \`config-team\` |
| \`testimonials\` | \`settings-testimonials\` |
| \`events\` | \`media-events\` |
| \`products\` | \`interactives-products\` |
| \`services\` | \`site-settings-services\` |

## The validator catches it

CMS admin includes a built-in validator that checks for reserved name conflicts.

### How to use it

1. Go to **Site Settings** in the sidebar
2. Scroll to the **Site** section
3. Click **Validate site**
4. If any collection uses a reserved name, you'll see a warning with a rename suggestion

### What the validator checks

- Collection \`name\` matches a reserved word
- Collection \`label\` is identical to a built-in panel name
- Suggests safe alternatives (e.g. "settings" → "globals")

### Fixing a conflict

If the validator flags a collection:

1. Rename the collection in \`cms.config.ts\`:
   \`\`\`typescript
   // Before (bad)
   defineCollection({ name: 'settings', ... })

   // After (good)
   defineCollection({ name: 'globals', label: 'Site Settings', ... })
   \`\`\`

2. Rename the content directory:
   \`\`\`bash
   mv content/settings content/globals
   \`\`\`

3. Update slug references in any JSON files that reference the old collection name

## Summary

- **\`name\`** = directory name + URL route → must avoid reserved words
- **\`label\`** = display name in admin → can be anything descriptive
- **Use \`globals\`** for site-wide settings, not "settings" or "config"
- **Run the validator** after any config change to catch conflicts early`,
});

writeDoc("collection-naming-da", "da", {
  title: "Best practices for collection-navngivning",
  description: "Reserverede navne du skal undgå, anbefalede navngivningsmønstre, og hvorfor validatoren fanger konflikter.",
  category: "tips",
  order: 1,
  content: `## Reserverede navne — brug aldrig disse

Følgende navne konflikter med CMS admin's indbyggede UI-paneler. Brug dem **aldrig** som collection-navne eller labels:

| Reserveret navn | Konflikter med |
|----------------|----------------|
| \`settings\` | Site Settings-panelet |
| \`site-settings\` | Site Settings-panelet |
| \`config\` | Site-konfiguration |
| \`admin\` | Admin UI-routes |
| \`media\` | Mediebiblioteks-panelet |
| \`interactives\` | Interaktive-panelet |

### Hvad sker der hvis du bruger et reserveret navn

Hvis du navngiver en collection "Site Settings", ser redaktører **to** "Site Settings" i sidebaren:

1. Din collection (indholdsdokumenter)
2. CMS admin's indbyggede indstillingspanel

Det forvirrer alle.

## Anbefalet navngivning

### Til site-brede indstillinger

Brug \`globals\` eller \`global\` — ikke "settings" eller "config":

\`\`\`typescript
defineCollection({
  name: 'globals',           // ✓ sikkert
  label: 'Globale indstillinger', // ✓ label kan sige "indstillinger"
  fields: [
    { name: 'siteTitle', type: 'text' },
    { name: 'tagline', type: 'textarea' },
    { name: 'footerText', type: 'text' },
  ],
})
\`\`\`

### Til indholdscollections

Brug beskrivende, indholdsfokuserede navne:

| Godt | Dårligt |
|------|---------|
| \`posts\` | \`blog-settings\` |
| \`projects\` | \`admin-projects\` |
| \`team\` | \`config-team\` |
| \`testimonials\` | \`media-events\` |

## Validatoren fanger det

1. Gå til **Site Settings** i sidebaren
2. Klik **Validate site**
3. Hvis en collection bruger et reserveret navn, ser du en advarsel med et omdøbningsforslag

### Rette en konflikt

\`\`\`typescript
// Før (dårligt)
defineCollection({ name: 'settings', ... })

// Efter (godt)
defineCollection({ name: 'globals', label: 'Site Settings', ... })
\`\`\`

Omdøb også content-mappen:

\`\`\`bash
mv content/settings content/globals
\`\`\`

## Opsummering

- **\`name\`** = mappenavn + URL-route → skal undgå reserverede ord
- **\`label\`** = visningsnavn i admin → kan være hvad som helst
- **Brug \`globals\`** til site-brede indstillinger
- **Kør validatoren** efter enhver konfigurationsændring`,
});

console.log("\n✓ Collection naming docs created (EN + DA)");
