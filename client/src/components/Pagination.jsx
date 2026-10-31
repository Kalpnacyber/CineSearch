import styles from "./Pagination.module.css";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        ← Prev
      </button>
      <span>
        Page <strong>{page}</strong> of {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next →
      </button>
    </div>
  );
}

export default Pagination;
