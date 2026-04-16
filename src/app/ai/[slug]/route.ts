import { markdownResponse, readAiFile } from "../_lib";

export const dynamic = "force-static";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const safe = slug.replace(/\.md$/, "");

  if (!/^[a-z0-9][a-z0-9-]*$/i.test(safe) || safe.startsWith("_")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    return markdownResponse(readAiFile(`${safe}.md`));
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export async function generateStaticParams() {
  const { listAiModules } = await import("../_lib");
  return listAiModules().map((m) => ({ slug: m.slug }));
}
