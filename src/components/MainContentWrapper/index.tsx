"use client";

import { useRef, useState, useLayoutEffect } from "react";
import styles from "./mainContentWrapper.module.css";

export const MainContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const element = contentRef.current;
      if (element) {
        const hasOverflow = element.scrollHeight > element.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [children]);

  return (
    <div
      ref={contentRef}
      className={`${styles.mainContent} ${
        isOverflowing ? styles.isOverflowing : ""
      }`}
    >
      {children}
    </div>
  );
};
