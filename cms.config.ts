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
        {
          name: "tags",
          type: "select",
          multiple: true,
          options: [
            // Deploy targets
            { label: "Deploy: Docker",         value: "deploy-docker" },
            { label: "Deploy: Fly.io",         value: "deploy-fly" },
            { label: "Deploy: GitHub Pages",   value: "deploy-github-pages" },
            { label: "Deploy: Vercel",         value: "deploy-vercel" },
            { label: "Deploy: Cloudflare",     value: "deploy-cloudflare" },
            // AI capabilities
            { label: "AI Agents",              value: "ai-agents" },
            { label: "AI Budget",              value: "ai-budget" },
            { label: "AI Prompts",             value: "ai-prompts" },
            { label: "Chat",                   value: "chat" },
            { label: "Translation",            value: "translation" },
            // Content modelling
            { label: "Schema",                 value: "schema" },
            { label: "Richtext",               value: "richtext" },
            { label: "Blocks",                 value: "blocks" },
            { label: "Shortcodes",             value: "shortcodes" },
            { label: "Media",                  value: "media" },
            { label: "Relationships",          value: "relationships" },
            { label: "Interactives",           value: "interactives" },
            // I18n & discovery
            { label: "i18n",                   value: "i18n" },
            { label: "SEO",                    value: "seo" },
            { label: "GEO",                    value: "geo" },
            // Auth & security
            { label: "Auth",                   value: "auth" },
            { label: "Permissions",            value: "permissions" },
            { label: "Access Tokens",          value: "access-tokens" },
            // Integrations
            { label: "MCP",                    value: "mcp" },
            { label: "Webhooks",               value: "webhooks" },
            { label: "Next.js",                value: "nextjs" },
            { label: "Mobile",                 value: "mobile" },
            { label: "Frameworks",             value: "frameworks" },
            // Admin features
            { label: "Forms",                  value: "forms" },
            { label: "Backup",                 value: "backup" },
            { label: "Analytics",              value: "analytics" },
            // Core
            { label: "Architecture",           value: "architecture" },
            { label: "CLI",                    value: "cli" },
            { label: "GitHub Adapter",         value: "github-adapter" },
            { label: "Filesystem Adapter",     value: "filesystem-adapter" },
            { label: "Migration",              value: "migration" },
          ],
        },
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
