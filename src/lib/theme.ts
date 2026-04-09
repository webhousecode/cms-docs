"use client";

export function getInitialTheme(): string {
  // Dark by default — only respect an explicit user choice from localStorage.
  // We deliberately ignore OS prefers-color-scheme so the brand looks consistent
  // for first-time visitors regardless of their system theme.
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("docs-theme");
  return stored === "light" ? "light" : "dark";
}

export function setTheme(theme: string) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("docs-theme", theme);
}
