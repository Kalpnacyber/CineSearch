import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Poster from "./Poster";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(movie.id);

  function handleFavorite(e) {
    e.preventDefault(); // stop the card link from opening
    toggleFavorite(movie);
  }

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.posterBox}>
        <Poster src={movie.poster} title={movie.title} />
        <button
          className={saved ? `${styles.favorite} ${styles.saved}` : styles.favorite}
          onClick={handleFavorite}
          aria-label={saved ? "Remove from favorites" : "Add to favorites"}
          title={saved ? "Remove from favorites" : "Add to favorites"}
        >
          {saved ? "❤️" : "🤍"}
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span>{movie.year}</span>
          <span className={styles.type}>{movie.type}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
