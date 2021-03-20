import React, { useRef, useState } from "react";

import { Card, Container, TextField, CardContent } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";

import CustomButton from "../../CustomButton";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Container maxWidth="sm" className="forgotPass">
        <Card className="forgotPass__card">
          <CardContent className="forgotPass__card-border" />
          <img
            src="./images/stonks.svg"
            className="forgotPass__card-image"
            alt="Stonks logo with graph"
          />
          <h2 className="forgotPass__card-title">Password Reset</h2>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={handleSubmit} className="forgotPass__card-form">
            <TextField
              required
              className="standard-required forgotPass__card-form-textfield"
              label="Required"
              helperText="Email"
              type="email"
              inputRef={emailRef}
            />
            <CustomButton
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
              className="forgotPass_card-form-button"
            >
              Reset password
            </CustomButton>
          </form>
          <div className="forgotPass__link">
            <Link to="/login">Log In</Link>
          </div>
        </Card>
        <div className="forgotPass__link">Need an account?</div>
        <Link to="/signup">Sign up!</Link>
      </Container>
    </>
  );
}
