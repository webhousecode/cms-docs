import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // F212 — build assets under /docs/_ so they load on a white-label mount
  // (cms.<brand>/docs/_/_next/…, forwarded here). src/proxy.ts rewrites
  // /docs/_/x → /x on every address, docs.webhouse.app included.
  assetPrefix: "/docs/_",
  outputFileTracingIncludes: {
    "/ai": ["./src/ai-guide/**/*.md"],
    "/ai/[slug]": ["./src/ai-guide/**/*.md"],
    "/ai/llms.txt": ["./src/ai-guide/**/*.md"],
    "/ai/manifest.json": ["./src/ai-guide/**/*.md"],
    "/ai/index.json": ["./src/ai-guide/**/*.md"],
  },
};

export default nextConfig;
