
import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../shared/assets/css/Header.css";
  import { signOut, getAuth } from "firebase/auth";
import { useFireBase } from "../../shared/context/FireBaseContext";


function Header() {
  const navigate=useNavigate()
  const {user}=useFireBase();
  // console.log('ooooooooooooooooo',user?.UserImpl)
  console.log(user.displayName);


const handleLogout = async () => {
  await signOut(getAuth());
  navigate("/UserLogin", { replace: true });
};

  return (
    <Navbar expand="lg" className="custom-navbar shadow">
  <Container fluid>
    <Navbar.Brand as={Link} to="/" className="logo">
      📚 Bookify
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbar-nav" />

    <Navbar.Collapse id="navbar-nav">
      {/* Left menu */}
      <Nav className="me-auto">
        {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
        <Nav.Link as={Link} to="/create-book-list">Book Listing</Nav.Link>
        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
      </Nav>
      <Nav className="align-items-end">
        <Button
          variant="light"
          className="logout-btn"
          onClick={handleLogout}
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