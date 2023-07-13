const Services = require("../models/Services");

const registerSpecificSalonService = async (req, res, next) => {
  const services = await new Services({ ...req.body });
  services.save();
  res.json({ message: "service registered" });
};

const getSpecificSalonServices = async (req, res, next) => {
  const salonID = req.params.salonID;
  const salonServices = await Services.find({ salonID: salonID });

  res.json({ services: salonServices });
};

module.exports = { registerSpecificSalonService, getSpecificSalonServices };
