import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiFillHome, AiOutlineUnorderedList, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FaUtensils } from 'react-icons/fa';

function Navbar2({ setAuth }) { 
  const navigate = useNavigate();
  
  const handleLogout = () => {
    alert("You have been logged out");
    setAuth(false);
    navigate('/login');
  };

  const iconStyle = { fontSize: '1.5rem', marginRight: '10px' }; // Adjusted margin for icons

  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar mb-4">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="ml-auto">
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
            <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
              <AiOutlineUser style={iconStyle} />
              <span>Profile</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={handleLogout} className="d-flex align-items-center">
              <AiOutlineLogout style={iconStyle} />
              <span>Logout</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar2;
