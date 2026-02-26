"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function I18nClientDebug() {
  const locale = useLocale();
  const t = useTranslations("main");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_I18N_DEBUG === "true") {
      // Small client-side snapshot to compare with server logs
      try {
        const sample = t.rich("text", {
          about: (c) => c,
          meditation: (c) => c,
          programming: (c) => c,
          br: () => "\n",
        });
        console.log(
          "[i18n:client] locale:",
          locale,
          "sample main.text:",
          sample
        );
      } catch {
        // If rich formatting fails, fall back to a safe key to avoid FORMATTING_ERROR in logs
        try {
          console.log(
            "[i18n:client] locale:",
            locale,
            "sample main.imgEnso:",
            t("imgEnso")
          );
        } catch {
          console.log(
            "[i18n:client] locale:",
            locale,
            "(failed to read sample)"
          );
        }
      }
    }
  }, [locale, t]);

  return null;
}
