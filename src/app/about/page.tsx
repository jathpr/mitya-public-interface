import { HyperLink } from "@/components/HyperLink";
import styles from "./page.module.css";

export default function about() {
  return (
    <div className={styles.page}>
      <p className={styles.text}>
        Люблю даследваць розум па-за словамі. Гэтыя даследвання прывялі мяне да{" "}
        <HyperLink url="/meditation" label="медытацыі" />. А медытацыя - да{" "}
        <HyperLink url="/buddhism" label="Буддызму" />.
      </p>
    </div>
  );
}
