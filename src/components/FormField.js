import React from "react";

import "./formfield.css";

function FormField({ heading, field, state, updateState }) {
  return (
    <div className="d-flex flex-column field-wrapper">
      <h4 className="field-heading">{heading}</h4>
      <div className="field-input-wrapper">
        <input
          onChange={(e) => updateState(state, e.target.value)}
          className="field-input"
          placeholder={heading}
          type={field}
        ></input>
      </div>
    </div>
  );
}

export default FormField;
