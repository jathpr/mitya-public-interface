import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function Programming() {
  const t = useTranslations("programming");
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
