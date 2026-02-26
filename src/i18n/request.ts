import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { headers } from "next/headers";
import beMessages from "../../messages/be.json";
import enMessages from "../../messages/en.json";
import ruMessages from "../../messages/ru.json";

const messagesMap: Record<string, Record<string, unknown>> = {
  be: beMessages as Record<string, unknown>,
  en: enMessages as Record<string, unknown>,
  ru: ruMessages as Record<string, unknown>,
};

type Locale = (typeof routing.locales)[number];

// Narrowed context shape used in this module — prefer explicit types over `any`.
type RequestCtx = {
  requestLocale?: string;
  params?: { locale?: string };
  request?: { url?: string; nextUrl?: { pathname?: string } };
  url?: string | { pathname?: string };
};

function asLocale(s?: string | null): Locale | null {
  if (!s) return null;
  const v = String(s);
  return (routing.locales as readonly string[]).includes(v)
    ? (v as Locale)
    : null;
}

function getLocaleFromAcceptLanguage(acceptLanguage: string): Locale | null {
  if (!acceptLanguage) return null;
  const prefs = acceptLanguage
    .split(",")
    .map((part) => {
      const [raw, q = "q=1"] = part.trim().split(";");
      return {
        locale: raw.toLowerCase().split("-")[0],
        quality: parseFloat(q.replace("q=", "")) || 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);
  for (const p of prefs) {
    const l = asLocale(p.locale);
    if (l) return l;
  }
  return null;
}

export default getRequestConfig(async (ctx: unknown) => {
  // 1) If Next provided requestLocale, use it
  const requested = (ctx as RequestCtx).requestLocale;
  if (hasLocale(routing.locales, requested)) {
    const locale = requested as Locale;
    return {
      locale,
      messages: messagesMap[locale] || messagesMap[routing.defaultLocale],
    };
  }

  // 2) If route params are available in ctx, prefer them (reflects URL segment)
  const paramsLocale = (ctx as unknown as { params?: { locale?: string } })
    ?.params?.locale;
  if (asLocale(paramsLocale)) {
    const locale = asLocale(paramsLocale)!;
    return {
      locale,
      messages: messagesMap[locale] || messagesMap[routing.defaultLocale],
    };
  }

  const headersList = await headers();

  // helper: detect locale from a candidate path or full URL (also checks ?locale=)
  function localeFromPathOrUrl(path?: string | null): Locale | null {
    if (!path) return null;
    try {
      const u = new URL(path, "http://localhost");
      const q = u.searchParams.get("locale");
      if (asLocale(q)) return asLocale(q);
      const segs = u.pathname.split("/").filter(Boolean);
      if (segs.length && asLocale(segs[0])) return asLocale(segs[0]);
    } catch {
      // treat as pathname
      const segs = path.split("/").filter(Boolean);
      if (segs.length && asLocale(segs[0])) return asLocale(segs[0]);
    }
    return null;
  }

  // Try to extract locale from multiple URL-related headers (best effort)
  const nextUrl = headersList.get("next-url");
  const nextRouterState =
    headersList.get("next-router-state-tree") ||
    headersList.get("next-router-state");
  // NOTE: `referer` may point to the previous page (e.g. /ru/about) and
  // can cause the server to choose the wrong locale for internal RSC/flight
  // requests when `next-url` / `next-router-state` / raw request URL are
  // missing. Prefer URL-derived sources and accept-language; treat referer as
  // unreliable and do NOT use it to decide locale.
  // Keep xPath (internal invoke hints) for completeness.
  const xPath =
    headersList.get("x-invoke-path") ||
    headersList.get("x-nextjs-pathname") ||
    null;

  // Also try to read a raw request URL from ctx if present
  let rawRequestUrl: string | null = null;
  try {
    const anyCtx = ctx as RequestCtx;
    if (anyCtx?.request?.url) rawRequestUrl = anyCtx.request.url;
    else if (anyCtx?.request?.nextUrl?.pathname)
      rawRequestUrl = anyCtx.request.nextUrl.pathname;
    else if (typeof anyCtx?.url === "string") rawRequestUrl = anyCtx.url;
    else if (
      anyCtx?.url &&
      typeof (anyCtx.url as { pathname?: unknown }).pathname === "string"
    ) {
      const p = (anyCtx.url as { pathname?: string }).pathname;
      rawRequestUrl = typeof p === "string" ? p : null;
    }
  } catch {
    rawRequestUrl = null;
  }

  // Only consider explicit URL-like sources and internal xPath hints; do NOT
  // consider the Referer header as it can reflect the previous page and
  // produce inconsistent results during SPA/RSC navigations.
  const candidates: Array<Locale | null> = [
    localeFromPathOrUrl(rawRequestUrl),
    localeFromPathOrUrl(nextUrl || null),
    localeFromPathOrUrl(nextRouterState || null),
    localeFromPathOrUrl(xPath),
  ];
  const localeFromUrl = candidates.find((c) => c) || null;

  const accept = headersList.get("accept-language") || "";
  const localeFromAccept = getLocaleFromAcceptLanguage(accept);

  // Final decision: URL-derived locale (including ?locale) > Accept-Language > default
  const locale =
    localeFromUrl || localeFromAccept || (routing.defaultLocale as Locale);

  // Development-friendly logging: enable when I18N_DEBUG is explicitly set
  // or when running in development mode so we can capture mismatches during
  // manual repro without requiring extra env plumbing.
  if (
    process.env.I18N_DEBUG === "true" ||
    process.env.NODE_ENV !== "production"
  ) {
    try {
      console.log("[i18n] getRequestConfig - requested:", requested);
      console.log(
        "[i18n] headers - nextUrl:",
        nextUrl,
        "nextRouterState:",
        nextRouterState,
        "rawRequestUrl:",
        rawRequestUrl
      );
      console.log(
        "[i18n] chosen:",
        locale,
        "fromUrl:",
        localeFromUrl,
        "fromAccept:",
        localeFromAccept
      );
    } catch (e) {
      // avoid crashing the server during debug logging
      console.error("[i18n] debug log failed:", e);
    }
  }

  return {
    locale,
    messages: messagesMap[locale] || messagesMap[routing.defaultLocale],
  };
});
