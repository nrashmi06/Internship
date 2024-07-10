import React from 'react';
import RecipeCard from './RecipeCard';
import MealsCard from './MealsCard';

const ListLayout = ({ items, onImageClick, type }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {items.map(item => (
        type === 'category' ? (
          <RecipeCard key={item.idCategory} item={item} onImageClick={onImageClick} fullWidth />
        ) : (
          <MealsCard key={item.idMeal} meal={item} onImageClick={onImageClick} fullWidth />
        )
      ))}
    </div>
  );
};

export default ListLayout;
