import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" id="header">
        <Container>
          <Link to="/" className="custom-link">
            <Navbar.Brand className="font-bold">ClassRoom</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/register" className=" nav-link custom-link">
                <i className="fas fa-user-plus"></i> Register
              </Link>
              <Link to="/login" className=" nav-link custom-link">
                <i className="fas fa-user"></i> Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
