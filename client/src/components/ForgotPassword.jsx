import React, { useRef, useState } from 'react';

import { Button, Card, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false)
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <h2>Password Reset</h2>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <input name="email" type="email" ref={emailRef} />
            <Button disabled={loading} variant="contained" color="primary" type="submit">Reset password</Button>
          </form>
          <div> 
            <Link to="/login">Log In</Link>
          </div>
        </Card> 
        <div> 
          Need an account?
          <Link to="/signup">Sign up!</Link>
        </div>
      </Container>
    </>
  )
}
