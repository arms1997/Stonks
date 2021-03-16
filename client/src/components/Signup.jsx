import React, { useRef } from 'react'

import { Button, Card } from '@material-ui/core';

export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();


  return (
    <>
      <Card>
        <h2>Sign Up</h2>
        <form>
          <label for="email">Email</label>
          <input name="email" type="email" ref={emailRef} />
          <label for="password">Password</label>
          <input name="password" type="password" ref={passwordRef} />
          <label for="email">Password Confirmation</label>
          <input name="email" type="password" ref={passwordConfirmRef} />
          <Button variant="contained" color="primary" type="submit">Sign Up!</Button>
        </form>
      </Card> 
      <div>Already have an account? Login</div>
    </>
  )
}
