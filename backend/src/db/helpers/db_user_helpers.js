const db = require('../index');

const addUser = function(user) {

  return db.query(`
  INSERT INTO users
  (username, email, phone_number)
  VALUES($1, $2, $3)
  RETURNING *;`, [user.username, user.email, user.phone_number])
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error'));

};

const getUserById = function(id) {

  return db.query(`
  SELECT * FROM users
  WHERE id = $1`, 
  [id])
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error', err.stack));

};

const getUserByEmail = function(email) {

  console.log("email", email);

  const queryString = `
    SELECT * FROM users
    WHERE email = $1;
    `;

  return db.query(queryString, [email])
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error', err.stack));
};

const updateUserInfo = function(user_id, options) {
  
  let queryParams = [];

  let queryString = `UPDATE users SET `;

  let setQuery = [];

  if (options.username) {
    queryParams.push(`${options.username}`);
    setQuery.push(`username = $${queryParams.length}`)
  }

  if (options.user_email) {
    queryParams.push(`${options.user_email}`);
    setQuery.push(`email = $${queryParams.length}`)
  }


  if (options.user_phone_num) {
    queryParams.push(`${options.user_phone_num}`);
    setQuery.push(`phone_number = $${queryParams.length}`)
  }

  //add user id to queryParms list 
  
  let joinedSetString;
  
  if (queryParams.length > 1) {
    
    joinedSetString = setQuery.join(', ')
    
  } else {
    
    joinedSetString = setQuery[0]
  }
  
  queryString += joinedSetString;
  
  queryParams.push(`${user_id}`);
  queryString += `
    WHERE id = $${queryParams.length}
    RETURNING *;
    `;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('There has been a query error', err.stack))
};

const getUserLikes = function(user_id) {

  let queryString = `
    SELECT * 
    FROM likes 
    WHERE user_id = $1;
    `;

    return db.query(queryString, [user_id])
      .then(res => res.rows)
      .catch(err => console.error('There has been a query error', err.stack));
};

const getUserWatches = function(user_id) {

  let queryString = `
    SELECT * 
    FROM watches
    WHERE user_id = $1;
    `;

    return db.query(queryString, [user_id])
      .then(res => res.rows)
      .catch(err => console.error('There has been a query error', err.stack));
};

module.exports = {
  addUser,
  getUserById,
  getUserByEmail,
  updateUserInfo,
  getUserLikes,
  getUserWatches
};