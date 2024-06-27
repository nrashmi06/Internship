import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashboard({ setAuth }) {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("You have been logged out");
    setAuth(false);
    Cookies.remove('auth');
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="submit" onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Dashboard;
