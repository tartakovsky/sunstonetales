import { type NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n";

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // No locale prefix → rewrite to /en/... (URL stays clean, no redirect)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/((?!_next|api|.*\\..*).*)",
};
