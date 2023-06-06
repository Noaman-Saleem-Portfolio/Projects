import axios from "axios";
import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   console.log(email);
  //   console.log(password);

  //cookies

  const handleLogin = async (e) => {
    try {
      // console.log("Clicked");
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });
      console.log(response);
      const { data } = response;

      //Setting accessToken in Local Storage
      localStorage.setItem("accessToken", data.token);
    } catch (error) {
      console.log("Oh No Error!!!!!!");
      console.log(error);
    }

    // axios
    //   .post("http://localhost:4000/api/v1/login")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <>
      <Container className="centered">
        <Row>
          <Col className="mx-auto" lg="4" md="8">
            <Form action="" className="form" method="">
              <Card className="card-login">
                <Card.Header className="text-center">
                  <div className="logo-holder d-inline-block align-top">
                    <h1>Login</h1>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Body>
                    <Form.Group>
                      <label>
                        Email address <span className="text-danger">*</span>
                      </label>
                      <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                        placeholder="Enter Email"
                        type="text"
                        name="email"
                      />
                    </Form.Group>
                    <Form.Group>
                      <label>
                        Password <span className="text-danger">*</span>
                      </label>
                      <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        defaultValue={password}
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card.Body>
                <Card.Footer className="ml-auto mr-auto">
                  <Button
                    onClick={(e) => handleLogin(e)}
                    className="btn-filled"
                    type="button">
                    Login
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
