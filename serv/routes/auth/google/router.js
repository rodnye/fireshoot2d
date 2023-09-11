const router = require("express").Router();
const login = require("./login.js");
const success = require("./success.js");

router.get("/success" , success);
router.get("/", login);

module.exports = router;