import { useEffect, useState } from "react";
import { searchMovies } from "../api";

export default function useMovieSearch(query, type, page) {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const text = query.trim();

    if (text.length < 2) {
      setMovies([]);
      setTotal(0);
      setError(text.length === 1 ? "Please type at least 2 characters." : "");
      return;
    }

    // Ignore results from older requests if the user has already typed something new
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await searchMovies({ query: text, type, page });
        if (ignore) return;

        setMovies(data.results);
        setTotal(data.total);
        if (data.results.length === 0) {
          setError(
            data.message === "Too many results."
              ? "Too many results. Try a more specific title."
              : `No results found for "${text}".`
          );
        }
      } catch (err) {
        if (!ignore) {
          setMovies([]);
          setTotal(0);
          setError(err.message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [query, type, page]);

  return { movies, total, loading, error };
}
