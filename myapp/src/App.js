import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
import './App.css';
import Navbar from './Navbar1';
import Navbar2 from './Navbar2';
import Recipie from './Recipie';  
import Meals from './Meals';
import Profile from './Profile';
import MealDetail from './MealDetail';
import { getLocalStorageItem, setLocalStorageItem } from './LocalStorage'; 


function App() {
  const [auth, setAuth] = React.useState(() => {
    const authLocalStorage = getLocalStorageItem('auth');
    if (authLocalStorage === null) {
      setLocalStorageItem('auth', false); 
      return false;
    }
    return authLocalStorage;
  });

  useEffect(() => {
    setLocalStorageItem('auth', auth); 
    Cookies.set('auth', JSON.stringify(auth), { expires: 1 }); 
  }, [auth]);

  return (
    <>
      {auth ? <Navbar2 setAuth={setAuth} /> : <Navbar />} 
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />} />
        <Route path="/signup" element={auth ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={auth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route path="/recipies" element={auth ? <Recipie /> : <Navigate to="/" />} />
        <Route path="/meals/:category" element={auth ? <Meals /> : <Navigate to="/" />} />
        <Route path="/meals" element={auth ? <Meals /> : <Navigate to="/" />} /> 
        <Route path="/meal/:mealId" element={auth ? <MealDetail /> : <Navigate to="/" />} />
        <Route path="/profile" element={auth ? <Profile /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/"} />} />
      </Routes>
    </>
  );
}

export default App;
