const moment = require("moment");

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

const calculateDelta = (firstValue, secondValue) => {
  return (
    Math.abs(parseInt(firstValue) - parseInt(secondValue)) /
    parseInt(firstValue)
  );
};

const getChangeInData = (data) => {
  const DELTA = 0.05;
  const TIME = 10;

  const keys = Object.keys(data).reverse();

  let firstDate = moment(keys[0])
    .hour(TIME)
    .minute(0)
    .second(0)
    .format("YYYY-MM-DD hh:mm:ss");

  const deltaArr = [];

  for (const i in keys) {
    const secondDate = moment(firstDate)
      .add(1, "day")
      .format("YYYY-MM-DD hh:mm:ss");

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

const getHintData = (areaData, newsData) => {
  //create new areaData
  const newAreaData = [...areaData];

  const hintArr = [];

  const keys = Object.keys(newsData);

  for (const data of areaData) {
    hintArr.push({
      data: data[Math.floor(data.length / 2)],
      hintTitle: "Title",
      url: "",
    });
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
