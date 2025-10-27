"use client";

import { useState } from "react";
import styles from "./sidebar.module.css";
import tgQr from "p@/qr.png"; // Убедись, что этот путь к QR-коду верный
import { LocaleSwitcher } from "../LocaleSwitcher";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HiMenu, HiX } from "react-icons/hi";

export const Sidebar = () => {
  // Используем 'isOpen' (открыто) вместо 'isCollapsed' (свернуто)
  // По умолчанию меню закрыто (false)
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const t = useTranslations("main");

  return (
    // Используем Фрагмент (<>), чтобы вернуть два элемента: кнопку и оверлей
    <>
      {/* Эта кнопка всегда видима и находится в фиксированной позиции.
        Она будет поверх оверлея благодаря z-index в CSS.
      */}
      <button onClick={toggleSidebar} className={styles.button}>
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Это сам оверлей. Он будет анимироваться (выезжать) 
        в зависимости от того, какой класс применен.
      */}
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlayVisible : styles.overlayHidden
        }`}
      >
        {/* Мы используем 'nav' для контента внутри оверлея, 
          чтобы его было легче стилизовать и центрировать.
        */}
        <nav className={styles.content}>
          <LocaleSwitcher />
          <Image src={tgQr} alt={t("imgTg")} className={styles.qr} />
        </nav>
      </div>
    </>
  );
};
