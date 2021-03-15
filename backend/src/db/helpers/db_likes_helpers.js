const db = require('./index');

const addLike = function(id, ticker) {

  let queryParams = [id, ticker];

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