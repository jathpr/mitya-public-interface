import Link from "next/link";
import styles from "./page.module.css";
import tgQr from "../../public/qr.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        Вітаю.{" "}
        <Link href="/about" className="hyperlink">
          Мяне
        </Link>{" "}
        клічуць Міця. І я прапаную свае паслугі ў сферы{" "}
        <Link href="/meditation" className="hyperlink">
          медытацыі
        </Link>{" "}
        і{" "}
        <Link href="/programming" className="hyperlink">
          праграмавання
        </Link>
        .
        {/* <Link href="/about" className={styles.hyperlink}>
          Пра мяне
        </Link> */}
        {/* люблю даследваць розум па-за словамі */}
        {/* <Link href="/meditation">Пра медытацыю</Link> */}
        {/* <Link href="/vk">Кантакты</Link> */}
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://t.me/jathpr"
        >
          <Image src={tgQr} alt="qr code of Telegram" className={styles.qr} />
        </Link>
      </div>
    </>
  );
}
