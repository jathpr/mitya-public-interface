import styles from "./page.module.css";
import Image from "next/image";

export default function view() {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.mediaWrapper}>
          {/* Poster with play overlay — replace with a real video element or iframe if you add a src */}
          <div className={styles.poster} aria-hidden>
            <Image
              src="/me.jpg"
              alt="poster"
              fill
              className={styles.posterImg}
            />
            <div className={styles.play} aria-hidden>
              ▶
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <h1 className={styles.title}>Пра відэа</h1>
          <p className={styles.text}>
            Шчасце — гэта нешта, што адбываецца ў розуме. Не ў думках, не ў
            целе, не ў рэчах. Медытацыя дапамагае лепш разумець тую частку сябе,
            дзе жыве гэта шчасце.
          </p>

          <p className={styles.textSmall}>
            Цікава мне гэта было заўжды; актыўную практыку пачаў у 2018 годзе з
            рэтрыта ў падыходзе Гоенкі. За некалькі год заўважыў, што калі ў
            маім дні прысутнічае медытацыя, то ўзровень паўнаты жыцця вырастае.
            З 2021 года падтрымліваю штодзённую практыку.
          </p>
        </section>
      </main>
    </div>
  );
}
