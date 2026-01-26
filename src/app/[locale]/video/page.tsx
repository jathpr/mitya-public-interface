import { Suspense } from "react";
import { list } from "@vercel/blob";
import { useTranslations } from "next-intl";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Link } from "@/i18n/navigation";
import styles from "./video.module.css";
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
export default function VideoPage() {
  const t = useTranslations("videoPage");
  const tNav = useTranslations("Navigation");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.playerWrapper}>
        <Suspense fallback={<div className={styles.skeleton}></div>}>
          <VideoWrapper />
        </Suspense>
      </div>

      <p className={styles.description}>{t("description")}</p>

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
