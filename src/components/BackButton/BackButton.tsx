// components/BackButton.tsx
"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
// Мы будзем выкарыстоўваць тыя ж стылі, што і для старонкі відэа
import styles from "@/app/[locale]/video/video.module.css";
import { HiArrowLeft } from "react-icons/hi"; // Новая іконка "Назад"

export function BackButton() {
  const router = useRouter();
  const t = useTranslations("videoPage"); // Для тэксту кнопкі

  return (
    <button onClick={() => router.back()} className={styles.backButton}>
      <HiArrowLeft size={20} />
      <span>{t("backButton")}</span>
    </button>
  );
}
