const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/userController");
const { checkout } = require("../controllers/paymentController");

router.route("/registerUser").post(registerUser.registerUser);
router.route("/checkUser").post(registerUser.checkUser);

//payment routes
router.route("/checkout").post(checkout);

module.exports = router;
