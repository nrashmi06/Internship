import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ImageToast from './ImageToast'; 
import Loading from './Loading';

function Recipie() {
  const [recipies, setRecipies] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastImage, setToastImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setRecipies(data.categories);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.log(error);
          setLoading(false); // Set loading to false even if there is an error
        });
    }, 500); // Set delay time in milliseconds (e.g., 2000 ms = 2 seconds)
  }, []);

  if (loading) {
    return <Loading />;
  }
  const handleImageClick = (image) => {
    setToastImage(image);
    setShowToast(true);
  };

  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <>
      <header>
        <h1 className='d-flex justify-content-center'>Recipes</h1>
      </header>
      <div className="d-flex justify-content-center flex-wrap">
        {recipies.map(recipe => (
          <Card key={recipe.idCategory} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img 
              variant="top" 
              src={recipe.strCategoryThumb} 
              alt={recipe.strCategory}
              onClick={() => handleImageClick(recipe.strCategoryThumb)} 
              style={{ cursor: 'pointer' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{recipe.strCategory}</Card.Title>
              <Card.Text>
                {recipe.strCategoryDescription.length > 100
                  ? recipe.strCategoryDescription.substring(0, 100) + '...'
                  : recipe.strCategoryDescription}
              </Card.Text>
              <div className="d-flex justify-content-center mt-auto">
                <Button variant="primary">View</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <ImageToast
        showToast={showToast}
        toggleShowToast={toggleShowToast}
        toastImage={toastImage}
      />
    </>
  );
}

export default Recipie;
