import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../api/internal";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
// import Button from "react-bootstrap/Button";

import "./MenuBar.css";

function MenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.auth);
  const username = useSelector((state) => state.user.username);

  const handleAddHostelButton = () => {
    navigate("/add-hotel");
  };

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>HotelMania</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth && (
              <NavLink className="nav-link">
                Welcome {username.toUpperCase()}
              </NavLink>
            )}

            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <button className="add-hostel" onClick={handleAddHostelButton}>
              <span style={{ fontSize: "20px" }}>+</span> Add Hostel
            </button>
          </Nav>

          <Nav>
            {!isAuth && (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}

            {isAuth && (
              <>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>

                <Nav.Link as={NavLink} to="#" onClick={handleSignout}>
                  Logout
                </Nav.Link>

                {/* <NavLink className="nav-link" onClick={handleSignout}>
                  Logout
                </NavLink> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
