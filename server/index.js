require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.OMDB_API_KEY) {
  console.warn("Warning: OMDB_API_KEY is missing. Add it to server/.env");
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/movies", movieRoutes);

// Unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// In production, serve the React build from the same server
const clientBuild = path.join(__dirname, "..", "client", "dist");
if (fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuild, "index.html"));
  });
}

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.status ? err.message : "Something went wrong on the server",
  });
});

app.listen(PORT, () => {
  console.log(`CineSearch server running on http://localhost:${PORT}`);
});
