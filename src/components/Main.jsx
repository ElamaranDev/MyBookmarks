/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import OptionsBtn from "../assets/options-icon-grey.png";
import faviconAlt from "../assets/favicon-alt.png";
import visitIcon from "../assets/visit-blue.png";

const Main = ({
  handleToastMessage,
  isOptions,
  handleOptionsClose,
  handleOptionsOpen,
  handleBookmarkDelete,
  bookmarks,
}) => {
  const containerRef = useRef(null);
  const noBookmarks = useRef(null);
  const optionsRef = useRef(null);
  const [expandedBookmarkId, setExpandedBookmarkId] = useState(null);
  const [bookmarkOptionId, setBookmarkOptionId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !event.target.classList.contains("bookmark-item-options")
      ) {
        handleOptionsClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleOptionsClose]);

  useEffect(() => {
    if (!bookmarks || bookmarks.length === 0) {
      containerRef.current.style.display = "none";
      noBookmarks.current.style.display = "block";
    } else {
      containerRef.current.style.display = "";
      noBookmarks.current.style.display = "none";
    }
  }, [bookmarks]);

  const handleBookmarkClick = (id, event) => {
    if (!event.target.closest(".options-btn")) {
      if (expandedBookmarkId === id) {
        setExpandedBookmarkId(null);
      } else {
        setExpandedBookmarkId(id);
      }
    }
  };

  const handleOptionsBtn = (id, event) => {
    if (bookmarkOptionId === event.target.id) {
      setBookmarkOptionId(null);
    } else {
      setBookmarkOptionId(id);
    }
  };

  const handleOptionsClick = (event) => {
    event.stopPropagation();
  };

  const handleCopy = (url) => {
    navigator.clipboard
      .writeText(url)
      .catch((error) => console.error("Unable to copy URL: ", error));
  };

  return (
    <main>
      <div ref={containerRef} className="bookmarks-container">
        {bookmarks.map((bookmark) => {
          const { name, url, id, faviconURL } = bookmark;
          const isExpanded = expandedBookmarkId === id;
          const isOptionsOpen = bookmarkOptionId === id;

          return (
            <div key={id} className="bookmark-container">
              {isOptionsOpen && isOptions ? (
                <div
                  className="bookmark-item-options"
                  ref={optionsRef}
                  onClick={handleOptionsClick}
                >
                  <ul className="list-items">
                    <li className="list-item">
                      <a
                        onClick={() => {
                          handleCopy(url);
                          handleToastMessage(`"${name}" Copied to Clip board!`);
                          handleOptionsClose();
                        }}
                        href="#"
                      >
                        Copy
                      </a>
                    </li>
                    <li className="list-item">
                      <a href="#">Edit</a>
                    </li>
                    <li className="list-item">
                      <a
                        onClick={() => {
                          handleBookmarkDelete(id);
                          handleToastMessage(`"${name}" deleted!`);
                        }}
                        href="#"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
              <div
                style={{ background: isExpanded ? "#f1f3f4" : "" }}
                className={`bookmark-item ${
                  !isExpanded ? "bookmark-item-clicked" : ""
                }`}
              >
                <div
                  onClick={(event) => handleBookmarkClick(id, event)}
                  className="bookmark"
                >
                  <img
                    id="web-favicon"
                    src={faviconURL || faviconAlt}
                    alt="favicon"
                  />
                  <div className="bookmark-info">
                    <span
                      className={`bookmark-name ${
                        isExpanded ? "expanded" : ""
                      }`}
                    >
                      {name}
                    </span>
                  </div>
                  <div
                    onClick={(event) => {
                      handleOptionsOpen(id);
                      handleOptionsBtn(id, event);
                    }}
                    className="options-btn"
                  >
                    <img
                      id="options-btn"
                      src={OptionsBtn}
                      alt="options button"
                    />
                  </div>
                </div>
                <div className="bookmark-clicked">
                  <span className="url-name">{url}</span>
                  <div className="visit-btn">
                    <a href={url}>
                      <img id="visit-icon" src={visitIcon} alt="" />
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={noBookmarks} className="no-bookmarks">
        <span>No Bookmarks</span>
      </div>
    </main>
  );
};

export default Main;
