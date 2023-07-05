/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/search-icon.png";
import optionsIcon from "../assets/options-icon-black.png";

const Header = ({ handleAddBookmarks }) => {
  const optionsRef = useRef(null);
  const [isOptions, setIsOptions] = useState(false);
  const handleOptionsOpen = () => {
    setIsOptions(true);
  };
  const handleOptionsClose = () => {
    setIsOptions(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        handleOptionsClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header>
      <nav>
        <div className="nav-header">
          <span className="my">My</span>
          <span className="bookmarks">Bookmarks</span>
        </div>
        <div className="nav-header mobile-logo">
          <span className="my">M</span>
          <span className="bookmarks">B</span>
        </div>
        <div className="nav-search">
          <div className="nav-search-bar">
            <img src={searchIcon} alt="search icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search Bookmarks"
            />
          </div>
        </div>
        <div className="nav-options">
          <img
            onClick={handleOptionsOpen}
            src={optionsIcon}
            alt="options icon"
          />
        </div>
      </nav>
      {isOptions ? (
        <div ref={optionsRef} className="options js-options">
          <ul className="list-items">
            <li className="list-item">
              <a href="#">Sort by name</a>
            </li>
            <li className="list-item">
              <a
                href="#"
                onClick={() => {
                  handleAddBookmarks();
                  handleOptionsClose();
                }}
              >
                Add Bookmark
              </a>
            </li>
            <li className="list-item">
              <a href="#">Clear Bookmarks</a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
