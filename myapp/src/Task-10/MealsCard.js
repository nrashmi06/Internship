import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getLocalStorageItem, setLocalStorageItem } from './LocalStorage';
import { API_BASE_URL,API_ENDPOINTS } from './apiConfig';


const MealsCard = ({ meal, onImageClick, fullWidth }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const storedFavorites = getLocalStorageItem('favorites') || [];
    setIsFavorited(storedFavorites.includes(meal?.idMeal.toString()));
  }, [meal]);

  const handleClick = () => {
    window.location.href = `/meal/${meal.idMeal}`;
  };

  const toggleFavorite = async () => {
    const mealId = meal.idMeal.toString();
    setLoading(true);

    const storedFavorites = getLocalStorageItem('favorites') || [];
    let updatedFavorites;

    if (storedFavorites.includes(mealId)) {
      updatedFavorites = storedFavorites.filter(id => id !== mealId);
      setNotification('Removed from favorites');
    } else {
      updatedFavorites = [...storedFavorites, mealId];
      setNotification('Added to favorites');
    }

    setLocalStorageItem('favorites', updatedFavorites);
    setIsFavorited(!isFavorited);

    try {
      const token = getLocalStorageItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const method = isFavorited ? 'DELETE' : 'POST';
      const response = await fetch(API_BASE_URL+API_ENDPOINTS.FAVORITES, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ mealId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite on server');
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);

      const revertedFavorites = isFavorited
        ? [...updatedFavorites, mealId]
        : updatedFavorites.filter(id => id !== mealId);

      setLocalStorageItem('favorites', revertedFavorites);
      setIsFavorited(isFavorited);
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
          onClick={loading ? undefined : toggleFavorite}
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
