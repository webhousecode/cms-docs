#!/usr/bin/env tsx
/**
 * Auto-tag script — scans EN docs for articles with no tags and asks Claude
 * Haiku to pick 3-5 tags from the curated vocabulary. Syncs the result to
 * DA siblings via translationGroup.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... pnpm tsx scripts/auto-tag.ts
 *
 * Flags:
 *   --retag          Re-tag every article, even those that already have tags
 *   --slug=<slug>    Tag only the named EN slug (both pair locales)
 *   --dry-run        Print decisions without writing
 *
 * Why a script and not a CMS agent: the built-in agent system is designed
 * for content generation, not metadata patches. A script is 60 lines,
 * runnable from a GitHub Action on new content PRs, and requires no
 * custom hook machinery in cms-admin. Future articles: run this once
 * per batch of additions.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ─── Vocabulary (keep in sync with cms.config.ts docs collection) ────

const VOCABULARY = [
  "deploy-docker", "deploy-fly", "deploy-github-pages", "deploy-vercel", "deploy-cloudflare",
  "ai-agents", "ai-budget", "ai-prompts", "chat", "translation",
  "schema", "richtext", "blocks", "shortcodes", "media", "relationships", "interactives",
  "i18n", "seo", "geo",
  "auth", "permissions", "access-tokens",
  "mcp", "webhooks", "nextjs", "mobile", "frameworks",
  "forms", "backup", "analytics",
  "architecture", "cli", "github-adapter", "filesystem-adapter", "migration",
] as const;

// ─── Types ─────────────────────────────────────────────────────────

interface Doc {
  id: string;
  slug: string;
  status?: string;
  locale?: string;
  translationGroup?: string;
  data: {
    title?: string;
    description?: string;
    content?: string;
    category?: string;
    tags?: string[];
  };
}

// ─── Args ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const retag = args.includes("--retag");
const dryRun = args.includes("--dry-run");
const slugArg = args.find((a) => a.startsWith("--slug="))?.slice("--slug=".length);

// ─── Helpers ───────────────────────────────────────────────────────

const DOCS = join(process.cwd(), "content", "docs");

function loadDocs(): Doc[] {
  return readdirSync(DOCS)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ path: join(DOCS, f), doc: JSON.parse(readFileSync(join(DOCS, f), "utf-8")) as Doc }))
    .map(({ doc }) => doc);
}

function saveDoc(slug: string, doc: Doc): void {
  const path = join(DOCS, `${slug}.json`);
  writeFileSync(path, JSON.stringify(doc, null, 2) + "\n");
}

// ─── Claude Haiku call ─────────────────────────────────────────────

async function tagWithHaiku(doc: Doc): Promise<string[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const title = doc.data.title ?? "";
  const description = doc.data.description ?? "";
  const contentExcerpt = (doc.data.content ?? "").slice(0, 1200);
  const category = doc.data.category ?? "";

  const system = `You tag documentation articles for @webhouse/cms with 3-5 topic tags from a fixed vocabulary.

Rules:
- Pick ONLY tags from the vocabulary below — never invent new ones.
- 3 to 5 tags per article — prefer fewer if fewer fit well.
- Tags should be cross-cutting topics that span multiple categories.
- A tag that duplicates what the category already says is LOW value — prefer tags that add a different axis of discovery.
- Output ONLY a JSON array of tag strings. No prose, no explanation.

Vocabulary: ${JSON.stringify(VOCABULARY)}`;

  const user = `Title: ${title}
Category: ${category}
Description: ${description}

Content excerpt:
${contentExcerpt}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 300)}`);
  }

  const payload = await res.json() as { content: Array<{ type: string; text?: string }> };
  const text = payload.content.find((c) => c.type === "text")?.text ?? "";

  // Extract JSON array from the response (be liberal about surrounding whitespace / code fences)
  const match = /\[[^\]]*\]/.exec(text);
  if (!match) throw new Error(`Could not parse tag array from model output: ${text.slice(0, 200)}`);
  const raw = JSON.parse(match[0]) as unknown;
  if (!Array.isArray(raw)) throw new Error("Parsed output is not an array");

  const valid = raw
    .filter((t): t is string => typeof t === "string")
    .filter((t) => (VOCABULARY as readonly string[]).includes(t));

  if (valid.length < 2) throw new Error(`Haiku returned ${valid.length} valid tags — too few. Raw: ${JSON.stringify(raw)}`);
  return valid.slice(0, 5);
}

// ─── Main ──────────────────────────────────────────────────────────

async function main() {
  const all = loadDocs();
  const enDocs = all.filter((d) => (d.locale ?? "en") === "en" && d.status !== "draft");

  const targets = enDocs.filter((d) => {
    if (slugArg && d.slug !== slugArg) return false;
    if (!retag && d.data.tags && d.data.tags.length > 0) return false;
    return true;
  });

  console.log(`📚 ${enDocs.length} EN docs total · ${targets.length} to tag${dryRun ? " (DRY RUN)" : ""}`);
  if (targets.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  let ok = 0; let failed = 0;
  for (const doc of targets) {
    try {
      const tags = await tagWithHaiku(doc);
      console.log(`  ✓ ${doc.slug}: [${tags.join(", ")}]`);
      ok++;

      if (dryRun) continue;

      // Update EN doc
      doc.data.tags = tags;
      saveDoc(doc.slug, doc);

      // Sync to DA sibling via translationGroup
      if (doc.translationGroup) {
        const da = all.find(
          (d) => d.translationGroup === doc.translationGroup && d.slug !== doc.slug && d.locale === "da",
        );
        if (da) {
          da.data.tags = tags;
          saveDoc(da.slug, da);
        }
      }
    } catch (err) {
      console.error(`  ✗ ${doc.slug}: ${err instanceof Error ? err.message : String(err)}`);
      failed++;
    }
  }

  console.log(`\n${ok} tagged · ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
