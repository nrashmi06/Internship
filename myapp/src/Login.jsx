import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setRefreshToken } from './features/token/tokenSlice'; // Adjust import path as needed
import { API_BASE_URL, API_ENDPOINTS } from './apiConfig';
import { setFavorites } from './features/favorites/favoritesSlice'; 
import { getProfile } from './Api'; 
import store from './store'; 
import {setLocalStorageItem} from './LocalStorage';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Login attempt with email:', email);

      // Perform login request using API_ENDPOINTS.LOGIN
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      const { accessToken, refreshToken } = data;

      // Store access token in local storage
      localStorage.setItem('accessToken', accessToken);

      // Dispatch action to update Redux store with refresh token
      dispatch(setRefreshToken(refreshToken));
      try {
        const profileData = await getProfile(); 
        console.log('Profile data:', profileData);
        setLocalStorageItem('userProfile', JSON.stringify(profileData)); // Store profile data in local storage
        dispatch(setFavorites(profileData.favorites)); // Dispatch favorites to Redux

        // Log the updated state to the console
        
        console.log('Updated Redux state:', store.getState().favorites);
          
      } catch (profileError) {
        console.error('Error fetching profile data:', profileError);
      }

      setAuth(true); 
      navigate('/dashboard'); 
    } catch (loginError) {
      console.error('Login error:', loginError);
      setError('Invalid email or password'); 
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin} className="align-items-center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

        {error && <p className="text-danger">{error}</p>}
      </Form>
    </div>
  );
};

export default Login;
