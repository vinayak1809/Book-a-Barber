const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Appointment = require("../models/Appointments");

const registerAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await new Appointment({ ...req.body });
  appointment.save();
  res.json({ done: true });
});

module.exports = { registerAppointment };
