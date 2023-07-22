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
  totalAmount: {
    type: Number,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
});

module.exports = mongoose.model("appointment", AppointmentScehma);
