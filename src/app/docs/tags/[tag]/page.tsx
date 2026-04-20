import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTags, getDocsByTag, tagLabel, TAG_LABELS } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";

export async function generateStaticParams() {
  return Object.keys(TAG_LABELS).map((tag) => ({ tag }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await props.params;
  const label = tagLabel(tag);
  return {
    title: `${label} — Docs Tag`,
    description: `All documentation articles tagged ${label}.`,
    openGraph: {
      title: `${label} — webhouse.app docs`,
      description: `All documentation articles tagged ${label}.`,
      type: "website",
      url: `https://docs.webhouse.app/docs/tags/${tag}`,
    },
  };
}

export default async function TagIndexPage(props: {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { tag } = await props.params;
  const sp = (await props.searchParams) ?? {};
  const locale = sp.lang === "da" ? "da" : "en";

  if (!(tag in TAG_LABELS)) notFound();

  const docs = getDocsByTag(tag, locale);
  const label = tagLabel(tag);
  const allTags = getAllTags(locale);

  return (
    <main style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem 2.5rem" }}>
      <Breadcrumbs
        locale={locale}
        items={[{ label: locale === "da" ? "Tags" : "Tags" }, { label }]}
      />

      <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.5rem" }}>{label}</h1>
      <p style={{ color: "var(--fg-muted)", marginBottom: "2rem" }}>
        {locale === "da"
          ? `${docs.length} artikler tagget med ${label}.`
          : `${docs.length} articles tagged ${label}.`}
      </p>

      {docs.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {docs.map((d) => (
            <li key={d.slug} style={{ padding: "0.85rem 1rem", border: "1px solid var(--border)", borderRadius: "6px" }}>
              <Link
                href={`/docs/${d.slug}`}
                style={{ color: "var(--fg)", textDecoration: "none", fontWeight: 500 }}
              >
                {d.data.title}
              </Link>
              {d.data.description && (
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                  {d.data.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--fg-muted)" }}>
          {locale === "da" ? "Ingen artikler endnu." : "No articles yet."}
        </p>
      )}

      <section style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "0.9rem", color: "var(--fg-muted)", margin: "0 0 0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {locale === "da" ? "Alle tags" : "All tags"}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {allTags.map((t) => (
            <Link
              key={t.tag}
              href={`/docs/tags/${t.tag}${locale === "da" ? "?lang=da" : ""}`}
              style={{
                fontSize: "0.7rem",
                padding: "0.25rem 0.6rem",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                background: t.tag === tag ? "var(--accent-subtle)" : "var(--bg-subtle)",
                color: t.tag === tag ? "var(--accent)" : "var(--fg-muted)",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t.label} <span style={{ opacity: 0.5 }}>{t.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
