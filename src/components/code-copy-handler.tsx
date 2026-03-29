"use client";

import { useEffect } from "react";

/**
 * Global click handler for .code-copy buttons.
 * Reads data-code attribute, copies to clipboard, shows feedback.
 */
export function CodeCopyHandler() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest(".code-copy") as HTMLButtonElement;
      if (!btn) return;
      const code = decodeURIComponent(btn.dataset.code ?? "");
      if (!code) return;

      navigator.clipboard.writeText(code).then(() => {
        btn.classList.add("copied");
        const svg = btn.innerHTML;
        btn.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = svg;
        }, 2000);
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
