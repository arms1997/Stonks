const express = require("express");
const router = express.Router();

const { getAllNews, getCompanyNews } = require("../dataHelpers/getNewsData");

module.exports = () => {
  router.get("/", (req, res) => {
    getAllNews.then((news) => {
      console.log(news);
    });
  });
};
