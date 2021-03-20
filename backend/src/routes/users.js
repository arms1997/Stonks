const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //user's profile page with liked graphs and watched tickers and general news
  router.get("/:user_email", (req, res) => {
    const { user_email } = req.params;

    db.getUserByEmail(user_email)
      .then((userInfo) => {
        Promise.all([
          db.getUserLikes(userInfo.id),
          db.getUserWatches(userInfo.id),
        ])
          .then((data) => {
            res.json({
              likes: data[0],
              watches: data[1],
              user_id: userInfo.id,
              username: userInfo.username,
              user_phone_num: userInfo.phone_number,
              user_email,
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //add user to database
  router.post("/:user_info", (req, res) => {
    const { user_info } = req.body;

    db.addUser(user_info)
      .then((user_info) => {
        res.json({ user_info });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //update user's info (email, phone number or username)
  router.put("/:user_info", (req, res) => {
    const { user_id, user_info } = req.body;

    db.updateUserInfo(user_id, user_info)
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
