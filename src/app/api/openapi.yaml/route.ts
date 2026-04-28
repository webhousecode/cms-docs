/**
 * GET /api/openapi.yaml — serves the OpenAPI spec for the Redoc viewer
 * and for tools like Postman, Insomnia, or code generators.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Spec lives in the CMS repo — docs site reads it at build/runtime.
    // For production (Fly.io), copy openapi.yml into public/openapi.yaml at build time.
    let yaml: string;
    try {
      yaml = readFileSync(join(process.cwd(), "public", "openapi.yaml"), "utf-8");
    } catch {
      // Dev fallback: read from the cms repo relative path
      yaml = readFileSync(
        join(process.cwd(), "..", "cms", "docs", "openapi.yml"),
        "utf-8"
      );
    }
    return new NextResponse(yaml, {
      headers: {
        "Content-Type": "application/yaml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json({ error: "OpenAPI spec not found" }, { status: 404 });
  }
}
