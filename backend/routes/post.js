import express from "express";
import {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} from "../controllers/post.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
// for comments
// to make a comment
router.route("/post/comment/:id").put(isAuthenticated, commentOnPost);
// to delete a comment
router.route("/post/deletecomment/:id").delete(isAuthenticated, deleteComment);
export default router;
