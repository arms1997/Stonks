import React from 'react';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';

import "./App.css";
import { Container } from '@material-ui/core';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Container >
          <Router>
            <Switch>
              <Route exact path='/'component={Dashboard}/>
              <Route path='/me' component={Dashboard}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={Login}/>
            </Switch>
          </Router>
        </Container>
      </div>
    </ AuthProvider>
  );
}

export default App;
