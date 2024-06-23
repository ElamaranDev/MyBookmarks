import express from "express";

import {
  createBookmark,
  deleteBookmark,
  getBookmarkById,
  getBookmarks,
  updateBookmark,
} from "../controllers/bookmarkController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBookmark).get(protect, getBookmarks);

router
  .route("/:id")
  .get(protect, getBookmarkById)
  .put(protect, updateBookmark)
  .delete(protect, deleteBookmark);

export default router;
