import React from 'react';
import RecipeCard from './RecipeCard';

const ListLayout = ({ recipes, onImageClick }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.idCategory} recipe={recipe} onImageClick={onImageClick} fullWidth />
      ))}
    </div>
  );
};

export default ListLayout;
