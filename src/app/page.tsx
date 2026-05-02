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
  HelpCircle,
  FileText,
  Bot,
  Shield,
  Image,
  Plug,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "AI Agent Orchestration",
    description:
      "Provider-agnostic agents for content generation, rewriting, translation, and SEO optimization. Swap between Anthropic, OpenAI, or local models.",
    tag: "@webhouse/cms-ai",
    href: "/docs/ai-agents",
  },
  {
    icon: FileText,
    title: "Schema-Driven Content",
    description:
      "22 field types. Collections and blocks defined in TypeScript. Every piece of content is typed, validated, and introspectable.",
    tag: "cms.config.ts",
    href: "/docs/field-types",
  },
  {
    icon: Zap,
    title: "Static-First Output",
    description:
      "9-phase build pipeline: HTML, sitemap, robots.txt, RSS, llms.txt, per-page markdown. Zero runtime JS unless you opt in.",
    tag: "npx cms build",
    href: "/docs/build-guide",
  },
  {
    icon: Plug,
    title: "Framework Adapters",
    description:
      "First-class Next.js integration (App Router, Server Components, ISR). Also works with Astro, plain Node.js, or any static host.",
    tag: "Next.js · Astro · Node",
    href: "/docs/nextjs-guide",
  },
  {
    icon: Image,
    title: "Media Pipeline",
    description:
      "Sharp-based image processing with AI-generated captions and alt text. WebP conversion, responsive variants, EXIF extraction.",
    tag: "Sharp · AI Analysis",
    href: "/docs/media",
  },
  {
    icon: Shield,
    title: "AI Lock System",
    description:
      "Field-level protection. AI agents can never overwrite human edits. WriteContext actor threading through all CRUD operations.",
    tag: "AI Lock",
    href: "/docs/ai-lock",
  },
  {
    icon: Globe,
    title: "i18n from Day One",
    description:
      "Translation groups link documents across locales. AI auto-translates. Hreflang, locale routing, and language switcher built in.",
    tag: "F48 i18n",
    href: "/docs/i18n",
  },
  {
    icon: Search,
    title: "SEO + GEO Visibility",
    description:
      "Dual scoring: 13 SEO rules for search engines + 8 GEO rules for AI citation. Combined Visibility dashboard in admin.",
    tag: "F112 GEO",
    href: "/docs/seo",
  },
  {
    icon: Bot,
    title: "Chat with your site",
    description:
      "Built-in AI chat that knows your content, schema, and configuration. Ask questions, get answers with citations from your own docs.",
    tag: "F107 Chat",
    href: "/docs/chat",
  },
];

const STATS = [
  { value: "<3min", label: "AI scaffold time" },
  { value: "<50", label: "Lines of CMS code" },
  { value: "95+", label: "Lighthouse score" },
  { value: "0", label: "Runtime JS in output" },
];

