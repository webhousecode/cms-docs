/**
 * Seed changelog from git tags.
 * Run: npx tsx scripts/seed-changelog.ts
 */
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const CMS_REPO = "/Users/cb/Apps/webhouse/cms";
const CONTENT_DIR = join(__dirname, "..", "content", "changelog");
mkdirSync(CONTENT_DIR, { recursive: true });

// Get git tags with dates
const tagsRaw = execSync(
  `cd ${CMS_REPO} && git tag -l 'v*' --sort=-version:refname --format='%(refname:short)|%(creatordate:iso-strict)'`,
  { encoding: "utf-8" }
).trim();

if (!tagsRaw) {
  console.log("No tags found");
  process.exit(0);
}

const tags = tagsRaw.split("\n").map(line => {
  const [tag, date] = line.split("|");
  return { tag, version: tag.replace(/^v/, ""), date: date?.split("T")[0] ?? "2026-03-01" };
});

// Get commit messages between tags
let count = 0;
for (let i = 0; i < Math.min(tags.length, 10); i++) {
  const { tag, version, date } = tags[i];
  const prevTag = tags[i + 1]?.tag ?? "";

  let commits = "";
  try {
    const range = prevTag ? `${prevTag}..${tag}` : tag;
    commits = execSync(
      `cd ${CMS_REPO} && git log ${range} --pretty=format:"- %s" --no-merges 2>/dev/null | head -20`,
      { encoding: "utf-8" }
    ).trim();
  } catch {
    commits = `- Release ${version}`;
  }

  const breaking = commits.toLowerCase().includes("breaking");
  const slug = `v${version.replace(/\./g, "-")}`;

  const doc = {
    id: randomUUID(),
    slug,
    status: "published",
    locale: "en",
    translationGroup: randomUUID(),
    data: {
      title: `Release ${version}`,
      version,
      date,
      content: `## Changes\n\n${commits}`,
      breaking,
      _seo: {
        metaTitle: `v${version} Release Notes — webhouse.app`,
        metaDescription: `Release notes for @webhouse/cms v${version}`,
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  writeFileSync(join(CONTENT_DIR, `${slug}.json`), JSON.stringify(doc, null, 2));
  console.log(`  ✓ ${slug} (${date})`);
  count++;
}

console.log(`\n✓ ${count} changelog entries created`);
