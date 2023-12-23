const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Barber = require("../models/Barbers");
const Schedules = require("../models/Schedules");
const Appointments = require("../models/Appointments");

const registerSalon = async (req, res) => {
  const salon = await new Barber({ ...req.body });
  salon.save();
  res.status(201).json({ success: true });
};

const getAllSalonDetails = catchAsyncErrors(async (req, res) => {
  const salons = await Barber.find().populate("userID");
  res.status(200).json({ salons: salons });
});

const getSpecificSalonDetails_ID = catchAsyncErrors(async (req, res) => {
  const userID = req.params.userID;
  const salon = await Barber.find({ userID: userID });
  res.status(200).json({ currentSalon: salon });
});

const getSpecificSalonDetails_SalonName = catchAsyncErrors(async (req, res) => {
  const salonName = req.params.salonName;
  const salon = await Barber.find({ name: salonName });
  res.status(200).json({ currentSalon: salon });
});

const getBarberAppointments = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const appointments = await Appointments.find({ barberId: id });
  res.status(200).json({ orders: appointments });
});

const registerSchedules = catchAsyncErrors(async (req, res) => {
  const checkSalonExist = await Schedules.findOne({
    barberId: req.body.barberId,
  });
  let schedule;

  if (checkSalonExist) {
    schedule = await Schedules.findOneAndUpdate(
      { barberId: req.body.barberId },
      {
        $push: {
          dayTime: req.body.dayTime,
        },
      }
    );
  } else {
    schedule = await Schedules.create({ ...req.body });
  }

  res.status(201).json({ schedules: schedule });
});

module.exports = {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSpecificSalonDetails_SalonName,
  getBarberAppointments,
  registerSchedules,
};
