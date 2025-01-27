import { SongModel } from "../models/song.js";
import { validatePartialSong, validateSong } from "../schemas/songs.js";

export class SongController {
  static async getAll(req, res) {
    const songs = await SongModel.getAll();

    res.json(songs);
    return songs;
  }

  static async getById(req, res) {
    const { id } = req.params;
    const song = await SongModel.getById({ id });
    if (song) return res.json(song);
    res.status(404).json({ message: "song not found" });
  }

  static async create(req, res) {
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
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await SongModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: "song not found" });
    }
    return res.json({ message: "Song deleted" });
  }

  static async update(req, res) {
    const result = validatePartialSong(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedSong = await SongModel.update({ id, input: result.data });

    return res.json(updatedSong);
  }
}
