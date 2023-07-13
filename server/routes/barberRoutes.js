const express = require("express");
const router = express.Router();

const {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails,
  getSalonsForChossedService,
} = require("../controllers/barberController");

router.route("/register-salon").post(registerSalon);
router.route("/get-all-salons-details").get(getAllSalonDetails);

router
  .route("/get-specific-salon-details/:salonName")
  .get(getSpecificSalonDetails);

router
  .route("/get-salons-for-choosed-service/:category")
  .get(getSalonsForChossedService);

module.exports = router;
