import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import Message from "../components/Message";
import useDebounce from "../hooks/useDebounce";
import useMovieSearch from "../hooks/useMovieSearch";
import { filterByYear, sortMovies } from "../utils";
import styles from "./Home.module.css";

const DEFAULT_QUERY = "Avengers";
const RESULTS_PER_PAGE = 10; // fixed by OMDb

function Home() {
  // Search text, type and page are kept in the URL so the back button
  // and page refresh keep the same results.
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? DEFAULT_QUERY;
  const type = params.get("type") ?? "";
  const page = Number(params.get("page")) || 1;

  const [input, setInput] = useState(query);
  const [sortBy, setSortBy] = useState("default");
  const [years, setYears] = useState({ from: "", to: "" });

  const debouncedInput = useDebounce(input, 500);
  const { movies, total, loading, error } = useMovieSearch(debouncedInput, type, page);

  function updateParams(changes) {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null) next.delete(key);
      else next.set(key, value);
    });
    setParams(next, { replace: true });
  }

  function handleInputChange(value) {
    setInput(value);
    updateParams({ q: value, page: null });
  }

  function handlePageChange(newPage) {
    updateParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Year filter and sorting run on the client over the current page of results
  const visibleMovies = useMemo(
    () => sortMovies(filterByYear(movies, years.from, years.to), sortBy),
    [movies, years, sortBy]
  );

  const totalPages = Math.min(Math.ceil(total / RESULTS_PER_PAGE), 100);
  const isTyping = input !== debouncedInput;

  function renderResults() {
    if (loading || isTyping) return <Loader text="Searching..." />;
    if (!input.trim()) {
      return <Message icon="🍿" title="Start searching" text="Type a title above to find movies and shows." />;
    }
    if (error) return <Message icon="⚠️" title="Oops!" text={error} />;
    if (visibleMovies.length === 0) {
      return (
        <Message icon="🔎" title="No matches" text="No results match your year filter on this page.">
          <button className={styles.reset} onClick={() => setYears({ from: "", to: "" })}>
            Clear year filter
          </button>
        </Message>
      );
    }
    return (
      <>
        <p className={styles.count}>
          Showing {visibleMovies.length} of {total.toLocaleString()} results
        </p>
        <MovieGrid movies={visibleMovies} />
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    );
  }

  return (
    <section>
      <div className={styles.hero}>
        <h1>
          Discover your next <span>favorite</span> film
        </h1>
        <p>Search thousands of movies, series and episodes in real time.</p>
        <SearchBar value={input} onChange={handleInputChange} />
      </div>

      <Filters
        type={type}
        onTypeChange={(value) => updateParams({ type: value, page: null })}
        sortBy={sortBy}
        onSortChange={setSortBy}
        fromYear={years.from}
        toYear={years.to}
        onYearChange={(key, value) => setYears((current) => ({ ...current, [key]: value }))}
      />

      {renderResults()}
    </section>
  );
}

export default Home;
