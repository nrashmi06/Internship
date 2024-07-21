import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipeCard = ({ item, onImageClick, fullWidth }) => {
  const handleClick = () => {
    window.location.href = `/meals/${item.strCategory}`;
  };

  // Styles for the card
  const cardStyle = {
    width: fullWidth ? '100%' : '18rem',
    minHeight: '25rem', // Ensures the card can expand if needed
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Optional: Adds a subtle shadow
    overflow: 'hidden', // Ensures content does not overflow the card boundaries
  };

  // Styles for the card image
  const imgStyle = {
    cursor: 'pointer',
    height: '50%', // Adjust height as needed
    objectFit: 'cover',
  };

  // Styles for the card body
  const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Pushes button to the bottom
    flex: 1, // Allows the body to expand and fill available space
    padding: '1rem', // Padding for spacing
    boxSizing: 'border-box', // Ensures padding is included in height calculation
  };

  // Styles for the button container
  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the button horizontally
    padding: '0.5rem 0', // Adds space within the div without margin
    backgroundColor: '#f5f5dc', // Light beige background color
    borderRadius: '0.25rem', // Optional: Adds slight rounding to the corners
  };

  return (
    <Card style={cardStyle}>
      <Card.Img
        variant="top"
        src={item.strCategoryThumb}
        alt={item.strCategory}
        onClick={() => onImageClick(item.strCategoryThumb)}
        style={imgStyle}
      />
      <Card.Body style={bodyStyle}>
        <Card.Title className="text-center">
          {item.strCategory}
        </Card.Title>
        <Card.Text>
          {item.strCategoryDescription.length > 100
            ? item.strCategoryDescription.substring(0, 100) + '...'
            : item.strCategoryDescription}
        </Card.Text>
        <div style={buttonContainerStyle}>
          <Button variant="primary" onClick={handleClick}>View</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
