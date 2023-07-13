const Barber = require("../models/Barbers");

const registerSalon = async (req, res, next) => {
  const salon = await new Barber({ ...req.body });
  salon.save();
  res.json({ done: true });
};

const getAllSalonDetails = async (req, res, next) => {
  const salons = await Barber.find();
  res.json({ salons: salons });
};

const getSpecificSalonDetails = async (req, res, next) => {
  const salonName = req.params.salonName;
  const salon = await Barber.find({ name: salonName });

  res.json({ salons: salon });
};

const getSalonsForChossedService = async (req, res) => {
  const category = req.params.category;
  const salon = await Barber.find({ ServicesOffered: category });

  res.json({ salons: salon });
};
module.exports = {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails,
  getSalonsForChossedService,
};
