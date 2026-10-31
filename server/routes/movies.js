const express = require("express");

const router = express.Router();

const OMDB_URL = "https://www.omdbapi.com/";
const VALID_TYPES = ["movie", "series", "episode"];
const IMDB_ID_PATTERN = /^tt\d{7,10}$/;

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function callOmdb(params) {
  const url = new URL(OMDB_URL);
  url.search = new URLSearchParams({ apikey: process.env.OMDB_API_KEY, ...params });

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw httpError(502, "Could not reach the OMDb service");
  }

  if (response.status === 401) {
    throw httpError(500, "OMDb API key is invalid or missing");
  }
  if (!response.ok) {
    throw httpError(502, "OMDb service is not responding");
  }

  return response.json();
}

const cleanPoster = (poster) => (poster && poster !== "N/A" ? poster : null);
const cleanValue = (value) => (value && value !== "N/A" ? value : null);

// GET /api/movies/search?q=batman&type=movie&page=1
router.get("/search", async (req, res, next) => {
  const query = (req.query.q || "").trim();
  const type = (req.query.type || "").trim();
  const page = Number(req.query.page || 1);

  if (query.length < 2) {
    return next(httpError(400, "Please type at least 2 characters to search"));
  }
  if (type && !VALID_TYPES.includes(type)) {
    return next(httpError(400, "Type must be movie, series or episode"));
  }
  if (!Number.isInteger(page) || page < 1 || page > 100) {
    return next(httpError(400, "Page must be a number between 1 and 100"));
  }

  try {
    const params = { s: query, page };
    if (type) params.type = type;

    const data = await callOmdb(params);

    // OMDb sends Response "False" for things like "Movie not found!" or "Too many results."
    if (data.Response === "False") {
      return res.json({ results: [], total: 0, page, message: data.Error });
    }

    const results = data.Search.map((item) => ({
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      type: item.Type,
      poster: cleanPoster(item.Poster),
    }));

    res.json({ results, total: Number(data.totalResults), page });
  } catch (err) {
    next(err);
  }
});

// GET /api/movies/tt0848228
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!IMDB_ID_PATTERN.test(id)) {
    return next(httpError(400, "Invalid movie id"));
  }

  try {
    const data = await callOmdb({ i: id, plot: "full" });

    if (data.Response === "False") {
      return next(httpError(404, data.Error || "Movie not found"));
    }

    res.json({
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      type: data.Type,
      rated: cleanValue(data.Rated),
      released: cleanValue(data.Released),
      runtime: cleanValue(data.Runtime),
      genre: cleanValue(data.Genre),
      director: cleanValue(data.Director),
      writer: cleanValue(data.Writer),
      actors: cleanValue(data.Actors),
      plot: cleanValue(data.Plot),
      language: cleanValue(data.Language),
      country: cleanValue(data.Country),
      poster: cleanPoster(data.Poster),
      imdbRating: cleanValue(data.imdbRating),
      imdbVotes: cleanValue(data.imdbVotes),
      ratings: data.Ratings || [],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
