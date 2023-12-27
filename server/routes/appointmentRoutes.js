const { isAuthenticatedUser } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const {
  registerAppointment,
  getBarberAppointments,
  updateBarberAppointment,
  getUserAppointments,
} = require("../controllers/appointmentController");

const {
  paymentVerification,
  updateUserAppointment,
} = require("../controllers/paymentController");

router
  .route("/register-appointment")
  .post(isAuthenticatedUser, registerAppointment);

router
  .route("/payment-verification")
  .put(isAuthenticatedUser, paymentVerification);

router
  .route("/get-barber-appointments/:id")
  .get(isAuthenticatedUser, getBarberAppointments);

router
  .route("/get-user-appointments")
  .get(isAuthenticatedUser, getUserAppointments);

router
  .route("/update-barber-appointment/:id")
  .put(isAuthenticatedUser, updateBarberAppointment);

router
  .route("/update-user-appointment/:id")
  .put(isAuthenticatedUser, updateUserAppointment);

module.exports = router;
