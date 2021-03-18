import React, { useRef, useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import { updateUserBackend } from "../../contexts/Auth_Helpers";

import "./ProfileSettings.scss";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const phoneNumRef = useRef();

  const {
    currentUser,
    setCurrentUser,
    updateEmail,
    updatePassword,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Oh no, passwords do not match!");
    }

    //object to send to backend
    const userChanges = {};

    //conditionally add to object current users changes to be implemented
    if (usernameRef.current.value !== currentUser.username) {
      userChanges["username"] = usernameRef.current.value;
    }

    if (phoneNumRef.current.value !== currentUser.user_phone_num) {
      userChanges["phone_number"] = phoneNumRef.current.value;
    }

    const promises = [];
    setLoading(true);
    setError("");
    setMessage("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
      userChanges["email"] = emailRef.current.value;
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    promises.push(updateUserBackend(currentUser.user_id, userChanges));

    Promise.all(promises)
      .then((value) => {
        setMessage("Your account has been updated.");
      })
      .catch(() => {
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
            defaultValue={currentUser && currentUser.email}
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
          <TextField
            className="profile__box-form-textfield"
            id="outlined-basic"
            variant="outlined"
            label="Password"
            type="password"
            placeholder="Leave blank if no change"
            inputRef={passwordRef}
          />
          <TextField
            className="profile__box-form-textfield"
            id="outlined-basic"
            variant="outlined"
            label="Password Confirmation"
            type="password"
            placeholder="Leave blank if no change"
            inputRef={passwordConfirmRef}
          />
          <Button
            className="profile__box-form-button"
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update!
          </Button>
        </form>
      </div>
    </>
  );
}
