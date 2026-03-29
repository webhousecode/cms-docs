import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "./search-trigger";

export function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        height: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-gold)",
              fontFamily: "var(--font-mono)",
            }}
          >
            webhouse
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            docs
          </span>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <SearchTrigger />
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/docs/introduction"
            style={{
              fontSize: "0.85rem",
              color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            Docs
          </Link>
          <Link
            href="/changelog"
            style={{
              fontSize: "0.85rem",
              color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            Changelog
          </Link>
          <a
            href="https://github.com/webhousecode/cms"
            target="_blank"
            rel="noopener"
            style={{
              fontSize: "0.85rem",
              color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
