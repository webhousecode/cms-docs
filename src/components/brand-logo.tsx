"use client";

import { useBrand, useMountPath } from "./brand-context";

/** F212 — the brand's wordmark in both themes (webhouse.app by default). */
export function BrandLogo({ height }: { height: number }) {
  const brand = useBrand();
  const path = useMountPath();
  const dark = brand.logoDark ?? path("/logo-dark.svg");
  const light = brand.logoLight ?? path("/logo-light.svg");
  return (
    <>
      <img src={dark} alt={brand.address} className="dark-only" style={{ height, width: "auto" }} />
      <img src={light} alt={brand.address} className="light-only" style={{ height, width: "auto" }} />
    </>
  );
}
