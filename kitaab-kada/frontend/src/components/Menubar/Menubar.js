import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// CSS
import "./menubar.css";

const Menubar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="menubar" fixed="top">
      <Container>
        <Link to={"/"} className="navbar-brand">
          Kitaab Kada
        </Link>
        {/* <Navbar.Brand href="#home">Kitaab Kada</Navbar.Brand> */}
        {/* RIGHT NAVBAR */}
        {/* <Nav className="me-auto my-2 my-lg-0">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          <Link to={"#"} className="nav-link">
            About US
          </Link>
          <Link to={"#"} className="nav-link">
            About US
          </Link>
        </Nav> */}

        {/* LEFT NAVBAR */}
        <Nav className=" ml-auto">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          {/* <Nav.Link href="#home">Home</Nav.Link> */}
          <Link to={"#"} className="nav-link">
            About US
          </Link>
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          <Link to={"/signup"} className="nav-link">
            Sign Up
          </Link>
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menubar;
