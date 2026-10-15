import {
  getAllPosts,
  changeLikes,
  createPost,
  updatePost,
  deletePost,
} from "../services/postServices.js";

export const getPosts = async (req, res) => {
  try {
    res.json(await getAllPosts());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not read posts" });
  }
};

const handleLike = (delta) => async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await changeLikes(id, delta);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not update likes" });
  }
};

const text = (value) => (typeof value === "string" ? value.trim() : "");

export const addPost = async (req, res) => {
  try {
    const title = text(req.body?.title);
    const body = text(req.body?.body);
    const userId = Number(req.body?.userId ?? 1);

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    const post = await createPost({ userId, title, body });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create post" });
  }
};

export const editPost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const updates = {};
    if (req.body?.title !== undefined) updates.title = text(req.body.title);
    if (req.body?.body !== undefined) updates.body = text(req.body.body);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }
    if (Object.values(updates).some((value) => !value)) {
      return res
        .status(400)
        .json({ message: "Title and body cannot be empty" });
    }

    const post = await updatePost(id, updates);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not update post" });
  }
};

export const removePost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await deletePost(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not delete post" });
  }
};

export const likePost = handleLike(1);
export const unlikePost = handleLike(-1);
