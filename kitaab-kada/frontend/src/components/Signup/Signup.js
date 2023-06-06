import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// CSS

import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({ data: {} });

  const handleSubmit = async (e) => {
    console.log(name, email, password);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      // localStorage.setItem("token", response.data.token);
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Oh No Error!!!");
      console.log(error);
      setIsError(true);
      setResponse(error.response);
    }
  };

  return (
    <div className="signup-form-box">
      {isError &&
        (response.data.success === false ? (
          <p style={{ color: "red" }}>{response.data.message}</p>
        ) : (
          ""
        ))}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

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

export default Signup;
