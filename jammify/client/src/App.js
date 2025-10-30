import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

import Login from "./components/Login/LoginMainPage/login";
import Signup from "./components/Login/SignupPage/signup";
import Profile from "./components/Profile/ProfileMainPage/profile";
import ProfilePopup from "./components/Popup/ProfilePopup";
import MainSearch from "./components/Search/SearchMainPage/MainSearch";
import TestCSS from "./testcss";
// this is how my page is called
import MainPage from "./components/Main_page_view";
import { checkSession } from "./actions/user";
import PrivateRoute from "./components/PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    checkSession(this); // sees if a user is logged in.
  }

  // global state passed down includes the current logged in user.
  state = {
    currentUser: null,
  };

  render() {
    const { currentUser } = this.state;
    document.documentElement.style.setProperty("--main-color", "#262253");
    console.log("app.js", currentUser);

    return (
      <div className="App">
        <Router>
          <Switch>
            
            {/*       
            <PrivateRoute
              user={currentUser}
              exact
              path="/main"
              component={MainPage}
              app={this}
            /> */}
            <Route path="/login">
              <Login app={this} />
            </Route>
            <Route path="/signup">
              <Signup app={this} />
            </Route>
            <Route
              exact
              path="/main"
              render={(props) => {
                console.log("provate", currentUser);
                return currentUser ? (
                  <MainPage app={this} {...props} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                  />
                );
              }}
            />
            <Route path="/myProfile">
              <Profile app={this} />
            </Route>
            <Redirect from="*" to="/main" />

            {/* 404 if URL isn't expected. */}
            <Route render={() => <div>404 Not found</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
