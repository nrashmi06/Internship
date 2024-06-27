import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Dashboard({ setAuth }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);

  const handleLogout = () => {
    alert("You have been logged out");
    setAuth(false);
    Cookies.remove('auth');
    navigate('/login');
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success">
          <Alert.Heading>This is the dashboard</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert(false)} variant="outline-success">
              Close me
            </Button>
          </div>
        </Alert>
      )}

      <h1>Dashboard</h1>
      <Button variant="primary" size="lg" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
