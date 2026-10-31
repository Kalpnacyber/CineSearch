import MovieCard from "./MovieCard";
import styles from "./MovieGrid.module.css";

function MovieGrid({ movies }) {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
