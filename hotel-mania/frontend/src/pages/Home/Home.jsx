import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <div>Home</div>
      <NavLink to="/hotels/search">Search Hotels</NavLink>
    </Container>
  );
};

export default Home;
