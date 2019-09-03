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
      res.status(500).json({ message: `cant connect to db error: ${err}` });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `welcome user ${user.username}`, token });
      } else {
        res.status(401).json("invlid credentials");
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/user", restricted, (req, res) => {
  const id = req.userBody.id;

  db("users")
    .where({ id })
    .first()
    .then(user => {
      res.status(201).json(req.userBody);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    user: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
