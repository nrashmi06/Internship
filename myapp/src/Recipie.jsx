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
    fetchRecipes()
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false); 
      });
  }, []); 

  useEffect(() => {
    const filtered = recipes.filter(recipe =>
      recipe.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  const handleImageClick = (image) => {
    setToastImage(image);
    setShowToast(true);
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const toggleLayout = () => setIsGridLayout(!isGridLayout);

  const handleSortChange = () => {
    const sorted = [...filteredRecipes].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.strCategory.localeCompare(b.strCategory);
      } else {
        return b.strCategory.localeCompare(a.strCategory);
      }
    });
    setFilteredRecipes(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <h1 className='d-flex justify-content-center'>Recipes</h1>
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
