import { cmsSitemap } from "@webhouse/cms/next";

export default cmsSitemap({
  baseUrl: "https://docs.webhouse.app",
  collections: [
    { name: "docs", label: "Documentation", urlPrefix: "/docs" },
    { name: "changelog", label: "Changelog", urlPrefix: "/changelog" },
  ],
  defaultLocale: "en",
  locales: ["en", "da"],
  changeFrequency: "weekly",
});
