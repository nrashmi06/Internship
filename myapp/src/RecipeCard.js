import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipeCard = ({ recipe, onImageClick, fullWidth }) => {
  return (
    <Card key={recipe.idCategory} style={{ width: fullWidth ? '100%' : '18rem', margin: '1rem' }}>
      <Card.Img
        variant="top"
        src={recipe.strCategoryThumb}
        alt={recipe.strCategory}
        onClick={() => onImageClick(recipe.strCategoryThumb)}
        style={{ cursor: 'pointer', height: fullWidth ? '200px' : 'auto', objectFit: 'contain' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title  className="d-flex justify-content-center mt-auto" >{recipe.strCategory}</Card.Title>
        <Card.Text className="d-flex justify-content-center mt-auto">
          {recipe.strCategoryDescription.length > 100 && !fullWidth
            ? recipe.strCategoryDescription.substring(0, 100) + '...'
            : recipe.strCategoryDescription}
        </Card.Text>
        <div className="d-flex justify-content-center mt-auto">
          <Button variant="primary">View</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
