const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("./../middleware/auth");

const {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSalonsForChossedService,
  getSpecificSalonDetails_SalonName,
} = require("../controllers/barberController");

router.route("/register-salon").post(registerSalon);
router.route("/get-all-salons-details").get(getAllSalonDetails);

router
  .route("/get-specific-salon-details-ID/:userID")
  .get(isAuthenticatedUser, getSpecificSalonDetails_ID);

router
  .route("/get-specific-salon-details-salonName/:salonName")
  .get(isAuthenticatedUser, getSpecificSalonDetails_SalonName);

router
  .route("/get-salons-for-choosed-service/:category")
  .get(getSalonsForChossedService);

module.exports = router;
