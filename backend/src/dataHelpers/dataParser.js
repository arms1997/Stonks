module.exports = (data) => {
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
