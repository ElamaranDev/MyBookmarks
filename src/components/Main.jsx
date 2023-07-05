import React from "react";
import OptionsBtn from "../assets/options-icon-grey.png";
import faviconAlt from "../assets/favicon-alt.png";

const Main = ({ bookmarks, getFaviconURL }) => {
  return (
    <main>
      <div className="bookmarks-container">
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
    </main>
  );
};

export default Main;
