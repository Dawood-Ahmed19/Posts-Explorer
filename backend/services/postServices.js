import { readFile, writeFile } from "node:fs/promises";
import { POSTS_FILE } from "../config/index.js";
import Post from "../Model/post.js";

const readPosts = async () => JSON.parse(await readFile(POSTS_FILE, "utf-8"));
const savePosts = (posts) =>
  writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));

let writeQueue = Promise.resolve();

export const getAllPosts = () =>
  Post.find().select("-_id -__v").sort({ id: 1 }).lean();

export const changeLikes = (id, delta) =>
  Post.findOneAndUpdate(
    { id },
    [
      {
        $set: {
          likes: { $max: [0, { $add: [{ $ifNull: ["$likes", 0] }, delta] }] },
        },
      },
    ],
    { new: true, updatePipeline: true },
  )
    .select("-_id -__v")
    .lean();
