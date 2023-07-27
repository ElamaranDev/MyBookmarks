import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Popup = ({
  isOpen,
  onClose,
  bookmarks,
  setBookmarks,
  bookmarkToEdit,
}) => {
  const nameRef = useRef(null);
  const urlRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check if bookmarkToEdit is provided (edit mode)
    if (bookmarkToEdit) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [bookmarkToEdit]);

  const extractDomainFromUrl = (url) => {
    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^/]+)/i;
    const match = url.match(domainRegex);
    if (match) {
      const hostname = match[1];
      const domainName = hostname.startsWith("www.")
        ? hostname.substring(4)
        : hostname;
      return domainName;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const url = urlRef.current.value;

    if (name.trim() === "" || url.trim() === "") {
      // If name or URL is empty, don't proceed with form submission
      return;
    }

    const domain = extractDomainFromUrl(url);
    const size = 32;
    const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

    if (isEditMode) {
      // Handle editing existing bookmark
      const updatedBookmark = {
        ...bookmarkToEdit,
        name,
        url: addHttpToUrl(url),
      };

      // index of the bookmark to be edited in the bookmarks array
      const index = bookmarks.findIndex(
        (bookmark) => bookmark.id === bookmarkToEdit.id
      );

      // Update the bookmarks array with the edited bookmark
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks[index] = updatedBookmark;

      // Update the state with the edited bookmarks
      setBookmarks(updatedBookmarks);

      // Update the local storage
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } else {
      // Handle adding new bookmark
      const newBookmark = {
        name: name,
        url: addHttpToUrl(url),
        id: uuidv4(),
        faviconURL: faviconURL,
      };

      // Update the state with the new bookmark
      setBookmarks([...bookmarks, newBookmark]);

      // Update the local storage
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...bookmarks, newBookmark])
      );
    }

    // Close the popup
    onClose();
  };

  function addHttpToUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }
    return url;
  }

  if (!isOpen) return null;
  return (
    <>
      <div className="popup-overlay">
        <form className="popup-container" onSubmit={handleSubmit}>
          <h3>{isEditMode ? "Edit Bookmark" : "Add Bookmark"}</h3>
          <div className="name-area">
            <label htmlFor="bookmark-name">Name</label>
            <input
              id="bookmark-name"
              type="text"
              ref={nameRef}
              required
              defaultValue={isEditMode ? bookmarkToEdit.name : ""}
            />
          </div>
          <div className="url-area">
            <label htmlFor="bookmark-url">URL</label>
            <input
              id="bookmark-url"
              type="text"
              ref={urlRef}
              required
              defaultValue={isEditMode ? bookmarkToEdit.url : ""}
            />
          </div>
          <div className="buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Popup;
