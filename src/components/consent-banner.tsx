"use client";

import "@broberg/consent-cookie/element";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "broberg-consent": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "policy-version": string;
        // Optional categories the site actually uses; "" = none (no stats, no marketing).
        categories?: string;
        "privacy-href"?: string;
        lang?: string;
      };
    }
  }
}

// The banner reads @broberg/theme token names; map ours onto them.
const tokens = {
  "--card": "var(--bg-secondary)",
  "--card-foreground": "var(--fg)",
  "--primary": "var(--color-gold)",
  "--primary-foreground": "var(--color-dark)",
  "--muted-foreground": "var(--fg-muted)",
  "--secondary": "var(--bg-tertiary)",
} as CSSProperties;

export function ConsentBanner() {
  // DA docs live at /docs/<slug>-da (same rule as LocaleSwitcher).
  const lang = /\/docs\/[\w-]+-da$/.test(usePathname()) ? "da" : "en";
  // The shared WEB HOUSE ApS privacy policy lives on www.webhouse.dk (F203.4).
  const privacyHref = lang === "da" ? "https://www.webhouse.dk/privacy" : "https://www.webhouse.dk/en/privacy";
  return <broberg-consent policy-version="2026-09" categories="" lang={lang} privacy-href={privacyHref} data-testid="consent-root" style={tokens} />;
}
