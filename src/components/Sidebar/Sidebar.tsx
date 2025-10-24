"use client";

import { useState } from "react";
import styles from "./sidebar.module.css";
import tgQr from "p@/qr.png";
import { LocaleSwitcher } from "../LocaleSwitcher";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const t = useTranslations("main");

  return (
    <div className={styles.sidebar}>
      <button onClick={toggleSidebar} className={styles.button}>
        {isCollapsed ? "Menu" : "Hide menu"}
      </button>
      <div className={isCollapsed ? styles.collapsed : ""}>
        <nav>
          <LocaleSwitcher />
          <Image src={tgQr} alt={t("imgTg")} className={styles.qr} />
        </nav>
      </div>
    </div>
  );
};
