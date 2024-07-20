import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ onSelectCategory }) => {
  const categories = [
    'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork',
    'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'
  ];

  const navigate = useNavigate();

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    navigate(`/meals/${category}`);
  };

  return (
    <DropdownButton id="dropdown-basic-button" title="Select Category">
      {categories.map(category => (
        <Dropdown.Item key={category} onClick={() => handleSelectCategory(category)}>
          {category}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownMenu;
