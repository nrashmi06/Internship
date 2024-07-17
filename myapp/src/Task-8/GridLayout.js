import React from 'react';
import RecipeCard from './RecipeCard';
import MealsCard from './MealsCard';

const GridLayout = ({ items, onImageClick, type }) => {
  console.log('items in grid ', items);
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {items.map(item => {
        if (type === 'category') {
          return <RecipeCard key={item.idCategory} item={item} onImageClick={onImageClick} />;
        } else if (type === 'meals') {
          return <MealsCard key={item.idMeal} meal={item} onImageClick={onImageClick} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default GridLayout;
