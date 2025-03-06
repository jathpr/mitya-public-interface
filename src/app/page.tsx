import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image width={600} height={600} src="/face.jpg" alt="My face" />
    </div>
  );
}
