import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, isValidLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/policy/") ||
    // /apps/{slug} is the download onelink printed on campaigns and shared in
    // messages. It must stay exactly as written — prefixing a locale would redirect
    // to /ar/apps/{slug}, which is not a route, so every shared link would 404.
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
