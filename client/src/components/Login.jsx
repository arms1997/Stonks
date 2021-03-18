import React, { useRef, useState } from "react";

import { Button, Card, Container, TextField } from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";

import "./Login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Incorrect credentials, please try again.");
    }

    setLoading(false);
  }

  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <Container maxWidth="sm" className="login">
          <Card>
            <img
              src="./images/stonks.svg"
              className="login__image"
              alt="Stonks logo with graph"
            />
            <h2>Log In</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit} className="login__form">
              <TextField
                required
                className="standard-required login__form-textfield"
                label="Required"
                helperText="Email"
                type="email"
                inputRef={emailRef}
              />
              <TextField
                required
                className="standard-required login__form-textfield"
                label="Required"
                helperText="Password"
                type="password"
                inputRef={passwordRef}
              />
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
                className="login__form-button"
              >
                Log in!
              </Button>
            </form>
            <div className="login__forgotpassword">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Card>
          <div className="login__link">
            Need an account?
            <Link to="/signup">Sign up!</Link>
          </div>
        </Container>
      )}
    </>
  );
}
