import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.8rem",
        color: "var(--fg-muted)",
        marginBottom: "1.5rem",
      }}
    >
      <Link href="/" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
        Docs
      </Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <ChevronRight size={12} />
          {item.href ? (
            <Link href={item.href} style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--fg)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
