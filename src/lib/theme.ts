"use client";

export function getInitialTheme(): string {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("docs-theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function setTheme(theme: string) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("docs-theme", theme);
}
