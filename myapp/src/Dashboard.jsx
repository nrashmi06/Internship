import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; 

function Dashboard({ setAuth }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <div className="text-section">
        <div className="welcome-message">
          <p>Welcome to the Recipe Website! Explore a variety of delicious recipes, share your own culinary creations, and enjoy the vibrant community of food enthusiasts. Discover new flavors and cooking tips as you navigate through our curated selection of recipes.</p>
        </div>
      </div>

      <div className="carousel-section">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
          <Carousel.Item>
            <img
              className="d-block half-screen"
              src={`${process.env.PUBLIC_URL}/images/img1.png`}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block half-screen"
              src={`${process.env.PUBLIC_URL}/images/img2.png`}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block half-screen"
              src={`${process.env.PUBLIC_URL}/images/img3.png`}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block half-screen"
              src={`${process.env.PUBLIC_URL}/images/img4.png`}
              alt="Fourth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block half-screen"
              src={`${process.env.PUBLIC_URL}/images/img5.png`}
              alt="Fifth slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block half-screen"
              src={`${process.env.PUBLIC_URL}/images/img6.png`}
              alt="Sixth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Dashboard;
