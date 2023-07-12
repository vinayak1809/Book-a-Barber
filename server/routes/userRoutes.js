

const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/userController");

router.route("/registerUser").post(registerUser.registerUser);
router.route("/checkUser").post(registerUser.checkUser);

module.exports = router;
