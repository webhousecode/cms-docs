"use client";

import { Search } from "lucide-react";

export function SearchTrigger() {
  function open() {
    window.dispatchEvent(new CustomEvent("docs:open-search"));
  }

  return (
    <button
      onClick={open}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem 0.75rem",
        border: "1px solid var(--border)",
        borderRadius: 6,
        background: "var(--bg-secondary)",
        color: "var(--fg-muted)",
        cursor: "pointer",
        fontSize: "0.8rem",
        minWidth: 180,
      }}
    >
      <Search size={14} />
      <span>Search docs...</span>
      <kbd
        style={{
          marginLeft: "auto",
          fontSize: "0.65rem",
          padding: "0.1rem 0.3rem",
          border: "1px solid var(--border)",
          borderRadius: 3,
          color: "var(--fg-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
