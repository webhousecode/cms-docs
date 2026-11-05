import { getBrand } from "@/lib/brand-server";
import { markdownResponse, readAiFile } from "../_lib";

// F212 — per request: the text follows the brand it is served under.
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const brand = await getBrand();
  const { slug } = await params;
  const safe = slug.replace(/\.md$/, "");

  if (!/^[a-z0-9][a-z0-9-]*$/i.test(safe) || safe.startsWith("_")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    return markdownResponse(readAiFile(`${safe}.md`, brand));
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
