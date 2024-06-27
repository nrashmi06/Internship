import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
  };

  useEffect(() => {
    if (!submitted) return;

    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (!validatePhone(mobile)) {
      validationErrors.mobile = 'Invalid phone number';
    }
    if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 8 characters long, contain a number and an uppercase letter';
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    if (!name) {
      validationErrors.name = 'Name is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Signup successful');
      navigate('/');
    }
  }, [email, mobile, password, confirmPassword, name, submitted, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="Enter mobile number" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
