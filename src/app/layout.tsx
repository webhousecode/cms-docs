import "./globals.css";
import type { Metadata } from "next";
import { ThemeInit } from "@/components/theme-init";
import { Header } from "@/components/header";
import { MobileNavDrawer } from "@/components/mobile-nav-drawer";
import { DocsSearch } from "@/components/docs-search";
import { CodeCopyHandler } from "@/components/code-copy-handler";
import { ConsentBanner } from "@/components/consent-banner";
import { BrandProvider } from "@/components/brand-context";
import { getSearchIndex } from "@/lib/content";
import { getBrand } from "@/lib/brand-server";
import { mountPath, type DocsBrand } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  return {
    title: {
      default: `${brand.address} Docs`,
      template: `%s — ${brand.address} Docs`,
    },
    description:
      "Documentation for @webhouse/cms — the AI-native, file-based CMS for TypeScript projects",
    icons: {
      icon: brand.favicon ?? mountPath("/favicon.svg", brand),
    },
    // F212 — a mounted copy is never indexed (docs.webhouse.app is the original).
    ...(brand.mounted ? { robots: { index: false, follow: false } } : {}),
  };
}

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** White or black text, whichever reads better on `bg` (same rule as cms-admin's brand). */
function readableOn(bg: string): string {
  const l = luminance(bg);
  return (1.05) / (l + 0.05) >= (l + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
}

/** F212 — the brand's colour and typeface over the default theme tokens. */
function brandStyle(brand: DocsBrand): string {
  const rules: string[] = [];
  const light: string[] = [];
  if (brand.color) {
    light.push(`--color-gold:${brand.color}`, `--color-gold-hover:${brand.color}`, `--color-gold-text-light:${brand.color}`);
    light.push(`--sidebar-active:color-mix(in srgb, ${brand.color} 8%, transparent)`, `--sidebar-active-border:${brand.color}`);
  }
  if (brand.colorForeground) light.push(`--color-gold-fg:${brand.colorForeground}`);
  if (light.length) rules.push(`:root{${light.join(";")}}`);
  const darkColor = brand.colorDark ?? brand.color;
  if (darkColor) {
    const dark = [
      `--color-gold:${darkColor}`,
      `--color-gold-hover:${darkColor}`,
      `--sidebar-active:color-mix(in srgb, ${darkColor} 8%, transparent)`,
      `--sidebar-active-border:${darkColor}`,
    ];
    const darkFg = brand.colorDark ? (brand.colorDarkForeground ?? readableOn(brand.colorDark)) : brand.colorForeground;
    if (darkFg) dark.push(`--color-gold-fg:${darkFg}`);
    rules.push(`.dark{${dark.join(";")}}`);
  }
  if (brand.fontFamily) rules.push(`body{font-family:"${brand.fontFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif}`);
  return rules.join("");
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brand = await getBrand();
  const searchIndex = getSearchIndex(brand);
  const style = brandStyle(brand);

  return (
    <html lang={brand.locale} className="dark" suppressHydrationWarning>
      <head>
        {brand.fontStylesheet && <link rel="stylesheet" href={brand.fontStylesheet} />}
        {style && <style dangerouslySetInnerHTML={{ __html: style }} />}
      </head>
      <body>
        <BrandProvider brand={brand}>
          <Header />
          <MobileNavDrawer />
          {children}
          <DocsSearch searchIndex={searchIndex} />
          <CodeCopyHandler />
          <ThemeInit />
          <ConsentBanner />
        </BrandProvider>
      </body>
    </html>
  );
}
