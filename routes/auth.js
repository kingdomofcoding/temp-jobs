const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");
//middleware
const authenticationMiddleware = require("../middleware/authentication");
router.route("/register").post(register);
router.route("/login").post(authenticationMiddleware, login);

module.exports = router;
