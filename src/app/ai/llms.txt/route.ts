import { listAiModules, textResponse } from "../_lib";

export const dynamic = "force-static";

const TITLES: Record<string, string> = {
  "01-getting-started": "Getting Started",
  "02-config-reference": "Config Reference",
  "03-field-types": "Field Types",
  "04-blocks": "Blocks",
  "05-richtext": "Richtext",
  "06-storage-adapters": "Storage Adapters",
  "07-content-structure": "Content Structure",
  "08-nextjs-patterns": "Next.js Patterns",
  "09-cli-reference": "CLI Reference",
  "10-config-example": "Config Example",
  "11-api-reference": "API Reference",
  "12-admin-ui": "Admin UI",
  "13-site-building": "Site Building",
  "14-relationships": "Relationships",
  "15-seo": "SEO",
  "16-images": "Images",
  "17-i18n": "i18n",
  "18-deployment": "Deployment",
  "19-troubleshooting": "Troubleshooting",
  "20-interactives": "Interactives",
  "21-framework-consumers": "Framework Consumers",
};

export function GET() {
  const modules = listAiModules();
  const base = "https://ai.webhouse.app/ai";

  const body = `# @webhouse/cms — AI Builder Site

> Self-guided build instructions for AI coding assistants (Claude Code, Cursor, Copilot, Gemini, Windsurf).
> Fetch ${base} first — it walks you through scaffold → config → content → deploy.

## Main entry

- [AI walkthrough](${base}): Self-contained step-by-step instructions

## Modules

${modules.map((m) => `- [${TITLES[m.slug] ?? m.slug}](${base}/${m.slug})`).join("\n")}

## Machine-readable endpoints

- [Manifest](${base}/manifest.json): JSON manifest with all modules and descriptions
- [Index](${base}/index.json): Ordered list of modules with URLs

## Canonical source

- [GitHub source](https://raw.githubusercontent.com/webhousecode/cms/main/docs/ai-guide/index.md): If this site is unreachable

## Optional

- [Package](https://www.npmjs.com/package/@webhouse/cms): The npm package
- [Repository](https://github.com/webhousecode/cms): Source code and issues
- [Docs site](https://docs.webhouse.app): Human-facing documentation
`;

  return textResponse(body);
}
