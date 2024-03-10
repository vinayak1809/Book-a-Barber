const Services = require("../models/Services");
const catchAsyncErrors = require("../middleware/catchAsyncErros");
const ErrorHandler = require("../utils/errorHandler");

const registerSpecificSalonService = catchAsyncErrors(
  async (req, res, next) => {
    let services;

    const { tag, salonID, userID } = req.body;
    try {
      const service = await Services.find({
        tag: tag,
        salonID: salonID,
        userID: userID,
      });

      if (service.length !== 0) {
        services = await Services.findOneAndUpdate(
          { tag: tag, salonID: salonID, userID: userID },
          { $push: { types: { $each: [{ ...req.body.types }] } } },
          { new: true }
        );
      } else {
        services = new Services({ ...req.body });
      }

      await services.save();
      res.status(201).json({ message: "service registered" });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

const getSpecificSalonServices = catchAsyncErrors(async (req, res, next) => {
  try {
    const salonID = req.params.salonID;

    const salonServices = await Services.find({
      salonID: salonID,
    }).populate("salonID");

    res.status(200).json({ services: salonServices });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

const getServicesForChossedCategory = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const tag = req.params.category.toLowerCase();

      if (tag === "all") {
        const salon = await Services.find().populate("salonID");
        return res.status(200).json({ services: salon });
      }

      const salon = await Services.find({ tag: tag }).populate("salonID");

      return res.status(200).json({ services: salon });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

module.exports = {
  registerSpecificSalonService,
  getSpecificSalonServices,
  getServicesForChossedCategory,
};
