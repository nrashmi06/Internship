import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getLocalStorageItem, setLocalStorageItem } from './LocalStorage';

// Ensure you replace these URLs with your actual API endpoints
const API_BASE_URL = '/api/users/profile/favorites';

const MealsCard = ({ meal, onImageClick, fullWidth }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from local storage
    const storedFavorites = getLocalStorageItem('favorites') || [];
    setFavorites(storedFavorites.map(id => id.toString()));
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (meal) {
      const mealId = meal.idMeal.toString();
      setIsFavorited(favorites.includes(mealId));
    }
  }, [meal, favorites]); // Run whenever `meal` or `favorites` changes

  const handleClick = () => {
    window.location.href = `/meal/${meal.idMeal}`;
  };

  const toggleFavorite = async () => {
    try {
      const token = getLocalStorageItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const mealId = meal.idMeal.toString();
      let updatedFavorites = [...favorites];

      if (isFavorited) {
        // Remove from favorites
        updatedFavorites = updatedFavorites.filter(id => id !== mealId);
      } else {
        // Add to favorites
        updatedFavorites.push(mealId);
      }

      // Update local storage with new favorites
      setLocalStorageItem('favorites', updatedFavorites);

      // Make API request to update the server
      const method = isFavorited ? 'DELETE' : 'POST';
      const response = await fetch(API_BASE_URL, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ mealId }), // Ensure body is correctly formatted
      });

      if (response.ok) {
        // Update state only if API request is successful
        setFavorites(updatedFavorites); // Update state
        setIsFavorited(!isFavorited); // Toggle favorite state
      } else {
        console.error('Failed to update favorite on server');
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
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
            objectFit: 'cover',
          }}
        />
        <i
          className={`bi ${isFavorited ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart'}`}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          onClick={toggleFavorite}
        ></i>
      </div>
      <Card.Body>
        <Card.Title className="text-center">{meal.strMeal}</Card.Title>
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
