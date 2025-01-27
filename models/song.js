import { randomUUID } from "crypto";
import { readJSON } from "../utils.js";
const songs = readJSON("./songs.json");

export class SongModel {
  static async getAll() {
    return songs;
  }

  static async getById({ id }) {
    const song = songs.find((song) => song.id === id);
    return song;
  }

  static async create(input) {
    const newSong = {
      id: randomUUID(),
      ...input,
    };
    songs.push(newSong);
  }

  static async delete({ id }) {
    const songIndex = songs.findIndex((song) => song.id === id);
    if (songIndex === -1) return false;

    songs.splice(songIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const songIndex = songs.findIndex((song) => s.id === id);
    if (songIndex === -1) return false;
    songs[songIndex] = {
      ...songs[songIndex],
      ...input,
    };

    return songs[songIndex];
  }
}
