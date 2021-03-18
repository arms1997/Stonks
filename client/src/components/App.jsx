import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from './Signup';
import UpdateProfile from './ProfileSettings/UpdateProfile';
import Login from './Login';
import Landing from './Landing';
import ForgotPassword from './ForgotPassword';
import Graph from './Graph/index';
import NewsList from './News/NewsList';
import PrivateRoute from './PrivateRoute';

import "./App.css";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Container>
          <Router>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={Landing} />
              <PrivateRoute path="/me" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/graph">
                <Graph company="tsla" symbol="tsla" />
              </Route>
              <Route path='/login' component={Login}/>
              <Route path='/newslist'>
                <NewsList company="tesla" symbol="tsla"/>
              </Route>
              <Route path='/forgot-password' component={ForgotPassword}/>
            </Switch>
          </Router>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
