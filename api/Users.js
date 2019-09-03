const router = require("express").Router();
const db = require("./helpers/Db.js");

router.get('/', (req, res) => {
    db("users")
    .then(users => {
        res.json(users)
    })
})

module.exports = router;