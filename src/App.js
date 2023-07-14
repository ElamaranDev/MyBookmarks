import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";

const App = () => {
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  const [bookmarks, setBookmarks] = useState(Array.isArray(data) ? data : []);
  const [isOpen, setIsOpen] = useState(false);
  const [isOptions, setIsOptions] = useState(false);

  const handleOptionsOpen = (id) => {
    setIsOptions(true);
  };

  const handleOptionsClose = () => {
    setIsOptions(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const handleAddBookmarks = () => {
    setIsOpen(true);
  };

  const handleClearBookmarks = () => {
    localStorage.setItem("bookmarks", JSON.stringify([]));
    setBookmarks([]);
  };

  const handleBookmarkDelete = (id) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  return (
    <React.Fragment>
      <Header
        handleClearBookmarks={handleClearBookmarks}
        handleAddBookmarks={handleAddBookmarks}
      />
      <Main
        handleBookmarkDelete={handleBookmarkDelete}
        isOptions={isOptions}
        handleOptionsClose={handleOptionsClose}
        handleOptionsOpen={handleOptionsOpen}
        bookmarks={bookmarks}
      />
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
    </React.Fragment>
  );
};

export default App;
