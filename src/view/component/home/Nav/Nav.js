


import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Nav.css';
function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="a">SEEN</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#a">Home</Nav.Link>
            <Nav.Link href="#a">Log in</Nav.Link>
            <Nav.Link href="#a">log up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default ColorSchemesExample;