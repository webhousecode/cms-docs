import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { applyBrand } from "./brand";
import { getBrand } from "./brand-server";

/** F212 — the OpenAPI spec with its name tags resolved for the request's
 *  brand. The source lives in content/ (not public/) so it is never served
 *  with the tags unresolved. */
export async function openApiResponse(): Promise<Response> {
  const yaml = readFileSync(join(process.cwd(), "content", "openapi-webhouse-cms.yaml"), "utf-8");
  return new NextResponse(applyBrand(yaml, await getBrand()), {
    headers: {
      "Content-Type": "application/yaml; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
