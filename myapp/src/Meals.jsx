import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ImageToast from './ImageToast';
import Loading from './Loading';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import { fetchMealsByCategory, toggleFavorite } from './Api';
import DropdownMenu from './DropdownMenu';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectFavorites } from './features/favorites/favoritesSlice'; // Redux imports
import './Meals.css';

function Meals() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  console.log('Favorites:', favorites);

  const [category, setCategory] = useState(categoryParam || 'Seafood');
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNoneToast, setShowNoneToast] = useState(false);

  useEffect(() => {
    const storedLayout = localStorage.getItem('isGridLayout');
    if (storedLayout) {
      setIsGridLayout(storedLayout === 'true');
    }
  }, []);

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

  const toggleLayout = () => {
    const newLayout = !isGridLayout;
    setIsGridLayout(newLayout);
    localStorage.setItem('isGridLayout', newLayout ? 'true' : 'false');
  };

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
    navigate(`/meals/${category}`);
  };

  const handleShowFavorites = () => {
    const favoriteMeals = meals.filter(meal => favorites.includes(meal.idMeal.toString()));

    if (favoriteMeals.length === 0) {
      setFilteredMeals([]);
      setShowNoneToast(true);
    } else {
      setFilteredMeals(favoriteMeals);
      setShowNoneToast(false);
    }
    setShowFavorites(true);
  };

  const handleShowAllMeals = () => {
    setFilteredMeals(meals);
    setShowFavorites(false);
  };

  const handleToggleFavorite = (mealId) => {
    const isFavorited = favorites.includes(mealId);
    toggleFavorite(mealId, isFavorited)
      .then(() => {
        if (isFavorited) {
          dispatch(removeFavorite(mealId));
        } else {
          dispatch(addFavorite(mealId));
        }
      })
      .catch(error => {
        console.error('Error toggling favorite:', error);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <h1 className="text-center">Meals: {category}</h1>
        <div className="contain-button d-flex justify-content-between align-items-center flex-wrap">
          <div className="search-bar-container flex-grow-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className="button-container d-flex align-items-center">
            <Button onClick={toggleLayout} className="m-2">
              {isGridLayout ? <i className="bi bi-distribute-vertical"></i> : <i className="bi bi-distribute-horizontal"></i>}
            </Button>
            <SortButton onSortChange={handleSortChange} className="m-2" />
            <DropdownMenu onSelectCategory={handleSelectCategory} className="m-2" />
            <Button onClick={showFavorites ? handleShowAllMeals : handleShowFavorites} className="m-2">
              <i className="bi bi-cart2"></i>
            </Button>
          </div>
        </div>
      </header>

      {filteredMeals.length === 0 && showFavorites ? (
        <Toast show={showNoneToast} onClose={() => setShowNoneToast(false)} className="custom-toast">
          <Toast.Body>No favorites available for this category.</Toast.Body>
        </Toast>
      ) : isGridLayout ? (
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
