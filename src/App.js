import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Popup from "./components/Popup";

const App = () => {
  const [bookmarks, setBookmarks] = useState('');
  const [isOpen, setIsOpen] = useState(true);
 
  // const getFaviconURL = async (url, index) => {
  //   try {
  //     const domain = extractDomainFromUrl(url);
  //     const size = 32;
  //     const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  //     if (faviconURL) {
  //       const updatedBookmarks = [...bookmarks];
  //       updatedBookmarks[index].faviconURL = faviconURL;
  //       setBookmarks(updatedBookmarks);
  //     }
  //   } catch (error) {
  //     console.log("Error occurred while fetching favicon:", error);
  //   }
  // };

  const onClose = () => {
    if (true) {
      setIsOpen(false);
      console.log("cancel clicked");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <Main bookmarks={bookmarks}/>
      <Popup isOpen={isOpen} onClose={onClose} bookmarks={bookmarks} setBookmarks={setBookmarks}/>
    </React.Fragment>
  );
};

export default App;
