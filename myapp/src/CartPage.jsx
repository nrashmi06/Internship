import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchMealById } from './Api';
import Loading from './Loading';
import GridLayout from './GridLayout';  
import ListLayout from './ListLayout';  
import Button from 'react-bootstrap/Button'; 
import './CartPage.css'; // Ensure you import your CSS

const CartPage = () => {
  const favoriteIds = useSelector((state) => state.favorites);
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGridLayout, setIsGridLayout] = useState(localStorage.getItem('isGridLayout') === 'true');

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching favorite meals');
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
  }, [favoriteIds]);

  const toggleLayout = () => {
    const newLayout = !isGridLayout;
    setIsGridLayout(newLayout);
    localStorage.setItem('isGridLayout', newLayout);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-page-container">
      <header className="header">
        <h1>Your Favorite Meals</h1>
        <Button 
          onClick={toggleLayout} 
          variant="primary" 
          className="layout-toggle-button"
        >
          {isGridLayout ? 'Switch to List View' : 'Switch to Grid View'}
        </Button>
      </header>
      <div className="layout-container">
        {isGridLayout ? (
          <GridLayout items={favorites} type="meals" />
        ) : (
          <ListLayout items={favorites} type="meals" />
        )}
      </div>
    </div>
  );
};

export default CartPage;
