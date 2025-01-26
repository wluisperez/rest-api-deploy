const express = require("express");
const songs = require("./songs.json");
const app = express();
const cors = require("cors");

const crypto = require("node:crypto");
const { validateSong, validatePartialSong } = require("./schemas/songs");

app.disable("x-powered-by");
app.use(express.json());

const ACCEPTED_ORIGINS = ["http://localhost:8080", "http://localhost:1234"];

app.get("/", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.json({
    message: "hola mundo",
  });
});

app.get("/songs", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredSongs = songs.filter((song) => song.genre.includes(genre));
    return res.json(filteredSongs);
  }
  res.json(songs);
});

app.post("/songs", (req, res) => {
  const result = validateSong(req.body);

  if (result.error) {
    return res.status(422).json({
      error: JSON.parse(result.error.message),
    });
  }
  const newSong = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  res.status(201).json(newSong);

  songs.push(newSong);
});

app.get("/songs/:id", (req, res) => {
  const { id } = req.params;
  const song = songs.find((song) => song.id == id);
  if (song) return res.json(song);
  res.status(404).json({
    message: "song not found",
  });
});

app.patch("/songs/:id", (req, res) => {
  const result = validatePartialSong(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  const { id } = req.params;
  const songIndex = songs.findIndex((song) => {
    song.id === id;
  });

  if (songIndex === -1) {
    return res.status(404).json({
      message: "Cancion no encontrada",
    });
  }

  const updateSong = {
    ...songs[songIndex],
    ...result.data,
  };

  return res.json(updateSong);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log("listening on port 1234");
});
