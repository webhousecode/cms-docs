import { headers } from "next/headers";
import { BRAND_HEADER, parseBrandHeader, type DocsBrand } from "./brand";

/** F212 — the brand of the current request (server components only). */
export async function getBrand(): Promise<DocsBrand> {
  return parseBrandHeader((await headers()).get(BRAND_HEADER));
}
