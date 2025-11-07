import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import { HyperLink } from "@/components/Hyperlink";

export default function Meditation() {
  const t = useTranslations("meditation");
  return (
    <div className={styles.page}>
      <p className={styles.text}>
        {t.rich("overview", {
          br: () => <br />,
        })}
      </p>
      <HyperLink url={"/QuoVadis"}>{t("course")}</HyperLink>
    </div>
  );
}
