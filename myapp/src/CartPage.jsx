import React, { useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from './LocalStorage';
import { fetchMealById } from './Api';
import Loading from './Loading';
import GridLayout from './GridLayout';  
import ListLayout from './ListLayout';  
import Button from 'react-bootstrap/Button'; 

const CartPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGridLayout, setIsGridLayout] = useState(getLocalStorageItem('isGridLayout') === 'true');

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching favorite meals');
        const favoriteIds = getLocalStorageItem('favorites') || [];
        const favoriteMeals = await Promise.all(
          favoriteIds.map(id => fetchMealById(id))
        );
        console.log('Favorite meals:', favoriteMeals);
        setFavorites(favoriteMeals);
      } catch (err) {
        setError('Error fetching favorite meals');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleLayout = () => {
    const newLayout = !isGridLayout;
    setIsGridLayout(newLayout);
    setLocalStorageItem('isGridLayout', newLayout);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <header className="d-flex flex-column align-items-center mb-4">
        <h1 className="mb-3">Your Favorite Meals</h1>
        <Button 
          onClick={toggleLayout} 
          variant="primary" 
          className="layout-toggle-button"
        >
          {isGridLayout ? 'Switch to List View' : 'Switch to Grid View'}
        </Button>
      </header>
      {isGridLayout ? (
        <GridLayout items={favorites} type="meals" />
      ) : (
        <ListLayout items={favorites} type="meals" />
      )}
    </div>
  );
};

export default CartPage;
