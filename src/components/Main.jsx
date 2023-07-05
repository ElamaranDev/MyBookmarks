import React, { useEffect, useRef } from "react";
import OptionsBtn from "../assets/options-icon-grey.png";
import faviconAlt from "../assets/favicon-alt.png";

const Main = ({ bookmarks }) => {
  const containerRef = useRef(null);
  const noBookmarks = useRef(null);
  useEffect(() => {
    if (!bookmarks || bookmarks.length === 0) {
      containerRef.current.style.display = "none";
      noBookmarks.current.style.display = "block"
    } else {
      containerRef.current.style.display = "";
      noBookmarks.current.style.display = "none"
    }
  }, [bookmarks]);
  return (
    <main>
      <div ref={containerRef} className="bookmarks-container">
        {bookmarks.map((bookmark, index) => {
          const { name, url, id, faviconURL } = bookmark;
          return (
            <div className="bookmark" key={id}>
              <img
                id="web-favicon"
                src={faviconURL || faviconAlt}
                alt="favicon"
              />
              <div className="bookmark-info">
                <span className="bookmark-name">{name}</span>
                <span className="url-name">{url}</span>
              </div>
              <div className="options-btn">
                <img id="options-btn" src={OptionsBtn} alt="options button" />
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
