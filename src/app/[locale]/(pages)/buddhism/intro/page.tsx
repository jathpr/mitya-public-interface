import styles from "./page.module.css";

export default function video() {
  return (
    <>
      <video width="70%" controls className={styles.video}>
        <source src={"./green.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
