const catchAsyncErrors = require("../middleware/catchAsyncErros");
const Appointment = require("../models/Appointments");

const registerAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await new Appointment({ ...req.body });
  appointment.save();

  res.status(201).json({ success: true, message: "appointment saved" });
});

const getUserAppointments = catchAsyncErrors(async (req, res) => {
  const userID = req.user._id;

  let orders = await Appointment.find({ userId: userID });

  //orders = orders.map((order) => {
  //  const modifiedOrder = { ...order };
  //  //   modifiedOrder.date = order.date.toDateString();
  //
  //  return modifiedOrder;
  //});

  return res.status(200).json({ appointments: orders, success: true });
});

const getBarberAppointments = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const appointments = await Appointment.find({ barberId: id });
  res.status(200).json({ appointments: appointments });
});

const updateBarberAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await Appointment.findById({ _id: req.params.id });

  if (appointment) {
    await Appointment.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
  }
  res.status(200).json({ success: true, message: "Updated" });
});

const autoUpdateAppointment = async () => {
  const currentDate = new Date();

  //set no response if the status is "requested" or "accepted"
  await Appointment.updateMany(
    {
      date: { $lt: currentDate },
      status: { $in: ["requested", "accepted"] },
    },
    { $set: { status: "no-response" } }
  );
};

module.exports = {
  registerAppointment,
  getBarberAppointments,
  getUserAppointments,
  updateBarberAppointment,
  autoUpdateAppointment,
};
