// components/VideoPlayer.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import styles from "@/app/[locale]/video/video.module.css";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  src: string;
};

export function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const locale = useLocale();
  const [isLoaded, setIsLoaded] = useState(false);

  const t = useTranslations("videoPage");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Выкарыстоўваем 'loadeddata' замест 'canplay' для больш хуткага з'яўлення
    const handleLoadedData = () => {
      setIsLoaded(true);
    };
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [src]);

  if (!src) {
    // Use translation for missing src fallback
    return <div className={styles.skeleton}>{t("noSource")}</div>;
  }

  return (
    <video
      ref={videoRef}
      className={`${styles.video} ${isLoaded ? styles.videoLoaded : ""}`}
      src={src}
      playsInline
      preload="auto"
      controls
      controlsList="nodownload"
      crossOrigin="anonymous"
    >
      {/* ... (усе <track> элементы застаюцца) ... */}
      <track
        label={t("subs.be")}
        kind="subtitles"
        src="/subtitles/green_by.vtt"
        srcLang="be"
        default={locale === "be"}
      />
      <track
        label={t("subs.en")}
        kind="subtitles"
        src="/subtitles/green_en.vtt"
        srcLang="en"
        default={locale === "en"}
      />
      <track
        label={t("subs.ru")}
        kind="subtitles"
        src="/subtitles/green_ru.vtt"
        srcLang="ru"
        default={locale === "ru"}
      />
      {t("fallback")}
    </video>
  );
}
