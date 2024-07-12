import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MealsCard = ({ meal, onImageClick, fullWidth }) => {
  if (!meal) {
    return null;
  }

  const handleClick = () => {
    window.location.href = `/meal/${meal.idMeal}`;
  }
  

  return (
    <Card key={meal.idMeal} className="card" style={{ marginTop: '5px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <Card.Img
        variant="top"
        src={meal.strMealThumb || ''}
        alt={meal.strMeal || ''}
        onClick={() => onImageClick(meal.strMealThumb)}
        style={{ cursor: 'pointer', height: fullWidth ? '40vh' : 'auto', objectFit: 'contain' }}
      />
      <Card.Body>
        <Card.Title className="text-center">
          {meal.strMeal}
        </Card.Title>
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleClick}>View</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MealsCard;
