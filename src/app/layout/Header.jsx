// import React from 'react'
// import { Container, Nav, Navbar } from 'react-bootstrap'

// function Header() {
//   return (
    
//        <Navbar bg="dark" data-bs-theme="dark">

//           <Navbar.Brand href="/">Bookify</Navbar.Brand>
//           <Nav className="me-auto text-white">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/create-book-list">Book Listing</Nav.Link>
//             <Nav.Link href="/logout">Logout</Nav.Link>
//             <Nav.Link href="#pricing">Orders</Nav.Link>
//           </Nav>
//       </Navbar>
    
//   )
// }

// export default Header

import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../shared/assets/css/Header.css";

function Header() {
  return (
    <Navbar expand="lg" className="custom-navbar shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          📚 Bookify
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/create-book-list">
              Book Listing
            </Nav.Link>

            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>

            <Button
              as={Link}
              to="/logout"
              variant="light"
              className="logout-btn ms-lg-3 jistify-content-end"
            >
              Logout
            </Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;