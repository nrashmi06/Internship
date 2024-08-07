import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toggleFavorite } from './Api';
import './MealsCard.css'; 

const MealsCard = ({ meal, onImageClick, fullWidth }) => {
  const favoriteIds = useSelector((state) => state.favorites);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setIsFavorited(favoriteIds.includes(meal?.idMeal.toString()));
  }, [favoriteIds, meal]);

  const handleClick = () => {
    window.location.href = `/meal/${meal.idMeal}`;
  };

  const handleToggleFavorite = async () => {
    const mealId = meal.idMeal.toString();
    setLoading(true);

    try {
      await toggleFavorite(mealId, isFavorited);
      setNotification(isFavorited ? 'Removed from favorites' : 'Added to favorites');
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(''), 1000);
    }
  };

  if (!meal) {
    return null;
  }

  return (
    <Card
      key={meal.idMeal}
      className="card-sl"
      style={{
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <Card.Img
          variant="top"
          src={meal.strMealThumb || ''}
          alt={meal.strMeal || ''}
          onClick={() => onImageClick(meal.strMealThumb)}
          className="card-image"
          style={{
            cursor: 'pointer',
            height: 'auto',
            width: '100%',
          }}
        />
        <i
          className={`bi ${isFavorited ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart'} ${loading ? 'text-muted' : ''} card-action`}
          onClick={loading ? undefined : handleToggleFavorite}
        ></i>
      </div>
      <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Card.Title className="card-heading">{meal.strMeal}</Card.Title>
        <div className="d-flex justify-content-center mt-2">
          <Button className="card-button" onClick={handleClick}>
            View
          </Button>
        </div>
      </Card.Body>
      {notification && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#444',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
          zIndex: 1000,
          opacity: 0.8,
        }}>
          {notification}
        </div>
      )}
    </Card>
  );
};

export default MealsCard;
