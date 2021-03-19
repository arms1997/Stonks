import React, { useRef, useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../../contexts/AuthContext";

import "./ProfileSettings.scss";

export default function Form() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const phoneNumRef = useRef();

  const { currentUser, updateUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    //object to send to backend
    const userChanges = {};

    //conditionally add to object current users changes to be implemented
    if (usernameRef.current.value !== currentUser.username) {
      userChanges["username"] = usernameRef.current.value;
    }

    if (phoneNumRef.current.value !== currentUser.user_phone_num) {
      userChanges["user_phone_num"] = phoneNumRef.current.value;
    }

    if (emailRef.current.value !== currentUser.user_email) {
      userChanges["user_email"] = emailRef.current.value;
    }

    setLoading(true);
    setError("");
    setMessage("");

    updateUser(userChanges)
      .then((value) => {
        setMessage("Your account has been updated.");
      })
      .catch((error) => {
        console.log("error", error);
        setError("Failed to update account.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="profile__alert">
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </div>
      <div className="profile__box">
        <form onSubmit={handleSubmit} className="profile__box-form">
          <TextField
            className="profile__box-form-textfield"
            id="outlined-basic"
            variant="outlined"
            label="Username"
            type="text"
            defaultValue={currentUser && currentUser.username}
            inputRef={usernameRef}
          />
          <TextField
            className="profile__box-form-textfield"
            id="outlined-basic"
            variant="outlined"
            label="Email"
            type="email"
            defaultValue={currentUser && currentUser.user_email}
            inputRef={emailRef}
          />
          <TextField
            className="profile__box-form-textfield"
            id="outlined-basic"
            variant="outlined"
            label="Telephone"
            type="tel"
            defaultValue={currentUser && currentUser.user_phone_num}
            inputRef={phoneNumRef}
          />
          <Button
            className="profile__box-form-button"
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
}
