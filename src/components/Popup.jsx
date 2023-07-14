import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Popup = ({ isOpen, onClose, bookmarks, setBookmarks }) => {
  const nameRef = useRef(null);
  const urlRef = useRef(null);

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
    var isValid = true;
    event.preventDefault();
    const name = nameRef.current.value;
    const url = urlRef.current.value;
    if (name.trim() === "" || url.trim() === "") {
      isValid = false;
      return;
    } else {
      isValid = true;
    }
    const domain = extractDomainFromUrl(url);
    const size = 32;
    const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
    const newBookmark = {
      name: name,
      url: addHttpToUrl(url),
      id: uuidv4(),
      faviconURL: faviconURL,
    };
    setBookmarks([...bookmarks, newBookmark]);
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, newBookmark])
    );
    nameRef.current.value = "";
    urlRef.current.value = "";
    return isValid;
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
      <form className="popup-container">
        <h3>Add Bookmark</h3>
        <div className="name-area">
          <label htmlFor="bookmark-name">Name</label>
          <input id="bookmark-name" type="text" ref={nameRef} required />
        </div>
        <div className="url-area">
          <label htmlFor="bookmark-url">URL</label>
          <input id="bookmark-url" type="text" ref={urlRef} required />
        </div>
        <div className="buttons">
          <button onClick={onClose} type="button" className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={(event) => {
              if (handleSubmit(event)) {
                onClose();
              }
              handleSubmit(event);
            }}
            type="submit"
            className="save-btn"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Popup;
