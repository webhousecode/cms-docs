import "./globals.css";
import type { Metadata } from "next";
import { ThemeInit } from "@/components/theme-init";
import { Header } from "@/components/header";
import { DocsSearch } from "@/components/docs-search";
import { CodeCopyHandler } from "@/components/code-copy-handler";
import { getSearchIndex } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: "webhouse.app Docs",
    template: "%s — webhouse.app Docs",
  },
  description:
    "Documentation for @webhouse/cms — the AI-native, file-based CMS for TypeScript projects",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchIndex = getSearchIndex();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <DocsSearch searchIndex={searchIndex} />
        <CodeCopyHandler />
        <ThemeInit />
      </body>
    </html>
  );
}
