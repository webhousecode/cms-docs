/**
 * Generate complete changelog from repo history — all tags + pre-tag period.
 * Run: npx tsx scripts/seed-full-changelog.ts
 */
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const CMS_REPO = "/Users/cb/Apps/webhouse/cms";
const CONTENT_DIR = join(__dirname, "..", "content", "changelog");
mkdirSync(CONTENT_DIR, { recursive: true });

// Clean existing changelog files
for (const f of readdirSync(CONTENT_DIR).filter(f => f.endsWith(".json"))) {
  unlinkSync(join(CONTENT_DIR, f));
}

function git(cmd: string): string {
  return execSync(`cd ${CMS_REPO} && ${cmd}`, { encoding: "utf-8" }).trim();
}

function writeEntry(slug: string, data: Record<string, unknown>) {
  const doc = {
    id: randomUUID(),
    slug,
    status: "published",
    locale: "en",
    translationGroup: randomUUID(),
    data: {
      ...data,
      _seo: {
        metaTitle: `${data.title} — webhouse.app Changelog`,
        metaDescription: `Release notes for @webhouse/cms ${data.version ?? slug}`,
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(join(CONTENT_DIR, `${slug}.json`), JSON.stringify(doc, null, 2));
}

// Get all tags sorted by version
const tagsRaw = git(`git tag -l 'v*' --sort=version:refname --format='%(refname:short)|%(creatordate:iso-strict)'`);
const tags = tagsRaw.split("\n").map(line => {
  const [tag, date] = line.split("|");
  return { tag, version: tag.replace(/^v/, ""), date: date?.split("T")[0] ?? "" };
});

// ── Pre-release period (first commit → v0.2.0) ──
const firstCommitDate = git(`git log --reverse --format='%ci' | head -1`).split(" ")[0];
const preReleaseCommits = git(`git log v0.2.0 --reverse --pretty=format:"%s" --no-merges`).split("\n");

// Group pre-release by type
const features: string[] = [];
const fixes: string[] = [];
const docs: string[] = [];
const other: string[] = [];

for (const msg of preReleaseCommits) {
  const clean = msg.replace(/^"/, "").replace(/"$/, "");
  if (clean.startsWith("feat:") || clean.startsWith("feat(")) features.push(clean);
  else if (clean.startsWith("fix:") || clean.startsWith("fix(")) fixes.push(clean);
  else if (clean.startsWith("docs:") || clean.startsWith("doc:")) docs.push(clean);
  else if (clean.length > 5) other.push(clean);
}

let preContent = `## Foundation Phase\n\nThe initial development period building the core CMS engine, admin UI, and tooling from scratch.\n\n**${preReleaseCommits.length} commits** from ${firstCommitDate} to ${tags[0].date}\n\n`;

if (features.length > 0) {
  preContent += `### Features\n\n`;
  for (const f of features.slice(0, 40)) preContent += `- ${f}\n`;
  if (features.length > 40) preContent += `- ... and ${features.length - 40} more features\n`;
  preContent += "\n";
}
if (fixes.length > 0) {
  preContent += `### Bug Fixes\n\n`;
  for (const f of fixes.slice(0, 20)) preContent += `- ${f}\n`;
  if (fixes.length > 20) preContent += `- ... and ${fixes.length - 20} more fixes\n`;
  preContent += "\n";
}

writeEntry("v0-0-1-foundation", {
  title: "Foundation — Initial Development",
  version: "0.0.1",
  date: firstCommitDate,
  content: preContent,
  breaking: false,
});
console.log(`  ✓ v0-0-1-foundation (${firstCommitDate} — ${preReleaseCommits.length} commits)`);

// ── Tagged releases ──
for (let i = 0; i < tags.length; i++) {
  const { tag, version, date } = tags[i];
  const prevTag = i > 0 ? tags[i - 1].tag : "";

  let commits: string;
  try {
    const range = prevTag ? `${prevTag}..${tag}` : tag;
    commits = git(`git log ${range} --pretty=format:"- %s" --no-merges 2>/dev/null`);
  } catch {
    commits = `- Release ${version}`;
  }

  const lines = commits.split("\n").filter(l => l.trim());
  const breaking = lines.some(l => l.toLowerCase().includes("breaking"));

  // Categorize commits
  const featLines = lines.filter(l => l.includes("feat:") || l.includes("feat("));
  const fixLines = lines.filter(l => l.includes("fix:") || l.includes("fix("));
  const otherLines = lines.filter(l => !l.includes("feat:") && !l.includes("feat(") && !l.includes("fix:") && !l.includes("fix("));

  let content = `## What's New in v${version}\n\n`;
  content += `**${lines.length} changes** released on ${date}\n\n`;

  if (featLines.length > 0) {
    content += `### Features\n\n${featLines.join("\n")}\n\n`;
  }
  if (fixLines.length > 0) {
    content += `### Bug Fixes\n\n${fixLines.join("\n")}\n\n`;
  }
  if (otherLines.length > 0) {
    content += `### Other Changes\n\n${otherLines.join("\n")}\n\n`;
  }

  const slug = `v${version.replace(/\./g, "-")}`;
  writeEntry(slug, {
    title: `Release v${version}`,
    version,
    date,
    content,
    breaking,
  });
  console.log(`  ✓ ${slug} (${date} — ${lines.length} changes)`);
}

// ── Post-latest-tag (unreleased) ──
const latestTag = tags[tags.length - 1].tag;
let unreleasedRaw: string;
try {
  unreleasedRaw = git(`git log ${latestTag}..HEAD --pretty=format:"- %s" --no-merges`);
} catch {
  unreleasedRaw = "";
}

if (unreleasedRaw.trim()) {
  const unreleasedLines = unreleasedRaw.split("\n").filter(l => l.trim());
  const today = new Date().toISOString().split("T")[0];

  let content = `## Unreleased Changes\n\n`;
  content += `**${unreleasedLines.length} changes** since v${tags[tags.length - 1].version}\n\n`;

  const ufeat = unreleasedLines.filter(l => l.includes("feat:") || l.includes("feat("));
  const ufix = unreleasedLines.filter(l => l.includes("fix:") || l.includes("fix("));
  const uother = unreleasedLines.filter(l => !l.includes("feat:") && !l.includes("feat(") && !l.includes("fix:") && !l.includes("fix("));

  if (ufeat.length > 0) content += `### Features\n\n${ufeat.join("\n")}\n\n`;
  if (ufix.length > 0) content += `### Bug Fixes\n\n${ufix.join("\n")}\n\n`;
  if (uother.length > 0) content += `### Other Changes\n\n${uother.join("\n")}\n\n`;

  writeEntry("unreleased", {
    title: "Unreleased",
    version: "next",
    date: today,
    content,
    breaking: false,
  });
  console.log(`  ✓ unreleased (${unreleasedLines.length} changes since ${latestTag})`);
}

console.log(`\n✓ Complete changelog generated`);
