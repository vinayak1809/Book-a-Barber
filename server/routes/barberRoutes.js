const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("./../middleware/auth");

const {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSpecificSalonDetails_SalonName,
  registerSalonSchedules,
  getAllSalonSchedules,
  updateSalonSchedules,
  updateSalonDetails,
} = require("../controllers/barberController");

//user-side routes
router.route("/register-salon").post(isAuthenticatedUser, registerSalon);
router.route("/get-all-salons-details").get(getAllSalonDetails);

router.route("/update-salon").put(isAuthenticatedUser, updateSalonDetails);

router
  .route("/get-specific-salon-details-salonName/:salonName")
  .get(isAuthenticatedUser, getSpecificSalonDetails_SalonName);

//barber-side route
router
  .route("/get-specific-salon-details-ID/:userID")
  .get(isAuthenticatedUser, getSpecificSalonDetails_ID);

router
  .route("/register-salon-schedules")
  .post(isAuthenticatedUser, registerSalonSchedules);
router
  .route("/update-salon-schedules")
  .post(isAuthenticatedUser, updateSalonSchedules);

router
  .route("/get-all-salon-schedules/:barberId")
  .get(isAuthenticatedUser, getAllSalonSchedules);

module.exports = router;
