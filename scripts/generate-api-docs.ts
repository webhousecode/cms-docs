/**
 * Auto-generate API reference documentation from CMS admin route files.
 * Scans packages/cms-admin/src/app/api/ and extracts HTTP methods + paths.
 * Run: npx tsx scripts/generate-api-docs.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { randomUUID } from "crypto";

const CMS_REPO = "/Users/cb/Apps/webhouse/cms";
const API_DIR = join(CMS_REPO, "packages/cms-admin/src/app/api");
const CONTENT_DIR = join(__dirname, "..", "content", "docs");
mkdirSync(CONTENT_DIR, { recursive: true });

// Find all route.ts files
const routeFiles = execSync(`find ${API_DIR} -name "route.ts" | sort`, {
  encoding: "utf-8",
})
  .trim()
  .split("\n");

interface ApiEndpoint {
  path: string;
  methods: string[];
  category: string;
  description: string;
}

const endpoints: ApiEndpoint[] = [];

for (const file of routeFiles) {
  const content = readFileSync(file, "utf-8");
  const relativePath = file.replace(API_DIR, "").replace("/route.ts", "");

  // Extract HTTP methods (exported functions)
  const methods: string[] = [];
  for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
    if (
      content.includes(`export async function ${method}`) ||
      content.includes(`export function ${method}`)
    ) {
      methods.push(method);
    }
  }

  if (methods.length === 0) continue;

  // Convert path to URL format
  const urlPath = `/api${relativePath}`
    .replace(/\[([^\]]+)\]/g, ":$1")
    .replace(/\/\.\.\.\w+/, "/*");

  // Determine category
  let category = "content";
  if (urlPath.includes("/admin/")) category = "admin";
  else if (urlPath.includes("/auth/")) category = "auth";
  else if (urlPath.includes("/media/")) category = "media";
  else if (urlPath.includes("/cms/")) category = "content";
  else if (urlPath.includes("/interactives")) category = "content";

  // Extract JSDoc description
  const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)[\n*]/);
  const description = jsdocMatch?.[1]?.trim() ?? "";

  endpoints.push({ path: urlPath, methods, category, description });
}

// Group by category
const grouped: Record<string, ApiEndpoint[]> = {};
for (const ep of endpoints) {
  (grouped[ep.category] ??= []).push(ep);
}

// Generate a comprehensive API reference doc
let content = `## Overview

The CMS admin exposes **${endpoints.length} API endpoints** across ${Object.keys(grouped).length} categories. All endpoints under \`/api/cms/\`, \`/api/admin/\`, and \`/api/media/\` require authentication via session cookie or API key.

`;

const categoryLabels: Record<string, string> = {
  content: "Content API",
  admin: "Admin API",
  auth: "Authentication",
  media: "Media API",
};

for (const [cat, eps] of Object.entries(grouped).sort()) {
  content += `## ${categoryLabels[cat] ?? cat}\n\n`;
  content += `| Method | Endpoint | Description |\n`;
  content += `|--------|----------|-------------|\n`;

  for (const ep of eps.sort((a, b) => a.path.localeCompare(b.path))) {
    const methodBadges = ep.methods.join(", ");
    content += `| ${methodBadges} | \`${ep.path}\` | ${ep.description} |\n`;
  }
  content += "\n";
}

content += `## Authentication

All protected endpoints require one of:
- **Session cookie** — set after login via \`POST /api/auth/login\`
- **API key** — passed in \`Authorization: Bearer <key>\` header

Public endpoints: \`/api/auth/login\`, \`/api/auth/setup\`, \`/api/auth/me\`

## Rate Limits

No rate limits are enforced in the self-hosted CMS admin. The API is designed for single-tenant use.

## Content Push Webhook

When content is saved, the CMS can push updates to your site via webhook:

\`\`\`json
{
  "event": "content.revalidate",
  "collection": "posts",
  "slug": "hello-world",
  "action": "published",
  "document": { "id": "...", "slug": "...", "data": { ... } },
  "paths": ["/blog/hello-world", "/blog"]
}
\`\`\`

Header \`X-CMS-Signature: sha256=<hmac>\` is computed using your shared secret.`;

// Write as a doc
const doc = {
  id: randomUUID(),
  slug: "api-endpoints",
  status: "published",
  locale: "en",
  translationGroup: randomUUID(),
  data: {
    title: "API Endpoints Reference",
    description: `Complete reference of all ${endpoints.length} REST API endpoints in the CMS admin.`,
    content,
    category: "api-reference",
    order: 1,
    _seo: {
      metaTitle: "API Endpoints Reference — webhouse.app Docs",
      metaDescription: `Complete reference of all ${endpoints.length} REST API endpoints in the CMS admin.`,
      keywords: ["webhouse", "cms", "api", "rest", "endpoints"],
    },
  },
  _fieldMeta: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

writeFileSync(
  join(CONTENT_DIR, "api-endpoints.json"),
  JSON.stringify(doc, null, 2)
);

console.log(`✓ API reference generated: ${endpoints.length} endpoints across ${Object.keys(grouped).length} categories`);
