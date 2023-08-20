const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/userController");
const { checkout } = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/registerUser").post(registerUser.registerUser);
router.route("/checkUser").post(registerUser.checkUser);

router
  .route("/checkForUser")
  .get(isAuthenticatedUser, registerUser.checkForUser_Token);

router.route("/logout").get(registerUser.logout);

//payment routes
router.route("/checkout").post(checkout);

module.exports = router;
