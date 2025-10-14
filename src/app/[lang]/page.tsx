import Link from "next/link";
import styles from "./page.module.css";
import tgQr from "../../../public/qr.png";
import enso from "../../../public/zen.png";
import Image from "next/image";
import { HyperLink } from "@/components/HyperLink";

type Params = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Params) {
  const { lang } = await params;

  return (
    <div className={styles.page}>
      {lang === "en" ? (
        <>
          <Image src={enso} alt="qr code of Telegram" className={styles.enso} />
          Hello. <HyperLink url="/about" label="My" /> name is Mitya
          <br /> I promote you assist in{" "}
          <HyperLink url="/meditation" label="meditation" /> and{" "}
          <HyperLink url="/programming" label="programming" />
        </>
      ) : (
        <>
          <Image src={enso} alt="qr code of Telegram" className={styles.enso} />
          Вітаю. <HyperLink url="/about" label="Мяне" /> клічуць Міця
          <br /> Я прапаную свае паслугі ў сферах{" "}
          <HyperLink url="/meditation" label="медытацыі" /> і{" "}
          <HyperLink url="/programming" label="праграмавання" />
        </>
      )}

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
