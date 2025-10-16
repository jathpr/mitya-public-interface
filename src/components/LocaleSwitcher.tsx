"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className={styles.container}>
      <Link
        href={redirectedPathname(routing.locales[0])}
        className={styles.link}
      >
        мова
      </Link>
      <Link
        href={redirectedPathname(routing.locales[1])}
        className={styles.link}
      >
        language
      </Link>
      <Link
        href={redirectedPathname(routing.locales[2])}
        className={styles.link}
      >
        язык
      </Link>
    </div>
  );
}
