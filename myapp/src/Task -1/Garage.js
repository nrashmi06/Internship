import React from 'react';

const cars = ['Ford', 'BMW', 'Audi']; 

function Garage() {
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 &&// conditional rendering
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
      }
    </>
  );
}

export default Garage;
