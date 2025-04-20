import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        Вітаю Мяне клічуць Міця. І я люблю даследваць розум. Асабліва па-за
        словамі. Тут будуць кнопачкі, каб дазнацца нешта пра мяне.
        <Link href="/meditation">Пра медытацыю</Link>
        <Link href="/QuoVadis">Курс "Да сябе"</Link>
        <Link href="/vk">Кантакты</Link>
      </div>
    </>
  );
}
