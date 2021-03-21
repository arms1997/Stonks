import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  Avatar,
  makeStyles,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";

import Form from "./Form";

import PasswordForm from "./PasswordForm";

import "./ProfileSettings.scss";
const useStyles = makeStyles((theme) => ({
  large: {
    width: 100,
    height: 100,
    backgroundColor: "#7ca5ce",
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();
  const [showPasswordForm, setUserPasswordForm] = useState(false);
  const [updateButton, setUpdateButton] = useState("Update Password");

  const { currentUser } = useAuth();

  const handleFormClick = () => {
    if (showPasswordForm) {
      setUpdateButton("Update Password");
    } else {
      setUpdateButton("Update User Account");
    }
    setUserPasswordForm(!showPasswordForm);
  };

  return (
    <main className="profile">
      <header className="profile__header">
        <Avatar src="/broken-image.jpg" className={classes.large} />
        <h1 className="profile__header-username">{currentUser.username}</h1>
      </header>
      <Card className="profile__card">
        <CardContent className="profile__card-border" />
        <CardContent>
          <h2 className="profile__title">Account Settings</h2>
          <p>Update your account information below.</p>
          {showPasswordForm ? <PasswordForm /> : <Form />}
          <Button
            className="profile__box-form-update-button"
            variant="contained"
            color="default"
            type="button"
            onClick={handleFormClick}
          >
            {updateButton}
          </Button>
        </CardContent>
      </Card>
      <footer className="profile__footer">
        <Link to="/mylanding">Go Back To Home Page</Link>
      </footer>
    </main>
  );
}
