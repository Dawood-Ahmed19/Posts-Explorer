import express from "express";
import cors from "cors";
import postsRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);

export default app;
