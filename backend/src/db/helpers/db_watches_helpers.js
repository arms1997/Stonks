const { query } = require("../index");
const db = require("../index");

const addWatch = function (userID, ticker, value) {
  const queryString = `
  INSERT INTO watches
  (user_id, ticker, value)
  VALUES($1, $2, $3)
  RETURNING *;`;

  return db
    .query(queryString, [userID, ticker, value])
    .then((res) => res.rows[0])
    .catch((err) => console.log("query error", err.stack));
};

const updateWatch = function (watch_id, value = null) {
  const queryParams = value ? [watch_id, value] : [watch_id];

  let queryString = `
  UPDATE watches SET `;

  if (!value) {
    queryString += `is_active = false `;
  } else {
    queryString += `value = $2, is_active = true `;
  }

  queryString += `WHERE id = $1
  RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows[0])
    .catch((err) => console.log("query error", err.stack));
};

module.exports = {
  addWatch,
  updateWatch,
};
