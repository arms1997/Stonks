const NewsApi = require("newsapi");

const newsapi = new NewsApi(process.env.NEWS_API);

module.exports = (symbol) => {
  return newsapi.v2.everything({
    sources: "the-wall-street-journal, bloomberg, business-insider",
    qInTitle: `${symbol}`,
    language: "en",
    sortBy: "publishedAt",
  });
};
