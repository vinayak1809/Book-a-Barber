const Services = require("../models/Services");

const getSpecificSalonService = async (req, res, next) => {
  //const services = Services.find({userId:""})
};

const registerSpecificSalonService = async (req, res, next) => {
  const services = await new Services({ ...req.body });
  services.save();
  res.json({ message: "service registered" });
};

const getSpecificSalonServices = async (req, res, next) => {
  const salonID = req.params.salonID;
  const salonServices = await Services.find({ salonID: salonID });

  res.json({ services: salonServices, message: "service registered" });
};

module.exports = { registerSpecificSalonService, getSpecificSalonServices };
