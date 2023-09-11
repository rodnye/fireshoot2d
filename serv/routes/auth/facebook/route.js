const router = require("express").Router();
const login = require("./login.js");

router.get("/", login);

module.exports = router;