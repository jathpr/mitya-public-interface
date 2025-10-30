// LocaleSwitcher.tsx - Застаецца без змен з папярэдняга кроку
"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";
import { useLocale } from "next-intl";
import { Fragment } from "react";

const localeCodes: { [key: string]: string } = {
  be: "BE",
  en: "EN",
  ru: "RU",
};

export function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const otherLocales = routing.locales.filter((loc) => loc !== currentLocale);

  return (
    <div className={styles.container}>
      {otherLocales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && <span className={styles.separator}>/</span>}
          <Link locale={locale} href={pathname} className={styles.link}>
            {localeCodes[locale]}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
