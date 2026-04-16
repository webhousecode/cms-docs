import { jsonResponse, listAiModules } from "../_lib";

export const dynamic = "force-static";

const MODULE_DESCRIPTIONS: Record<string, string> = {
  "01-getting-started": "New project, first setup, scaffolding",
  "02-config-reference": "defineConfig, defineCollection, collection options",
  "03-field-types":
    "Adding or configuring field types (text, richtext, image, blocks, etc.)",
  "04-blocks": "Block-based content (hero, features, CTA sections)",
  "05-richtext": "Embedded images/media in richtext, rendering guidance",
  "06-storage-adapters": "Filesystem, GitHub, or SQLite storage config",
  "07-content-structure": "Document JSON format, content directory layout",
  "08-nextjs-patterns":
    "Pages, layouts, generateStaticParams, loader functions",
  "09-cli-reference": "CMS CLI commands, AI commands",
  "10-config-example": "Full real-world cms.config.ts as reference",
  "11-api-reference": "Programmatic ContentService usage",
  "12-admin-ui": "CMS admin setup, Docker, npx, architecture notes",
  "13-site-building":
    "Common mistakes, content file rules, patterns, richtext rendering",
  "14-relationships": "Content relations, resolving, blog+author pattern",
  "15-seo": "Metadata, JSON-LD, AI SEO, sitemap, robots.txt",
  "16-images": "Image handling, next/image, responsive patterns",
  "17-i18n": "Multi-language, locale routing, translation",
  "18-deployment": "Vercel, Docker, Fly.io deployment checklist",
  "19-troubleshooting": "Common errors, debugging, FAQ",
  "20-interactives": "Data-driven interactive content, embedding",
  "21-framework-consumers":
    "Non-TS readers (Java, .NET, PHP, Python, Ruby, Go), schema export rules",
};

export function GET() {
  const base = "https://ai.webhouse.app/ai";
  const modules = listAiModules().map((m) => ({
    slug: m.slug,
    url: `${base}/${m.slug}`,
    description: MODULE_DESCRIPTIONS[m.slug] ?? "",
  }));

  return jsonResponse({
    name: "@webhouse/cms AI Builder Site",
    version: "0.1.0",
    description:
      "Self-guided build instructions for AI coding assistants. Start at the main entry, fetch modules on demand.",
    entry: base,
    canonical_source:
      "https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide/index.md",
    package: {
      name: "@webhouse/cms",
      npm: "https://www.npmjs.com/package/@webhouse/cms",
      repo: "https://github.com/webhousecode/cms",
    },
    modules,
    endpoints: {
      walkthrough: base,
      llms_txt: `${base}/llms.txt`,
      manifest: `${base}/manifest.json`,
      index: `${base}/index.json`,
    },
  });
}
