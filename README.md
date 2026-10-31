# 🎬 CineSearch – Movie Search Web Application

CineSearch is a full-stack movie search app I built to find movies, series and episodes in real time. The frontend is built with **React.js** and the backend with **Node.js + Express.js**, which fetches data from the **OMDb REST API** and serves it to the React app.

I started this project with plain HTML, CSS and JavaScript and later rebuilt it in React with my own Express backend, so the OMDb API key is kept on the server and never exposed in the browser.

---

## ✨ Features

- **Real-time search** – results update as you type (with a 500 ms debounce so the API is not called on every key press)
- **Filter by type** – All / Movies / Series / Episodes
- **Filter by year range** – show only titles released between two years
- **Sorting** – by year (newest / oldest) or by title (A–Z / Z–A)
- **Pagination** – browse through all pages of results
- **Movie details page** – poster, plot, genre, director, cast, runtime, IMDb rating and ratings from other sources
- **Favorites** – save titles with the ❤️ button; saved in `localStorage` so they stay after refresh
- **Login page** with input validation and protected routes
- **Dark / Light mode** – remembers your choice
- **Error handling** – friendly messages for short queries, no results, "too many results", invalid IDs, network errors and server errors
- **Fully responsive** – works on mobile, tablet and desktop

---

## 🛠️ Tech Stack

| Layer    | Technologies                                                         |
| -------- | -------------------------------------------------------------------- |
| Frontend | React.js (Hooks, Context API), React Router, Vite, CSS Modules        |
| Backend  | Node.js, Express.js, REST API                                        |
| API      | [OMDb API](https://www.omdbapi.com/)                                  |
| Other    | JavaScript (ES6+), async/await, Fetch API, localStorage              |

---

## 📁 Project Structure

```
cinesearch/
├── client/                     # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.js          # proxies /api to the Express server in development
│   └── src/
│       ├── main.jsx            # app entry point
│       ├── App.jsx             # routes
│       ├── api.js              # functions that call my Express API
│       ├── utils.js            # sorting and year-filter helpers
│       ├── index.css           # global styles and theme variables
│       ├── components/         # reusable components, each with its own CSS module
│       │   ├── Navbar.jsx
│       │   ├── SearchBar.jsx
│       │   ├── Filters.jsx
│       │   ├── MovieCard.jsx
│       │   ├── MovieGrid.jsx
│       │   ├── Pagination.jsx
│       │   ├── Poster.jsx
│       │   ├── Loader.jsx
│       │   ├── Message.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── AuthContext.jsx       # login state
│       │   └── FavoritesContext.jsx  # favorites state + localStorage
│       ├── hooks/
│       │   ├── useMovieSearch.js     # fetches search results
│       │   ├── useDebounce.js
│       │   └── useTheme.js
│       └── pages/
│           ├── Login.jsx
│           ├── Home.jsx
│           ├── Details.jsx
│           └── Favorites.jsx
│
└── server/                     # Node.js + Express backend
    ├── index.js                # server setup, error handling
    ├── routes/movies.js        # REST endpoints that call OMDb
    └── .env.example
```

---

## 🔌 REST API Endpoints

| Method | Endpoint                                     | Description                         |
| ------ | -------------------------------------------- | ----------------------------------- |
| GET    | `/api/health`                                | Check that the server is running    |
| GET    | `/api/movies/search?q=batman&type=movie&page=1` | Search titles (`type` and `page` are optional) |
| GET    | `/api/movies/:id`                            | Full details for one title by IMDb ID (e.g. `tt0848228`) |

**Example response** – `/api/movies/search?q=avengers`

```json
{
  "results": [
    { "id": "tt0848228", "title": "The Avengers", "year": "2012", "type": "movie", "poster": "https://..." }
  ],
  "total": 158,
  "page": 1
}
```

The server validates every request (minimum query length, allowed types, page range, IMDb ID format) and returns a proper status code with an error message, e.g. `400 { "error": "Please type at least 2 characters to search" }`.

---

## 🚀 Getting Started

### Requirements
- Node.js 18 or newer
- A free OMDb API key – get one at https://www.omdbapi.com/apikey.aspx

### 1. Start the backend

```bash
cd server
npm install
cp .env.example .env      # then put your OMDb key in .env
npm run dev               # runs on http://localhost:5000
```

### 2. Start the frontend (in a new terminal)

```bash
cd client
npm install
npm run dev               # opens on http://localhost:5173
```

Open http://localhost:5173, log in with any username (3+ characters) and a password of at least 6 characters, and start searching.

### Production build

```bash
cd client && npm run build
cd ../server && npm start
```

The Express server serves the React build, so the whole app runs on http://localhost:5000.

---

## 💡 What I Learned

- Building reusable React components and managing state with `useState`, `useEffect`, `useMemo`, custom hooks and the Context API
- Creating a REST API with Express and keeping API keys secure on the backend
- Handling asynchronous code with `async/await` and avoiding race conditions when the user types quickly
- Handling errors properly on both the server and the client
- Writing responsive layouts with CSS Grid, Flexbox and CSS Modules

## 🔮 Future Improvements

- Real user accounts with a database (PostgreSQL) instead of local login
- Save favorites on the server per user
- Movie trailers and recommendations

---

## 👩‍💻 Author

**Kalpna**
B.Tech CSE, Moradabad Institute of Technology
GitHub: [Kalpnacyber](https://github.com/Kalpnacyber) · LinkedIn: [kalpna-084a38344](https://linkedin.com/in/kalpna-084a38344)
