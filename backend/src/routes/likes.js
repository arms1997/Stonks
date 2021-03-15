const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //add a like to a ticker from a user
  router.post('/', (req, res) => {
    const { userId, ticker } = req.body;

    db.addLike(userId, ticker)
      .then((resources) => {
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //update like is_active to false to remove like from a user
  router.put('/:like_id', (req, res) => {
    const { like_id  } = req.params;

    db.updateLike(like_id)
      .then((resources) => {
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};