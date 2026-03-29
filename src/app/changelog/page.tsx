import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import Link from "next/link";

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

  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem 2.5rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Changelog
      </h1>
      <p style={{ color: "var(--fg-muted)", marginBottom: "2rem" }}>
        Release notes and version history
      </p>

      <div>
        {entries.map((entry) => (
          <article
            key={entry.slug}
            style={{
              padding: "1.5rem 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-gold)",
                }}
              >
                v{entry.data.version}
              </span>
              {entry.data.breaking && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "0.1rem 0.4rem",
                    background: "rgba(248,113,113,0.15)",
                    color: "#f87171",
                    borderRadius: 4,
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
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
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0.25rem 0" }}>
              {entry.data.title}
            </h2>
            {entry.data.content && (
              <div
                className="doc-content"
                style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}
                dangerouslySetInnerHTML={{
                  __html: entry.data.content
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\n/g, "<br />"),
                }}
              />
            )}
          </article>
        ))}
        {entries.length === 0 && (
          <p style={{ color: "var(--fg-muted)" }}>No changelog entries yet.</p>
        )}
      </div>
    </div>
  );
}
