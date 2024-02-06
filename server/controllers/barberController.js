const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Barber = require("../models/Barbers");
const Schedules = require("../models/Schedules");

const registerSalon = async (req, res) => {
  const salon = await new Barber({ ...req.body });
  salon.save();
  res.status(201).json({ success: true });
};

const updateSalonDetails = async (req, res) => {
  const salonDetails = await Barber.findOneAndUpdate(
    { userID: req.user._id },
    { ...req.body },
    { new: true }
  );

  res.status(201).json({ currentSalon: [salonDetails], success: true });
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
  const checkSalonExist = await Schedules.findOne({
    $or: [
      { barberId: req.body.barberId },
      { barberId: req.body.barberId, "dayTime.date": req.body.date },
    ],
  });

  let schedule;

  if (checkSalonExist) {
    schedule = await Schedules.findOneAndUpdate(
      { barberId: req.body.barberId },
      {
        $push: {
          dayTime: { date: req.body.date, time: req.body.times },
        },
      }
    );
  } else {
    schedule = await Schedules.create({
      dayTime: { date: req.body.date, time: req.body.times },
      barberId: req.body.barberId,
      userId: req.user._id,
    });
  }

  res.status(201).json({ schedules: schedule });
});

const updateSalonSchedules = catchAsyncErrors(async (req, res) => {
  let schedule;

  schedule = await Schedules.findOneAndUpdate(
    { barberId: req.body.barberId, "dayTime.date": req.body.date },
    {
      $set: { "dayTime.$.time": req.body.times },
    }
  );

  res.status(201).json({ schedules: schedule });
});

const getAllSalonSchedules = catchAsyncErrors(async (req, res) => {
  const { barberId } = req.params;

  var schedules = await Schedules.find({
    barberId: barberId,
  });

  //slicing out last 7 days to show up on calender
  if (schedules.length > 0) {
    if (schedules[0].dayTime.length > 7) {
      schedules[0].dayTime = schedules[0].dayTime.slice(-7);
    }

    //only next 7 days from today will show up on calender
    schedules[0].dayTime = schedules[0].dayTime.filter((dayTime) => {
      if (new Date(dayTime.date) >= new Date()) {
        return dayTime;
      }
    });

    //sort the date in ascending prder
    schedules[0].dayTime = schedules[0].dayTime.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  }
  res.status(200).json({ schedules: schedules });
});

module.exports = {
  registerSalon,
  updateSalonDetails,
  getAllSalonDetails,
  getSpecificSalonDetails_ID,
  getSpecificSalonDetails_SalonName,
  registerSalonSchedules,
  getAllSalonSchedules,
  updateSalonSchedules,
};
