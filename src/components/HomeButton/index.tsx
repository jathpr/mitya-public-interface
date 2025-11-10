"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import enso from "p@/zen.png";
import styles from "./homeButton.module.css";

export const HomeButton = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  console.log("🚀 ~ HomeButton ~ isHomePage:", isHomePage);

  if (isHomePage) {
    return null;
  }

  return (
    <Link href="/" className={styles.link}>
      <Image
        src={enso}
        className={styles.enso}
        alt="enso symbol returning to main page"
      />
    </Link>
  );
};
