import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Recipie() {
  const [recipies, setRecipies] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setRecipies(data.categories))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <header>
        <h1 className='d-flex justify-content-center'>Recipes</h1>
      </header>
      <div className="d-flex justify-content-center flex-wrap">
        {recipies.map(recipe => (
          <Card key={recipe.idCategory} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={recipe.strCategoryThumb} alt={recipe.strCategory} />
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
    </>
  );
}

export default Recipie;
