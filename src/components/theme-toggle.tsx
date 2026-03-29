"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getInitialTheme, setTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setLocal] = useState("dark");

  useEffect(() => {
    const t = getInitialTheme();
    setLocal(t);
    setTheme(t);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setLocal(next);
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "6px",
        cursor: "pointer",
        color: "var(--fg-muted)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
