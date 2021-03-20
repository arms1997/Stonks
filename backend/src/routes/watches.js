const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { userId, ticker, value } = req.body;

    db.addWatch(userId, ticker, value)
      .then((resources) => {
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put("/:watch_id", (req, res) => {
    const { watch_id } = req.params;
    const { value = null } = req.body;
    db.updateWatch(watch_id, value)
      .then((resources) => {
        res.json({ ...resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
