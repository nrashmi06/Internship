import React from 'react'

function Navbar2() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='navbar mb-4'>
        <Container>
          <Navbar.Brand > Navbar </Navbar.Brand>
          <Nav >
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbar2
