const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Appointment = require("../models/Appointments");

const registerAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await new Appointment({ ...req.body });
  appointment.save();

  res.status(201).json({ success: true });
});

module.exports = { registerAppointment };