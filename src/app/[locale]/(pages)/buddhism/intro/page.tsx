import styles from "./page.module.css";
import { Suspense } from "react";
import { list } from "@vercel/blob";

export default function video() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <VideoComponent fileName="green.mp4" />
    </Suspense>
  );
}

async function VideoComponent({ fileName }: { fileName: string }) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  });
  const { url } = blobs[0];

  return (
    <video
      controls
      aria-label="Video player"
      width="70%"
      className={styles.video}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
