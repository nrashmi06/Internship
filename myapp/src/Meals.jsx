import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast';
import Loading from './Loading';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import { fetchMealsByCategory } from './Api'; // Import fetchMealsByCategory function

function Meals() {
  const { category: categoryParam } = useParams();
  const [category, setCategory] = useState(categoryParam || 'Seafood');
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setLoading(true); // Set loading state when starting fetch
    
    // Fetch meals data by category
    fetchMealsByCategory(category)
      .then(data => {
        setMeals(data );
        setFilteredMeals(data);
        console.log(data);
        setLoading(false); // Set loading state to false when fetch completes
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
        setLoading(false); // Set loading state to false on error as well
      });
  }, [category]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMeals(filtered);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, meals]);

  const handleImageClick = image => {
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
        <h1 className="d-flex justify-content-center">Meals: {category}</h1>
        <div className="d-flex justify-content-center">
          <div className="m-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className="m-4">
            <Button onClick={toggleLayout}>
              {isGridLayout ? 'List Layout' : 'Grid Layout'}
            </Button>
          </div>
          <div className="m-4">
            <SortButton onSortChange={handleSortChange} />
          </div>
        </div>
      </header>
      {isGridLayout ? (
        <GridLayout items={filteredMeals} onImageClick={handleImageClick} type="meals" />
      ) : (
        <ListLayout items={filteredMeals} onImageClick={handleImageClick} type="meals" />
      )}
      <ImageToast
        showToast={showToast}
        toggleShowToast={toggleShowToast}
        toastImage={toastImage}
      />
    </>
  );
}

export default Meals;
