"use client";

import { Link } from "@/i18n/navigation";
import styles from "./hyperLink.module.css";
import { useLinkStatus } from "next/link";

type Props = {
  children?: React.ReactNode;
  url: string;
};

export const HyperLink = ({ url, children }: Props) => {
  const { pending } = useLinkStatus();
  return (
    <Link href={url} className={styles.hyperlink}>
      {!pending && children}
      {pending && <div className={styles.spinner} />}
    </Link>
  );
};
