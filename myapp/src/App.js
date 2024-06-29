import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
import './App.css';
import Navbar from './Navbar1';
import Navbar2 from './Navbar2';

function App() {
  const [auth, setAuth] = React.useState(() => {
    const AuthCookie = localStorage.getItem("auth");
    if (AuthCookie === undefined || AuthCookie === null) {
      localStorage.setItem("auth", "false");
      return false;
    }
    return AuthCookie === "true";
  });
   console.log('auth 1:', auth);
  useEffect(() => {
    Cookies.set('auth', JSON.stringify(auth), { expires: 1 }); 
    localStorage.setItem('auth', auth.toString());
    console.log('auth:', auth);
  }, [auth]);

  return (
    <>
      {auth ? <Navbar2 setAuth={setAuth}/> : <Navbar />} 
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
