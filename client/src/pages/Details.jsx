import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../api";
import { useFavorites } from "../context/FavoritesContext";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Poster from "../components/Poster";
import styles from "./Details.module.css";

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getMovieById(id);
        if (!ignore) setMovie(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <Loader text="Loading details..." />;

  if (error) {
    return (
      <Message icon="⚠️" title="Could not load this title" text={error}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← Go back
        </button>
      </Message>
    );
  }

  const saved = isFavorite(movie.id);

  return (
    <article className={styles.details}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.layout}>
        <div className={styles.poster}>
          <Poster src={movie.poster} title={movie.title} />
        </div>

        <div className={styles.content}>
          <h1>
            {movie.title} <span className={styles.year}>({movie.year})</span>
          </h1>

          <div className={styles.tags}>
            {movie.rated && <span className={styles.tag}>{movie.rated}</span>}
            {movie.runtime && <span className={styles.tag}>{movie.runtime}</span>}
            <span className={styles.tag}>{movie.type}</span>
            {movie.genre?.split(", ").map((genre) => (
              <span key={genre} className={`${styles.tag} ${styles.genre}`}>
                {genre}
              </span>
            ))}
          </div>

          {movie.imdbRating && (
            <p className={styles.rating}>
              ⭐ <strong>{movie.imdbRating}</strong>/10
              {movie.imdbVotes && <span> · {movie.imdbVotes} votes</span>}
            </p>
          )}

          {movie.plot && <p className={styles.plot}>{movie.plot}</p>}

          <button
            className={saved ? `${styles.favorite} ${styles.saved}` : styles.favorite}
            onClick={() => toggleFavorite(movie)}
          >
            {saved ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

          <dl className={styles.info}>
            <InfoRow label="Director" value={movie.director} />
            <InfoRow label="Writer" value={movie.writer} />
            <InfoRow label="Actors" value={movie.actors} />
            <InfoRow label="Released" value={movie.released} />
            <InfoRow label="Language" value={movie.language} />
            <InfoRow label="Country" value={movie.country} />
          </dl>

          {movie.ratings.length > 0 && (
            <div className={styles.ratings}>
              {movie.ratings.map((item) => (
                <div key={item.Source} className={styles.ratingBox}>
                  <strong>{item.Value}</strong>
                  <span>{item.Source}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default Details;
