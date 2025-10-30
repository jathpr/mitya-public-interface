"use client";

import { usePathname, Link } from "@/i18n/navigation"; // <-- ПАВІННА БЫЦЬ ТАК
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";
// import { Link } from "@/i18n/navigation"; <-- Ужо імпартавана вышэй
import { TfiWorld } from "react-icons/tfi";
import { useState, useRef, useEffect, Fragment } from "react";
import { useLocale } from "next-intl";

// Аб'ект для адлюстравання назваў моў на іх саміх
const localeNames: { [key: string]: string } = {
  be: "Беларуская",
  en: "English",
  ru: "Русский",
};

export function LocaleSwitcher() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Цяпер usePathname бярэцца з next-intl і вяртае шлях без мовы
  const pathname = usePathname();
  const currentLocale = useLocale();

  const localesToDisplay = routing.locales.filter(
    (loc) => loc !== currentLocale
  );

  const handleLocaleChange = () => {
    // Пасля выбару мовы закрываем спіс
    setIsExpanded(false);
  };

  // Логіка для закрыцця блока, калі карыстальнік клікае па-за яго межамі
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container}`}
      // Увесь клік адбываецца на iconWrapper
      role="group"
      aria-expanded={isExpanded}
    >
      {/* 1. ІКОНКА-ТРЫГЕР (заўсёды бачная) */}
      <span
        className={styles.iconWrapper}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
      >
        <TfiWorld size={20} className={styles.worldIcon} />
      </span>

      {/* 2. БЛОК З НАЗВАМІ МОВАЎ */}
      <div
        className={`${styles.languageList} ${
          isExpanded ? styles.expanded : ""
        }`}
        // Спыняем клік на гэтым блоку, каб ён не спрацаваў на iconWrapper і не закрыў спіс
        onClick={(e) => e.stopPropagation()}
      >
        {localesToDisplay.map((locale, index) => (
          <Fragment key={locale}>
            {index > 0 && <span className={styles.separator}>/</span>}
            <Link
              locale={locale}
              href={pathname}
              className={styles.link}
              onClick={handleLocaleChange}
            >
              {localeNames[locale]}
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
