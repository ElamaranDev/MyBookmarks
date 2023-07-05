import React, { useRef, useEffect } from "react";

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
    event.preventDefault();
    const name = nameRef.current.value;
    const url = urlRef.current.value;
    const domain = extractDomainFromUrl(url);
    const size = 32;
    const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
    const newBookmark = {
      name: name,
      url: url,
      id: bookmarks.length + 1,
      faviconURL: faviconURL,
    };
    setBookmarks([...bookmarks, newBookmark]);
    nameRef.current.value = "";
    urlRef.current.value = "";
  };

  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks]);

  if (!isOpen) return null;
  return (
    <>
      <form className="popup-container">
        <h3>Add Bookmark</h3>
        <div className="name-area">
          <label htmlFor="bookmark-name">Name</label>
          <input id="bookmark-name" type="text" ref={nameRef} />
        </div>
        <div className="url-area">
          <label htmlFor="bookmark-url">URL</label>
          <input id="bookmark-url" type="text" ref={urlRef} />
        </div>
        <div className="buttons">
          <button onClick={onClose} type="button" className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={(event) => {
              onClose();
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
