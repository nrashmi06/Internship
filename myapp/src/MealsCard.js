import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MealsCard = ({ meal, onImageClick, fullWidth }) => {
  const [isFavorited, setIsFavorited] = useState(false); // State to manage heart icon

  if (!meal) {
    return null;
  }

  const handleClick = () => {
    window.location.href = `/meal/${meal.idMeal}`;
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Toggle heart icon state
  };

  return (
    <Card
      key={meal.idMeal}
      className="card"
      style={{
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative' // Ensure card is positioned relative for absolute children
      }}
    >
      <div style={{ position: 'relative' }}>
        <Card.Img
          variant="top"
          src={meal.strMealThumb || ''}
          alt={meal.strMeal || ''}
          onClick={() => onImageClick(meal.strMealThumb)}
          style={{
            cursor: 'pointer',
            height: fullWidth ? 'auto' : 'auto',
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <i
          className={`bi ${isFavorited ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart'}`}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '1rem', // Smaller size for the heart icon
            cursor: 'pointer',
            backgroundColor: 'white', // White circle background
            borderRadius: '50%', // Ensures the circle is perfectly round
            padding: '5px', // Adjust padding for a smaller circle
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Subtle shadow for better visibility
          }}
          onClick={toggleFavorite}
        ></i>
      </div>
      <Card.Body>
        <Card.Title className="text-center">
          {meal.strMeal}
        </Card.Title>
        <div className="d-flex justify-content-center mt-2">
          <Button variant="primary" onClick={handleClick}>
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MealsCard;
