import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchForm({ value, onChange }) {
  return (
    <form className="note-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="note-text-input"
        placeholder="Search note..."
        value={value}
        onChange={onChange}
      />
      <button type="submit" className="search-button">
        <FiSearch />
      </button>
    </form>
  );
}

export default SearchForm;
