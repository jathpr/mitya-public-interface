"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";
import { useLocale } from "next-intl";
import { Fragment, useState, useRef, useEffect } from "react";
import { TfiWorld } from "react-icons/tfi";

// Аб'ект для адлюстравання назваў моў на іх саміх
const localeNames: { [key: string]: string } = {
  be: "Беларуская",
  en: "English",
  ru: "Русский",
};

export function LocaleSwitcher({
  onLocaleChange,
}: {
  onLocaleChange?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale = useLocale();
  const localePathname = usePathname();
  const pathname = localePathname;
  const localesToDisplay = routing.locales.filter(
    (loc) => loc !== currentLocale
  );

  const handleLocaleChange = () => {
    setIsExpanded(false);
    if (onLocaleChange) onLocaleChange();
  };

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
      className={styles.container}
      role="group"
      aria-expanded={isExpanded}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <span className={styles.iconWrapper} role="button">
        <TfiWorld size={20} className={styles.worldIcon} />
      </span>
      <div
        className={`${styles.languageList} ${
          isExpanded ? styles.expanded : ""
        }`}
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
