import styles from "./Filters.module.css";

const TYPES = [
  { value: "", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
  { value: "episode", label: "Episodes" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Relevance" },
  { value: "year-desc", label: "Year: Newest first" },
  { value: "year-asc", label: "Year: Oldest first" },
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
];

function Filters({ type, onTypeChange, sortBy, onSortChange, fromYear, toYear, onYearChange }) {
  return (
    <div className={styles.filters}>
      <div className={styles.types}>
        {TYPES.map((item) => (
          <button
            key={item.value}
            className={type === item.value ? `${styles.chip} ${styles.selected}` : styles.chip}
            onClick={() => onTypeChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <label className={styles.field}>
          From
          <input
            type="number"
            placeholder="1900"
            value={fromYear}
            onChange={(e) => onYearChange("from", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          To
          <input
            type="number"
            placeholder={new Date().getFullYear()}
            value={toYear}
            onChange={(e) => onYearChange("to", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          Sort by
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default Filters;
