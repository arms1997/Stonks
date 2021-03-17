const express = require("express");
const router = express.Router();

const getNewsData = require("../dataHelpers/getNewsData");

module.exports = () => {
  router.get("/", (req, res) => {});
};
