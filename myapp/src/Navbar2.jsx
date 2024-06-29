import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navbar2({ setAuth }) { // Destructure the setAuth prop
  const navigate = useNavigate();
  
  const handleLogout = () => {
    alert("You have been logged out");
    setAuth(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar mb-4">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar2;
