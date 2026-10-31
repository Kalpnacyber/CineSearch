// OMDb years can look like "2008", "2008–2013" or "2019–", so take the first number
export function getStartYear(year) {
  const value = parseInt(year, 10);
  return Number.isNaN(value) ? 0 : value;
}

export function sortMovies(movies, sortBy) {
  const list = [...movies];

  switch (sortBy) {
    case "year-asc":
      return list.sort((a, b) => getStartYear(a.year) - getStartYear(b.year));
    case "year-desc":
      return list.sort((a, b) => getStartYear(b.year) - getStartYear(a.year));
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return list;
  }
}

export function filterByYear(movies, fromYear, toYear) {
  const from = Number(fromYear) || 0;
  const to = Number(toYear) || Infinity;

  return movies.filter((movie) => {
    const year = getStartYear(movie.year);
    return year >= from && year <= to;
  });
}
