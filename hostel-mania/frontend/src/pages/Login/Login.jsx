import React, { useState } from "react";
import { Container } from "react-bootstrap";
import TextInput from "../../components/TextInput/TextInput";
import { useFormik } from "formik";
import loginSchema from "../../schemas/loginSchema";
import { login } from "../../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };

    const response = await login(data);

    if (response.status === 200) {
      // 1. setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      // 2. redirect -> homepage
      navigate("/profile");
    } else if (response.code === "ERR_BAD_REQUEST") {
      //display error message
      setError(response.response.data.message);
    } else {
      // Incase of any other network error
      // display error message
      setError(response.message);
    }
  }; //handleLogin

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
  });
  return (
    <div className="loginWrapper">
      <div className="loginHeader">Log in to your account</div>

      <TextInput
        type="text"
        name="username"
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleLogin}>
          Log In
        </Button>
      </div>
      <span>
        Don't have an account?{" "}
        <button className="createAccount" onClick={() => navigate("/signup")}>
          Register
        </button>
      </span>
      {error != "" ? <p className="errorMessage">{error}</p> : ""}
    </div>
    // loginWrapper
  );
};

export default Login;
