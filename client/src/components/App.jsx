import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./UserAuth/SignUp/Signup";
import UpdateProfile from "./ProfileSettings/UpdateProfile";
import Login from "./UserAuth/Login/Login";
import Landing from "./Landing/Landing";
import ForgotPassword from "./UserAuth/ForgotPassword/ForgotPassword";
import About from "./Landing/About";
import PrivateRoute from "./PrivateRoute";

import "./App.css";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";
import Ticker from "./Ticker";
import UserLanding from "../components/UserLanding/UserLanding";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Container className="App__container">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/learnmore" component={About} />
              <PrivateRoute path="/mylanding" component={UserLanding} />
              <PrivateRoute path="/me" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/ticker/:symbol/:company" component={Ticker} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </Router>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
