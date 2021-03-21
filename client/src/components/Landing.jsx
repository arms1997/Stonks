import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";
import CustomButton from "./CustomButton";

import "./Landing.scss";

export default function Landing() {
  const history = useHistory();
  //fade in animation for logo with buttons
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleSignUpClick = () => {
    history.push("/signup");
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
              {" "}
              Log In
            </CustomButton>
            <CustomButton
              className="landing__buttons-signup"
              onClick={handleSignUpClick}
            >
              {" "}
              Sign Up
            </CustomButton>
          </div>
        </animated.div>
        <p>Scroll down to learn more...</p>
      </section>
      <section className="landing__description">
        <article className="landing__description-top">
          <p>What is Stonks?</p>
          <p></p>
        </article>
        <article>graph here</article>
      </section>
    </main>
  );
}
