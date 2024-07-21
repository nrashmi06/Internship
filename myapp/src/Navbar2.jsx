import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiFillHome, AiOutlineUnorderedList, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FaUtensils, FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import './Navbar2.css';

function Navbar2({ setAuth }) { 
  const navigate = useNavigate();
  
  const handleLogout = () => {
    alert("You have been logged out");
    setAuth(false);
    navigate('/login');
  };

  const iconStyle = { fontSize: '1.5rem', marginRight: '10px' }; // Adjusted margin for icons

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex flex-row">
            <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
              <AiFillHome style={iconStyle} />
              <span>Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/recipies" className="d-flex align-items-center">
              <AiOutlineUnorderedList style={iconStyle} />
              <span>Category</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/meals" className="d-flex align-items-center">
              <FaUtensils style={iconStyle} />
              <span>Meals</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
              <FaShoppingCart style={iconStyle} />
              <span>Cart</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
              <AiOutlineUser style={iconStyle} />
              <span>Profile</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={handleLogout} className="d-flex align-items-center">
              <AiOutlineLogout style={iconStyle} />
              <span>Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
