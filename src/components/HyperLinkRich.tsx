import Link from "next/link";
import styles from "./hyperLink.module.css";

type Props = {
  children?: React.ReactNode;
  url: string;
};

export const HyperLink = ({ url, children }: Props) => {
  return (
    <Link href={url} className={styles.hyperlink}>
      {children}
    </Link>
  );
};
