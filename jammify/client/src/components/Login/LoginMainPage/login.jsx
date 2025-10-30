import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Video from "./video/videoplayback.mp4";
import "./login.css";

import { updateLoginForm, login, checkSession } from "../../../actions/user";

class Login extends React.Component {
  render() {
    const { app } = this.props;
    return app.state.currentUser ? (
      <Redirect to={{ pathname: "/main", state: { from: "/login" } }} />
    ) : (
      <div class="login-container">
          <video autoPlay loop muted class="video">
            <source src={Video} type="video/mp4" />
          </video>
          <div class="MainDiv">
            <h1>Login</h1>
          <form class="login">
              <p>Username</p>
              <input
                type="text"
                name="username"
                placeholder="User"
                onChange={(e) => updateLoginForm(this, e.target)}
              ></input>
            <div>
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="******"
                onChange={(e) => updateLoginForm(this, e.target)}
              ></input>
            </div>
            <button
              type="submit"
              class="SubmitButton"
              onClick={(e) => {
                e.preventDefault();
                login(this, app);
              }}
            >
              Login
            </button>
            <p>
              Don't have an account?&nbsp;&nbsp;
              <Link to="/signup" class="Link">
                Sign Up
              </Link>
            </p>
          </form>
       </div>
      </div>
    );
  }
}
export default Login;