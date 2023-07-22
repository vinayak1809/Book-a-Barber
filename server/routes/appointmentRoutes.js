const express = require("express");
const router = express.Router();

const { registerAppointment } = require("../controllers/appointmentController");
const { paymentVerification } = require("../controllers/paymentController");

router.route("/register-appointment").post(registerAppointment);
router.route("/payment-verification").post(paymentVerification);

module.exports = router;
