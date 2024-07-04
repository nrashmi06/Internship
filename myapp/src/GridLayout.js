import React from 'react';
import RecipeCard from './RecipeCard';

const GridLayout = ({ recipes, onImageClick }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.idCategory} recipe={recipe} onImageClick={onImageClick} />
      ))}
    </div>
  );
};

export default GridLayout;
