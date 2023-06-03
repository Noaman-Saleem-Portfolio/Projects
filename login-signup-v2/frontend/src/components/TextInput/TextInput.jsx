import React from "react";
import Form from "react-bootstrap/Form";

import "./TextInput.css";

const TextInput = (props) => {
  return (
    <div className="textInputWrapper">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          {/* <Form.Label>{props.name}</Form.Label> */}
          <Form.Control {...props} />
        </Form.Group>
        {/* <input {...props} /> */}
      </Form>
      {props.error && <p className="errorMessage">{props.errormessage}</p>}
    </div>
  );
};

export default TextInput;
