import Link from "next/link";
import styles from "./page.module.css";
import tgQr from "../../public/qr.png";
import enso from "../../public/zen.png";
import Image from "next/image";
import { HyperLink } from "@/components/HyperLink";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image src={enso} alt="qr code of Telegram" className={styles.enso} />
      Вітаю. <HyperLink url="/about" label="Мяне" /> клічуць Міця
      <br /> Я прапаную свае паслугі ў сферах{" "}
      <HyperLink url="/meditation" label="медытацыі" /> і{" "}
      <HyperLink url="/programming" label="праграмавання" />
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href="https://t.me/jathpr"
        className={styles.qrLink}
      >
        <Image src={tgQr} alt="qr code of Telegram" className={styles.qr} />
      </Link>
    </div>
  );
}
