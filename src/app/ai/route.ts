import { getBrand } from "@/lib/brand-server";
import { markdownResponse, readAiFile } from "./_lib";

// F212 — per request: the text follows the brand it is served under.
export const dynamic = "force-dynamic";

export async function GET() {
  const brand = await getBrand();
  return markdownResponse(readAiFile("_walkthrough.md", brand));
}
