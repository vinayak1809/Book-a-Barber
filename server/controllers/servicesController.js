const Services = require("../models/Services");
const catchAsyncErrors = require("../middleware/catchAsyncErros");

const registerSpecificSalonService = catchAsyncErrors(async (req, res) => {
  const services = await new Services({ ...req.body });
  services.save();
  res.json({ message: "service registered" });
});

const getSpecificSalonServices = catchAsyncErrors(async (req, res) => {
  const salonID = req.params.salonID;
  const salonServices = await Services.find({ salonID: salonID });

  res.json({ services: salonServices });
});

module.exports = { registerSpecificSalonService, getSpecificSalonServices };
