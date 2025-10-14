"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {routing.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathname(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
