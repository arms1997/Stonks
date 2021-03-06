const express = require("express");
const router = express.Router();
const rp = require("request-promise");
const moment = require("moment");

const { getCompanyNews } = require("../dataHelpers/getNewsData");
const getTickerData = require("../dataHelpers/getTickerData");

const {
  dataParser,
  domainParser,
  getChangeInData,
  getRelevantNews,
  getAreaData,
  getHintData,
} = require("../dataHelpers/dataParser");

module.exports = () => {
  router.get("/", (req, res) => {
    rp.get(
      `https://api.hypercharts.co/v1/companies?apiKey=${process.env.HYPER_API}`
    )
      .then((response) => res.send(response))
      .catch((err) => res.status(500).send({ err: err.message }));
  });

  router.get("/graph", (req, res) => {
    const { symbol, company } = req.query;

    Promise.all([getTickerData(symbol), getCompanyNews(company, symbol)])
      .then(([data, news]) => {
        data = JSON.parse(data);

        if (data["Note"]) {
          console.log("stock api limit reacher");
          res.status(500).send("api limit reached");
          return;
        }

        const { parsedData, timestamps } = dataParser(
          data["Time Series (5min)"]
        );

        const deltaData = getChangeInData(data["Time Series (5min)"]);

        news = news["articles"].filter((article) => article.content);
        news = news.map((article) => {
          return {
            title: article.title,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt,
          };
        });

        const relevantNews = getRelevantNews(news, deltaData);

        const areaData = getAreaData(parsedData, timestamps, relevantNews);

        const hintData = getHintData(areaData, relevantNews);

        const { min, max } = domainParser(parsedData);

        const newsObj = {};
        for (const key in relevantNews) {
          if (relevantNews[key].length) {
            newsObj[key] = [...relevantNews[key]];
          }
        }

        res.send({
          yDomain: [min, max],
          title: symbol,
          data: parsedData,
          timestamps,
          areaData,
          hintData,
          relevantNews: newsObj,
        });
      })
      .catch((err) => console.error(err));
  });

  router.get("/company/:symbol", (req, res) => {
    const { symbol } = req.params;

    rp.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API}`
    )
      .then((data) => {
        data = JSON.parse(data);

        const returnObj = {
          name: data["Name"],
          symbol: data["Symbol"],
          exchange: data["Exchange"],
          currency: data["Currency"],
          country: data["Country"],
          industry: data["Industry"],
          employees: data["FullTimeEmployees"],
        };

        res.send(returnObj);
      })
      .catch((err) => res.status(500).send(err));
  });

  router.get("/:symbol", (req, res) => {
    const { symbol } = req.params;
    getTickerData(symbol)
      .then((data) => {
        data = JSON.parse(data);

        if (data["Note"]) {
          console.log("stock api limit reacher");
          res.status(500).send("api limit reached");
          return;
        }

        const { parsedData, timestamps } = dataParser(
          data["Time Series (5min)"]
        );

        const { min, max } = domainParser(parsedData);

        res.send({
          yDomain: [min, max],
          title: symbol,
          data: parsedData,
          timestamps,
        });
      })
      .catch((err) => console.error(err));
  });

  return router;
};
