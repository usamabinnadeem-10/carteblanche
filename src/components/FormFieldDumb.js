import React from "react";

import "./formfield.css";

function FormFieldDumb({ heading }) {
  return (
    <div className="d-flex flex-column" style={{ margin: "10px 0px" }}>
      <h4 className="field-heading">{heading}</h4>
    </div>
  );
}

export default FormFieldDumb;
