import React from "react";
import "./TextInput.css";

const TextInput = (props) => {
  return (
    <div className="textInputWrapper">
      <input {...props} />
      {props.error && <p className="errorMessage">{props.errormessage}</p>}
    </div>
  );
};

export default TextInput;
