import { cmsLlmsTxt } from "@webhouse/cms/next";

export const dynamic = "force-static";

export const GET = cmsLlmsTxt({
  baseUrl: "https://docs.webhouse.app",
  siteTitle: "webhouse.app Docs",
  siteDescription:
    "Documentation for @webhouse/cms — the AI-native, file-based, framework-agnostic CMS. See also /ai for the AI Builder Site.",
  collections: [
    { name: "docs", label: "Documentation", urlPrefix: "/docs" },
    { name: "changelog", label: "Changelog", urlPrefix: "/changelog" },
  ],
  defaultLocale: "en",
  locales: ["en", "da"],
});
