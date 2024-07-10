import React from 'react';
import Card from 'react-bootstrap/Card';

const MealsCard = ({ meal, onImageClick, fullWidth }) => {
  
  const cardStyle = {
    width: fullWidth ? '100%' : '18rem',
    margin: '1rem'
  };

  return (
    <Card key={meal.idMeal} style={cardStyle}>
      <Card.Img
        variant="top"
        src={meal.strMealThumb || ''}
        alt={meal.strMeal || ''}
        onClick={() => onImageClick(meal.strMealThumb)}
        style={{ cursor: 'pointer', height: fullWidth ? '50vh' : 'auto', objectFit: 'contain'}}
      />
      <Card.Body>
        <Card.Title className="text-center">
          {meal.strMeal}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MealsCard;
