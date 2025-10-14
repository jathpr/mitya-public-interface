import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { cache } from "react";

export const LOCALES = ["by", "en", "ru"]; // represent order of preferred language
let selectedLocale: string;

function getLocale(request: NextRequest) {
  if (selectedLocale) {
    setRequestLocale(selectedLocale);
    return selectedLocale;
  }

  const languages = new Negotiator(request).languages();

  for (const language of languages) {
    for (const locale of LOCALES) {
      if (language.includes(locale)) return locale;
    }
  }
  setRequestLocale("by");
  return "by";
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = LOCALES.some((locale) => {
    const isLocale =
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
    if (isLocale) {
      setRequestLocale(locale);
      selectedLocale = locale;
    }
    return isLocale;
  });
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const SS = getRequestLocale();
  console.log("🚀 ~ middleware ~ SS:", SS);
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};

const requestContext = cache(() => {
  return new Map<string, string>();
});

// export const setRequestContext = (key: string, value: string) =>
//   requestContext().set(key, value);

// export const getRequestContext = (key: string) => requestContext().get(key);

export const setRequestLocale = (value: string) =>
  requestContext().set("locale", value);

export const getRequestLocale = () => requestContext().get("locale");
