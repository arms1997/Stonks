const db = require('./index');

const addLike = function(userId, ticker) {

  let queryParams = [userId, ticker];

  let queryString = `
    INSERT INTO user_likes
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
    UPDATE user_likes
    SET isActive = false
    WHERE id = $1
    RETURNING id;
    `

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error', err.stack));

};

exports.removeLike = removeLike;

