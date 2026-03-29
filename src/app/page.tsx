import Link from "next/link";
import { getCollection } from "@/lib/content";
import {
  BookOpen,
  Terminal,
  Blocks,
  Globe,
  Cpu,
  Search,
  Palette,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Terminal,
    title: "File-based & Git-friendly",
    description:
      "Content stored as JSON files in your repo. Version control, branching, and PR-based workflows built in.",
  },
  {
    icon: Cpu,
    title: "AI-native engine",
    description:
      "Built-in agents for content generation, SEO optimization, translation, and proofreading.",
  },
  {
    icon: Blocks,
    title: "22 field types",
    description:
      "Text, richtext, images, galleries, blocks, relations, maps, interactives, and more.",
  },
  {
    icon: Globe,
    title: "i18n from day one",
    description:
      "Multi-language content with translation groups, AI translation, and locale routing.",
  },
  {
    icon: Search,
    title: "SEO + GEO scoring",
    description:
      "Dual visibility scoring — optimize for search engines AND AI platforms like ChatGPT and Claude.",
  },
  {
    icon: Palette,
    title: "Visual admin UI",
    description:
      "Full-featured editor with rich text, blocks, media library, scheduling, and curation queue.",
  },
  {
    icon: Zap,
    title: "Static-first output",
    description:
      "9-phase build pipeline: HTML, sitemap, robots.txt, RSS, llms.txt, per-page markdown.",
  },
  {
    icon: BookOpen,
    title: "TypeScript-first config",
    description:
      "Type-safe cms.config.ts with defineConfig, defineCollection, defineBlock helpers.",
  },
];

export default function HomePage() {
  const docCount = getCollection("docs").filter(
    (d) => (d.locale ?? "en") === "en"
  ).length;

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
          maxWidth: "52rem",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.8rem",
            borderRadius: 20,
            border: "1px solid var(--border)",
            fontSize: "0.75rem",
            color: "var(--fg-muted)",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          v0.2.13 — Now in active development
        </div>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          The AI-native CMS
          <br />
          <span style={{ color: "var(--color-gold)" }}>
            for TypeScript projects
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            color: "var(--fg-muted)",
            maxWidth: "36rem",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          File-based content, visual admin UI, AI content generation, and a
          static build pipeline — all configured in a single{" "}
          <code
            style={{
              background: "rgba(247,187,46,0.1)",
              color: "#F7BB2E",
              padding: "0.15em 0.4em",
              borderRadius: 4,
              fontSize: "0.95em",
              border: "1px solid rgba(247,187,46,0.15)",
            }}
          >
            cms.config.ts
          </code>
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/docs/quick-start"
            style={{
              padding: "0.65rem 1.5rem",
              background: "var(--color-gold)",
              color: "#000",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Get Started
          </Link>
          <a
            href="https://github.com/webhousecode/cms"
            target="_blank"
            rel="noopener"
            style={{
              padding: "0.65rem 1.5rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--fg)",
              fontWeight: 500,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Install command */}
      <section
        style={{
          maxWidth: "32rem",
          margin: "0 auto 4rem",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            background: "#1a1a2e",
            border: "1px solid #2a2a3e",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "0.5rem 0.75rem",
              borderBottom: "1px solid #2a2a3e",
              background: "#161628",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ffbd2e",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
          </div>
          <div
            style={{
              padding: "1rem 1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "#e5e5e5",
            }}
          >
            <span style={{ color: "#888" }}>$</span> npm create @webhouse/cms
            my-site
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Everything you need
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--fg-muted)",
            marginBottom: "2.5rem",
            fontSize: "0.95rem",
          }}
        >
          A complete CMS engine — not just a content layer
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                style={{
                  padding: "1.25rem",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--bg-secondary)",
                }}
              >
                <Icon
                  size={20}
                  style={{ color: "var(--color-gold)", marginBottom: "0.75rem" }}
                />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--fg-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Docs stats */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--fg-muted)",
            fontSize: "0.85rem",
            marginBottom: "1rem",
          }}
        >
          {docCount} documentation pages · English + Danish · Open source
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/docs/introduction"
            style={{
              padding: "0.5rem 1.25rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--fg)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Read the docs
          </Link>
          <Link
            href="/changelog"
            style={{
              padding: "0.5rem 1.25rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--fg-muted)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Changelog
          </Link>
        </div>
      </section>
    </div>
  );
}
