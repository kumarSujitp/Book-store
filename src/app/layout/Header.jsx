import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function Header() {
  return (
    
       <Navbar bg="dark" data-bs-theme="dark">
        {/* <Container> */}
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto text-white">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Book Listing</Nav.Link>
            <Nav.Link href="#pricing">Logout</Nav.Link>
            <Nav.Link href="#pricing">Orders</Nav.Link>
          </Nav>
        {/* </Container> */}
      </Navbar>
    
  )
}

export default Header
