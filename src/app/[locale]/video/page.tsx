// app/[locale]/video/page.tsx
import { Suspense } from "react";
import { list } from "@vercel/blob";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation"; // ВАЖНА: Імпартуем Link

// Мы выкарыстоўваем VideoPlayer, як і раней
import { VideoPlayer } from "@/components/VideoPlayer";
import styles from "./video.module.css";

// ВЫДАЛЕНА: import { BackButton } from "@/components/BackButton";

// --- Серверны кампанент для загрузкі URL (Без змен) ---
async function VideoWrapper() {
  let bwVideoUrl = "";
  try {
    const { blobs } = await list({ prefix: "bw.mp4", limit: 1 });
    if (blobs[0]) {
      bwVideoUrl = blobs[0].url;
    } else {
      console.error("B&W video (bw.mp4) not found in Blob storage.");
    }
  } catch (e) {
    console.error("Error fetching video URL:", e);
  }

  return <VideoPlayer src={bwVideoUrl} />;
}

// --- Асноўны кампанент старонкі ---
export default function VideoPage() {
  // Выкарыстоўваем 'videoPage' і 'Navigation' для тэксту
  const t = useTranslations("videoPage");
  const tNav = useTranslations("Navigation");

  return (
    <div className={styles.pageContainer}>
      {/* 1. ВЫДАЛЕНА: <BackButton /> */}

      {/* 2. Плэер (Без змен) */}
      <div className={styles.playerWrapper}>
        <Suspense fallback={<div className={styles.skeleton}></div>}>
          <VideoWrapper />
        </Suspense>
      </div>

      {/* 3. Апісанне (Без змен) */}
      <p className={styles.description}>{t("description")}</p>

      {/* 4. НОВАЕ: Спасылкі на іншыя старонкі */}
      <div className={styles.navLinksContainer}>
        <Link href="/about" className={styles.navLink}>
          {tNav("about")}
        </Link>
        <Link href="/buddhism" className={styles.navLink}>
          {tNav("buddhism")}
        </Link>
      </div>
    </div>
  );
}
