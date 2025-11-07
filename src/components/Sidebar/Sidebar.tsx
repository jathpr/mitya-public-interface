"use client";

import { useState } from "react";
import styles from "./sidebar.module.css";
import tgQr from "p@/qr.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "@/i18n/navigation";
import { LSforSide2 } from "../LocaleSwitcher/LSforSide2";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const t = useTranslations("main");

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
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://t.me/jathpr"
            className={styles.qrLink}
          >
            <Image src={tgQr} alt={t("imgTg")} className={styles.qr} />
          </Link>
          <LSforSide2 />
        </nav>
      </div>
    </>
  );
};
