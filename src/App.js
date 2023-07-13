import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";

const App = () => {
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  const [bookmarks, setBookmarks] = useState(Array.isArray(data) ? data : []);
  const [isOpen, setIsOpen] = useState(false);
  const [isOptions, setIsOptions] = useState(false);

  const handleOptionsOpen = () => {
    setIsOptions(true);
  };
  console.log(`state of isOptions is ${isOptions}`);

  const handleOptionsClose = () => {
    setIsOptions(false);
  };

  console.log(`state of isOptions is ${isOptions}`);

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

  return (
    <React.Fragment>
      <Header
        handleClearBookmarks={handleClearBookmarks}
        handleAddBookmarks={handleAddBookmarks}
      />
      <Main
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
