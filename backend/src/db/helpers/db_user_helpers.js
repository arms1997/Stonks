const db = require('./index');

const addUser = function(user) {

  return db.query(`
  INSERT INTO users
  (username, email, phone_number)
  VALUES($1, $2, $3)
  RETURNING *;`, [user.username, user.email, user.phone_number])
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error'));

};

exports.addUser = addUser;

const getUserById = function(id) {

  return db.query(`
  SELECT * FROM users
  WHERE id = $1`, 
  [id])
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error', err.stack));

};

exports.getUserById = getUserById;


//get user by email to join like and watch tables for specific user's profile page

const getUserByEmail = function(email) {

  const queryString = `
    SELECT users.*
    FROM users
    JOIN likes ON likes.user_id = users.id
    JOIN watches ON watches.user_id = users.id
    WHERE email = $1
    GROUP BY users.id 
    `;

  return db.query(queryString, email)
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error', err.stack));
};

exports.getUserByEmail = getUserByEmail;


const updateUserInfo = function(id, options) {
  
  let queryParams = [];

  let queryString = `UPDATE users `;

  if (options.username) {
    queryParams.push(`${options.username}`);
    queryString += `SET username = $${queryParams.length} `
  }

  if (options.email) {
    queryParams.push(`${options.email}`);
    queryString += `SET email = $${queryParams.length} ` 
  }


  if (options.phone_number) {
    queryParams.push(`${options.phone_number}`);
    queryString += `SET phone_number = $${queryParams.length} ` 
  }

  //add user id to queryParms list 
  queryParams.push(`${id}`);

  queryString += `
  WHERE id = $${queryParams.length}
  RETURNING *;
  `
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('There has been a query error', err.stack))
};

exports.updateUserInfo = updateUserInfo;