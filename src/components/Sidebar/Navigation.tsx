import Link from "next/link";
import styles from "./sidebar.module.css";

// List of pages to show in sidebar navigation (excluding video and view)
const pages = [
  { href: "/", label: "Галоўная" },
  { href: "/about", label: "Пра мяне" },
  { href: "/buddhism", label: "Будызм" },
  { href: "/buddhism/intro", label: "Медытацыя" },
  { href: "/programming", label: "Праграмаванне" },
  { href: "/QuoVadis", label: "Quo Vadis" },
];

export function Navigation() {
  return (
    <ul className={styles.navList}>
      {pages.map((page) => (
        <li key={page.href}>
          <Link href={page.href} className={styles.navLink}>
            {page.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
