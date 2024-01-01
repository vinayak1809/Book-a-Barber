const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Barber = require("../models/Barbers");
const Schedules = require("../models/Schedules");

const registerSalon = async (req, res) => {
  const salon = await new Barber({ ...req.body });
  salon.save();
  res.status(201).json({ success: true });
};

const getAllSalonDetails = catchAsyncErrors(async (req, res) => {
  const salons = await Barber.find().populate({
    path: "userID",
    select: "fullname email profilePicture role contactInformation",
  });
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

const registerSalonSchedules = catchAsyncErrors(async (req, res) => {
  const time = req.body.times.map((time) => {
    return { time: time, isBooked: false };
  });

  const checkSalonExist = await Schedules.findOne({
    barberId: req.body.barberId,
  });
  let schedule;

  if (checkSalonExist) {
    schedule = await Schedules.findOneAndUpdate(
      { barberId: req.body.barberId },
      {
        $push: {
          dayTime: { date: req.body.date, time: time },
        },
      }
    );
  } else {
    schedule = await Schedules.create({ ...req.body });
  }

  res.status(201).json({ schedules: schedule });
});

const getAllSalonSchedules = catchAsyncErrors(async (req, res) => {
  const { barberId } = req.params;

  const schedules = await Schedules.find({ barberId: barberId });

  res.status(200).json({ schedules: schedules });
});

module.exports = {
  registerSalon,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSpecificSalonDetails_SalonName,
  registerSalonSchedules,
  getAllSalonSchedules,
};
