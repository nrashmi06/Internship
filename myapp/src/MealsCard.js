import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toggleFavorite } from './Api';

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
      className="card"
      style={{
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden', 
      }}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <Card.Img
          variant="top"
          src={meal.strMealThumb || ''}
          alt={meal.strMeal || ''}
          onClick={() => onImageClick(meal.strMealThumb)}
          style={{
            cursor: 'pointer',
            height: 'auto',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <i
          className={`bi ${isFavorited ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart'} ${loading ? 'text-muted' : ''}`}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '1rem',
            cursor: loading ? 'default' : 'pointer',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          onClick={loading ? undefined : handleToggleFavorite}
        ></i>
      </div>
      <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Card.Title className="text-center">{meal.strMeal}</Card.Title>
        <div className="d-flex justify-content-center mt-2">
          <Button variant="primary" onClick={handleClick}>
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
