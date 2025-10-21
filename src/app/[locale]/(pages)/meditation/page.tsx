import { Link } from "@/i18n/navigation";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";

export default function Meditation() {
  const t = useTranslations("meditation");
  return (
    <div className={styles.page}>
      <p className={styles.text}>
        {t.rich("overview", {
          br: () => <br />,
        })}
      </p>

      <Link href="/QuoVadis">Курс &quot;Да сябе&quot;</Link>
    </div>
  );
}
