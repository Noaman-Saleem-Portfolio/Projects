import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

import "./MenuBar.css";

function MenuBar() {
  const isAuth = useSelector((state) => state.user.auth);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Auth APP Demo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </Nav>
          <Nav>
            {!isAuth && (
              <>
                <Nav.Link to="/login" as={NavLink}>
                  Login
                </Nav.Link>

                <Nav.Link to="/signup" as={NavLink}>
                  Signup
                </Nav.Link>
              </>
            )}

            {isAuth && (
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
