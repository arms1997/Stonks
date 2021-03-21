import React, { useRef, useState } from "react";

import { Card, Container, TextField, CardContent } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";

import { addUserBackend } from "../../../contexts/Auth_Helpers";

import "./Signup.scss";

import CustomButton from "../../CustomButton";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const phoneNumRef = useRef();

  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Oh no, passwords do not match!");
    }
    const userObj = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumRef.current.value,
    };

    setError("");
    setLoading(true);

    const promises = [
      signup(emailRef.current.value, passwordRef.current.value),
      addUserBackend(userObj),
    ];

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <Container maxWidth="sm" className="register">
          <Card className="register__card">
            <CardContent className="register__card-content" />
            <img
              src="./images/stonks.svg"
              className="register__card-image"
              alt="Stonks logo with graph"
            />
            <h2 className="register__card-title">Register</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit} className="register__card-form">
              <TextField
                required
                className="standard-required register__card-form-textfield"
                label="Required"
                helperText="Email"
                type="email"
                inputRef={emailRef}
              />
              <TextField
                required
                className="standard-required register__card-form-textfield"
                label="Required"
                helperText="Username"
                type="text"
                inputRef={usernameRef}
              />
              <TextField
                className="standard-required register__card-form-textfield"
                label="Optional"
                helperText="Phone Number"
                type="tel"
                inputRef={phoneNumRef}
              />
              <TextField
                required
                className="standard-required register__card-form-textfield"
                label="Required"
                helperText="Password"
                type="password"
                inputRef={passwordRef}
              />
              <TextField
                required
                className="standard-required register__card-form-textfield"
                label="Required"
                helperText="Confirm Password"
                type="password"
                inputRef={passwordConfirmRef}
              />
              <CustomButton
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
                className="register__card-form-button"
              >
                Sign Up!
              </CustomButton>
            </form>
          </Card>
          <div className="register__link">Already have an account?</div>
          <Link to="/login">Log in</Link>
        </Container>
      )}
    </>
  );
}
