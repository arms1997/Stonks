import React from 'react';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signup from './Signup';
import UpdateProfile from './UpdateProfile';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';

import "./App.css";
import { Container } from '@material-ui/core';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Container >
          <Router>
            <Switch>
              <Route exact path='/'component={UpdateProfile}/>
              <Route path='/me' component={UpdateProfile}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={Login}/>
              <Route path='/forgot-password' component={ForgotPassword}/>
            </Switch>
          </Router>
        </Container>
      </div>
    </ AuthProvider>
  );
}

export default App;
