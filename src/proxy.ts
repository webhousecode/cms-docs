import { NextRequest, NextResponse } from "next/server";
import { BRAND_HEADER, MOUNT_ROOT, parseBrandHeader } from "@/lib/brand";

/**
 * ai.webhouse.app → /ai route group on this app.
 *
 * DNS CNAME ai.webhouse.app → cms-docs.fly.dev. Fly.io terminates TLS for
 * both hosts. This proxy rewrites the internal path so the /ai routes serve
 * at the subdomain root:
 *
 *   ai.webhouse.app/                         → /ai
 *   ai.webhouse.app/llms.txt                 → /ai/llms.txt
 *   ai.webhouse.app/manifest.json            → /ai/manifest.json
 *   ai.webhouse.app/01-getting-started       → /ai/01-getting-started
 *
 * Paths that already begin with /ai are passed through unchanged so the
 * docs.webhouse.app URLs keep working if pasted against the subdomain.
 */
export function proxy(request: NextRequest) {
  // F212 — white-label mount. cms-admin forwards cms.<brand>/docs/** here with
  // the brand in a header. The docs' own root pages and files live under
  // /docs/_/ there (doc pages keep /docs/<slug>), and /docs is the front door
  // (the introduction in the brand's language).
  // The /docs/_ rewrite is unconditional: next.config's assetPrefix puts every
  // build asset under it, on docs.webhouse.app too.
  const { pathname: path, search: query } = request.nextUrl;
  const brand = parseBrandHeader(request.headers.get(BRAND_HEADER));
  const mounted = brand.mounted;
  let response: NextResponse | null = null;
  const frontDoor = path === "/docs" || path === "/docs/" || path === MOUNT_ROOT || path === `${MOUNT_ROOT}/`;
  if (mounted && frontDoor) {
    // The front door opens the introduction in the brand's language, on the
    // brand's address (this request's own URL carries the docs app's host).
    const intro = brand.locale === "da" ? "/docs/introduction-da" : "/docs/introduction";
    response = NextResponse.redirect(new URL(intro, `https://${brand.address}`), 307);
  } else if (path === MOUNT_ROOT || path.startsWith(`${MOUNT_ROOT}/`)) {
    response = NextResponse.rewrite(new URL(`${path.slice(MOUNT_ROOT.length) || "/"}${query}`, request.url));
  }
  if (response) {
    // A mounted copy is never indexed; docs.webhouse.app is the original.
    if (mounted) response.headers.set("x-robots-tag", "noindex");
    return response;
  }
  if (mounted) {
    const next = NextResponse.next();
    next.headers.set("x-robots-tag", "noindex");
    return next;
  }

  const host = (request.headers.get("host") ?? "").toLowerCase();

  if (host !== "ai.webhouse.app") {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (pathname === "/ai" || pathname.startsWith("/ai/")) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/ai${search}`, request.url));
  }

  return NextResponse.rewrite(new URL(`/ai${pathname}${search}`, request.url));
}

export const config = {
  // /docs/_/… carries build assets and public files, so it must always reach
  // the proxy, whatever the extension.
  matcher: ["/docs", "/docs/_/:path*", "/((?!_next|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp)$).*)"],
};
