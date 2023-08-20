const Barber = require("../models/Barbers");
const catchAsyncErrors = require("../middleware/catchAsyncErros");

const registerSalon = async (req, res, next) => {
  const salon = await new Barber({ ...req.body });
  salon.save();
  res.json({ done: true });
};

const getAllSalonDetails = catchAsyncErrors(async (req, res, next) => {
  const salons = await Barber.find().populate("userID");
  res.json({ salons: salons });
});

const getSpecificSalonDetails_ID = catchAsyncErrors(async (req, res) => {
  console.log(req.user);
  const userID = req.params.userID;
  const salon = await Barber.find({ userID: userID });
  res.json({ currentSalon: salon });
});

const getSpecificSalonDetails_SalonName = catchAsyncErrors(async (req, res) => {
  const salonName = req.params.salonName;
  const salon = await Barber.find({ name: salonName });
  res.json({ currentSalon: salon });
});

const getSalonsForChossedService = catchAsyncErrors(async (req, res) => {
  const category = req.params.category;
  const salon = await Barber.find({ ServicesOffered: category });

  res.json({ salons: salon });
});

module.exports = {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSpecificSalonDetails_SalonName,
  getSalonsForChossedService,
};