export default function HomePage() {
  const enDocs = getCollection("docs").filter(
    (d) => (d.locale ?? "en") === "en"
  );
  const daDocs = getCollection("docs").filter((d) => d.locale === "da");
  const changelogCount = getCollection("changelog").length;

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "5rem 1.5rem 3rem",
          textAlign: "center",
          maxWidth: "54rem",
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
          v0.2.13 — Open source · MIT License
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
          Documentation for
          <br />
          webhouse<span style={{ color: "var(--color-gold)" }}>.app</span>
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--fg-muted)",
            maxWidth: "38rem",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          The AI-native content engine. Framework-agnostic file-based JSON
          content, visual admin UI, AI agents, workflows, and a static build
          pipeline. Your content as flat JSON — render it with{" "}
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
            Next.js, Laravel, Django, C#, Rails
          </code>
          , or anything that reads files.
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
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
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
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/docs/introduction"
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
            Read the Docs
          </Link>
          <Link
            href="/docs/hot-features"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.65rem 1.5rem",
              border: "1px solid var(--color-gold)",
              borderRadius: 8,
              color: "var(--color-gold)",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
            title="What's new and worth knowing right now"
          >
            🔥 Hot Features
          </Link>
          <a
            href="https://github.com/webhousecode/cms"
            target="_blank"
            rel="noopener"
            style={{
              padding: "0.65rem 1.5rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--fg-muted)",
              fontWeight: 500,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </div>
      </section>

      {/* ── Terminal ── */}
      <section
        style={{
          maxWidth: "36rem",
          margin: "0 auto 2.5rem",
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
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div
            style={{
              padding: "1rem 1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: "#e5e5e5" }}>
              <span style={{ color: "#888" }}>$</span> npx @webhouse/cms init
              --framework next
            </div>
            <div style={{ color: "#4ade80" }}>✓ Created cms.config.ts</div>
            <div style={{ color: "#4ade80" }}>✓ Schema definitions ready</div>
            <div style={{ color: "#4ade80" }}>✓ AI agents configured</div>
            <div style={{ color: "#4ade80" }}>
              ✓ Admin dashboard at localhost:3000/admin
            </div>
            <div style={{ color: "#e5e5e5", marginTop: "0.25rem" }}>
              <span style={{ color: "#888" }}>$</span> Ready in 847ms
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          flexWrap: "wrap",
          padding: "0 1.5rem 4rem",
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "var(--color-gold)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── Features grid ── */}
      <section
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-gold)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}
        >
          Features
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            lineHeight: 1.3,
          }}
        >
          Everything the AI
          <br />
          shouldn&apos;t reinvent.
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--fg-muted)",
            marginBottom: "2.5rem",
            fontSize: "0.95rem",
            maxWidth: "32rem",
            margin: "0 auto 2.5rem",
          }}
        >
          Content modeling, persistence, media pipelines, AI orchestration, and
          static output — all in one embeddable TypeScript library.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "1rem",
          }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const Wrapper = f.href ? Link : "div";
            return (
              <Wrapper
                key={f.title}
                href={f.href ?? ""}
                style={{
                  display: "block", // Next.js Link defaults to inline — without this the card shrinks to content width on mobile
                  padding: "1.25rem",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--bg-secondary)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <Icon size={20} style={{ color: "var(--color-gold)" }} />
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--fg-muted)",
                      padding: "0.15rem 0.4rem",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
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
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* ── HelpCards + Docs Connection ── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "4rem 1.5rem",
          maxWidth: "54rem",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <HelpCircle size={20} style={{ color: "var(--color-gold)" }} />
              <span
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Contextual Help
              </span>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Docs that live
              <br />
              inside your editor.
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              Every page in the CMS admin has contextual <strong>HelpCards</strong> —
              collapsible help panels that explain the feature you&apos;re looking at.
              Each HelpCard links directly to its expanded documentation page here.
            </p>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              The same content source powers both: in-app help is concise and actionable,
              while docs pages go deep with code examples, configuration reference, and guides.
            </p>
          </div>
          <div style={{ flex: "1 1 280px" }}>
            {/* Mock HelpCard */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                overflow: "hidden",
                background: "var(--bg-secondary)",
              }}
            >
              <div
                style={{
                  padding: "0.6rem 0.85rem",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                <HelpCircle size={14} style={{ color: "var(--color-gold)" }} />
                What is Visibility?
              </div>
              <div style={{ padding: "0.85rem", fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>
                Visibility measures how easy it is for people AND AI to find your content.
                It combines <strong style={{ color: "var(--fg)" }}>SEO Score</strong> (search engines) and{" "}
                <strong style={{ color: "var(--fg)" }}>GEO Score</strong> (AI platforms).
              </div>
              <div style={{ padding: "0 0.85rem 0.75rem" }}>
                <Link
                  href="/docs/seo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.75rem",
                    color: "var(--color-gold)",
                    textDecoration: "none",
                  }}
                >
                  Learn more
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["visibility-intro", "geo-score", "seo-meta", "agents-intro", "media-ai"].map((id) => (
                <span
                  key={id}
                  style={{
                    fontSize: "0.6rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--fg-muted)",
                    padding: "0.15rem 0.4rem",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                  }}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MCP Section ── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "4rem 1.5rem",
          maxWidth: "54rem",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-gold)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}
        >
          Model Context Protocol
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Every site speaks to every AI.
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--fg-muted)",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            maxWidth: "30rem",
            margin: "0 auto 2rem",
          }}
        >
          Two MCP servers. One public and read-only. One authenticated for content production.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          <Link href="/docs/mcp-client" style={{ display: "block", padding: "1.25rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-secondary)", textDecoration: "none", color: "inherit", transition: "border-color 0.15s" }}>
            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Public · Read-only
            </span>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0.5rem 0 0.35rem" }}>cms-mcp-client</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>
              Bundled with every site. Any AI agent can discover and query published content — no API keys needed.
            </p>
          </Link>
          <Link href="/docs/mcp-server" style={{ display: "block", padding: "1.25rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-secondary)", textDecoration: "none", color: "inherit", transition: "border-color 0.15s" }}>
            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Authenticated · Read+Write
            </span>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0.5rem 0 0.35rem" }}>cms-mcp-server</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>
              Full content production from Claude, Cursor, or any MCP client. Create, edit, publish, generate with AI.
            </p>
          </Link>
        </div>
      </section>

      {/* ── Docs stats footer ── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gold)" }}>{enDocs.length}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>English docs</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gold)" }}>{daDocs.length}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>Danish docs</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gold)" }}>{changelogCount}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>Changelog entries</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gold)" }}>8</div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>npm packages</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/docs/introduction"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.5rem 1.25rem",
              background: "var(--color-gold)",
              color: "#000",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <BookOpen size={15} />
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
          <a
            href="https://webhouse.app"
            target="_blank"
            rel="noopener"
            style={{
              padding: "0.5rem 1.25rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--fg-muted)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            webhouse.app
          </a>
        </div>

        <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "var(--fg-muted)" }}>
          Built with{" "}
          <a href="https://github.com/webhousecode/cms" style={{ color: "var(--color-gold)" }}>
            @webhouse/cms
          </a>{" "}
          — dogfooding our own product
        </p>
      </section>
    </div>
  );
}
