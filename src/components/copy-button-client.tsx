"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButtonClient({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        padding: "4px 6px",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: 4,
        cursor: "pointer",
        color: copied ? "var(--color-success)" : "var(--fg-muted)",
        display: "flex",
        alignItems: "center",
        opacity: 0.7,
        transition: "opacity 0.15s",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
