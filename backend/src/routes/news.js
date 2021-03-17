const express = require("express");
const router = express.Router();

const { getAllNews, getCompanyNews } = require("../dataHelpers/getNewsData");

module.exports = () => {
  //Get All news
  router.get("/", (req, res) => {
    getAllNews()
      .then((news) => res.send(news))
      .catch((err) => res.status(500).send({ err: err.message }));
  });

  router.get("/company", (req, res) => {
    const { company, symbol } = req.query;

    getCompanyNews(company, symbol)
      .then((news) => res.send(news))
      .catch((err) => res.status(500).send({ err: err.message }));
  });

  return router;
};
