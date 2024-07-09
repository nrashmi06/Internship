import React from 'react';
import RecipeCard from './RecipeCard';

const ListLayout = ({ items, onImageClick, type }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {items.map(item => (
        <RecipeCard key={type === 'category' ? item.idCategory : item.idMeal} item={item} onImageClick={onImageClick} fullWidth type={type} />
      ))}
    </div>
  );
};

export default ListLayout;
