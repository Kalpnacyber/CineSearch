import styles from "./Loader.module.css";

function Loader({ text = "Loading..." }) {
  return (
    <div className={styles.loader} role="status">
      <div className={styles.spinner} />
      <p>{text}</p>
    </div>
  );
}

export default Loader;
