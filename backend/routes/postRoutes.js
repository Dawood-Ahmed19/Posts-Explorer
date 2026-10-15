import { Router } from "express";
import {
  getPosts,
  likePost,
  unlikePost,
} from "../controllers/postControllers.js";

const router = Router();

router.get("/", getPosts);
router.post("/:id/like", likePost);
router.delete("/:id/like", unlikePost);

export default router;
