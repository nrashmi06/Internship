import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast';
import Loading from './Loading';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import { fetchMealsByCategory } from './Api';
import DropdownMenu from './DropdownMenu';

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
    setLoading(true); 
    console.log('Fetching meals for category:', category);
    
    fetchMealsByCategory(category)
      .then(data => {
        setMeals(data);
        setFilteredMeals(data);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
        setLoading(false);
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

  const handleSelectCategory = (category) => {
    setCategory(category);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <h1 className="d-flex justify-content-center">Meals: {category}</h1>
        <div className="d-flex justify-content-center flex-wrap">
          <div className="m-2 flex-grow-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className="m-2">
            <Button onClick={toggleLayout}>
              {isGridLayout ? 'List Layout' : 'Grid Layout'}
            </Button>
          </div>
          <div className="m-2">
            <SortButton onSortChange={handleSortChange} />
          </div>
          <div className="m-2">
            <DropdownMenu onSelectCategory={handleSelectCategory} />
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
