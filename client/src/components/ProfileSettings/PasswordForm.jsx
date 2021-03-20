import React, { useRef, useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../../contexts/AuthContext";
import CustomButton from "../CustomButton";

import "./ProfileSettings.scss";

export default function PasswordForm() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { updateUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handlePasswordSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Oh no, passwords do not match!");
    }

    //object to send to backend
    const userChanges = {};

    //conditionally add to object current users changes to be implemented

    if (passwordRef.current.value) {
      userChanges["password"] = passwordRef.current.value;
    }

    setLoading(true);
    setError("");
    setMessage("");

    updateUser(userChanges)
      .then(() => {
        setMessage("Your password has been updated.");
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
        <form onSubmit={handlePasswordSubmit} className="profile__box-form">
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
          <CustomButton
            className="profile__box-form-button"
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </CustomButton>
        </form>
      </div>
    </>
  );
}
