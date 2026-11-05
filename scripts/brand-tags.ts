/**
 * F212 — turn the product's name and addresses in a text into the brand name
 * tags that src/lib/brand.ts resolves per request. Used by the one-off content
 * migration (scripts/migrate-brand-tags.ts) and by the changelog generator, so
 * new text gets the same treatment as the old.
 *
 * Only the PRODUCT is tagged: webhouse.app and its docs/AI-guide addresses,
 * and the product name "WebHouse CMS". Technical names stay as they are —
 * npm packages (@webhouse/…), file names (webhouse-schema.json), environment
 * variables (WEBHOUSE_DATA_DIR), code (class Webhouse), Docker images and
 * source-code URLs (github.com/webhousecode/…), script names
 * (pnpm webhouse.app:ios) — because renaming them would make the instructions
 * wrong.
 *
 * Applying it twice changes nothing: tags contain no "webhouse".
 */

const RULES: Array<[RegExp, string]> = [
  // Deeper forms first: their pages sit under /docs and /ai on webhouse's own
  // addresses, but straight under the mount on a white-label address.
  [/docs\.webhouse\.app\/docs\b/g, "{{brand.docs.pages}}"],
  [/ai\.webhouse\.app\/ai\b/g, "{{brand.ai.guide}}"],
  [/docs\.webhouse\.app\b/g, "{{brand.docs}}"],
  [/ai\.webhouse\.app\b/g, "{{brand.ai}}"],
  // The product address — not inside another name (@x, x.webhouse.app,
  // x-webhouse.app) and not a script name such as "webhouse.app:ios".
  [/(?<![\w@.-])webhouse\.app(?!:[a-z])(?![\w])/g, "{{brand}}"],
  // The product name in prose.
  [/\bWebHouse CMS\b/g, "{{brand}}"],
];

export function tagBrand(text: string): string {
  let out = text;
  for (const [re, tag] of RULES) out = out.replace(re, tag);
  return out;
}

/**
 * tagBrand() on every string inside a JSON text, keeping the file's own
 * formatting. Works on the decoded strings: in the raw file a line break is
 * the two characters "\n", which would hide a word boundary from the rules.
 * A string is only re-encoded when it actually changed.
 */
export function tagBrandJson(raw: string): string {
  return raw.replace(/"(?:[^"\\]|\\.)*"/g, (literal) => {
    const value = JSON.parse(literal) as string;
    const tagged = tagBrand(value);
    return tagged === value ? literal : JSON.stringify(tagged);
  });
}
