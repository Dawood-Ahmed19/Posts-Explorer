import express from "express";
import cors from "cors";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_URL = path.join(__dirname, "data", "posts.json");

app.use(cors());
app.use(express.json());

app.get("/api/posts", async (req, res) => {
  try {
    const data = await readFile(FILE_URL, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not read posts" });
  }
});

const readPosts = async () => JSON.parse(await readFile(FILE_URL, "utf-8"));
const savePosts = (posts) =>
  writeFile(FILE_URL, JSON.stringify(posts, null, 2));

let writeQueue = Promise.resolve();
const changeLikes = (id, delta) => {
  const task = writeQueue.then(async () => {
    const posts = await readPosts();
    const post = posts.find((p) => p.id === id);
    if (!post) return null;

    post.likes = Math.max(0, (post.likes ?? 0) + delta);
    await savePosts(posts);
    return post;
  });
  writeQueue = task.catch(() => {});
  return task;
};

const handleLike = (delta) => async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await changeLikes(id, delta);
    if (!post) return res.status(404).json({ message: "Post Not Found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Couldnt Like the post" });
  }
};

app.post("/api/posts/:id/like", handleLike(1));
app.delete("/api/posts/:id/like", handleLike(-1));

// app.listen(PORT, () => {
//   console.log(`Server running on Port: ${PORT}`);
// });

export default app;
