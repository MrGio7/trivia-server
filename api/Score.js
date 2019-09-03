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

router.post("/add", (req, res) => {
  const score = req.body;

  db("score")
    .insert(score)
    .then(() => {
      res.status(201).json(score);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/ranking", (req, res) => {
  db("score")
    .then(score => {
      db("users").then(users => {
        const ranking = score.map(each => {
          return {
            score: each.score,
            user: users.filter(user => user.id === each.id_user)[0].username
          };
        });

        res.status(201).json(ranking);
      });

      // const ranking = score.map(each => {
      //   return {
      //     score: each.score,
      //     user: users.map(user =>  {
      //       user.id === each.id_user ? user.username : null
      //     })
      //   };
      // });
      // console.log(users.data);
      // res.status(201).json(ranking);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
