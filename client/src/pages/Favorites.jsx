import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";
import Message from "../components/Message";
import styles from "./Favorites.module.css";

function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <section className={styles.favorites}>
      <div className={styles.header}>
        <h1>❤️ My Favorites</h1>
        {favorites.length > 0 && (
          <button className={styles.clear} onClick={clearFavorites}>
            Clear all
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <Message icon="💔" title="No favorites yet" text="Tap the heart on any title to save it here.">
          <Link to="/" className={styles.link}>
            Browse movies
          </Link>
        </Message>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </section>
  );
}

export default Favorites;
