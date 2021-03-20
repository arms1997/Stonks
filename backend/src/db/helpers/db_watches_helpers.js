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
  let queryString = `
  UPDATE watches SET 
  is_active = NOT is_active`;

  if (value) {
    queryString += `,value = $2`;
  }

  queryString += `WHERE id = $1
  RETURNING *;`;

  return db
    .query(queryString, [watch_id, value])
    .then((res) => res.rows[0])
    .catch((err) => console.log("query error", err.stack));
};

module.exports = {
  addWatch,
  updateWatch,
};
