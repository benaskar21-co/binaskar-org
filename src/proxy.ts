import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, isValidLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/policy/") ||
    // /apps and /apps/{slug} are download onelinks printed on campaigns and shared
    // in messages. They must stay exactly as written — prefixing a locale would
    // redirect to /ar/apps/…, which is not a route, so every shared link would 404.
    // The bare comparison matters: startsWith("/apps/") alone misses the index.
    pathname === "/apps" ||
    pathname.startsWith("/apps/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split("/")[1];
  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
