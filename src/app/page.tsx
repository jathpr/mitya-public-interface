import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { headers } from "next/headers";

function getLocaleFromAcceptLanguage(acceptLanguage: string): string | null {
  if (!acceptLanguage) return null;

  const locales = [...routing.locales];
  const preferences = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, q = "q=1"] = lang.trim().split(";");
      const quality = parseFloat(q.replace("q=", "")) || 0;
      return { locale: locale.toLowerCase().split("-")[0], quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const pref of preferences) {
    if ((locales as string[]).includes(pref.locale)) {
      return pref.locale;
    }
  }

  return null;
}

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const localeFromAccept = getLocaleFromAcceptLanguage(acceptLanguage);
  const locale = localeFromAccept || routing.defaultLocale;

  redirect(`/${locale}`);
}
