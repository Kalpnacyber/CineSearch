// All calls go to our own Express backend, never directly to OMDb,
// so the API key stays on the server.
const BASE_URL = "/api/movies";

async function request(url) {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Network error. Please check your connection or make sure the server is running.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

export function searchMovies({ query, type = "", page = 1 }) {
  const params = new URLSearchParams({ q: query, page });
  if (type) params.set("type", type);
  return request(`${BASE_URL}/search?${params}`);
}

export function getMovieById(id) {
  return request(`${BASE_URL}/${encodeURIComponent(id)}`);
}
