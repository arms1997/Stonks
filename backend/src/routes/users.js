const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //user's profile page with liked graphs and watched tickers and general news
  router.get('/:user_email', (req, res) => {

    const { user_email } = req.body;

    db.getUserByEmail(user_email)
      .then((resources) => {
        res.json({ resources })
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });

  //add user to database 
  router.post('/:user_email', (req, res) => {
    const { user } = req.body; 

    db.addUser(user)
      .then((user) => {
        res.json({ user })
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      });
  });

  //update user's info (email, phone number or username)
  router.put('/:user_id', (req, res) => {
    const { user_id, userChanges } = req.body;

    db.updateUserInfo(user_id, userChanges)
      .then((user) => {
        res.json( { user })
      })
      .catch(res.status(500).json({ error: err.message }))

  });




  return router;
}