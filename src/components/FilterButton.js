import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function FilterButton({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["All", "Complete", "Incomplete"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown">
      <button
        className={`filter-button ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {selected}
        <span className="dropdown-icon">
          {isOpen ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
        </span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterButton;
