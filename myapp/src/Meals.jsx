import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast';
import Loading from './Loading';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import { fetchMealsByCategory } from './Api';
import DropdownMenu from './DropdownMenu';
import { getLocalStorageItem, setLocalStorageItem } from './LocalStorage'; // Import the utility functions

function Meals() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(categoryParam || 'Seafood');
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Load layout preference from local storage
  useEffect(() => {
    const savedLayout = getLocalStorageItem('mealsLayout');
    if (savedLayout) {
      setIsGridLayout(savedLayout === 'grid');
    }
  }, []);

  // Fetch meals for the selected category
  useEffect(() => {
    setLoading(true);
    const currentCategory = categoryParam || category;
    console.log('Fetching meals for category:', currentCategory);

    fetchMealsByCategory(currentCategory)
      .then(data => {
        setMeals(data);
        setFilteredMeals(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
        setLoading(false);
      });
  }, [categoryParam, category]);

  // Filter meals based on search term
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMeals(filtered);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, meals]);

  // Handle image click
  const handleImageClick = image => {
    setToastImage(image);
    setShowToast(true);
  };

  // Toggle toast visibility
  const toggleShowToast = () => setShowToast(!showToast);

  // Toggle between grid and list layout
  const toggleLayout = () => {
    const newLayout = !isGridLayout;
    setIsGridLayout(newLayout);
    setLocalStorageItem('mealsLayout', newLayout ? 'grid' : 'list');
    console.log('Layout saved to local storage:', newLayout ? 'grid' : 'list'); // Debug statement
  };

  // Handle sort change
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

  // Handle category selection from dropdown menu
  const handleSelectCategory = (category) => {
    setCategory(category);
    navigate(`/meals/${category}`);
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
              {isGridLayout ? <i className="bi bi-distribute-vertical"></i> : <i className="bi bi-distribute-horizontal"></i>}
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
