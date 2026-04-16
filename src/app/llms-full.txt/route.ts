import { cmsLlmsFullTxt } from "@webhouse/cms/next";

export const dynamic = "force-static";

export const GET = cmsLlmsFullTxt({
  baseUrl: "https://docs.webhouse.app",
  siteTitle: "webhouse.app Docs",
  siteDescription:
    "Documentation for @webhouse/cms — the AI-native, file-based, framework-agnostic CMS.",
  collections: [
    { name: "docs", label: "Documentation", urlPrefix: "/docs" },
    { name: "changelog", label: "Changelog", urlPrefix: "/changelog" },
  ],
  defaultLocale: "en",
  locales: ["en", "da"],
});
