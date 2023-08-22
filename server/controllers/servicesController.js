const Services = require("../models/Services");
const catchAsyncErrors = require("../middleware/catchAsyncErros");

const registerSpecificSalonService = catchAsyncErrors(async (req, res) => {
  const services = await new Services({ ...req.body });
  services.save();
  res.status(201).json({ message: "service registered" });
});

const getSpecificSalonServices = catchAsyncErrors(async (req, res) => {
  const salonID = req.params.salonID;

  const salonServices = await Services.find({ salonID: salonID }).populate(
    "salonID"
  );

  res.status(200).json({ services: salonServices });
});

const getServicesForChossedCategory = catchAsyncErrors(async (req, res) => {
  const tag = req.params.category;

  if (tag === "All") {
    const salon = await Services.find().populate("salonID");
    res.status(200).json({ services: salon });
  }
  const salon = await Services.find({ tag: tag }).populate("salonID");
  res.status(200).json({ services: salon });
});

module.exports = {
  registerSpecificSalonService,
  getSpecificSalonServices,
  getServicesForChossedCategory,
};
