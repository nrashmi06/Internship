import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipeCard = ({ item, onImageClick, fullWidth }) => {
  const handleClick = () => {
    window.location.href = `/meals/${item.strCategory}`;
  };

  return (
    <Card style={{ width: fullWidth ? '100%' : '18rem', margin: '1rem' }}>
      <Card.Img
        variant="top"
        src={item.strCategoryThumb}
        alt={item.strCategory}
        onClick={() => onImageClick(item.strCategoryThumb)}
        style={{ cursor: 'pointer', height: fullWidth ? '50vh' : 'auto', objectFit: 'contain' }}
      />
      <Card.Body>
        <Card.Title className="text-center">
          {item.strCategory}
        </Card.Title>
        <Card.Text>
          {item.strCategoryDescription.length > 100 && !fullWidth
            ? item.strCategoryDescription.substring(0, 100) + '...'
            : item.strCategoryDescription}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleClick}>View</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
