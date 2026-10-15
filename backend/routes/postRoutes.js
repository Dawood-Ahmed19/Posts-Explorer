import { Router } from "express";
import {
  getPosts,
  likePost,
  unlikePost,
  addPost,
  editPost,
  removePost,
} from "../controllers/postControllers.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.patch("/:id", editPost);
router.delete("/:id", removePost);
router.post("/:id/like", likePost);
router.delete("/:id/like", unlikePost);

export default router;
