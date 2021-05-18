import React, { useState } from "react";
import FormField from "../components/FormField";
import { Link, useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import logo from "../assets/to-do-login.svg";
import "./forms.css";
import { URL } from "../url";
import axios from "axios";
import { motion } from "framer-motion";
import { scaleAndOpacity, buttonHover } from "../animations";

function Register({ login }) {
  let history = useHistory();

  const [state, setstate] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  // helper function to set state changed by FormField component
  const setStateHelper = (key, val) => {
    let temp = state;
    temp[key] = val;
    setstate(temp);
  };

  const register = () => {
    setloading(true);
    seterror(false);
    axios
      .post(URL + "auth/register/", state)
      .then((res) => {
        // log the user in automatically once he/she is registered
        axios
          .post(URL + "auth/login/", {
            username: state.username,
            password: state.password,
          })
          .then((res) => {
            login(res.data); // logging user in App.js (parent)
            setloading(false);
            history.replace("/home"); // navigate to home now and show the home page
          })
          .catch((err) => {
            seterror(true);
            setloading(false);
          });
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
            heading="Email"
            field="text"
            updateState={setStateHelper}
            state="email"
          />
          <FormField
            heading="Password"
            field="password"
            updateState={setStateHelper}
            state="password"
          />
          <FormField
            heading="Confirm Password"
            field="password"
            updateState={setStateHelper}
            state="password2"
          />
        </div>
        <div className="login-button-wrapper">
          {loading ? (
            <Loader active />
          ) : (
            <motion.button
              whileHover={buttonHover.hover}
              transition={buttonHover.transition}
              onClick={() => register()}
              className="login-button"
            >
              REGISTER
            </motion.button>
          )}
        </div>
        <div className="login-button-wrapper" style={{ marginTop: "-5px" }}>
          <Link to="/login">
            <motion.button
              whileHover={buttonHover.hover}
              transition={buttonHover.transition}
              className="login-button"
              style={{ backgroundColor: "#e85b30" }}
            >
              LOGIN INSTEAD!
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
