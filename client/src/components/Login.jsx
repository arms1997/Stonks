import React, { useRef, useState } from "react";

import {
  Button,
  Card,
  Container,
  TextField,
  CardContent,
} from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";

import "./Login.scss";

import CustomButton from "./CustomButton";

// const CustomButton = withStyles((theme) => ({
//   root: {
//     color: "white",
//     backgroundColor: "#868c8c",
//     "&:hover": {
//       backgroundColor: "#4c5663",
//     },
//   },
// }))(Button);

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <Redirect to="/mylanding" />
      ) : (
        <Container maxWidth="sm" className="login">
          <Card className="login__card">
            <CardContent className="login__card-border" />
            <img
              src="./images/stonks.svg"
              className="login__image"
              alt="Stonks logo with graph"
            />
            <h2 className="login__title">Log In</h2>
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
              <CustomButton
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
                className="login__form-button"
              >
                Log in!
              </CustomButton>
            </form>
            <div className="login__forgotpassword">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Card>
          <div className="login__link">Need an account?</div>
          <Link to="/signup">Sign up!</Link>
        </Container>
      )}
    </>
  );
}
