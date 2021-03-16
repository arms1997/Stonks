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

module.exports = {
  dataParser,
  domainParser,
};
