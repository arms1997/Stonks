const express = require("express");
const router = express.Router();
const rp = require("request-promise");

const getNewsData = require("../dataHelpers/getNewsData");
const getTickerData = require("../dataHelpers/getTickerData");

const { dataParser, domainParser } = require("../dataHelpers/dataParser");

module.exports = () => {
  router.get("/", (req, res) => {
    rp.get(
      `https://api.hypercharts.co/v1/companies?apiKey=${process.env.HYPER_API}`
    )
      .then((response) => res.send(response))
      .catch((err) => res.status(500).send({ err: err.message }));
  });

  router.get("/:symbol", (req, res) => {
    const { symbol } = req.params;

    Promise.all([getTickerData(symbol), getNewsData(symbol)])
      .then(([data, news]) => {
        data = JSON.parse(data);

        const { parsedData, timestamps } = dataParser(
          data["Time Series (5min)"]
        );

        const { min, max } = domainParser(parsedData);

        res.send({
          yDomain: [min, max],
          title: symbol,
          data: parsedData,
          timestamps,
          news: news["articles"],
        });
      })
      .catch((err) => console.error(err));
  });

  return router;
};
