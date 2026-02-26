"use client";

import { Link } from "@/i18n/navigation";
import styles from "./sidebar.module.css";
import { useTranslations } from "next-intl";

const pages = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/buddhism", key: "buddhism" },
  { href: "/buddhism/intro", key: "meditation" },
  { href: "/programming", key: "programming" },
  { href: "/QuoVadis", key: "quoVadis" },
];

export function Navigation() {
  const t = useTranslations("nav");

  return (
    <ul className={styles.navList}>
      {pages.map((page) => (
        <li key={page.href}>
          <Link href={page.href} className={styles.navLink}>
            {t(page.key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
