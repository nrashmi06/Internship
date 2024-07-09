import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipeCard = ({ item, onImageClick, fullWidth, type }) => {
  const isCategory = type === 'category';

  return (
    <Card key={isCategory ? item.idCategory : item.idMeal} style={{ width: fullWidth ? '100%' : '18rem', margin: '1rem' }}>
      <Card.Img
        variant="top"
        src={isCategory ? item.strCategoryThumb : item.strMealThumb}
        alt={isCategory ? item.strCategory : item.strMeal}
        onClick={() => onImageClick(isCategory ? item.strCategoryThumb : item.strMealThumb)}
        style={{ cursor: 'pointer', height: fullWidth ? '50vh' : 'auto', objectFit: 'contain' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-center mt-auto">
          {isCategory ? item.strCategory : item.strMeal}
        </Card.Title>
        {isCategory && (
          <Card.Text className="d-flex justify-content-center mt-auto">
            {item.strCategoryDescription.length > 100 && !fullWidth
              ? item.strCategoryDescription.substring(0, 100) + '...'
              : item.strCategoryDescription}
          </Card.Text>
        )}
        <div className="d-flex justify-content-center mt-auto">
          <Button variant="primary">View</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
