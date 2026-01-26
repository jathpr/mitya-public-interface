"use client";

import { useState } from "react";
import styles from "./sidebar.module.css";
import tgQr from "p@/qr.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "@/i18n/navigation";
import { Navigation } from "./Navigation";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar on language change
  const t = useTranslations("main");
  const handleLocaleChange = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={toggleSidebar} className={styles.button}>
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlayVisible : styles.overlayHidden
        }`}
      >
        <nav className={styles.content}>
          <Navigation />
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://t.me/jathpr"
            className={styles.qrLink}
          >
            <Image src={tgQr} alt={t("imgTg")} className={styles.qr} />
          </Link>
          {/* Pass close handler to LocaleSwitcher if possible */}
          <LocaleSwitcher onLocaleChange={handleLocaleChange} />
        </nav>
      </div>
    </>
  );
};
