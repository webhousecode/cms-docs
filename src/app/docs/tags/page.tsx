import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Tags — webhouse.app docs",
  description: "Browse documentation by topic tag — deploy targets, AI features, schema, SEO, and more.",
  openGraph: {
    title: "Tags — webhouse.app docs",
    description: "Browse documentation by topic tag.",
    type: "website",
    url: "https://docs.webhouse.app/docs/tags",
  },
};

export default async function TagsIndexPage(props: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = (await props.searchParams) ?? {};
  const locale = sp.lang === "da" ? "da" : "en";
  const tags = getAllTags(locale);

  return (
    <main style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem 2.5rem" }}>
      <Breadcrumbs locale={locale} items={[{ label: locale === "da" ? "Tags" : "Tags" }]} />

      <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.5rem" }}>
        {locale === "da" ? "Alle tags" : "All tags"}
      </h1>
      <p style={{ color: "var(--fg-muted)", marginBottom: "2rem" }}>
        {locale === "da"
          ? `${tags.length} tags på tværs af dokumentationen.`
          : `${tags.length} tags across the documentation.`}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {tags.map((t) => (
          <li key={t.tag}>
            <Link
              href={`/docs/tags/${t.tag}${locale === "da" ? "?lang=da" : ""}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.6rem 0.85rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                textDecoration: "none",
                color: "var(--fg)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
              }}
            >
              <span>{t.label}</span>
              <span style={{ color: "var(--fg-muted)", fontSize: "0.75rem" }}>{t.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
