const { isAuthenticatedUser } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const { registerAppointment } = require("../controllers/appointmentController");
const { paymentVerification } = require("../controllers/paymentController");
const { getBarberAppointments } = require("../controllers/barberController");

router
  .route("/register-appointment")
  .post(isAuthenticatedUser, registerAppointment);
router
  .route("/payment-verification")
  .post(isAuthenticatedUser, paymentVerification);

router
  .route("/get-barber-appointments/:id")
  .get(isAuthenticatedUser, getBarberAppointments);

module.exports = router;
