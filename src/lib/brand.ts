/**
 * F212 — white-label docs. The docs run on their own address
 * (docs.webhouse.app) AND mounted under /docs on a white-label CMS address
 * (e.g. cms.fysio.work/docs), where cms-admin forwards the request and names
 * the brand in the `x-docs-brand` header. cms-admin's brand pack is the one
 * source of the brand's data; this file only reads and validates it.
 *
 * Content carries name tags instead of the product's address:
 *   {{brand}}             → webhouse.app            | cms.fysio.work
 *   {{brand.docs}}        → docs.webhouse.app       | cms.fysio.work/docs
 *   {{brand.docs.pages}}  → docs.webhouse.app/docs  | cms.fysio.work/docs
 *   {{brand.ai}}          → ai.webhouse.app         | cms.fysio.work/docs/_/ai
 *   {{brand.ai.guide}}    → ai.webhouse.app/ai      | cms.fysio.work/docs/_/ai
 * (two forms each for docs and AI guide, because their pages sit one path
 * level deeper on webhouse's own addresses than on a mount).
 */

export const BRAND_HEADER = "x-docs-brand";

/** Where the docs app's own root pages and files live when mounted: the
 *  proxy rewrites /docs/_/x → /x. Doc pages keep their /docs/<slug> path. */
export const MOUNT_ROOT = "/docs/_";

/** The canonical address of these docs — where search engines are pointed
 *  from a mounted copy. */
export const CANONICAL_ORIGIN = "https://docs.webhouse.app";

export interface DocsBrand {
  id: string;
  /** The address that names the product, e.g. "webhouse.app". */
  address: string;
  /** Address of these docs, without protocol. */
  docs: string;
  /** Base of the doc pages (/docs/<slug> lives under it), without protocol. */
  docsPages: string;
  /** Address of the AI guide, without protocol. */
  ai: string;
  /** Base of the AI guide's modules, without protocol. */
  aiGuide: string;
  /** True when served under /docs on a white-label address. */
  mounted: boolean;
  /** Language the docs open in. */
  locale: "en" | "da";
  color?: string;
  colorForeground?: string;
  colorDark?: string;
  colorDarkForeground?: string;
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
  fontFamily?: string;
  fontStylesheet?: string;
}

export const DEFAULT_BRAND: DocsBrand = {
  id: "webhouse",
  address: "webhouse.app",
  docs: "docs.webhouse.app",
  docsPages: "docs.webhouse.app/docs",
  ai: "ai.webhouse.app",
  aiGuide: "ai.webhouse.app/ai",
  mounted: false,
  locale: "en",
};

const ID = /^[a-z0-9-]{1,40}$/;
const HOST = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;
const HEX = /^#[0-9a-fA-F]{6}$/;
/** Brand files are served by cms-admin on the same address under /brands/. */
const BRAND_FILE = /^\/brands\/[a-z0-9-]+\/[A-Za-z0-9._-]+$/;
const FONT_FAMILY = /^[A-Za-z0-9 -]{1,40}$/;

function pick(value: unknown, re: RegExp): string | undefined {
  return typeof value === "string" && re.test(value) ? value : undefined;
}

/**
 * The brand named by the header, or the default brand. Every value is
 * validated: an invalid header gives the default brand, never a partial one.
 * A forged header only changes the forger's own response (nothing is cached
 * across requests), so this is a correctness check, not an auth check.
 */
export function parseBrandHeader(raw: string | null | undefined): DocsBrand {
  if (!raw) return DEFAULT_BRAND;
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return DEFAULT_BRAND;
  }
  const id = pick(data.id, ID);
  const address = pick(data.address, HOST);
  if (!id || !address || data === null) return DEFAULT_BRAND;
  return {
    id,
    address,
    docs: `${address}/docs`,
    docsPages: `${address}/docs`,
    ai: `${address}${MOUNT_ROOT}/ai`,
    aiGuide: `${address}${MOUNT_ROOT}/ai`,
    mounted: true,
    locale: data.locale === "da" ? "da" : "en",
    color: pick(data.color, HEX),
    colorForeground: pick(data.colorForeground, HEX),
    colorDark: pick(data.colorDark, HEX),
    colorDarkForeground: pick(data.colorDarkForeground, HEX),
    logoLight: pick(data.logoLight, BRAND_FILE),
    logoDark: pick(data.logoDark, BRAND_FILE),
    favicon: pick(data.favicon, BRAND_FILE),
    fontFamily: pick(data.fontFamily, FONT_FAMILY),
    fontStylesheet: pick(data.fontStylesheet, BRAND_FILE),
  };
}

/** Replace the name tags in a text with this brand's values. */
export function applyBrand(text: string, brand: DocsBrand): string {
  return text
    .replaceAll("{{brand.docs.pages}}", brand.docsPages)
    .replaceAll("{{brand.ai.guide}}", brand.aiGuide)
    .replaceAll("{{brand.docs}}", brand.docs)
    .replaceAll("{{brand.ai}}", brand.ai)
    .replaceAll("{{brand}}", brand.address);
}

/**
 * The path a link must use for this brand. Unmounted: unchanged. Mounted:
 * "/" → "/docs", doc pages (/docs/...) unchanged, any other root path
 * (/changelog, /screenshots/x.png, …) → /docs/_/…. External links, anchors
 * and protocol-relative URLs are never touched.
 */
export function mountPath(path: string, brand: Pick<DocsBrand, "mounted">): string {
  if (!brand.mounted) return path;
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path === "/") return "/docs";
  if (path === "/docs" || path.startsWith("/docs/") || path.startsWith("/docs?") || path.startsWith("/docs#")) return path;
  return `${MOUNT_ROOT}${path}`;
}
