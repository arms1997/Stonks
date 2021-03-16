import React, { useRef, useState } from 'react';

import { Button, Card, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';



export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  async function handleSubmit(e) {
    e.preventDefault()

    try {;
      setError("")
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Oh no no noooo....Failed to log in!");
    }

    setLoading(false);
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <h2>Log In</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <input name="email" type="email" ref={emailRef} />
            <label for="password">Password</label>
            <input name="password" type="password" ref={passwordRef} />
            <Button disabled={loading} variant="contained" color="primary" type="submit">Log in!</Button>
          </form>
        </Card> 
        <div> 
          Need an account?
          <Link to="/signup">Sign up!</Link>
        </div>
      </Container>
    </>
  )
}
