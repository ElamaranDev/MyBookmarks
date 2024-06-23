import mongoose from "mongoose";

const bookMarkSchema = new mongoose.Schema(
  {
    bookmarkName: {
      type: String,
      required: true,
    },
    faviconURL: {
      type: String,
    },
    bookmarkURL: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model("Bookmark", bookMarkSchema);

export default Bookmark;
