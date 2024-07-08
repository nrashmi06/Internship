import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast';
import Loading from './Loading';
import { fetchRecipes } from './Api';
import { ENDPOINTS } from './apiConfig';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import SearchBar from './SearchBar';
import SortButton from './SortButton';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchRecipes(ENDPOINTS.SEAFOOD) // Assuming the endpoint to fetch meals is ENDPOINTS.SEAFOOD
      .then(data => {
        setMeals(data);
        setFilteredMeals(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMeals(filtered);
    }, 900); 

    return () => clearTimeout(delayDebounceFn); 
  }, [searchTerm, meals]);

  const handleImageClick = (image) => {
    setToastImage(image);
    setShowToast(true);
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const toggleLayout = () => setIsGridLayout(!isGridLayout);

  const handleSortChange = () => {
    const sorted = [...filteredMeals].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.strMeal.localeCompare(b.strMeal);
      } else {
        return b.strMeal.localeCompare(a.strMeal);
      }
    });
    setFilteredMeals(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <h1 className='d-flex justify-content-center'>Meals</h1>
        <div className='d-flex justify-content-center'>
          <div className='m-4'>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className='m-4'>
            <Button onClick={toggleLayout}>
              {isGridLayout ? 'List Layout' : 'Grid Layout'}
            </Button>
          </div>
          <div className='m-4'>
            <SortButton onSortChange={handleSortChange} />
          </div>
        </div>
      </header>
      {isGridLayout ? (
        <GridLayout items={filteredMeals} onImageClick={handleImageClick} type="meal" />
      ) : (
        <ListLayout items={filteredMeals} onImageClick={handleImageClick} type="meal" />
      )}
      <ImageToast
        showToast={showToast}
        toggleShowToast={toggleShowToast}
        toastImage={toastImage }
      />
    </>
  );
}

export default Meals;
