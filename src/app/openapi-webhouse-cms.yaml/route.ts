/** GET /openapi-webhouse-cms.yaml — the spec at its long-standing public path. */
import { openApiResponse } from "@/lib/openapi";

export const dynamic = "force-dynamic";

export function GET() {
  return openApiResponse();
}
