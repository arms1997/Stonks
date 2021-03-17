import React, { useRef, useState } from 'react';

import { Button, Card, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import { addUserBackend } from '../contexts/Auth_Helpers';

export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const phoneNumRef = useRef();
  
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Oh no, passwords do not match!")
    }
    const userObj = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumRef.current.value
    };

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/");
      
    } catch {
      setError("Oh no no noooo....Failed to create an account");
    }
    
    //add user to backend
    try {
      await addUserBackend(userObj)
      history.push("/");
    } catch {
      setError("Oh no no noooo....Failed to create an account on db");
    }
    setLoading(false);
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <h2>Sign Up</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div>
              <label for="email">Email</label>
              <input name="email" type="email" ref={emailRef} required/>
            </div>
            <div>
              <label for="username">Username</label>
              <input name="username" type="text" ref={usernameRef} required/>
            </div>
            <div>
              <label for="phone-number">Phone Number (optional)</label>
              <input name="phone-number" type="tel" ref={phoneNumRef} />
            </div>
            <div>
              <label for="password">Password</label>
              <input name="password" type="password" ref={passwordRef} required/>
            </div>
            <div>
              <label for="email">Password Confirmation</label>
              <input name="email" type="password" ref={passwordConfirmRef} required/>
            </div>
            <Button disabled={loading} variant="contained" color="primary" type="submit">Sign Up!</Button>
          </form>
        </Card> 
        <div>
          Already have an account?
          <Link to="/login">Log in</Link>
        </div>
      </Container>
    </>
  )
}
