import { useState } from "react";
import styles from "./Poster.module.css";

// Shows a placeholder when OMDb has no poster or the image fails to load
function Poster({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={styles.placeholder}>
        <span>🎞️</span>
        <p>No poster</p>
      </div>
    );
  }

  return <img className={styles.image} src={src} alt={`${title} poster`} loading="lazy" onError={() => setFailed(true)} />;
}

export default Poster;
