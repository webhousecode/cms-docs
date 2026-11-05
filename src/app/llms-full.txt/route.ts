import { cmsLlmsFullTxt } from "@webhouse/cms/next";

import { applyBrand } from "@/lib/brand";
import { getBrand } from "@/lib/brand-server";

// F212 — per request, so the content's name tags follow the brand.
export const dynamic = "force-dynamic";

const llms = cmsLlmsFullTxt({
  baseUrl: "https://docs.webhouse.app",
  siteTitle: "{{brand}} Docs",
  siteDescription:
    "Documentation for @webhouse/cms — the AI-native, file-based, framework-agnostic CMS.",
  collections: [
    { name: "docs", label: "Documentation", urlPrefix: "/docs" },
    { name: "changelog", label: "Changelog", urlPrefix: "/changelog" },
  ],
  defaultLocale: "en",
  locales: ["en", "da"],
});

export async function GET() {
  const res = llms();
  return new Response(applyBrand(await res.text(), await getBrand()), {
    status: res.status,
    headers: res.headers,
  });
}
