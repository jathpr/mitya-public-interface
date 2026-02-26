"use client";

import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useState, useRef, useEffect } from "react";
import { TfiWorld } from "react-icons/tfi";

// locale display names are provided via translations so they follow the current messages

export function LocaleSwitcher({
  onLocaleChange,
}: {
  onLocaleChange?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale = useLocale();
  const t = useTranslations("languages");
  const localePathname = usePathname() || "/";

  // Build pathname without the leading locale segment in a robust way.
  // e.g. '/en/about' -> '/about', '/' or '/en' -> '/'
  const segments = localePathname.split("/").filter(Boolean);
  const pathWithoutLocale =
    `/${segments.slice(1).join("/")}`.replace(/\/$/, "") || "/";

  const localesToDisplay = routing.locales.filter(
    (loc) => loc !== currentLocale
  );

  const handleLocaleChange = () => {
    setIsExpanded(false);
    // dev-friendly logging so we can reproduce behaviour locally
    if (
      process.env.NEXT_PUBLIC_I18N_DEBUG === "true" ||
      process.env.NODE_ENV !== "production"
    ) {
      console.debug(
        "[i18n:client] LocaleSwitcher - currentLocale:",
        currentLocale,
        "pathWithoutLocale:",
        pathWithoutLocale
      );
    }
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
            {
              // Force a full navigation to ensure the server receives the path
              // including the locale. This makes the URL the single source of truth
              // for locale selection and avoids RSC flights picking up a different
              // locale from cookies/accept-language on the initial request.
            }
            {(() => {
              const basePath =
                pathWithoutLocale === "/"
                  ? ""
                  : pathWithoutLocale.startsWith("/")
                  ? pathWithoutLocale
                  : "/" + pathWithoutLocale;
              // Perform a strict full navigation to the canonical path
              // `/<locale><path>` so the server always receives the locale
              // from the URL. No query-param guard and no cookie reliance.
              const href = `/${locale}${basePath}`;
              return (
                <a
                  href={href}
                  className={styles.link}
                  onClick={(e) => {
                    // Force a full navigation to ensure the server receives
                    // the canonical `/<locale><path>` URL. Prevent default to
                    // stop Next's client router from attempting an SPA
                    // transition which can race with server-side locale
                    // detection and cause unexpected redirects.
                    e.preventDefault();
                    handleLocaleChange();

                    if (
                      process.env.NEXT_PUBLIC_I18N_DEBUG === "true" ||
                      process.env.NODE_ENV !== "production"
                    ) {
                      console.debug(
                        "[i18n:client] anchor click -> forcing full navigation to",
                        href,
                        {
                          currentLocale,
                          pathWithoutLocale,
                        }
                      );
                    }

                    // Use location.assign so the navigation is recorded in
                    // history (back button works) and performs a full reload.
                    // This avoids setting window.location.href directly which
                    // could sometimes interact with pending router state.
                    window.location.assign(href);
                  }}
                >
                  {t(locale) || locale}
                </a>
              );
            })()}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
