const rp = require("request-promise");

module.exports = (symbol) => {
  return rp.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_API}`
  );
};
