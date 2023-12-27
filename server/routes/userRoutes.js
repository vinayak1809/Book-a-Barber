const express = require("express");
const router = express.Router();
const {
  registerUser,
  checkLoginDetails,
  checkForUser_Token,
  logout,
} = require("../controllers/userController");

const { checkout } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/registerUser").post(registerUser);
router.route("/checkLoginDetails").post(checkLoginDetails);

router
  .route("/checkForUser_Token")
  .get(isAuthenticatedUser, checkForUser_Token);

router.route("/logout").get(logout);

//payment routes
router.route("/checkout/:id").post(checkout);

module.exports = router;
