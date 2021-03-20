import React, { useState } from "react";
import { Card, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <img src="./images/stonks.svg" alt="logo" />
    </>
  );
}
