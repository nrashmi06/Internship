import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownMenu = ({ onSelectCategory }) => {
  const categories = [
    'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork',
    'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'
  ];

  return (
    <DropdownButton id="dropdown-basic-button" title="Select Category">
      {categories.map(category => (
        <Dropdown.Item key={category} onClick={() => onSelectCategory(category)}>
          {category}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownMenu;
