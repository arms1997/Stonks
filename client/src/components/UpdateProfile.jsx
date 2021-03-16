import React, { useRef, useState } from 'react';

import { Button, Card, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Oh no, passwords do not match!")
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    };

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    };

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError("Failed to update account.")
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <h2>Update Profile</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <input name="email" type="email" ref={emailRef} defaultValue={currentUser && currentUser.email} />
            <label for="password">Password</label>
            <input name="password" type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
            <label for="email">Password Confirmation</label>
            <input name="email" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
            <Button disabled={loading} variant="contained" color="primary" type="submit">Update!</Button>
          </form>
        </Card> 
        <div>
          <Link to="/">Cancel</Link>
        </div>
      </Container>
    </>
  )
}
