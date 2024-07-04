import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <InputGroup >
      <Form.Control
        placeholder="Search recipes"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
