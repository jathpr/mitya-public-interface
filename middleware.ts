import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

// Middleware runs before requests reach the app. We use it to persist the
// locale from the URL path into a cookie (`NEXT_LOCALE`) so that internal
// RSC requests and next-intl's plugin can reliably pick up the URL locale
// even when `next-url` headers are missing.
export function middleware(req: NextRequest) {
  try {
    const segs = req.nextUrl.pathname.split("/").filter(Boolean);
    const first = segs[0];
    const locales = routing.locales as readonly string[];
    if (first && locales.includes(first)) {
      const res = NextResponse.next();
      // Set cookie for the remainder of the session; Path=/ so it's sent for all requests
      res.cookies.set("NEXT_LOCALE", first, { path: "/" });
      return res;
    }
  } catch {
    // noop - middleware must not throw
  }
  return NextResponse.next();
}

export const config = {
  // run on all paths
  matcher: "/:path*",
};
