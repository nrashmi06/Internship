import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';

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
    <>
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

      <Accordion defaultActiveKey="0" flush className='mb-4'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            This is the dashboard
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button className='w-100' variant="primary" size="lg" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}

export default Dashboard;
