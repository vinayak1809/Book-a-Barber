const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentScehma = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  barberId: {
    type: mongoose.Types.ObjectId,
    ref: "barbers",
  },
  services: [
    {
      type: mongoose.Types.ObjectId,
      ref: "services",
    },
  ],
  dateAndTime: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.Schema("appointment", AppointmentScehma);
