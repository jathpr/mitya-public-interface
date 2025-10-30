"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type Props = {
  src: string;
};

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const goFull = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.requestFullscreen) await v.requestFullscreen();
    } catch {
      /* ignore fullscreen errors */
    }
  };

  return (
    <div className={styles.player}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        playsInline
        preload="metadata"
        // keep native controls for accessibility but hide them visually on large screens
      />

      <button
        aria-label={playing ? "Pause video" : "Play video"}
        className={styles.bigPlay}
        onClick={togglePlay}
      >
        {playing ? "⏸" : "▶"}
      </button>

      <div className={styles.controlsBar}>
        <button className={styles.control} onClick={togglePlay}>
          {playing ? "Pause" : "Play"}
        </button>
        <button className={styles.control} onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <button className={styles.control} onClick={goFull}>
          Fullscreen
        </button>
      </div>
    </div>
  );
}
