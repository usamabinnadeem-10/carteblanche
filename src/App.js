import "./App.css";

import React, { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // checking if the user is already logged in
  useEffect(() => {
    // if current time is more than expiry time then just log the user out
    if (new Date() > new Date(Date.parse(localStorage.getItem("expiry")))) {
      logoutHelper();
    } else {
      // calculating the time after which user would be logged out
      var dt = new Date();
      var exp = new Date(Date.parse(localStorage.getItem("expiry")));
      let duration = exp.getTime() - dt.getTime();

      if (duration > 0) {
        setisLoggedIn(true);
      }

      setTimeout(() => {
        logoutHelper();
      }, duration);
    }
  }, []);

  const loginHelper = (credentials) => {
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    localStorage.setItem("expiry", tomorrow);
    localStorage.setItem("user", JSON.stringify(credentials));

    setisLoggedIn(true);
  };

  const logoutHelper = () => {
    setisLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
  };

  return (
    <div className="root">
      <Router>
        {!isLoggedIn ? (
          <Switch>
            <Route exact path="/login">
              <Login login={loginHelper} />
            </Route>

            <Route exact path="/register">
              <Register login={loginHelper} />
            </Route>

            <Redirect to="/login" />
          </Switch>
        ) : (
          <Redirect to="/home" />
        )}

        <Switch>
          {isLoggedIn && (
            <Route exact path="/home">
              <Home logout={logoutHelper} />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
