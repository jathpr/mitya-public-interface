import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        Вітаю. Мяне клічуць Міця. І я люблю даследваць розум. Асабліва па-за
        словамі.
        <Link href="/meditation">Пра медытацыю</Link>
        <Link href="/QuoVadis">Курс &quot;Да сябе&quot;</Link>
        <Link href="/vk">Кантакты</Link>
      </div>
    </>
  );
}
