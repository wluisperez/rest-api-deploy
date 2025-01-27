import { Router } from "express";
import { SongController } from "../controllers/songs.js";

export const songsRouter = Router();

songsRouter.get("/", SongController.getAll);

songsRouter.get("/:id", SongController.getById);

songsRouter.post("/", SongController.create);

songsRouter.delete("/:id", SongController.delete);

songsRouter.patch(":/id", SongController.update);
