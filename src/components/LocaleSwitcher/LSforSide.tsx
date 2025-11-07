"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
// ВАЖНА: Пераканайцеся, што вы імпартуеце правільны CSS-файл
import styles from "./LSforSide.module.css";
import { useLocale } from "next-intl";
import { Fragment } from "react"; // Вяртаем Fragment

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
    // Гэты кантэйнер зноў мае ўсе візуальныя стылі
    <div className={styles.container}>
      {otherLocales.map((locale, index) => (
        // Fragment патрэбны для падзельніка
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
