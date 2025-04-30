import Link from "next/link";
import styles from "./page.module.css";
import tgQr from "../../public/qr.png";
import Image from "next/image";
import { HyperLink } from "@/components/HyperLink";

export default function Home() {
  return (
    <div className={styles.page}>
      Вітаю. <HyperLink url="/about" label="Мяне" /> клічуць Міця. І я прапаную
      свае паслугі ў сферы <HyperLink url="/meditation" label="медытацыі" /> і{" "}
      <HyperLink url="/programming" label="праграмавання" />.
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href="https://t.me/jathpr"
      >
        <Image src={tgQr} alt="qr code of Telegram" className={styles.qr} />
      </Link>
    </div>
  );
}
