import styles from "./page.module.css";
import tgQr from "../../../public/qr.png";
import Image from "next/image";
import Link from "next/link";

export default function vk() {
  return (
    <div className={styles.page}>
      <p className={styles.text}>мая пошта: jathpr@gmail.com</p>
      <p className={styles.text}>
        мой Telegram:
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://t.me/jathpr"
        >
          <Image src={tgQr} alt="qr code of Telegram" className={styles.qr} />
        </Link>
      </p>
    </div>
  );
}
