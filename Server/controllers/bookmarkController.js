import asyncHandler from "express-async-handler";
import Bookmark from "../models/BookmarkModel.js";

// @desc Create a new bookmark
// @route POST /api/users/bookmarks
// @access Private
const createBookmark = asyncHandler(async (req, res) => {
  const { bookmarkName, faviconURL, bookmarkURL, category } = req.body;

  const newBookmark = await Bookmark.create({
    bookmarkName,
    faviconURL,
    bookmarkURL,
    category,
    userId: req.user._id,
  });

  res.status(201).json(newBookmark);
});

// @desc Get user bookmarks
// @route GET /api/users/bookmarks
// @access Private

const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user._id });
  res.status(200).json(bookmarks);
});

// @desc Get a single bookmark by ID
// @route GET /api/users/bookmarks/:id
// @access Private
const getBookmarkById = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id);
  if (bookmark && bookmark.userId.toString() === req.user._id.toString()) {
    res.status(200).json(bookmark);
  } else {
    req.status(404);
    throw new Error("Bookmark not found!");
  }
});

// @desc Update a single bookmark
// @route PUT /api/users/bookmarks/:id
// @access Private
const updateBookmark = asyncHandler(async (req, res) => {
  const { bookmarkName, faviconURL, bookmarkURL, category } = req.body;
  const existingBookmark = await Bookmark.findById(req.params.id);

  if (
    existingBookmark &&
    existingBookmark.userId.toString() === req.user._id.toString()
  ) {
    existingBookmark.bookmarkName =
      bookmarkName || existingBookmark.bookmarkName;
    existingBookmark.faviconURL = faviconURL || existingBookmark.faviconURL;
    existingBookmark.bookmarkURL = bookmarkURL || existingBookmark.bookmarkURL;
    existingBookmark.category = category || existingBookmark.category;

    const updatedBookmark = await existingBookmark.save();
    res.status(200).json(updatedBookmark);
  } else {
    res.status(404);
    throw new Error("Bookmark not found");
  }
});

// @desc Delete a single bookmark
// @route DELETE /api/users/bookmarks/:id
// @access Private
const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id);

  if (bookmark && bookmark.userId.toString() === req.user._id.toString()) {
    await bookmark.deleteOne();
    res.status(200).json({ message: "Bookmark Deleted" });
  } else {
    res.status(404);
    throw new Error("Bookmark not found");
  }
});

export { createBookmark, getBookmarks, getBookmarkById, updateBookmark, deleteBookmark };
