"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Languages } from "lucide-react";

const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
];

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect current locale from URL (DA docs have -da suffix)
  const isDanish = pathname.match(/\/docs\/[\w-]+-da$/);
  const current = isDanish ? "da" : "en";

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function switchLocale(target: string) {
    setOpen(false);
    if (target === current) return;

    // On a doc page: toggle -da suffix
    const docMatch = pathname.match(/^\/docs\/([\w-]+?)(-da)?$/);
    if (docMatch) {
      const baseSlug = docMatch[1];
      if (target === "da") {
        router.push(`/docs/${baseSlug}-da`);
      } else {
        router.push(`/docs/${baseSlug}`);
      }
      return;
    }

    // Not on a doc page — stay put
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "4px 8px",
          background: "none",
          border: "1px solid var(--border)",
          borderRadius: 6,
          cursor: "pointer",
          color: "var(--fg-muted)",
          fontSize: "0.75rem",
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
        }}
      >
        <Languages size={14} />
        {current.toUpperCase()}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            minWidth: 120,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 50,
          }}
        >
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.5rem 0.75rem",
                background:
                  loc.code === current ? "var(--sidebar-active)" : "none",
                border: "none",
                cursor: "pointer",
                color:
                  loc.code === current ? "var(--color-gold)" : "var(--fg)",
                fontSize: "0.8rem",
                textAlign: "left",
              }}
            >
              <span>{loc.flag}</span>
              <span>{loc.label}</span>
              {loc.code === current && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.65rem",
                    color: "var(--fg-muted)",
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
