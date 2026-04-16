import { NextRequest, NextResponse } from "next/server";

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
  matcher: "/((?!_next|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp)$).*)",
};
