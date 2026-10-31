import styles from "./SearchBar.module.css";

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        className={styles.input}
        placeholder="Search for a movie, series or episode..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search movies"
        autoFocus
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange("")} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
