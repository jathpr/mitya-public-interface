// components/VideoPlayer.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import styles from "@/app/[locale]/video/video.module.css";
import { useLocale } from "next-intl";

type Props = {
  src: string;
};

export function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const locale = useLocale();
  const [isLoaded, setIsLoaded] = useState(false);

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
    // Выкарыстоўваем стыль .skeleton, які ўжо вызначаны ў CSS
    return <div className={styles.skeleton}>Error: Video URL not found.</div>;
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
        label="Беларуская"
        kind="subtitles"
        src="/subtitles/green_by.vtt"
        srcLang="be"
        default={locale === "be"}
      />
      <track
        label="English"
        kind="subtitles"
        src="/subtitles/green_en.vtt"
        srcLang="en"
        default={locale === "en"}
      />
      <track
        label="Русский"
        kind="subtitles"
        src="/subtitles/green_ru.vtt"
        srcLang="ru"
        default={locale === "ru"}
      />
      Ваш браўзер не падтрымлівае тэг video.
    </video>
  );
}
