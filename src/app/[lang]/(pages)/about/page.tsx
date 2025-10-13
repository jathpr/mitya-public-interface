import { HyperLink } from "@/components/HyperLink";
import styles from "./page.module.css";
import mitya from "../../../../../public/me.jpg";
import Image from "next/image";
import Link from "next/link";

export default function about() {
  return (
    <div className={styles.page}>
      <Link href="/buddhism/intro">
        <Image src={mitya} alt="mitya photo" className={styles.photo} />
      </Link>
      <p className={styles.text}>
        Люблю даследваць розум па-за словамі. Гэтыя даследвання прывялі мяне да{" "}
        <HyperLink url="/meditation" label="медытацыі" />. А медытацыя - да{" "}
        <HyperLink url="/buddhism" label="Буддызму" />.
      </p>
    </div>
  );
}
