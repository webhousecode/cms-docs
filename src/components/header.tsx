import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "./search-trigger";
import { MobileMenuButton } from "./mobile-menu-button";
import { LocaleSwitcher } from "./locale-switcher";

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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <MobileMenuButton />
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          {/* webhouse.app wordmark — dark theme */}
          <img
            src="/logo-dark.svg"
            alt="webhouse.app"
            className="dark-only"
            style={{ height: 22, width: "auto" }}
          />
          {/* webhouse.app wordmark — light theme */}
          <img
            src="/logo-light.svg"
            alt="webhouse.app"
            className="light-only"
            style={{ height: 22, width: "auto" }}
          />
          <span
            style={{
              width: 1,
              height: 22,
              background: "var(--border)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--fg-muted)",
              letterSpacing: "0.02em",
            }}
          >
            docs
          </span>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <SearchTrigger />
        <nav
          className="max-sm:hidden"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
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
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
