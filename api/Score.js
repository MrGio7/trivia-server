const router = require("express").Router();
const db = require("./helpers/Db.js");
const restricted = require("./restricted-middleware.js");

router.get("/", (req, res) => {
  db("score")
    .then(score => {
      res.status(201).json(score);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
