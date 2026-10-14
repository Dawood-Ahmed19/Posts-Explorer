import { getAllPosts, changeLikes } from "../services/postServices.js";

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

export const likePost = handleLike(1);
export const unlikePost = handleLike(-1);
