import Link from "next/link";
import styles from "./hyperLink.module.css";

type Props = {
  label: string;
  url: string;
};

export const HyperLink = ({ label, url }: Props) => {
  return (
    <Link href={url} className={styles.hyperlink}>
      {label}
    </Link>
  );
};
