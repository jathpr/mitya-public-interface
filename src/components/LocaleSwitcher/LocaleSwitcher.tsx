"use client";

import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";
import { Link } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const localePathname = usePathname();
  // const redirectedPathname = (locale: string) => {
  //   if (!pathname) return "/";
  //   const segments = pathname.split("/");
  //   segments[1] = locale;
  //   return segments.join("/");
  // };
  const pathname = usePathname().length < 4 ? "/" : localePathname.substring(3);
  return (
    <div className={styles.container}>
      <Link locale={routing.locales[0]} href={pathname} className={styles.link}>
        мова
      </Link>
      <Link locale={routing.locales[1]} href={pathname} className={styles.link}>
        language
      </Link>
      <Link locale={routing.locales[2]} href={pathname} className={styles.link}>
        язык
      </Link>
    </div>
  );
}
