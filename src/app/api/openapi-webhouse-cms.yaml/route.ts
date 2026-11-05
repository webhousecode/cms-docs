/**
 * GET /api/openapi-webhouse-cms.yaml — serves the OpenAPI spec.
 * Named distinctly so it doesn't get confused with project-specific openapi.yaml files.
 */
import { openApiResponse } from "@/lib/openapi";

export const dynamic = "force-dynamic";

export function GET() {
  return openApiResponse();
}
