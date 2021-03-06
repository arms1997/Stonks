const db = require("../index");

//Add a user's like to database

const addLike = function (userId, ticker, company) {
  let queryParams = [userId, ticker, company];

  let queryString = `
    INSERT INTO likes
    (user_id, ticker, company)
    VALUES($1, $2, $3)
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
