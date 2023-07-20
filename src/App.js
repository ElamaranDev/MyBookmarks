import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";
import Toast from "./components/Toast";

const App = () => {
  const data = JSON.parse(localStorage.getItem("bookmarks"));
  const [bookmarks, setBookmarks] = useState(Array.isArray(data) ? data : []);
  const [isOpen, setIsOpen] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [sortOrder, setSortOrder] = useState("unsorted");
  const [deletedBookmarks, setDeletedBookmarks] = useState([]);

  const getInputValue = (value) => {
    setInputValue(value);
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
    const deletedBookmarkItem = bookmarks.filter(
      (bookmark) => bookmark.id === id
    );
    setDeletedBookmarks(deletedBookmarkItem);
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const handleBookmarkUndo = () => {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, ...deletedBookmarks])
    );

    setBookmarks((prevBookmarks) => [...prevBookmarks, ...deletedBookmarks]);

    setDeletedBookmarks([]);
  };

  // sorting functionality

  const handleBookmarkSort = () => {
    if (sortOrder === "unsorted") {
      setBookmarks((prevBookmarks) =>
        [...prevBookmarks].sort((a, b) => a.name.localeCompare(b.name))
      );
      setSortOrder("ascending");
    } else {
      setBookmarks(Array.isArray(data) ? data : []);
      setSortOrder("unsorted");
    }
  };

  // toast message function

  const toastRef = useRef();

  const handleToastMessage = (msg) => {
    toastRef.current.showToast(msg);
  };

  // search functionality

  useEffect(() => {
    const filterBookmarks = () => {
      const filteredItems = bookmarks.filter((bookmark) =>
        bookmark.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredBookmarks(filteredItems);
    };
    filterBookmarks();
  }, [inputValue, bookmarks]);

  return (
    <React.Fragment>
      <Header
        getInputValue={getInputValue}
        handleClearBookmarks={handleClearBookmarks}
        handleAddBookmarks={handleAddBookmarks}
        handleBookmarkSort={handleBookmarkSort}
      />
      <Main
        handleToastMessage={handleToastMessage}
        handleBookmarkDelete={handleBookmarkDelete}
        isOptions={isOptions}
        handleOptionsClose={handleOptionsClose}
        handleOptionsOpen={handleOptionsOpen}
        bookmarks={filteredBookmarks}
        handleBookmarkUndo={handleBookmarkUndo}
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
