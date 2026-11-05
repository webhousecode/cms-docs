import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { applyBrand, type DocsBrand } from "@/lib/brand";

const AI_GUIDE_DIR = join(process.cwd(), "src", "ai-guide");

/** F212 — an AI-guide module with its name tags resolved for the brand. */
export function readAiFile(filename: string, brand: DocsBrand): string {
  return applyBrand(readFileSync(join(AI_GUIDE_DIR, filename), "utf-8"), brand);
}

export function listAiModules(): Array<{ slug: string; filename: string }> {
  return readdirSync(AI_GUIDE_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "index.md")
    .sort()
    .map((filename) => ({ slug: filename.replace(/\.md$/, ""), filename }));
}

export function markdownResponse(body: string, cacheSeconds = 300): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": `public, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
      "x-robots-tag": "noindex",
    },
  });
}

export function textResponse(body: string, cacheSeconds = 300): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": `public, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
      "x-robots-tag": "noindex",
    },
  });
}

export function jsonResponse(body: unknown, cacheSeconds = 300): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
      "x-robots-tag": "noindex",
    },
  });
}
