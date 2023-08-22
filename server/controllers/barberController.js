const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Barber = require("../models/Barbers");

const registerSalon = async (req, res, next) => {
  const salon = await new Barber({ ...req.body });
  salon.save();
  res.status(201).json({ success: true });
};

const getAllSalonDetails = catchAsyncErrors(async (req, res, next) => {
  const salons = await Barber.find().populate("userID");
  res.status(200).json({ salons: salons });
});

const getSpecificSalonDetails_ID = catchAsyncErrors(async (req, res) => {
  console.log(req.user);
  const userID = req.params.userID;
  const salon = await Barber.find({ userID: userID });
  res.status(200).json({ currentSalon: salon });
});

const getSpecificSalonDetails_SalonName = catchAsyncErrors(async (req, res) => {
  const salonName = req.params.salonName;
  const salon = await Barber.find({ name: salonName });
  res.status(200).json({ currentSalon: salon });
});

module.exports = {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSpecificSalonDetails_SalonName,
};
