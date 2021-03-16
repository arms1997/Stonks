const express = require("express");
const router = express.Router();
const request = require("request");
const NewsApi = require("newsapi");

const dataParser = require("../dataHelpers/dataParser");

require("dotenv").config();

const newsapi = new NewsApi(process.env.NEWS_API);

module.exports = () => {
  router.get("/", (req, res) => {
    request(
      `https://api.hypercharts.co/v1/companies?apiKey=${process.env.HYPER_API}`,
      (error, response, body) => {
        if (error) {
          res.status(500).send({ error: error.message });
          return;
        }

        res.send(body);
      }
    );
  });

  router.get("/:symbol", (req, res) => {
    const { symbol } = req.params;

    request(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_API}`,
      (error, response, body) => {
        if (error) {
          res.status(500).send({ error: error.message });
          return;
        }

        const data = JSON.parse(body);

        if (data["Note"]) {
          console.log("rip");
          res.status(500).send("Houston we got a problem");
          return;
        }

        const { parsedData, timestamps } = dataParser(
          data["Time Series (5min)"]
        );

        const min = Math.floor(
          Math.min.apply(
            null,
            parsedData.map((item) => item.y)
          )
        );
        const max = Math.ceil(
          Math.max.apply(
            null,
            parsedData.map((item) => item.y)
          )
        );

        newsapi.v2
          .everything({
            sources: "the-wall-street-journal, bloomberg, business-insider",
            qInTitle: `${symbol}`,
            language: "en",
            sortBy: "publishedAt",
            from: "2021-02-15",
          })
          .then((response) => {
            res.send({
              yDomain: [min, max],
              title: data["Meta Data"]["2. Symbol"],
              data: parsedData,
              timestamps,
              news: response["articles"],
            });
          });
      }
    );
  });

  return router;
};
