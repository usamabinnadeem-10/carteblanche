import React, { useState } from "react";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import logo from "../assets/to-do-login.svg";
import "./forms.css";
import { Link } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import { motion } from "framer-motion";
import { scaleAndOpacity, buttonHover, buttonTap } from "../animations";

function Login(props) {
  const [state, setstate] = useState({
    username: "",
    password: "",
  });

  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  // helper function to set state changed by FormField component
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
        props.login(res.data); // sending the login details back to App.js (parent)
        setloading(false);
      })
      .catch((err) => {
        seterror(true);
        setloading(false);
      });
  };

  return (
    <div className="outer">
      <motion.div
        initial={scaleAndOpacity.initial}
        animate={scaleAndOpacity.animate}
        transition={scaleAndOpacity.transition}
        className="col-10 mx-auto d-flex flex-column my-card"
      >
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
            <motion.button
              whileHover={buttonHover.hover}
              transition={buttonHover.transition}
              whileTap={buttonTap.tap}
              onClick={() => login()}
              className="login-button"
            >
              SIGN IN
            </motion.button>
          )}
        </div>
        {!loading && (
          <div className="login-button-wrapper" style={{ marginTop: "-5px" }}>
            <Link to="/register">
              <motion.button
                whileHover={buttonHover.hover}
                transition={buttonHover.transition}
                className="login-button"
                style={{ backgroundColor: "#e85b30" }}
              >
                JOIN US IF YOU ARE NEW!
              </motion.button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Login;
