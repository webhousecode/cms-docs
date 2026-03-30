export const dynamic = "force-static";

import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { Tag, GitBranch, AlertTriangle, Package } from "lucide-react";
import { DocContent } from "@/components/doc-content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes and version history for @webhouse/cms",
};

export default function ChangelogPage() {
  const entries = getCollection("changelog").sort((a, b) => {
    const dateA = a.data.date ?? a.updatedAt ?? "";
    const dateB = b.data.date ?? b.updatedAt ?? "";
    return dateB.localeCompare(dateA);
  });

  // Count totals
  const totalChanges = entries.reduce((sum, e) => {
    const match = e.data.content?.match(/\*\*(\d+) changes?\*\*/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "3rem 2.5rem" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.7rem",
            borderRadius: 20,
            border: "1px solid var(--border)",
            fontSize: "0.7rem",
            color: "var(--fg-muted)",
            marginBottom: "1rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          <GitBranch size={12} />
          {entries.length} releases · {totalChanges}+ changes
        </div>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Changelog
        </h1>
        <p
          style={{
            color: "var(--fg-muted)",
            fontSize: "1rem",
            maxWidth: "28rem",
            margin: "0 auto",
          }}
        >
          Every release of{" "}
          <span style={{ color: "var(--color-gold)" }}>@webhouse/cms</span> from
          day one.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 0,
            bottom: 0,
            width: 2,
            background: "var(--border)",
          }}
          className="max-sm:hidden"
        />

        {entries.map((entry, i) => {
          const isUnreleased = entry.data.version === "next";
          const isFoundation = entry.slug === "v0-0-1-foundation";
          const isMajor =
            entry.data.content?.split("\n").filter((l) => l.startsWith("- "))
              .length ?? 0 > 20;

          return (
            <article
              key={entry.slug}
              style={{
                position: "relative",
                paddingLeft: 44,
                paddingBottom: "2.5rem",
              }}
              className="max-sm:!pl-0"
            >
              {/* Timeline dot */}
              <div
                className="max-sm:hidden"
                style={{
                  position: "absolute",
                  left: 8,
                  top: 4,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: isUnreleased
                    ? "#4ade80"
                    : isFoundation
                      ? "var(--color-gold)"
                      : "var(--border)",
                  border: `3px solid var(--bg)`,
                  zIndex: 1,
                }}
              />

              {/* Version badge + date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: isUnreleased ? "#4ade80" : "var(--color-gold)",
                    padding: "0.2rem 0.6rem",
                    background: isUnreleased
                      ? "rgba(74,222,128,0.1)"
                      : "rgba(247,187,46,0.1)",
                    borderRadius: 6,
                    border: `1px solid ${isUnreleased ? "rgba(74,222,128,0.2)" : "rgba(247,187,46,0.2)"}`,
                  }}
                >
                  {isUnreleased ? (
                    <Package size={13} />
                  ) : (
                    <Tag size={13} />
                  )}
                  {isUnreleased
                    ? "unreleased"
                    : isFoundation
                      ? "foundation"
                      : `v${entry.data.version}`}
                </span>

                {entry.data.breaking && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.65rem",
                      padding: "0.15rem 0.45rem",
                      background: "rgba(248,113,113,0.12)",
                      color: "#f87171",
                      borderRadius: 5,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      border: "1px solid rgba(248,113,113,0.2)",
                    }}
                  >
                    <AlertTriangle size={11} />
                    Breaking
                  </span>
                )}

                {entry.data.date && (
                  <time
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--fg-muted)",
                    }}
                  >
                    {new Date(entry.data.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {entry.data.title}
              </h2>

              {/* Content */}
              {entry.data.content && (
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                    fontSize: "0.85rem",
                  }}
                >
                  <DocContent content={entry.data.content} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
