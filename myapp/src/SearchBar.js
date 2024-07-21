import React from 'react';
import './SearchBar.css'; // Import your CSS file

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
        placeholder="Search for meals..."
      />
    </div>
  );
}

export default SearchBar;
