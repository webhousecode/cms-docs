"use client";

/**
 * Mobile-only top-nav drawer.
 *
 * Why this exists:
 *   - The header burger button dispatches a `docs:toggle-sidebar` event.
 *   - On `/docs/*` pages the DocsSidebar listens for that event and slides
 *     out the doc tree — that flow already works.
 *   - On `/`, `/changelog`, and other non-docs pages there is no sidebar
 *     mounted, so clicking the burger did literally nothing. This drawer
 *     fills that gap by mounting globally and only responding to the event
 *     when there is no DocsSidebar to take it.
 *
 * It deliberately stays below the `md:` breakpoint and renders nothing on
 * desktop so the existing desktop layout is byte-for-byte unchanged.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export function MobileNavDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Only this drawer responds when we're NOT inside the docs section. On
  // /docs/* the existing DocsSidebar mobile drawer takes over (it has the
  // doc tree, which is more useful there).
  const isDocsPage = pathname?.startsWith("/docs") ?? false;

  useEffect(() => {
    if (isDocsPage) return;
    function onToggle() {
      setOpen((prev) => !prev);
    }
    window.addEventListener("docs:toggle-sidebar", onToggle);
    return () => window.removeEventListener("docs:toggle-sidebar", onToggle);
  }, [isDocsPage]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (isDocsPage) return null;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 39,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Drawer panel */}
      <aside
        className="md:hidden"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "min(82vw, 320px)",
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border)",
          zIndex: 40,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.22s ease-out",
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem 1rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <img src="/logo-dark.svg" alt="webhouse.app" className="dark-only" style={{ height: 18 }} />
            <img src="/logo-light.svg" alt="webhouse.app" className="light-only" style={{ height: 18 }} />
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--fg-muted)" }}>docs</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--fg-muted)",
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={22} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", padding: "0.5rem 0" }}>
          <DrawerLink href="/docs/introduction" onClose={() => setOpen(false)}>
            Documentation
          </DrawerLink>
          <DrawerLink href="/changelog" onClose={() => setOpen(false)}>
            Changelog
          </DrawerLink>
          <DrawerLink href="https://github.com/webhousecode/cms" external onClose={() => setOpen(false)}>
            GitHub ↗
          </DrawerLink>
        </nav>

        <div
          style={{
            marginTop: "auto",
            padding: "1rem",
            borderTop: "1px solid var(--border)",
            fontSize: "0.7rem",
            color: "var(--fg-muted)",
            textAlign: "center",
          }}
        >
          @webhouse/cms · MIT
        </div>
      </aside>
    </>
  );
}

function DrawerLink({
  href,
  children,
  external,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClose: () => void;
}) {
  const baseStyle = {
    display: "block",
    padding: "0.85rem 1.25rem",
    fontSize: "1rem",
    fontWeight: 500,
    color: "var(--fg)",
    textDecoration: "none",
    borderLeft: "2px solid transparent",
  } as const;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" onClick={onClose} style={baseStyle}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClose} style={baseStyle}>
      {children}
    </Link>
  );
}
