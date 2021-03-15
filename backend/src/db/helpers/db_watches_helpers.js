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

const deleteWatch = function (watch_id) {
  const queryString = `
  UPDATE watches SET is_active = false 
  WHERE id = $1
  RETURNING *;`;

  return db
    .query(queryString, [watch_id])
    .then((res) => res.rows[0])
    .catch((err) => console.log("query error", err.stack));
};

module.exports = {
  addWatch,
  deleteWatch,
};
