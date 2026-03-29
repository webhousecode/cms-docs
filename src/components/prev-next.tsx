import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavDoc {
  slug: string;
  title: string;
}

export function PrevNext({
  prev,
  next,
}: {
  prev: NavDoc | null;
  next: NavDoc | null;
}) {
  if (!prev && !next) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        marginTop: "3rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            border: "1px solid var(--border)",
            borderRadius: 8,
            textDecoration: "none",
            color: "var(--fg)",
            fontSize: "0.875rem",
            transition: "border-color 0.15s",
          }}
        >
          <ArrowLeft size={16} style={{ color: "var(--fg-muted)" }} />
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>
              Previous
            </div>
            <div style={{ fontWeight: 500 }}>{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            border: "1px solid var(--border)",
            borderRadius: 8,
            textDecoration: "none",
            color: "var(--fg)",
            fontSize: "0.875rem",
            textAlign: "right",
            transition: "border-color 0.15s",
          }}
        >
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>
              Next
            </div>
            <div style={{ fontWeight: 500 }}>{next.title}</div>
          </div>
          <ArrowRight size={16} style={{ color: "var(--fg-muted)" }} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
