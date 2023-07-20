const express = require("express");
const router = express.Router();

const { registerAppointment } = require("../controllers/appointmentController");

router.route("/register-appointment").post(registerAppointment);

module.exports = router;
