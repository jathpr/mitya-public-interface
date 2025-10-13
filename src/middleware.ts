import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";

const locales = ["by", "en", "ru"]; // represent order of preferred language

function getLocale(request: NextRequest) {
  const languages = new Negotiator(request).languages();

  for (const language of languages) {
    for (const locale of locales) {
      if (language.includes(locale)) return locale;
    }
  }

  return "by";
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
