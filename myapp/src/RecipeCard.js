import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './RecipeCard.css'; // Make sure to import your CSS file

const RecipeCard = ({ item, onImageClick, fullWidth }) => {
  const handleClick = () => {
    window.location.href = `/meals/${item.strCategory}`;
  };

  return (
    <Card className={`card-custom ${fullWidth ? 'w-100' : ''}`}>
      <div 
        className="card-custom-img" 
        style={{ backgroundImage: `url(${item.strCategoryThumb})` }}
        onClick={() => onImageClick(item.strCategoryThumb)}
      ></div>
      <Card.Body className="card-custom-body">
        <Card.Title className="text-center">
          {item.strCategory}
        </Card.Title>
        <Card.Text className="card-custom-text">
          {item.strCategoryDescription}
        </Card.Text>
        <div className="card-custom-avatar">
          <img src={item.strCategoryThumb} alt={item.strCategory} />
        </div>
        <div className="button-container-recipie">
          <Button className='button-recipie' variant="primary" onClick={handleClick}>View</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
