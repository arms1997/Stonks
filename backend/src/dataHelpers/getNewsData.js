const NewsApi = require("newsapi");

const newsapi = new NewsApi("e622835931cb4955b3b3601c49020292");

const getAllNews = () => {
  return newsapi.v2.everything({
    sources: "the-wall-street-journal, bloomberg, business-insider",
    language: "en",
    sortBy: "publishedAt",
    pageSize: 100,
  });
};

const getCompanyNews = (company, symbol) => {
  return newsapi.v2.everything({
    sources: "the-wall-street-journal, bloomberg, business-insider",
    qInTitle: `${company} OR ${symbol}`,
    language: "en",
    sortBy: "publishedAt",
    pageSize: 100,
  });
};

module.exports = {
  getCompanyNews,
  getAllNews,
};
