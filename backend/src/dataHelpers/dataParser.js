const moment = require("moment");

/**
 * Returns data and timestamps for line graph
 *
 * @param {Object} data object of stocks data in format date:{...data} from alpha vantage
 *
 * @return {Array, Array} returns array of data converted to x, y coordinates and timestamps
 */
const dataParser = (data) => {
  const parsedData = [];
  const timestamps = [];

  const keys = Object.keys(data);

  let i = keys.length;

  for (const key in data) {
    i--;
    parsedData.push({ x: i, y: data[key]["4. close"] });
    timestamps.push(key);
  }

  timestamps.reverse();

  return { parsedData, timestamps };
};

/**
 * Returns yDomain for graph
 *
 * @param {Object} data object of stocks data in format date:{...data} from alpha vantage
 *
 * @return {Number, Number} min and max values for the y axis
 */
const domainParser = (data) => {
  const min = Math.floor(
    Math.min.apply(
      null,
      data.map((item) => item.y)
    )
  );

  const max = Math.ceil(
    Math.max.apply(
      null,
      data.map((item) => item.y)
    )
  );

  return { min, max };
};

/**
 * Returns percent change between two data points
 *
 * @param {Number} firstValue
 * @param {Number} secondValue
 *
 * @return {Number} percent change of two data points
 */
const calculateDelta = (firstValue, secondValue) => {
  return (
    Math.abs(parseInt(firstValue) - parseInt(secondValue)) /
    parseInt(firstValue)
  );
};

/**
 * Returns Array of Dates indicating where there has been a change
 *
 * @param {Object} data object of stocks data in format date:{...data} from alpha vantage
 *
 * @return {Array} array of dates where percent change criteria was met
 */
const getChangeInData = (data) => {
  const DELTA = 0.03;
  const TIME = 10;

  const keys = Object.keys(data).reverse();

  let firstDate = moment(keys[0])
    .hour(TIME)
    .minute(0)
    .second(0)
    .format("YYYY-MM-DD hh:mm:ss");

  const deltaArr = [];

  for (const i in keys) {
    const secondDate =
      moment(firstDate).day() === 5
        ? moment(firstDate).add(3, "day").format("YYYY-MM-DD hh:mm:ss")
        : moment(firstDate).add(1, "day").format("YYYY-MM-DD hh:mm:ss");

    if (!data[secondDate]) break;

    const delta = calculateDelta(
      data[firstDate]["4. close"],
      data[secondDate]["4. close"]
    );

    if (delta > DELTA) deltaArr.push(moment(firstDate).format("YYYY-MM-DD"));

    firstDate =
      moment(secondDate).day() === 5
        ? moment(secondDate).add(3, "day").format("YYYY-MM-DD hh:mm:ss")
        : secondDate;
  }

  return deltaArr;
};

/**
 * Returns Object where each entry has an array with news articles related to that date
 *
 * @param {Array} news       news data related to the company, from newsApi
 * @param {Array} deltaData  dates where percent change criteria was met
 *
 * @return {Object} relevantNews
 */
const getRelevantNews = (news, deltaData) => {
  const relevantNews = {};

  for (const i in deltaData) {
    relevantNews[deltaData[i]] = [
      ...news.filter(
        (article) =>
          moment(article["publishedAt"]).format("YYYY-MM-DD") >=
            moment(deltaData[i]).subtract(2, "day").format("YYYY-MM-DD") &&
          moment(article["publishedAt"]).format("YYYY-MM-DD") <=
            moment(deltaData[i]).format("YYYY-MM-DD")
      ),
    ];
  }

  return relevantNews;
};

/**
 * Returns an Array of arrays where each nested array contains the coordinates for the area chart
 *
 * @param {Object} data       object of stocks data in format date:{...data} from alpha vantage
 * @param {Array} timestamps  array of timestamps from ticker data
 * @param {Array} deltaData   array of timestamps where percent change criteria was met
 *
 * @return {Array} areaData
 */
const getAreaData = (data, timestamps, deltaData) => {
  const areaData = [];
  const newData = [...data].reverse();

  for (const date in deltaData) {
    const areaSeries = [];
    let i = 0;

    if (deltaData[date].length) {
      for (const timestamp of timestamps) {
        if (moment(timestamp).format("YYYY-MM-DD") === date) {
          areaSeries.push(newData[i]);
        }
        i++;
      }
    }

    if (areaSeries.length) {
      areaData.push(areaSeries);
    }
  }

  return areaData;
};

/**
 *
 * @param {Array} areaData Array of arrays containing the data points for the area chart
 * @param {Array} news news data related to the company, from newsApi
 */
const getHintData = (areaData, news) => {
  //create new areaData
  const newAreaData = [...areaData];

  const hintArr = [];

  const newsObj = {};
  for (const key in news) {
    if (news[key].length) {
      newsObj[key] = [...news[key]];
    }
  }

  const keys = Object.keys(newsObj);

  let i = 0;
  for (const data of newAreaData) {
    hintArr.push({
      data: data[Math.floor(data.length / 2)],
      hint:
        newsObj[keys[i]][Math.floor(Math.random() * newsObj[keys[i]].length)],
    });

    i++;
  }

  return hintArr;
};

module.exports = {
  dataParser,
  domainParser,
  getChangeInData,
  getRelevantNews,
  getAreaData,
  getHintData,
};
