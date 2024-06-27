import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
import './App.css';
import Navbar from './Navbar1';

function App() {
  const [auth, setAuth] = React.useState(() => {
  const AuthCookie = localStorage.getItem("auth");
  if (AuthCookie === undefined || AuthCookie === null) {
      localStorage.setItem("auth", "false");
      return false;
    }
    return AuthCookie === "true" ? true : false;
  });

  useEffect(() => {
    Cookies.set('auth', JSON.stringify(auth), { expires: 1 }); 
    localStorage.setItem('auth', auth.toString()); 
  }, [auth]);

  return (
    <>
      
      < Navbar />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={auth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
