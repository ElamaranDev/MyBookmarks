/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import OptionsBtn from "../assets/options-icon-grey.png";
import faviconAlt from "../assets/favicon-alt.png";
import visitIcon from "../assets/visit-blue.png";

const Main = ({ bookmarks }) => {
  const containerRef = useRef(null);
  const noBookmarks = useRef(null);
  const bookmarkItemRef = useRef(null);
  const [expandedBookmarkId, setExpandedBookmarkId] = useState(null);

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
    if (event.target.id !== "options-btn") {
      if (expandedBookmarkId === id) {
        setExpandedBookmarkId(null);
      } else {
        setExpandedBookmarkId(id);
      }
    }
  };
  return (
    <main>
      <div ref={containerRef} className="bookmarks-container">
        {bookmarks.map((bookmark) => {
          const { name, url, id, faviconURL } = bookmark;
          const isExpanded = expandedBookmarkId === id;

          return (
            <>
              <div
                style={{ background: isExpanded ? "#f1f3f4" : "" }}
                ref={bookmarkItemRef}
                key={id}
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
                  <div className="options-btn">
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
                <div className="bookmark-item-options">
                  <ul className="list-items">
                    <li className="list-item">
                      <a href="#">Copy</a>
                    </li>
                    <li className="list-item">
                      <a href="#">Edit</a>
                    </li>
                    <li className="list-item">
                      <a href="#">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
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
