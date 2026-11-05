import { getBrand } from "@/lib/brand-server";
import { jsonResponse, listAiModules } from "../_lib";

// F212 — per request: the text follows the brand it is served under.
export const dynamic = "force-dynamic";

export async function GET() {
  const brand = await getBrand();
  const base = `https://${brand.aiGuide}`;
  return jsonResponse({
    entry: base,
    modules: listAiModules().map((m) => ({
      slug: m.slug,
      url: `${base}/${m.slug}`,
    })),
  });
}
