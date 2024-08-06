import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import { getLocalStorageItem } from './LocalStorage';

function Dashboard({ setAuth }) {
  const [showAlert, setShowAlert] = useState(true);
  const userProfile = (getLocalStorageItem('userProfile')) || {};
  console.log('userProfile:', userProfile);
  const auth = getLocalStorageItem('auth');
  console.log('auth:', auth);

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

      {/* <Button className='w-100' variant="primary" size="lg" onClick={handleLogout}>
        Logout
      </Button> */}
    </>
  );
}

export default Dashboard;
