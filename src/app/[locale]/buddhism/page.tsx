import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function Buddhism() {
  const t = useTranslations("buddhism");
  return (
    <div className={styles.page}>
      <blockquote className={styles.quote}>
        <q className={styles.text}>{t("quote")}</q>
        <br />
        <br />
        <cite>{t("quoteAutor")}</cite>
      </blockquote>
      <br />

      <p className={styles.text}>{t("overview")}</p>
      <br />
      <p className={styles.text}>{t("keyWords")}</p>
      {/* <p className={styles.text}>
        Прапаную паглядзець на некалькі ракурсаў Буддызму <br />
        - Навуковы. Гэта набор тэрмінаў і эмпірычнага вопыту ў сферы даследвання
        феномена розуму, нашай прыроды, шчасця.
        <br />
        - Філасоўскі. Гэта тэарэтычны аспект навуковага падыходу. <br />
        - Рэлігійны. Будда не быў буддыстам. Але ён шукаў розныя падыходы, каб
        дапамагаць жывым. У тым ліку тыя, якія завуць рэлігіяй.
        <br />
        - Бытавы. Гэта пра тое, як ён можа нам дапамагчы ў штодзённасці.
        <br />
      </p> */}
    </div>
  );
}
