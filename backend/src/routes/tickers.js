const express = require("express");
const router = express.Router();
const rp = require("request-promise");
const moment = require("moment");

const getNewsData = require("../dataHelpers/getNewsData");
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

  router.get("/query", (req, res) => {
    const { symbol, company } = req.query;

    console.log(symbol, company);

    Promise.all([getTickerData(symbol), getNewsData(company)])
      .then(([data, news]) => {
        data = JSON.parse(data);

        const { parsedData, timestamps } = dataParser(
          data["Time Series (5min)"]
        );

        const deltaData = getChangeInData(data["Time Series (5min)"]);

        news = news["articles"].filter((article) => article.content);

        const relevantNews = getRelevantNews(news, deltaData);

        const areaData = getAreaData(parsedData, timestamps, relevantNews);

        const hintData = getHintData(areaData, relevantNews);

        const { min, max } = domainParser(parsedData);

        res.send({
          yDomain: [min, max],
          title: symbol,
          data: parsedData,
          timestamps,
          areaData,
          hintData,
          relevantNews,
        });
      })
      .catch((err) => console.error(err));
  });

  return router;
};
