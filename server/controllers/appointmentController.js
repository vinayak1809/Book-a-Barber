const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Appointment = require("../models/Appointments");

const registerAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await new Appointment({ ...req.body });
  appointment.save();

  res.status(201).json({ success: true, message: "appointment saved" });
});

const updateBarberAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await Appointment.findById({ _id: req.params.id });

  if (appointment) {
    await Appointment.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
  }
  res.status(202).json({ success: true, message: "Updated" });
});

module.exports = { registerAppointment, updateBarberAppointment };
