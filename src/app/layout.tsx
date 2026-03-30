import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("docs-theme");if(t==="light")document.documentElement.classList.remove("dark");else document.documentElement.classList.add("dark")}catch{}`,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <DocsSearch searchIndex={searchIndex} />
        <CodeCopyHandler />
      </body>
    </html>
  );
}
