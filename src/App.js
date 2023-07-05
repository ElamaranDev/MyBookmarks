import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";

const App = () => {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  const [bookmarks, setBookmarks] = useState(Array.isArray(data) ? data : []);
  const [isOpen, setIsOpen] = useState(false);
  console.log(bookmarks);
  const onClose = () => {
    if (true) {
      setIsOpen(false);
      console.log("cancel clicked");
    }
  };
  const handleAddBookmarks = ()=>{
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <Header handleAddBookmarks={handleAddBookmarks}/>
      <Main bookmarks={bookmarks} />
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
