/* eslint-disable react/prop-types */

import { useRef } from "react";

const Dropdown = ({
  categories,
  name,
  onSelectedValueChange,
  editCategory,
}) => {
  const categoryRef = useRef(null);

  const handleSelection = () => {
    onSelectedValueChange(categoryRef.current.value);
  };

  return (
    <>
      <label id={name} htmlFor="dropdown-options">{`${name}`}</label>
      <select
        name="dropdown-options"
        id="dropdown-options"
        ref={categoryRef}
        onChange={handleSelection}
        className="custom-select"
      >
        {categories.length === 0 ? (
          <option key={"no-category"} value="No categories">
            No categories
          </option>
        ) : (
          <>
            {name !== "Category" && (
              <option key={"all"} value="All">
                All
              </option>
            )}
            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
                selected={editCategory === category.value}
              >
                {category.name}
              </option>
            ))}
          </>
        )}
      </select>
    </>
  );
};

export default Dropdown;
