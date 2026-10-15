import { readFile, writeFile } from "node:fs/promises";
import { POSTS_FILE } from "../config/index.js";
import Post from "../Model/post.js";
import { connectDB } from "../config/db.js";

const readPosts = async () => JSON.parse(await readFile(POSTS_FILE, "utf-8"));
const savePosts = (posts) =>
  writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));

let writeQueue = Promise.resolve();

export const getAllPosts = async () => {
  await connectDB();
  return Post.find().select("-_id -__v").sort({ id: 1 }).lean();
};

export const changeLikes = async (id, delta) => {
  await connectDB();
  return Post.findOneAndUpdate(
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
};

export const createPost = async ({ userId, title, body }) => {
  await connectDB();
  const last = await Post.findOne().sort({ id: -1 }).select("id").lean();
  const id = (last?.id ?? 0) + 1;

  const post = await Post.create({ id, userId, title, body });
  const { _id, __v, ...publicPost } = post.toObject();
  return publicPost;
};

export const updatePost = (id, updates) =>
  Post.findOneAndUpdate(
    { id },
    { $set: updates },
    { new: true, runValidators: true },
  )
    .select("-_id -__v")
    .lean();

export const deletePost = (id) =>
  Post.findOneAndDelete({ id }).select("-_id -__v").lean();
