import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast'; 
import Loading from './Loading';
import { fetchRecipes } from './Api';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';

function Recipie() {
  const [recipes, setRecipes] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setIsGridLayout] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchRecipes().then(data => {
        setRecipes(data);
        setLoading(false);
      });
    }, 500); // Set delay time in milliseconds (e.g., 500 ms)
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleImageClick = (image) => {
    setToastImage(image);
    setShowToast(true);
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const toggleLayout = () => setIsGridLayout(!isGridLayout);

  return (
    <>
      <header>
        <h1 className='d-flex justify-content-center'>Recipes</h1>
        <div className='d-flex justify-content-center mb-4'>
          <Button onClick={toggleLayout}>
            {isGridLayout ? 'Switch to List Layout' : 'Switch to Grid Layout'}
          </Button>
        </div>
      </header>
      {isGridLayout ? (
        <GridLayout recipes={recipes} onImageClick={handleImageClick} />
      ) : (
        <ListLayout recipes={recipes} onImageClick={handleImageClick} />
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
