


import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Nav.css';
function Navs() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="a">SEEN</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#a">Accueil</Nav.Link>
           
            <Nav.Link to ="/Connexion" href="#a">Se Connecter</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default Navs;