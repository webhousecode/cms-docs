"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, ArrowRight } from "lucide-react";
import MiniSearch from "minisearch";

interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export function DocsSearch({
  searchIndex,
}: {
  searchIndex: SearchDoc[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef<MiniSearch<SearchDoc> | null>(null);
  const router = useRouter();

  // Build search index
  useEffect(() => {
    const ms = new MiniSearch<SearchDoc>({
      fields: ["title", "description", "content"],
      storeFields: ["slug", "title", "description", "category"],
      idField: "slug",
      searchOptions: {
        boost: { title: 3, description: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    });
    ms.addAll(searchIndex);
    indexRef.current = ms;
  }, [searchIndex]);

  // Keyboard shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    function onCustom() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("docs:open-search", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("docs:open-search", onCustom);
    };
  }, []);

  // Focus input when open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search
  const doSearch = useCallback(
    (q: string) => {
      setQuery(q);
      setSelected(0);
      if (!q.trim() || !indexRef.current) {
        setResults([]);
        return;
      }
      const hits = indexRef.current.search(q).slice(0, 10);
      setResults(
        hits.map((h) => ({
          slug: h.slug ?? (h as any).id,
          title: (h as any).title ?? h.slug ?? (h as any).id,
          description: (h as any).description ?? "",
          category: (h as any).category ?? "",
        }))
      );
    },
    []
  );

  function navigate(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/docs/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].slug);
    }
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        paddingTop: "15vh",
      }}
    >
      <div
        onClick={() => {
          setOpen(false);
          setQuery("");
        }}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)" }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          maxHeight: "60vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
            gap: "0.5rem",
          }}
        >
          <Search size={18} style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => doSearch(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search documentation..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--fg)",
              fontSize: "1rem",
            }}
          />
          <kbd
            style={{
              fontSize: "0.6rem",
              padding: "0.1rem 0.4rem",
              border: "1px solid var(--border)",
              borderRadius: 3,
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ESC
          </kbd>
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {query && results.length === 0 && (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--fg-muted)",
                fontSize: "0.875rem",
              }}
            >
              No results for &quot;{query}&quot;
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={r.slug}
              onClick={() => navigate(r.slug)}
              onMouseEnter={() => setSelected(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.65rem 1rem",
                background: i === selected ? "var(--bg-secondary)" : "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "var(--fg)",
              }}
            >
              <FileText
                size={16}
                style={{ color: "var(--fg-muted)", flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  {r.title}
                </div>
                {r.description && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--fg-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {r.description}
                  </div>
                )}
              </div>
              {i === selected && (
                <ArrowRight
                  size={14}
                  style={{ color: "var(--color-gold)", flexShrink: 0 }}
                />
              )}
            </button>
          ))}
          {!query && (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--fg-muted)",
                fontSize: "0.8rem",
              }}
            >
              Type to search across all documentation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
