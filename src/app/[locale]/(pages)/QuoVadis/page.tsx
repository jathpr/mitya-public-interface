import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function QuoVadis() {
  const t = useTranslations("toYourself");
  return (
    <div className={styles.page}>
      <p className={styles.text}>
        {t.rich("overview", {
          br: () => <br />,
        })}
      </p>
    </div>
  );
}
