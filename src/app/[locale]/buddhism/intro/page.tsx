import styles from "./page.module.css";
import { Suspense } from "react";
import { list } from "@vercel/blob";
import VideoPlayer from "./VideoPlayer.client";
import Link from "next/link";

export default function video() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <VideoWrapper fileName="green.mp4" />
    </Suspense>
  );
}

async function VideoWrapper({ fileName }: { fileName: string }) {
  const { blobs } = await list({ prefix: fileName, limit: 1 });
  const { url } = blobs[0];

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/buddhism" className={styles.navLink}>
          ← back
        </Link>
      </nav>

      <main className={styles.center}>
        <VideoPlayer src={url} />
      </main>
    </div>
  );
}
