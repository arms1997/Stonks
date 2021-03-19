const db = require("../index");

const addLike = function (userId, ticker) {
  let queryParams = [userId, ticker];

  let queryString = `
    INSERT INTO likes
    (user_id, ticker)
    VALUES($1, $2)
    RETURNING *;
    `;

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows[0])
    .catch((err) => console.error("There has query error", err.stack));
};

//update the users_like table is_active row to false

const updateLike = function (id) {
  let queryParams = [id];

  let queryString = `
    UPDATE likes
    SET is_active =  NOT is_active
    WHERE id = $1
    RETURNING *;
    `;

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows[0])
    .catch((err) => console.error("There has query error", err.stack));
};

const likeCounter = function (tickerName) {
  let queryParams = [tickerName];

  let queryString = `
    SELECT count(ticker) as likeCount
    FROM likes
    WHERE ticker = $1;
    `;

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows[0])
    .catch((err) => console.error("There has query error", err.stack));
};

module.exports = {
  addLike,
  updateLike,
  likeCounter,
};
