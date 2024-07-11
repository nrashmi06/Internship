import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <Form className="search-bar-container">
      <Form.Control
        type="text"
        placeholder="Search meals"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="mr-sm-2"
      />
    </Form>
  );
};

export default SearchBar;
