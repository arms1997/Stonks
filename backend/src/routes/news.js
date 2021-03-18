const express = require("express");
const router = express.Router();

const { getAllNews, getCompanyNews } = require("../dataHelpers/getNewsData");

module.exports = () => {
  //Get All news
  router.get("/", (req, res) => {
    getAllNews()
      .then((news) => {
        news = news["articles"].filter((article) => article.content);

        news = news.map((article) => {
          return {
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            author: article.author,
            source: article.source.name,
            url: article.url,
            publishedAt: article.publishedAt,
          };
        });

        res.send(news);
      })
      .catch((err) => res.status(500).send({ err: err.message }));
  });

  router.get("/company", (req, res) => {
    const { company, symbol } = req.query;
    getCompanyNews(company, symbol)
      .then((news) => {
        news = news["articles"].filter((article) => article.content);

        news = news.map((article) => {
          return {
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            author: article.author,
            source: article.source.name,
            url: article.url,
            publishedAt: article.publishedAt,
          };
        });

        res.send(news);
      })
      .catch((err) => res.status(500).send({ err: err.message }));
  });

  return router;
};
