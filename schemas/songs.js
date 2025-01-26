const z = require("zod");

const songSchema = z.object({
  title: z.string({
    invalid_type_error: "Song title must be a string",
    required_error: "Song title is required",
  }),
  album: z.string(),
  artist: z.string(),
  release_year: z.number().int().min(1900).max(2025),
  genre: z.string(),
  duration: z.string(), // Updated to accept "3:53" as a string
  track_number: z.number().int(), // Ensure this is `.int()`
  url: z.string().url({
    message: "The URL must be valid",
  }),
});

function validateSong(object) {
  return songSchema.safeParse(object);
}

function validatePartialSong(object) {
  return songSchema.partial().safeParse(object);
}

module.exports = {
  validateSong,
  validatePartialSong,
};
