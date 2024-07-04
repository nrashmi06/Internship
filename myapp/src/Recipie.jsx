import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast'; 
import Loading from './Loading';
import { fetchRecipes } from './Api';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import SearchBar from './SearchBar';
import SortButton from './SortButton';

function Recipie() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setTimeout(() => {
      fetchRecipes().then(data => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      });
    }, 500); // Set delay time in milliseconds (e.g., 500 ms)
  }, []);

  useEffect(() => {
    const filtered = recipes.filter(recipe =>
      recipe.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  useEffect(() => {
    const sorted = [...filteredRecipes].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.strCategory.localeCompare(b.strCategory);
      } else {
        return b.strCategory.localeCompare(a.strCategory);
      }
    });
    setFilteredRecipes(sorted);
  }, [sortOrder, filteredRecipes]);

  if (loading) {
    return <Loading />;
  }

  const handleImageClick = (image) => {
    setToastImage(image);
    setShowToast(true);
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const toggleLayout = () => setIsGridLayout(!isGridLayout);

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <header >
        <h1 className='d-flex justify-content-center'>Recipes</h1>
        <div className='d-flex justify-content-center '>
        
        <div className='d-flex justify-content-center m-4'>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        <div className='d-flex justify-content-center m-4'>
          <Button onClick={toggleLayout}>
            {isGridLayout ? 'List Layout' : 'Grid Layout'}
          </Button>
        </div>
        <div className='d-flex justify-content-center m-4'>
          <SortButton sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
        </div>
      </header>
      {isGridLayout ? (
        <GridLayout recipes={filteredRecipes} onImageClick={handleImageClick} />
      ) : (
        <ListLayout recipes={filteredRecipes} onImageClick={handleImageClick} />
      )}
      <ImageToast
        showToast={showToast}
        toggleShowToast={toggleShowToast}
        toastImage={toastImage}
      />
    </>
  );
}

export default Recipie;
