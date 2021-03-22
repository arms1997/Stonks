import React from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { Button } from "@material-ui/core";

import CustomButton from "../CustomButton";

import "./Landing.scss";

export default function Landing() {
  const { currentUser } = useAuth();
  const history = useHistory();

  if (currentUser) {
    history.push("/mylanding");
  }

  //fade in animation for logo with buttons, this defines the spring and you pass it to the animated.div
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleSignUpClick = () => {
    history.push("/signup");
  };

  const handleLearnMoreClick = () => {
    history.push("/about");
  };

  return (
    <main className="landing">
      <section className="landing__logoWithButton">
        <animated.div style={props}>
          <img src="./images/stonkslightfont.svg" alt="logo" />
          <div className="landing__logoWithButton-buttons">
            <CustomButton
              className="landing__logoWithButton-buttons-login"
              onClick={handleLoginClick}
            >
              Log In
            </CustomButton>
            <CustomButton
              className="landing__logoWithButton-buttons-signup"
              onClick={handleSignUpClick}
            >
              Sign Up
            </CustomButton>
          </div>
          <Button className="landing__link" onClick={handleLearnMoreClick}>
            Learn More Here
          </Button>
        </animated.div>
      </section>
    </main>
  );
}
