import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import UpdateProfile from "./ProfileSettings/UpdateProfile";
import Login from "./Login";
import Landing from "./Landing";
import ForgotPassword from "./ForgotPassword";
import Graph from "./Graph/index";
import NewsList from "./News/NewsList";
import PrivateRoute from "./PrivateRoute";

import "./App.css";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";

function App() {
  const [stock, setStock] = useState({
    symbol: "",
    company: "",
  });

  return (
    <AuthProvider>
      <div className="App">
        <Container>
          <Router>
            <Navbar setStock={setStock} />
            <Switch>
              <PrivateRoute exact path="/" component={Landing} />
              <PrivateRoute path="/me" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/graph">
                <Graph company={stock.company} symbol={stock.symbol} />
              </Route>
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
