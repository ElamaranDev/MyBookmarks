import React from 'react'
import searchIcon from '../assets/search-icon.png'
import optionsIcon from '../assets/options-icon-black.png'

const Header = () => {
  return (
    <nav>
        <div className="nav-header">
            <span className="my">
                My
            </span>
            <span className="bookmarks">
                Bookmarks
            </span>
        </div>
        <div className="nav-search">     
            <div className="nav-search-bar">
                <img src={searchIcon} alt="search icon" />
                <input type="text" className="search-input" placeholder='Search Bookmarks' />
            </div>
        </div>
        <div className="nav-options">
            <img src={optionsIcon} alt="options icon" />
        </div>
    </nav>
  )
}

export default Header
