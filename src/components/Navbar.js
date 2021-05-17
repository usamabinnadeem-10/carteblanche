import React from "react";
import "./nav.css";

import logo from "../assets/to-do.svg";

function Navbar({ logout }) {
  return (
    <div className="w-100 d-flex col-12 justify-content-between align-items-center nav-bar">
      <div className="todo-logo">
        <img src={logo} alt="logo"></img>
      </div>

      <div>
        <h6
          onClick={() => {
            logout();
          }}
          className="signout-text"
          style={{ cursor: "pointer" }}
        >
          Signout
        </h6>
      </div>
    </div>
  );
}

export default Navbar;
