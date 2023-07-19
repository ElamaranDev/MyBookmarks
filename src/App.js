import React, { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";
import Toast from "./components/Toast";

// this is normal

const App = () => {
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  const [bookmarks, setBookmarks] = useState(Array.isArray(data) ? data : []);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isOptions, setIsOptions] = useState(false);

  const handleInputSearch = (inputValue) => {
    setInput(inputValue);
  };

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

  // toast message function

  const toastRef = useRef();

  const handleToastMessage = (msg) => {
    toastRef.current.showToast(msg);
  };

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bookmark) => {
      return bookmark.name.toLowerCase().includes(input.toLowerCase());
    });
  }, [bookmarks, input]);

  return (
    <React.Fragment>
      <Header
        handleInputSearch={handleInputSearch}
        inputText={input}
        handleClearBookmarks={handleClearBookmarks}
        handleAddBookmarks={handleAddBookmarks}
      />
      <Main
        handleToastMessage={handleToastMessage}
        handleBookmarkDelete={handleBookmarkDelete}
        isOptions={isOptions}
        handleOptionsClose={handleOptionsClose}
        handleOptionsOpen={handleOptionsOpen}
        bookmarks={filteredBookmarks}
      />
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
      <Toast ref={toastRef} timeout={3000} />
    </React.Fragment>
  );
};

export default App;
