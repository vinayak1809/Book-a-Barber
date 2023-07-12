const express = require("express");
const router = express.Router();

const {
  registerSpecificSalonService,
  getSpecificSalonServices,
} = require("../controllers/servicesController");

router
  .route("/register-specific-salon-service")
  .post(registerSpecificSalonService);

router
  .route("/get-specific-salon-services/:salonID")
  .get(getSpecificSalonServices);

module.exports = router;
