import React, { useState } from 'react';

function Header() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  const changeColor = () => {
    setFavoriteColor("blue");
  }

  return (
    <div>
      <h1>My Favorite Color is {favoriteColor}</h1>
      <button type="button" onClick={changeColor}>Change color</button>
    </div>
  );
}

export default Header;
