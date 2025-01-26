import { Router } from "express";
import { readJSON } from "../utils.js";
import { randomUUID } from "crypto";
import { validatePartialSong, validateSong } from "../schemas/songs.js";
const songs = readJSON("./songs.json");

export const songsRouter = Router();

songsRouter.get("/", (req, res) => {
  res.json({
    message: "hola mundo",
  });
});

songsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const song = songs.find((song) => song.id == id);
  if (song) return res.json(song);
  res.status(404).json({
    message: "song not found",
  });
});

songsRouter.post("/", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredSongs = songs.filter((song) => song.genre.includes(genre));
    return res.json(filteredSongs);
  }
  res.json(songs);
});

songsRouter.post("/songs", (req, res) => {
  const result = validateSong(req.body);

  if (result.error) {
    return res.status(422).json({
      error: JSON.parse(result.error.message),
    });
  }
  const newSong = {
    id: randomUUID(),
    ...result.data,
  };

  res.status(201).json(newSong);

  songs.push(newSong);
});

songsRouter.patch("/:id", (req, res) => {
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
