import React from 'react';
import RecipeCard from './RecipeCard';

const GridLayout = ({ items, onImageClick, type }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {items.map(item => (
        <RecipeCard key={type === 'category' ? item.idCategory : item.idMeal} item={item} onImageClick={onImageClick} type={type} />
      ))}
    </div>
  );
};

export default GridLayout;
