import { markdownResponse, readAiFile } from "./_lib";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(readAiFile("_walkthrough.md"));
}
