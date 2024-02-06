const express = require("express");
const router = express.Router();
const {
  registerUser,
  checkLoginDetails,
  checkForUser_Token,
  logout,
  updateUser,
} = require("../controllers/userController");

const { checkout } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/registerUser").post(registerUser);
router.route("/checkLoginDetails").post(checkLoginDetails);

router.route("/update-user").put(isAuthenticatedUser, updateUser);

router
  .route("/checkForUser_Token")
  .get(isAuthenticatedUser, checkForUser_Token);

router.route("/logout").get(isAuthenticatedUser, logout);

//payment routes
router.route("/checkout").post(isAuthenticatedUser, checkout);

module.exports = router;
