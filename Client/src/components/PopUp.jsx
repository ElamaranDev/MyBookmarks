/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import {
  useAddBookmarkMutation,
  useUpdateBookmarkMutation,
} from "../slices/bookmarkApiSlice";
import { toast } from "react-toastify";

const PopUp = ({
  isOpen,
  handlePopUpClose,
  categories,
  editBookmark,
  setNewBookmark,
  setUpdatedBookmark,
}) => {
  const nameRef = useRef(null);
  const urlRef = useRef(null);
  const categoryRef = useRef(null);
  const [isCategory, setIsCategory] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addBookmark] = useAddBookmarkMutation();
  const [updateBookmark] = useUpdateBookmarkMutation();

  const handleCategorySelection = (value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (isOpen) {
      if (editBookmark && editBookmark._id) {
        nameRef.current.value = editBookmark.bookmarkName;
        urlRef.current.value = editBookmark.bookmarkURL;
        setSelectedCategory(editBookmark.category);
      } else {
        nameRef.current.value = "";
        urlRef.current.value = "";
        setSelectedCategory("");
      }
      nameRef.current.focus();
    }
  }, [editBookmark, isOpen]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookmarkName = nameRef.current.value;
    const bookmarkURL = addHttpToUrl(urlRef.current.value);

    let category =
      selectedCategory || (categories.length > 0 ? categories[0].name : "");

    if (categoryRef.current && categoryRef.current.value) {
      category = categoryRef.current.value;
    }

    if (!category) {
      toast.error("Select or Create Category!");
      return;
    }

    const domain = extractDomainFromUrl(bookmarkURL);
    const size = 32;
    const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

    try {
      if (editBookmark && editBookmark._id) {
        try {
          const updatedBookmark = {
            ...editBookmark,
            bookmarkName,
            bookmarkURL,
            category,
            faviconURL,
          };

          setUpdatedBookmark(updatedBookmark);
          toast.success("Updated Successfully!");
          closePopUp();
          await updateBookmark({
            id: editBookmark._id,
            updatedBookmark: updatedBookmark,
          }).unwrap();
        } catch (error) {
          toast.error("Error Updating Bookmark!");
          console.log("Error Updating: " + error);
        }
      } else {
        const newBookmark = {
          bookmarkName,
          bookmarkURL,
          category,
          faviconURL,
        };
        setNewBookmark(newBookmark);
        closePopUp();
        await addBookmark(newBookmark).unwrap();
      }
    } catch (error) {
      console.error("Failed to save bookmark:", error);
    }
  };

  function addHttpToUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }
    return url;
  }

  function closePopUp() {
    handlePopUpClose();
    setIsCategory(true);
    setSelectedCategory("");
  }

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <form className="popup-container" onSubmit={handleSubmit}>
        <h3>
          {editBookmark && editBookmark._id ? "Edit Bookmark" : "Add Bookmark"}
        </h3>
        <div className="name-area">
          <label htmlFor="bookmark-name">Name</label>
          <input
            placeholder="Enter name"
            id="bookmark-name"
            type="text"
            ref={nameRef}
            required
          />
        </div>
        <div className="url-area">
          <label htmlFor="bookmark-url">URL</label>
          <input
            placeholder="Enter url"
            id="bookmark-url"
            type="text"
            ref={urlRef}
            required
          />
        </div>
        <div className="category">
          {isCategory ? (
            <div className="choose-category">
              <Dropdown
                name="Category"
                categories={categories}
                onSelectedValueChange={handleCategorySelection}
                selectedValue={selectedCategory}
                editCategory={editBookmark?.category}
              />
              <button
                type="button"
                onClick={() => setIsCategory(!isCategory)}
                id="create-category-btn"
              >
                Create Category
              </button>
            </div>
          ) : (
            <div className="create-category">
              <label htmlFor="category-input">Category</label>
              <input
                id="category-input"
                type="text"
                placeholder="Enter new category"
                ref={categoryRef}
                required
              />
            </div>
          )}
        </div>
        <div className="buttons">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              handlePopUpClose();
              setIsCategory(true);
              setSelectedCategory("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopUp;
