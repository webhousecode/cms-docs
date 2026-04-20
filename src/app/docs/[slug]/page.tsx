import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCollection,
  getDocument,
  getDocsByCategory,
  getPrevNext,
  getCategories,
  tagLabel,
  type DocDocument,
} from "@/lib/content";
import { extractHeadings } from "@/lib/markdown";
import { DocsSidebar, type SidebarCategory } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";
import { DocContent } from "@/components/doc-content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrevNext } from "@/components/prev-next";

export async function generateStaticParams() {
  const docs = getCollection("docs");
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = getDocument("docs", slug);
  if (!doc) return {};

  const title = doc.data._seo?.metaTitle ?? doc.data.title;
  const description =
    doc.data._seo?.metaDescription ?? doc.data.description ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://docs.webhouse.app/docs/${slug}`,
    },
  };
}

function buildSidebarData(locale: string): SidebarCategory[] {
  const grouped = getDocsByCategory(locale);
  const cats = getCategories(locale);
  const result: SidebarCategory[] = [];
  for (const cat of cats) {
    const group = grouped.get(cat.slug);
    if (group) {
      result.push({
        slug: cat.slug,
        label: cat.label,
        docs: group.docs.map((d) => ({
          slug: d.slug,
          title: d.data.title,
        })),
      });
    }
  }
  return result;
}

export default async function DocPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const doc = getDocument("docs", slug);
  if (!doc || doc.status !== "published") notFound();

  const locale = doc.locale ?? "en";
  const sidebarData = buildSidebarData(locale);
  const content = doc.data.content ?? "";
  const headings = extractHeadings(content);
  const { prev, next } = getPrevNext(doc);

  const categoryLabel =
    getCategories(locale).find((c) => c.slug === doc.data.category)?.label ?? "";

  return (
    <div style={{ display: "flex" }}>
      <DocsSidebar categories={sidebarData} locale={locale} />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "2rem 2.5rem",
          maxWidth: "48rem",
        }}
      >
        <Breadcrumbs
          locale={locale}
          items={[
            ...(categoryLabel
              ? [{ label: categoryLabel }]
              : []),
            { label: doc.data.title },
          ]}
        />

        {doc.data.description && (
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--fg-muted)",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            {doc.data.description}
          </p>
        )}

        <DocContent content={content} />

        {doc.data.tags && doc.data.tags.length > 0 && (
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.7rem", color: "var(--fg-muted)", marginRight: "0.2rem" }}>
              {locale === "da" ? "Tags:" : "Tags:"}
            </span>
            {doc.data.tags.map((t) => (
              <Link
                key={t}
                href={`/docs/tags/${t}${locale === "da" ? "?lang=da" : ""}`}
                style={{
                  fontSize: "0.7rem",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  background: "var(--bg-subtle)",
                  color: "var(--fg-muted)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tagLabel(t)}
              </Link>
            ))}
          </div>
        )}

        <PrevNext
          locale={locale}
          prev={
            prev ? { slug: prev.slug, title: prev.data.title } : null
          }
          next={
            next ? { slug: next.slug, title: next.data.title } : null
          }
        />

        {/* API link */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "1rem",
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            color: "var(--fg-muted)",
          }}
        >
          <a
            href={`/api/docs/${slug}.json`}
            target="_blank"
            rel="noopener"
            style={{ color: "var(--fg-muted)", textDecoration: "none" }}
          >
            JSON API →
          </a>
          <a
            href={`https://github.com/webhousecode/cms-docs/blob/main/content/docs/${slug}.json`}
            target="_blank"
            rel="noopener"
            style={{ color: "var(--fg-muted)", textDecoration: "none" }}
          >
            Edit on GitHub →
          </a>
        </div>
      </main>

      <DocsToc items={headings} locale={locale} />
    </div>
  );
}
