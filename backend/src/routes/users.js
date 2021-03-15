const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //user's profile page with liked graphs and watched tickers and general news
  router.get('/:user_email', (req, res) => {

    db.getUserByEmail(email)
      .then()
      .catch();

  });


  router.post('/me', (req, res) => {

      

  });
}