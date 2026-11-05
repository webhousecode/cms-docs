import { CANONICAL_ORIGIN } from "@/lib/brand";
import { cmsSitemap } from "@webhouse/cms/next";

export default cmsSitemap({
  baseUrl: CANONICAL_ORIGIN,
  collections: [
    { name: "docs", label: "Documentation", urlPrefix: "/docs" },
    { name: "changelog", label: "Changelog", urlPrefix: "/changelog" },
  ],
  defaultLocale: "en",
  locales: ["en", "da"],
  changeFrequency: "weekly",
});
