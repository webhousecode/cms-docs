"use client";

import { Menu } from "lucide-react";

export function MobileMenuButton() {
  function toggle() {
    window.dispatchEvent(new CustomEvent("docs:toggle-sidebar"));
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle navigation"
      className="md:hidden"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--fg-muted)",
        padding: 6,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu size={20} />
    </button>
  );
}
