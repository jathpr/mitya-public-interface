import Link from "next/link";
import styles from "./page.module.css";
import tgQr from "../../../public/qr.png";
import enso from "../../../public/zen.png";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HyperLink } from "@/components/HyperLinkRich";

export default async function Home() {
  const t = await getTranslations("main");
  return (
    <div className={styles.page}>
      <Image src={enso} alt={t("imgEnso")} className={styles.enso} />
      {t.rich("text", {
        about: (c) => <HyperLink url="/about">{c}</HyperLink>,
        meditation: (c) => <HyperLink url="/meditation">{c}</HyperLink>,
        programming: (c) => <HyperLink url="/programming">{c}</HyperLink>,
        br: () => <br />,
      })}
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href="https://t.me/jathpr"
        className={styles.qrLink}
      >
        <Image src={tgQr} alt={t("imgTg")} className={styles.qr} />
      </Link>
    </div>
  );
}
