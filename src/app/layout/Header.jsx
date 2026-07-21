
import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../shared/assets/css/Header.css";
  import { signOut, getAuth } from "firebase/auth";


function Header() {
  const navigate=useNavigate()


const handleLogout = async () => {
  await signOut(getAuth());
  navigate("/UserLogin", { replace: true });
};

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

            <Button onClick={handleLogout}
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