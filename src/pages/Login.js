import React, { useState } from "react";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

import logo from "../assets/to-do-login.svg";
import "./forms.css";

import { Link } from "react-router-dom";

import { URL } from "../url";
import axios from "axios";

function Login(props) {
  const [state, setstate] = useState({
    username: "",
    password: "",
  });

  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const setStateHelper = (key, val) => {
    let temp = state;
    temp[key] = val;
    setstate(temp);
  };

  const login = () => {
    setloading(true);
    seterror(false);
    axios
      .post(URL + "auth/login/", state)
      .then((res) => {
        props.login(res.data);
        setloading(false);
      })
      .catch((err) => {
        seterror(true);
        setloading(false);
      });
  };

  return (
    <div className="outer">
      <div className="col-10 mx-auto d-flex flex-column my-card">
        {error && (
          <h5 className="error-message">Please enter correct credentials.</h5>
        )}
        <div className="col-12 d-flex flex-row justify-content-center form-logo-wrapper">
          <img className="form-logo" src={logo} alt="logo"></img>
        </div>
        <div className="">
          <FormField
            heading="Username"
            field="text"
            updateState={setStateHelper}
            state="username"
          />
          <FormField
            heading="Password"
            field="password"
            updateState={setStateHelper}
            state="password"
          />
        </div>
        <div className="login-button-wrapper">
          {loading ? (
            <Loader active />
          ) : (
            <button onClick={() => login()} className="login-button">
              SIGN IN
            </button>
          )}
        </div>
        {!loading && (
          <div className="login-button-wrapper" style={{ marginTop: "-5px" }}>
            <Link to="/register">
              <button
                className="login-button"
                style={{ backgroundColor: "#e85b30" }}
              >
                JOIN US IF YOU ARE NEW!
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;