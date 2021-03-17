import React, { useRef, useState } from 'react';

import { Button, Card, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import { updateUserBackend } from '../contexts/Auth_Helpers';

export default function UpdateProfile() {

  
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const phoneNumRef = useRef();
  
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  console.log("currentuser", currentUser);

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Oh no, passwords do not match!")
    }

    //object to send to backend 
    const userChanges = {};

    //conditionally add to object current users changes to be implemented 
    if (usernameRef.current.value !== currentUser.username) {
      userChanges["username"] = usernameRef.current.value;
    };

    if (phoneNumRef.current.value !== currentUser.user_phone_num) {
      userChanges["phone_number"] = phoneNumRef.current.value;
    };

    const promises = [];

    //add backend changes to promises
    console.log("userChanges", userChanges)
    
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
      userChanges["email"] = emailRef.current.value;
    };
    
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    };

    promises.push(updateUserBackend(currentUser.user_id, userChanges));
    
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
          <div>
              <label for="username">Username</label>
              <input name="username" type="text" ref={usernameRef} defaultValue={currentUser && currentUser.username}/>
            </div>
            <div>
              <label for="email">Email</label>
              <input name="email" type="email" ref={emailRef} defaultValue={currentUser && currentUser.email} />
            </div>
            <div>
              <label for="phone-number">Phone Number</label>
              <input name="phone-number" type="tel" ref={phoneNumRef} defaultValue={currentUser && currentUser.user_phone_num}/>
            </div>
            <div>
              <label for="password">Password</label>
              <input name="password" type="password" ref={passwordRef} placeholder="********"/>
            </div>
            <div>
              <label for="email">Password Confirmation</label>
              <input name="email" type="password" ref={passwordConfirmRef} placeholder="*********"/>
            </div>
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
