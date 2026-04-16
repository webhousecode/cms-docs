import { jsonResponse, listAiModules } from "../_lib";

export const dynamic = "force-static";

export function GET() {
  const base = "https://ai.webhouse.app/ai";
  return jsonResponse({
    entry: base,
    modules: listAiModules().map((m) => ({
      slug: m.slug,
      url: `${base}/${m.slug}`,
    })),
  });
}
