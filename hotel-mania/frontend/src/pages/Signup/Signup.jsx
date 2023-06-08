import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { signup } from "../../api/auth";
import TextInput from "../../components/TextInput/TextInput";
import signupSchema from "../../schemas/signupSchema";
import Button from "react-bootstrap/Button";

import "./Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
    };

    const response = await signup(data);

    console.log(response);

    if (response.status === 201) {
      //setUser
      const user = {
        _id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: response.data.auth,
      };
      dispatch(setUser(user));

      //redirect to Profile Page
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    } else {
      // display error message
      setError(response.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signupSchema,
  });

  return (
    <div className="signupWrapper">
      <div className="signupHeader">Create an account</div>

      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <TextInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        s={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleSignup}>
          Sign Up
        </Button>
      </div>

      {error !== "" ? <p className="errorMessage">{error}</p> : ""}
    </div>
    // signupWrapper
  );
};

export default Signup;
