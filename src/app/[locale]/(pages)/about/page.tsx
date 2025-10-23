import styles from "./page.module.css";
import mitya from "../../../../../public/me.jpg";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HyperLink } from "@/components/Hyperlink";

export default async function about() {
  const t = await getTranslations("about");
  return (
    <div className={styles.page}>
      <Link href="/buddhism/intro">
        <Image src={mitya} alt={t("imgPhoto")} className={styles.photo} />
      </Link>
      <p className={styles.text}>
        {t.rich("text", {
          meditation: (c) => <HyperLink url="/meditation">{c}</HyperLink>,
          buddhism: (c) => <HyperLink url="/buddhism">{c}</HyperLink>,
        })}
      </p>
    </div>
  );
}
