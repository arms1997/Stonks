const db = require('./index');

const addUser = function(user) {

  return db.query(`
  INSERT INTO users
  (username, email)
  VALUES($1, $2)
  RETURNING *;`, [user.username, user.email])
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error'));

};

exports.addUser = addUser;

const getUserById = function(id) {

  return db.query(`
  SELECT * FROM users
  WHERE id = $1`, 
  [id])
    .then(res => res.rows[0])
    .catch(err => console.error('There has query error'));

};

exports.getUserById = getUserById;

const updateUserInfo = function(id, username, email) {


  
};