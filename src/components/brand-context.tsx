"use client";

import { createContext, useContext } from "react";
import { DEFAULT_BRAND, mountPath, type DocsBrand } from "@/lib/brand";

const BrandContext = createContext<DocsBrand>(DEFAULT_BRAND);

/** F212 — hands the request's brand to client components. */
export function BrandProvider({ brand, children }: { brand: DocsBrand; children: React.ReactNode }) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand(): DocsBrand {
  return useContext(BrandContext);
}

/** mountPath() for the current brand. */
export function useMountPath(): (path: string) => string {
  const brand = useBrand();
  return (path) => mountPath(path, brand);
}
