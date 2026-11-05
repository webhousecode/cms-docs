/**
 * F212 — measures what a white-label reader sees. Renders every doc page
 * (and the other pages) as mounted for a test brand, takes the VISIBLE text
 * (no scripts, styles or attributes) plus the <title>, and lists every
 * "webhouse" that is not a technical name (npm package, file, env var, code,
 * Docker image, source URL). Exit 1 if any is left.
 *
 * Run against a running docs app: npx tsx scripts/check-white-label.ts http://localhost:3036
 */
import { readdirSync } from "fs";
import { join } from "path";

const base = process.argv[2] ?? "http://localhost:3036";
const brand = JSON.stringify({ id: "test-brand", address: "cms.example.test", locale: "da" });

/** Technical names that keep "webhouse" because renaming them would make
 *  the instructions wrong. */
const TECHNICAL = [
  /@webhouse\/[\w-]+/gi, // npm packages
  /webhouse-schema(\.json)?/gi, // schema file
  /\$?WEBHOUSE_[A-Z_]+/g, // env vars
  /[\w./-]*webhousecode[\w./-]*/gi, // GitHub org / Docker images / source URLs
  /x-webhouse-[\w*-]+/gi, // JSON-schema keys
  /\bWebhouse(Document|Reader)?\b(?=[\s<>(){}\[\]?:;.,]|$)/g, // code class names
  /\.webhouse\//g, // config dir
  /app\.webhouse\.[\w.]+/g, // mobile bundle id
  /webhouse\.app:(ios|android)/g, // pnpm script names
  /webhouse:webhouse/g, // unix user:group in Dockerfiles
];

/** Code blocks and inline code hold program text (class names, paths, cache
 *  keys); they are counted separately and not held to the prose rule. */
function stripCode(html: string): string {
  return html.replace(/<pre[\s\S]*?<\/pre>/g, " ").replace(/<code[\s\S]*?<\/code>/g, " ");
}

function visibleText(html: string): string {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const body = stripCode(html)
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
  return `${title}\n${body}`;
}

async function main() {
  const slugs = readdirSync(join(__dirname, "..", "content", "docs")).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
  const paths = [...slugs.map((s) => `/docs/${s}`), "/docs/tags", "/docs/_/changelog", "/docs/_/api-reference", "/docs/_/openapi-webhouse-cms.yaml"];
  const left: string[] = [];
  let pages = 0;
  let inCode = 0;
  for (const p of paths) {
    const res = await fetch(base + p, { headers: { "x-docs-brand": brand } });
    if (res.status !== 200) { left.push(`${p}: HTTP ${res.status}`); continue; }
    pages++;
    const raw = await res.text();
    if (!p.endsWith(".yaml")) {
      const code = (raw.match(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g) ?? []).join(" ").replace(/<[^>]+>/g, "");
      inCode += (code.match(/webhouse/gi) ?? []).length;
    }
    let text = p.endsWith(".yaml") ? raw : visibleText(raw);
    for (const re of TECHNICAL) text = text.replace(re, " ");
    for (const m of text.matchAll(/.{0,40}webhouse.{0,40}/gi)) left.push(`${p}: …${m[0].replace(/\s+/g, " ")}…`);
  }
  console.log(`${pages}/${paths.length} pages rendered as mounted; ${left.length} "webhouse" left in prose and titles`);
  console.log(`(${inCode} more inside code examples — class names, paths, package ids — not held to the prose rule)`);
  for (const l of left) console.log("  " + l);
  process.exit(left.length ? 1 : 0);
}
main();
