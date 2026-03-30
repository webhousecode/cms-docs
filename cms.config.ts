import { defineConfig, defineCollection } from "@webhouse/cms";

export default defineConfig({
  collections: [
    defineCollection({
      name: "docs",
      label: "Documentation",
      urlPrefix: "/docs",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "content", type: "richtext" },
        {
          name: "category",
          type: "select",
          options: [
            { label: "Getting Started", value: "getting-started" },
            { label: "Guides", value: "guides" },
            { label: "Configuration", value: "config" },
            { label: "CLI", value: "cli" },
            { label: "Concepts", value: "concepts" },
            { label: "Deployment", value: "deployment" },
            { label: "API Reference", value: "api-reference" },
            { label: "Tips & Tricks", value: "tips" },
          ],
        },
        { name: "order", type: "number" },
        { name: "helpCardId", type: "text" },
      ],
    }),
    defineCollection({
      name: "changelog",
      label: "Changelog",
      urlPrefix: "/changelog",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "version", type: "text", required: true },
        { name: "date", type: "date", required: true },
        { name: "content", type: "richtext" },
        { name: "breaking", type: "boolean" },
      ],
    }),
    defineCollection({
      name: "snippets",
      label: "Shared Snippets",
      urlPrefix: "/snippets",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "code", type: "textarea", required: true },
        { name: "lang", type: "text" },
      ],
    }),
  ],
  storage: {
    adapter: "filesystem",
    filesystem: { contentDir: "content" },
  },
  build: {
    outDir: ".next",
    baseUrl: "https://docs.webhouse.app",
  },
});
