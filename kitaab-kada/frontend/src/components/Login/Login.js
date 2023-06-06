import axios from "axios";
import React, { useState } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

// CSS
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    console.log(email, password);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });
      console.log(response.data);
      navigate("/search");
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  return (
    <div className="login-form-box">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
