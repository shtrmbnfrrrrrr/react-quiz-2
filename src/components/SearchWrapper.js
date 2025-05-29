import React from "react";
import SearchForm from "./SearchForm";
import FilterButton from "./FilterButton";
import DarkModeToggle from "./DarkModeToggle";

function SearchWrapper({
  filter,
  onChangeFilter,
  searchQuery,
  onChangeSearch,
}) {
  return (
    <div className="search-wrapper">
      <h1 className="title">TODO LIST</h1>
      <div className="controls">
        <SearchForm value={searchQuery} onChange={onChangeSearch} />
        <FilterButton selected={filter} onChange={onChangeFilter} />
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default SearchWrapper;
