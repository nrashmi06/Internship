import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setLocalStorageItem } from './LocalStorage'; // Adjust the import path as necessary

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Login attempt with email:', email);
      const response = await fetch('/api/users/login', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in request body
      });
      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      const token = data.token;
      setLocalStorageItem('token', token); // Store token in local storage

      setAuth(true); // Update authentication state

      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password'); // Display error message
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
