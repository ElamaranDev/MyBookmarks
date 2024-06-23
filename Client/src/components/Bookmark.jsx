/* eslint-disable react/prop-types */
import faviconAlt from "../assets/favicon-alt.png";
import visitIcon from "../assets/visit-blue.png";
import OptionsBtn from "../assets/options-icon-grey.png";
import { toast } from "react-toastify";

const Bookmark = ({
  bookmark,
  isExpanded,
  handleBookmarkOpen,
  handleOptionsBtnClick,
  isOptionsOpen,
  optionsRef,
  deleteBookmark,
  editBookmark,
  closeOption,
}) => {
  const { bookmarkName, bookmarkURL, faviconURL, _id } = bookmark;

  const handleCopy = (url) => {
    navigator.clipboard
      .writeText(url)
      .catch((error) => console.error("Unable to copy URL: ", error));
    closeOption();
    toast.success(`${url} Copied!`);
  };

  return (
    <div className="bookmark-container" key={_id}>
      {isOptionsOpen && (
        <div ref={optionsRef} className="bookmark-item-options">
          <ul className="list-items">
            <li
              onClick={() => {
                handleCopy(bookmarkURL);
              }}
              className="list-item"
            >
              <a>Copy</a>
            </li>
            <li
              onClick={() => {
                editBookmark(bookmark);
              }}
              className="list-item"
            >
              <a>Edit</a>
            </li>
            <li
              onClick={() => {
                deleteBookmark(_id);
              }}
              className="list-item"
            >
              <a>Delete</a>
            </li>
          </ul>
        </div>
      )}
      <div
        style={{ background: isExpanded ? "#f1f3f4" : "" }}
        className={`bookmark-item ${isExpanded ? "" : "bookmark-item-clicked"}`}
      >
        <div
          className="bookmark"
          onClick={(event) => handleBookmarkOpen(_id, event)}
        >
          <img id="favicon" src={faviconURL || faviconAlt} alt="favicon" />
          <div className="bookmark-name">{bookmarkName}</div>
          <div
            className="options-btn"
            onClick={(event) => handleOptionsBtnClick(event, _id)}
          >
            <img id="options-btn" src={OptionsBtn} alt="options button" />
          </div>
        </div>
        {isExpanded && (
          <div className="bookmark-clicked">
            <span className="bookmark-url">{bookmarkURL}</span>
            <div className="visit-btn">
              <a href={bookmarkURL} target="_blank" rel="noopener noreferrer">
                <img id="visit-icon" src={visitIcon} alt="visit icon" />
                Visit
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
