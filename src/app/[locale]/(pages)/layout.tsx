import Image from "next/image";
import enso from "p@/zen.png";
import styles from "./layout.module.css";
import { Link } from "@/i18n/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Link href="/" className={styles.link}>
        {/* <div className={styles.centered}>Дамоў  </div> */}
        <Image
          src={enso}
          className={styles.ava}
          alt="enso symbol returning to main page"
        />
      </Link>
    </>
  );
}
