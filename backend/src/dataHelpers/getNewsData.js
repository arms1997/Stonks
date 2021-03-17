const NewsApi = require("newsapi");

const newsapi = new NewsApi("e622835931cb4955b3b3601c49020292");

/**
 * Returns all news from sources specified
 * @return {Promise} promise that can be accessed to get news Data
 */
const getAllNews = () => {
  return newsapi.v2.everything({
    sources: "the-wall-street-journal, bloomberg, business-insider",
    language: "en",
    sortBy: "publishedAt",
    pageSize: 100,
  });
};

/**
 * Returns specific news related to a company name and symbol from sources specified
 * @param {string} company The name of the company
 * @param {string} symbol The financial symbol of the compnay
 * @return {Promise} promise that can be accessed to get news Data
 */
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
