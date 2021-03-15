const db = require('./index');

const addUser = function(user) {

  return db.query(`
  INSERT INTO users
  (username, email)
  VALUES($1, $2)
  RETURNING *;`, [user.username, user.email])
    .then(res => res.rows[0]);

};

exports.addUser = addUser;

const getUserByEmail = function(email) {

  return db.query(`
  SELECT 
  
  `)

};

exports.getUserByEmail = getUserByEmail;
