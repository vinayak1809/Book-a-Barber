const express = require("express");
const router = express.Router();

const {
  registerSpecificSalonService,
  getSpecificSalonServices,
  getServicesForChossedCategory,
} = require("../controllers/servicesController");

router
  .route("/register-specific-salon-service")
  .post(registerSpecificSalonService);

router
  .route("/get-specific-salon-services/:salonID")
  .get(getSpecificSalonServices);

router
  .route("/get-services-for-choosed-category/:category")
  .get(getServicesForChossedCategory);

module.exports = router;
