const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {});

  router.get("/:ticker_name", (req, res) => {});

  return router;
};
