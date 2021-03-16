import React from 'react';
import { Container } from '@material-ui/core';
import { AuthProvider } from "../contexts/AuthContext";

import Signup from './Signup';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Container maxWidth="sm" >
          <Signup />
        </Container>
      </div>
    </ AuthProvider>
  );
}

export default App;
