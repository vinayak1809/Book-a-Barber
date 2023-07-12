const express = require("express");
const router = express.Router();

const {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails,
} = require("../controllers/barberController");

router.route("/register-salon").post(registerSalon);
router.route("/get-all-salons-details").get(getAllSalonDetails);

router
  .route("/get-specific-salon-details/:salonName")
  .get(getSpecificSalonDetails);

module.exports = router;
