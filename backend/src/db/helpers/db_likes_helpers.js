const db = require('./index');

const addLike = function(userId, ticker) {

  let queryParams = [userId, ticker];

  let queryString = `
    INSERT INTO likes
    (user_id, ticker)
    VALUES($1, $2)
    RETURNING *;
    `

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error', err.stack));

};

exports.addLike = addLike;

//update the users_like table is_active row to false

const removeLike = function(id, ticker){
  let queryParams = [id, ticker];

  let queryString = `
    UPDATE likes
    SET is_active = false
    WHERE id = $1
    RETURNING *;
    `;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error', err.stack));

};

exports.removeLike = removeLike;

const likeCounter = function(tickerName) {

  let queryParams = [tickerName];

  let queryString = `
    SELECT count(ticker) as likeCount
    FROM likes
    WHERE ticker = $1;
    `;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error', err.stack));

};

exports.likeCounter = likeCounter;