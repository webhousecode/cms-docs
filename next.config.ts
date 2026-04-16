import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/ai": ["./src/ai-guide/**/*.md"],
    "/ai/[slug]": ["./src/ai-guide/**/*.md"],
    "/ai/llms.txt": ["./src/ai-guide/**/*.md"],
    "/ai/manifest.json": ["./src/ai-guide/**/*.md"],
    "/ai/index.json": ["./src/ai-guide/**/*.md"],
  },
};

export default nextConfig;
