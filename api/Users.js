const router = require("express").Router();
const db = require("./helpers/Db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const restricted = require("./restricted-middleware.js");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db("users")
    .insert(user)
    .then(() => {
      if (!user.username || !user.password) {
        res.status(401).json({ message: `please provide username & password` });
      } else {
        res
          .status(201)
          .json({ message: `U have successfully registered ${user.username}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `cant connect to db error: ${err}` });
    });
});

module.exports = router;
