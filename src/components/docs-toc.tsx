"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function DocsToc({ items, locale = "en" }: { items: TocItem[]; locale?: string }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className="max-xl:hidden"
      style={{
        width: 220,
        position: "sticky",
        top: "3.5rem",
        height: "calc(100vh - 3.5rem)",
        overflowY: "auto",
        padding: "1.5rem 1rem",
        flexShrink: 0,
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--fg-muted)",
          marginBottom: "0.75rem",
        }}
      >
        {locale === "da" ? "På denne side" : "On this page"}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{
                display: "block",
                padding: "0.2rem 0",
                paddingLeft: item.level === 3 ? "0.75rem" : 0,
                fontSize: "0.8rem",
                color:
                  activeId === item.id ? "var(--color-gold)" : "var(--fg-muted)",
                textDecoration: "none",
                transition: "color 0.1s",
                lineHeight: 1.5,
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
