"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronsDownUp, ChevronsUpDown } from "lucide-react";

export interface SidebarCategory {
  slug: string;
  label: string;
  docs: { slug: string; title: string }[];
}

export function DocsSidebar({ categories }: { categories: SidebarCategory[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Default: all categories collapsed, except the one containing the active page
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const cat of categories) {
      const hasActive = cat.docs.some((d) => pathname === `/docs/${d.slug}`);
      initial[cat.slug] = !hasActive; // collapsed unless active
    }
    return initial;
  });

  // Listen for toggle event from header hamburger
  useEffect(() => {
    function onToggle() {
      setMobileOpen((prev) => !prev);
    }
    window.addEventListener("docs:toggle-sidebar", onToggle);
    return () => window.removeEventListener("docs:toggle-sidebar", onToggle);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleCategory(slug: string) {
    setCollapsed((p) => ({ ...p, [slug]: !p[slug] }));
  }

  const allExpanded = categories.every((c) => !collapsed[c.slug]);

  function toggleAll() {
    const next: Record<string, boolean> = {};
    for (const cat of categories) {
      next[cat.slug] = allExpanded; // collapse all if all expanded, else expand all
    }
    setCollapsed(next);
  }

  const nav = (
    <nav style={{ padding: "1rem 0" }}>
      <div style={{ padding: "0 1rem 0.5rem", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={toggleAll}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.2rem 0.5rem",
            fontSize: "0.65rem",
            fontWeight: 500,
            color: "var(--fg-muted)",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: 4,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          {allExpanded ? <ChevronsDownUp size={12} /> : <ChevronsUpDown size={12} />}
          {allExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {categories.map((cat) => {
        const isCollapsed = collapsed[cat.slug] ?? false;
        const hasActive = cat.docs.some(
          (d) => pathname === `/docs/${d.slug}`
        );

        return (
          <div key={cat.slug} style={{ marginBottom: "0.25rem" }}>
            <button
              onClick={() => toggleCategory(cat.slug)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                width: "100%",
                padding: "0.4rem 1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: hasActive ? "var(--color-gold)" : "var(--fg)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                textAlign: "left",
              }}
            >
              <ChevronRight
                size={14}
                style={{
                  transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)",
                  transition: "transform 0.15s",
                  flexShrink: 0,
                }}
              />
              {cat.label}
            </button>
            {!isCollapsed && (
              <div style={{ paddingLeft: "0.5rem" }}>
                {cat.docs.map((doc) => {
                  const active = pathname === `/docs/${doc.slug}`;
                  return (
                    <Link
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      style={{
                        display: "block",
                        padding: "0.3rem 1rem 0.3rem 1.5rem",
                        fontSize: "0.875rem",
                        color: active ? "var(--color-gold)" : "var(--fg-muted)",
                        textDecoration: "none",
                        borderLeft: active
                          ? "2px solid var(--color-gold)"
                          : "2px solid transparent",
                        background: active ? "var(--sidebar-active)" : "none",
                        borderRadius: "0 4px 4px 0",
                        transition: "all 0.1s",
                      }}
                    >
                      {doc.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 39,
            background: "rgba(0,0,0,0.5)",
          }}
          className="md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={mobileOpen ? "" : "max-md:hidden"}
        style={{
          width: 260,
          position: mobileOpen ? "fixed" : "sticky",
          top: mobileOpen ? "3.5rem" : "3.5rem",
          left: 0,
          height: mobileOpen ? "calc(100vh - 3.5rem)" : "calc(100vh - 3.5rem)",
          overflowY: "auto",
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border)",
          zIndex: mobileOpen ? 40 : 10,
          flexShrink: 0,
        }}
      >
        {nav}
      </aside>
    </>
  );
}
