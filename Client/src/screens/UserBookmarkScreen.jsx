import Bookmark from "../components/Bookmark";
import { useState, useRef, useEffect } from "react";
import {
  useGetBookmarksQuery,
  useDeleteBookmarkMutation,
} from "../slices/bookmarkApiSlice";
import PopUp from "../components/PopUp.jsx";
import Dropdown from "../components/Dropdown.jsx";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserBookmarkScreen = () => {
  const { data: userBookmarks, isLoading, refetch } = useGetBookmarksQuery();
  const [bookmarks, setBookmarks] = useState([]);
  const [expandedBookmarkId, setExpandedBookmarkId] = useState(null);
  const [bookmarkOptionId, setBookmarkOptionId] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterOption, setFilterOption] = useState("All");
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const [bookmarkToEdit, setBookmarkToEdit] = useState(null);
  const [sortOption, setSortOption] = useState("New to Old");
  const sortRef = useRef(null);
  const optionsRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      refetch();
    } else {
      setBookmarks([]);
      setBookmarkToEdit(null);
      setExpandedBookmarkId(null);
    }
  }, [userInfo, refetch]);

  useEffect(() => {
    if (userBookmarks) {
      setBookmarks(userBookmarks);
      const uniqueCategories = [
        ...new Set(userBookmarks.map((bookmark) => bookmark.category)),
      ];
      setCategories(
        uniqueCategories.map((category) => ({
          name: category,
          value: category,
        }))
      );
    }
  }, [userBookmarks, deleteBookmark]);

  const handleCloseOption = () => {
    setBookmarkOptionId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        handleCloseOption();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBookmarkOpen = (id, event) => {
    if (!event.target.closest(".options-btn")) {
      setExpandedBookmarkId((prevId) => (prevId === id ? null : id));
    }
  };

  const handleOptionsBtnClick = (event, id) => {
    event.stopPropagation();
    setBookmarkOptionId((prevId) => (prevId === id ? null : id));
  };

  const handlePopUpOpen = () => {
    setIsPopUpOpen(true);
  };

  const handlePopUpClose = () => {
    setIsPopUpOpen(false);
    setBookmarkToEdit(null);
  };

  const onFilterOptionChange = (value) => {
    setFilterOption(value);
  };

  const handleBookmarkDelete = async (id) => {
    try {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark._id !== id
      );

      setBookmarks(updatedBookmarks);
      toast.success("Bookmark Deleted!", {
        className: "custom-toast",
      });

      await deleteBookmark(id).unwrap();
    } catch (error) {
      console.error("Failed to delete bookmark:", error);
    }
  };

  const handleBookmarkEdit = (bookmark) => {
    setBookmarkToEdit(bookmark);
    setIsPopUpOpen(true);
  };

  const handleSortOptionChange = () => {
    setSortOption(sortRef.current.value);
  };

  const handleNewBookmark = (newBookmark) => {
    const tempId = uuidv4();
    newBookmark._id = tempId;

    setBookmarks((prevBookmarks) => {
      const updatedBookmarks =
        sortOption === "New to Old"
          ? [newBookmark, ...prevBookmarks]
          : [...prevBookmarks, newBookmark];
      return updatedBookmarks;
    });
  };

  const handleUpdateBookmark = (updatedBookmark) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((preBookmark) =>
        preBookmark._id === updatedBookmark._id ? updatedBookmark : preBookmark
      )
    );
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    if (sortOption === "New to Old") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "Old to New") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  const filteredBookmarks = sortedBookmarks.filter((bookmark) => {
    if (filterOption === "All") {
      return true;
    } else {
      return bookmark.category === filterOption;
    }
  });

  if (isLoading || !userBookmarks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bookmarks-screen">
      <div className="bookmark-functions">
        <div className="filter-bookmarks">
          <Dropdown
            name={"Filter"}
            categories={categories}
            onSelectedValueChange={onFilterOptionChange}
          />
        </div>
        <div className="sort-bookmarks">
          <label htmlFor="sort-options">Sort</label>
          <select
            ref={sortRef}
            name="sort-options"
            id="sort-options"
            onChange={handleSortOptionChange}
          >
            <option value="New to Old">new to old</option>
            <option value="Old to New">old to new</option>
          </select>
        </div>
        <div className="create-bookmark">
          <button onClick={handlePopUpOpen} id="create-bookmark-btn">
            Add Bookmark
          </button>
        </div>
      </div>
      {filteredBookmarks.length > 0 ? (
        <div className="bookmarks-container">
          {filteredBookmarks.map((bookmark) => {
            return (
              <Bookmark
                key={bookmark._id}
                bookmark={bookmark}
                handleBookmarkOpen={handleBookmarkOpen}
                isExpanded={expandedBookmarkId === bookmark._id}
                isOptionsOpen={bookmarkOptionId === bookmark._id}
                handleOptionsBtnClick={handleOptionsBtnClick}
                optionsRef={optionsRef}
                deleteBookmark={handleBookmarkDelete}
                editBookmark={handleBookmarkEdit}
                closeOption={handleCloseOption}
              />
            );
          })}
        </div>
      ) : (
        <div className="no-bookmarks">
          <span>No Bookmarks</span>
        </div>
      )}

      <PopUp
        isOpen={isPopUpOpen}
        handlePopUpClose={handlePopUpClose}
        categories={categories}
        editBookmark={bookmarkToEdit}
        setNewBookmark={handleNewBookmark}
        setUpdatedBookmark={handleUpdateBookmark}
      />
    </div>
  );
};

export default UserBookmarkScreen;
