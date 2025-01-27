import express, { json } from "express";
import { songsRouter } from "./routes/songs.js";
import { corsMiddleware } from "./middlewares/cors.js";
const app = express();

app.use(json());
app.disable("x-powered-by");
app.use("/", songsRouter);
app.use(corsMiddleware());

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log("listening on port 1234");
});
