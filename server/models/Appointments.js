const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentScehma = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  barberId: {
    type: mongoose.Types.ObjectId,
    ref: "barbers",
    required: true,
  },
  services: [
    {
      type: mongoose.Types.ObjectId,
      ref: "services",
      required: true,
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("appointment", AppointmentScehma);
